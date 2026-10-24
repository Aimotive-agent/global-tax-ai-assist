/**
 * Veritas Tax AI — AI summary of uploaded documents.
 *
 * POST { companyName, countryCode, files: [{ name, size }] }  ->  { "summary": "..." }
 *
 * Provider is OpenAI-compatible and configured via env:
 *   AI_BASE_URL  (default https://api.openai.com/v1)
 *   AI_API_KEY   (falls back to OPENAI_API_KEY)
 *   AI_MODEL     (default gpt-4o-mini)
 */

const AI_BASE_URL = (Deno.env.get("AI_BASE_URL") ?? "https://api.openai.com/v1").replace(/\/+$/, "");
const AI_API_KEY = Deno.env.get("AI_API_KEY") ?? Deno.env.get("OPENAI_API_KEY") ?? "";
const AI_MODEL = Deno.env.get("AI_MODEL") ?? "gpt-4o-mini";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { companyName, countryCode, files } = await req.json();
    const safeFiles: Array<{ name: string; size: number }> = Array.isArray(files) ? files : [];

    const docList =
      safeFiles.map((f) => `${f.name} (${((f.size ?? 0) / 1024).toFixed(1)} KB)`).join(", ") ||
      "No files";
    const fileCount = safeFiles.length;
    const totalKB = safeFiles.reduce((sum, f) => sum + (f.size ?? 0) / 1024, 0).toFixed(1);

    const userPrompt = `
Company: ${companyName}
Country: ${countryCode}
Number of uploaded documents: ${fileCount}
Files: ${docList}
Total file size: ${totalKB} KB

Summarize these uploaded receipts/invoices and pretend you are an AI tax assistant for ${countryCode}. Give a two-sentence overview about their potential tax impact and next AI steps for automatic tax form filling. Keep it professional yet friendly.`;

    const aiRes = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are an expert corporate tax AI assistant that helps taxpayers fill in their annual returns using their uploaded documents. You give insightful, localized summaries.",
          },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 250,
      }),
    });

    const aiData = await aiRes.json();
    const summary = aiData.choices?.[0]?.message?.content?.trim() || "Unable to generate summary.";

    return json({ summary });
  } catch (e) {
    console.error("Error in tax-overview-summary:", e);
    return json({ summary: "AI error: failed to generate summary." }, 500);
  }
});
