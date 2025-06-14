
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";

const Settings = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">{t("Settings")}</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">{t("Language")}</h2>
        <LanguageSelector />
      </div>
      <div>{t("More settings coming soon!")}</div>
    </div>
  );
};
export default Settings;
