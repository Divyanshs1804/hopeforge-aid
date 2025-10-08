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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const childId = formData.get('childId') as string;
    const childName = formData.get('childName') as string;
    const reportDate = formData.get('reportDate') as string;
    const reportType = formData.get('reportType') as string;

    if (!file || !childId || !reportDate || !reportType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid file type. Only PDF, DOCX, JPG, and PNG are allowed.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const fileName = `${childId}/${Date.now()}_${file.name}`;
    const fileBuffer = await file.arrayBuffer();

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('health-documents')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return new Response(
        JSON.stringify({ error: `Failed to upload file: ${uploadError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create health report record
    const { data: reportData, error: reportError } = await supabaseClient
      .from('health_reports')
      .insert({
        child_id: childId,
        file_name: file.name,
        file_url: uploadData.path,
        report_date: reportDate,
        report_type: reportType,
        processed: false,
      })
      .select()
      .single();

    if (reportError) {
      console.error('Database insert error:', reportError);
      // Clean up uploaded file
      await supabaseClient.storage.from('health-documents').remove([fileName]);
      return new Response(
        JSON.stringify({ error: `Failed to create report record: ${reportError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Trigger document processing in background
    const processUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/process-document`;
    fetch(processUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.get('Authorization')!,
      },
      body: JSON.stringify({ reportId: reportData.id }),
    }).catch(err => console.error('Failed to trigger processing:', err));

    return new Response(
      JSON.stringify({ 
        success: true, 
        reportId: reportData.id,
        message: 'File uploaded successfully. Processing will begin shortly.' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});