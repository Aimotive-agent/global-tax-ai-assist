/**
 * Veritas Tax AI — tax question answering.
 *
 * POST { "question": "..." }  ->  { "answer": "..." }
 * ("prompt" is accepted as an alias for "question".)
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
    const body = await req.json();
    const question = body?.question ?? body?.prompt;
    if (!question) {
      return json({ answer: "No question provided." }, 400);
    }

    const res = await fetch(`${AI_BASE_URL}/chat/completions`, {
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
              "You are a helpful AI tax assistant for Veritas Tax AI. Answer tax-related questions clearly and concisely. Keep answers practical, and note when a qualified tax professional should confirm a filing decision.",
          },
          { role: "user", content: question },
        ],
        max_tokens: 512,
      }),
    });

    const aiData = await res.json();
    const answer = aiData.choices?.[0]?.message?.content?.trim();
    return json({ answer: answer ?? "No answer received." });
  } catch (error) {
    console.error("tax-ai error:", error);
    return json({ answer: "Sorry, there was an error processing your question." }, 500);
  }
});
