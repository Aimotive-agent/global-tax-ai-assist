
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { companyName, countryCode, files } = await req.json();

    const docList = files.map(f => `${f.name} (${(f.size/1024).toFixed(1)} KB)`).join(", ") || "No files";
    const fileCount = files.length;
    const totalKB = files.reduce((sum, f) => sum + (f.size/1024), 0).toFixed(1);

    const userPrompt = `
Company: ${companyName}
Country: ${countryCode}
Number of uploaded documents: ${fileCount}
Files: ${docList}
Total file size: ${totalKB} KB

Summarize these uploaded receipts/invoices and pretend you are an AI tax assistant for ${countryCode}. Give a two-sentence overview about their potential tax impact and next AI steps for automatic tax form filling. Keep it professional yet friendly.`;

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: "system", content: "You are an expert corporate tax AI assistant that helps taxpayers fill in their annual returns using their uploaded documents. You give insightful, localized summaries." },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 250
      }),
    });

    const aiData = await aiRes.json();
    const summary = aiData.choices?.[0]?.message?.content?.trim() || "Unable to generate summary.";

    return new Response(JSON.stringify({ summary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error("Error in tax-overview-summary:", e);
    return new Response(JSON.stringify({ summary: "AI error: failed to generate summary." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
