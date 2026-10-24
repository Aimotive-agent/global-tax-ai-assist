import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { Send, Sparkles, Bot } from "lucide-react";
import AppShell from "@/components/AppShell";
import { supabase } from "@/integrations/supabase/client";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What expenses can my business deduct?",
  "How does VAT registration work in Germany?",
  "When is the corporation tax deadline in the UK?",
];

const fetchAIAnswer = async (question: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke("tax-ai", {
      body: { question },
    });
    if (error) throw error;
    return data?.answer ?? data?.generatedText ?? "No answer available.";
  } catch {
    return "The assistant is unavailable right now. Please try again shortly.";
  }
};

const TaxAI = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  const handleAsk = async (question: string) => {
    const prompt = question.trim();
    if (!prompt || loading) return;
    setInput("");
    setMessages((msgs) => [...msgs, { role: "user", content: prompt }]);
    setLoading(true);
    const answer = await fetchAIAnswer(prompt);
    setMessages((msgs) => [...msgs, { role: "assistant", content: answer }]);
    setLoading(false);
  };

  return (
    <AppShell title="Tax AI Assistant" eyebrow="Veritas Tax AI">
      <div className="brand-card flex h-[calc(100vh-16rem)] min-h-[480px] flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-paper">
                <Bot size={22} />
              </span>
              <h2 className="text-xl font-semibold">How can I help with your taxes today?</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Ask about deductions, VAT, corporate tax deadlines, or how to prepare your
                country-specific filing.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleAsk(s)}
                    className="rounded-full border border-line bg-white px-3.5 py-2 text-xs text-ink transition hover:border-navy/30 hover:bg-navy/[0.03]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end gap-2.5 animate-fade-in ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-semibold text-white">
                  V
                </span>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-br-md bg-navy text-paper whitespace-pre-wrap"
                    : "rounded-bl-md border border-line bg-white text-ink prose prose-sm max-w-none prose-p:my-1.5 prose-headings:font-serif prose-headings:text-ink prose-strong:text-ink prose-li:my-0.5 prose-ul:my-1.5"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-semibold text-white">
                V
              </span>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-line bg-paper-2/60 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              className="h-11 flex-1 rounded-md border border-line bg-white px-3.5 text-sm text-ink placeholder:text-muted-foreground focus:border-navy/40 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("Ask a tax question...")}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-11 items-center gap-2 rounded-md bg-gold px-5 text-sm font-semibold text-white transition hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={16} />
              <span className="hidden sm:inline">{loading ? t("Sending...") : t("Ask")}</span>
            </button>
          </form>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Sparkles size={11} className="text-gold" />
            AI-generated guidance — confirm filing decisions with a qualified tax professional.
          </p>
        </div>
      </div>
    </AppShell>
  );
};

export default TaxAI;
