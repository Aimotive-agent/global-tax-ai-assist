
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const TaxAI = () => {
  const { t } = useTranslation();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);

    try {
      const res = await fetch("/functions/v1/tax-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error("Failed to get response");
      const data = await res.json();
      setAnswer(data.answer || t("Sorry, I couldn't find an answer."));
    } catch (e: any) {
      toast({ title: t("Error"), description: e.message });
      setAnswer(t("Error getting response from the AI assistant."));
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-2">{t("Tax AI Assistant")}</h1>
      <p className="mb-6 text-muted-foreground">{t("Ask your tax questions below. Powered by AI!")}</p>
      <textarea
        className="w-full border rounded-md p-2 mb-2 bg-muted"
        rows={4}
        placeholder={t("Type your tax question here...")}
        value={question}
        onChange={e => setQuestion(e.target.value)}
        disabled={loading}
      />
      <Button
        onClick={handleAsk}
        disabled={loading || !question.trim()}
        className="mb-4"
      >
        {loading ? t("Thinking...") : t("Send")}
      </Button>
      {answer && (
        <div className="mt-2 p-3 rounded bg-muted text-muted-foreground border">{answer}</div>
      )}
    </div>
  );
};
export default TaxAI;
