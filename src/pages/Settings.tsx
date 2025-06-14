
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Ensure the back button always navigates to dashboard
  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    toast({
      title: t("Language changed!"),
      description: `${t("App language set to")} ${code}`,
    });
  };

  useEffect(() => {
    document.title = t("Settings");
  }, [t]);

  return (
    <div className="p-6 max-w-xl">
      <button
        className="mb-4 px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-accent transition"
        onClick={() => navigate("/")}
      >
        ← {t("Back")}
      </button>
      <h1 className="text-2xl font-bold mb-4">{t("Settings")}</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">{t("Language")}</h2>
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </div>
    </div>
  );
};

export default Settings;

