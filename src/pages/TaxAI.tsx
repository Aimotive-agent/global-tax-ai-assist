import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const fetchAIAnswer = async (prompt: string): Promise<string> => {
  const response = await fetch('/functions/v1/tax-ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!response.ok) return "There was an error contacting the AI.";
  const data = await response.json();
  return data.generatedText || "No answer available.";
};

const TaxAI = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setMessages(msgs => [...msgs, {role: 'user', content: input}]);
    const answer = await fetchAIAnswer(input);
    setMessages(msgs => [
      ...msgs,
      {role: 'user', content: input},
      {role: 'ai', content: answer}
    ]);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl">
      <button
        className="mb-4 px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-accent transition"
        onClick={() => navigate("/")}
      >
        ← {t("Back")}
      </button>
      <h1 className="text-2xl font-bold mb-3">{t("Tax AI")}</h1>
      <form onSubmit={handleAsk} className="flex gap-2 mb-4">
        <input
          className="border rounded px-3 py-2 w-full bg-muted"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t("Ask a tax question...")}
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          {loading ? t("Sending...") : t("Ask")}
        </Button>
      </form>
      <div className="space-y-2 max-h-80 overflow-auto mb-6">
        {messages.length === 0 && (
          <div className="text-muted-foreground">{t("Ask a tax-related question to our AI assistant.")}</div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`rounded p-2 ${msg.role === "user" ? "bg-accent" : "bg-secondary"}`}>
            {msg.role === "user" ? t("You") : "AI"}: {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxAI;
