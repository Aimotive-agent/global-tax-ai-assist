
import { useTranslation } from "react-i18next";

const TaxAI = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{t("Tax AI Assistant")}</h1>
      <p className="mb-6 text-muted-foreground">{t("Ask your tax questions below. This area can be connected to AI in the future!")}</p>
      <textarea
        className="w-full border rounded-md p-2 mb-2 bg-muted"
        rows={4}
        placeholder={t("Type your tax question here...")}
        disabled
      />
      <button className="px-4 py-2 rounded bg-primary text-primary-foreground opacity-60 cursor-not-allowed" disabled>
        {t("Send (coming soon)")}
      </button>
      <div className="mt-4 rounded bg-primary/10 p-4 text-sm text-primary font-semibold">{t("Full interactive AI tax assistant coming soon!")}</div>
    </div>
  );
};
export default TaxAI;
