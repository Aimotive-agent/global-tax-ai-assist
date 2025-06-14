
import { useTranslation } from "react-i18next";

const TaxForms = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{t("Tax Forms")}</h1>
      <div className="mb-2">{t("Your country-specific tax forms will be shown here soon.")}</div>
      <div className="rounded bg-primary/10 p-4 text-sm text-primary font-semibold">{t("Tax form previews & downloads coming soon!")}</div>
    </div>
  );
};
export default TaxForms;
