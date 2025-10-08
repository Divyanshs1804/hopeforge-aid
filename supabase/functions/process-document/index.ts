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
    const { reportId } = await req.json();

    if (!reportId) {
      return new Response(
        JSON.stringify({ error: 'Missing reportId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch report details
    const { data: report, error: fetchError } = await supabaseClient
      .from('health_reports')
      .select('*, children(name)')
      .eq('id', reportId)
      .single();

    if (fetchError || !report) {
      console.error('Report fetch error:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Report not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Download file from storage
    const { data: fileData, error: downloadError } = await supabaseClient.storage
      .from('health-documents')
      .download(report.file_url);

    if (downloadError || !fileData) {
      console.error('File download error:', downloadError);
      return new Response(
        JSON.stringify({ error: 'Failed to download file' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract text (simplified - in production use proper PDF/DOCX parsing)
    const fileBuffer = await fileData.arrayBuffer();
    const fileText = new TextDecoder().decode(fileBuffer);
    
    // Simple text chunking (256-512 chars per chunk)
    const chunkSize = 400;
    const chunks: string[] = [];
    for (let i = 0; i < fileText.length; i += chunkSize) {
      chunks.push(fileText.substring(i, i + chunkSize));
    }

    console.log(`Processing ${chunks.length} chunks for report ${reportId}`);

    // Process each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunkText = chunks[i];
      
      // Generate embedding using Lovable AI (OpenAI text-embedding-3-small)
      const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: chunkText,
        }),
      });

      if (!embeddingResponse.ok) {
        console.error(`Embedding generation failed for chunk ${i}:`, await embeddingResponse.text());
        continue;
      }

      const embeddingData = await embeddingResponse.json();
      const embedding = embeddingData.data[0].embedding;

      // Store chunk
      const { data: chunkData, error: chunkError } = await supabaseClient
        .from('document_chunks')
        .insert({
          report_id: reportId,
          child_id: report.child_id,
          chunk_text: chunkText,
          chunk_index: i,
          metadata: {
            file_name: report.file_name,
            report_type: report.report_type,
            report_date: report.report_date,
          },
        })
        .select()
        .single();

      if (chunkError) {
        console.error(`Chunk insert error for chunk ${i}:`, chunkError);
        continue;
      }

      // Store embedding
      const { error: embeddingError } = await supabaseClient
        .from('health_embeddings')
        .insert({
          chunk_id: chunkData.id,
          embedding: JSON.stringify(embedding),
          metadata: {
            chunk_index: i,
            total_chunks: chunks.length,
          },
        });

      if (embeddingError) {
        console.error(`Embedding insert error for chunk ${i}:`, embeddingError);
      }
    }

    // Mark report as processed
    await supabaseClient
      .from('health_reports')
      .update({ processed: true })
      .eq('id', reportId);

    console.log(`Successfully processed report ${reportId} with ${chunks.length} chunks`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        chunksProcessed: chunks.length,
        message: 'Document processed successfully' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Processing error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});