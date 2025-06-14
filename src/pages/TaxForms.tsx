
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const countryForms = [
  { code: "us", name: "USA", file: "/sample/tax-form-us.pdf" },
  { code: "de", name: "Germany", file: "/sample/tax-form-de.pdf" },
  { code: "fr", name: "France", file: "/sample/tax-form-fr.pdf" },
  { code: "in", name: "India", file: "/sample/tax-form-in.pdf" },
  // Add more as needed, files must exist in /public/sample
];

const TaxForms = () => {
  const { t } = useTranslation();
  const [country, setCountry] = useState<string>("us");
  const form = countryForms.find(f => f.code === country);

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-2">{t("Tax Forms")}</h1>
      <div className="mb-3">
        <label className="block mb-1">{t("Select your country")}</label>
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="border rounded px-3 py-2 bg-muted w-full max-w-xs"
        >
          {countryForms.map(c => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        {form && (
          <Button asChild>
            <a href={form.file} download>
              {t("Download Tax Form")}
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};
export default TaxForms;
