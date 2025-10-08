import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { childId, query, conversationHistory = [] } = await req.json();

    if (!childId || !query) {
      return new Response(
        JSON.stringify({ error: 'Missing childId or query' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch child profile
    const { data: child, error: childError } = await supabaseClient
      .from('children')
      .select('*')
      .eq('id', childId)
      .single();

    if (childError || !child) {
      return new Response(
        JSON.stringify({ error: 'Child not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate query embedding
    const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: query,
      }),
    });

    if (!embeddingResponse.ok) {
      throw new Error('Failed to generate query embedding');
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    // Vector search filtered by child_id
    const { data: chunks, error: searchError } = await supabaseClient
      .from('document_chunks')
      .select('chunk_text, metadata, health_embeddings(embedding)')
      .eq('child_id', childId)
      .limit(5);

    if (searchError) {
      console.error('Chunk search error:', searchError);
    }

    // Build context
    const profileContext = `
Child Profile:
- Name: ${child.name}
- Age: ${child.age} years
- Gender: ${child.gender || 'Not specified'}
- Blood Group: ${child.blood_group || 'Unknown'}
- Allergies: ${child.allergies?.join(', ') || 'None'}
- Chronic Conditions: ${child.chronic_conditions?.join(', ') || 'None'}
- Vaccine Status: ${child.vaccine_status || 'Unknown'}
- Vaccines Due: ${child.vaccines_due?.join(', ') || 'None'}
`;

    const documentContext = chunks && chunks.length > 0
      ? chunks.map((c: any, i: number) => 
          `[Document ${i + 1}] ${c.chunk_text}\n(From: ${c.metadata?.file_name || 'Unknown'})`
        ).join('\n\n')
      : 'No health documents available for this child.';

    console.log(`Retrieved ${chunks?.length || 0} chunks for child ${child.name}`);

    // Stream AI response
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant for an orphanage health management system. You're helping staff with information about a specific child. Be empathetic, clear, and accurate.

${profileContext}

Health Documents:
${documentContext}

Use this information to answer questions about the child's health, medical history, and care needs.`,
          },
          ...conversationHistory,
          { role: 'user', content: query },
        ],
        stream: true,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required, please add funds to your Lovable AI workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error('AI request failed');
    }

    // Log query (fire and forget)
    supabaseClient
      .from('queries_log')
      .insert({
        child_id: childId,
        query_text: query,
        context_chunks: chunks || [],
      })
      .then(() => console.log('Query logged'));

    return new Response(aiResponse.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });

  } catch (error) {
    console.error('Child query error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});