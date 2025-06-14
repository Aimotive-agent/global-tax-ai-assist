
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, FileText, Download } from "lucide-react";

// Simulate company and upload context for now
const mockCompanies = [
  { id: "1", name: "Acme Inc" },
  { id: "2", name: "Beta Corp" },
];
const mockUploads: Record<string, { filename: string; amount: number }[]> = {
  "1": [
    { filename: "receipt-jan.pdf", amount: 123.4 },
    { filename: "sales-feb.png", amount: 256.5 },
  ],
  "2": [{ filename: "invoice-april.pdf", amount: 987 }],
};
const mockCountryTaxes: Record<string, string> = {
  US: "IRS Form 1120 (Corporate Tax Return)",
  DE: "USt 1 A (Value Added Tax Form)",
  FR: "FR Tax F3220",
  IN: "ITR-6 (Company Income Tax Return)",
};

const TaxOverview = () => {
  const { t } = useTranslation();
  const [selectedCompany, setSelectedCompany] = useState("1");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const navigate = useNavigate();

  const uploads = mockUploads[selectedCompany] || [];
  const total = uploads.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="p-6 max-w-2xl mx-auto w-full">
      <button
        className="mb-4 px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-accent transition"
        onClick={() => navigate("/")}
      >
        ← {t("Back")}
      </button>
      <h1 className="text-2xl font-bold mb-2">{t("Tax Overview")}</h1>

      <div className="mb-4 flex gap-4">
        <div>
          <label className="block text-xs mb-1 font-semibold">{t("Company")}</label>
          <select value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)} className="border rounded px-3 py-2 bg-muted">
            {mockCompanies.map(c => (
              <option value={c.id} key={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1 font-semibold">{t("Country")}</label>
          <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className="border rounded px-3 py-2 bg-muted">
            {[ "US", "DE", "FR", "IN" ].map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <FileText size={18} className="text-primary" />
          {t("Uploaded Receipts & Invoices")}
        </h2>
        {uploads.length === 0 ? (
          <div className="text-muted-foreground text-sm">{t("No uploaded documents for this company.")}</div>
        ) : (
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-muted">
                <th className="py-2 px-4 text-left">{t("Filename")}</th>
                <th className="py-2 px-4 text-left">{t("Amount")}</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((f, idx) => (
                <tr key={f.filename + idx} className="border-t">
                  <td className="py-2 px-4">{f.filename}</td>
                  <td className="py-2 px-4">${f.amount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-semibold bg-accent border-t">
                <td className="py-2 px-4">{t("Total")}</td>
                <td className="py-2 px-4">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <Download size={18} className="text-primary" />
          {t("AI-filled Tax Form Preview")}
        </h2>
        <div className="rounded border px-4 py-3 bg-muted/60">
          <div className="mb-2 font-medium">{mockCountryTaxes[selectedCountry] || t("Country Tax Form")}</div>
          <ul className="text-sm mb-2">
            <li>{t("Total Income")}: <b>${total.toFixed(2)}</b> ({uploads.length} docs)</li>
            <li>{t("Last doc uploaded")}: {uploads.length ? uploads[uploads.length - 1].filename : "--"}</li>
            <li className="text-muted-foreground">{t("Auto-filling tax forms by AI coming soon!")}</li>
          </ul>
          <Button variant="outline" disabled>
            {t("Download completed tax form (coming soon)")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaxOverview;
