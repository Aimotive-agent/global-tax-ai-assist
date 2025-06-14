import { useAppState } from "@/components/AppStateContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useEffect, useState } from "react";

const countryForms: Record<string, string> = {
  US: "IRS Form 1120 (Corporate Tax Return)",
  DE: "USt 1 A (Value Added Tax Form)",
  FR: "FR Tax F3220",
  IN: "ITR-6 (Company Income Tax Return)",
};

const TaxOverview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    companies, selectedCompany, setSelectedCompany,
    uploadedFiles, selectedCountry, setSelectedCountry
  } = useAppState();

  const companyList = companies;
  const countryList = ["US", "DE", "FR", "IN"];
  const uploads = selectedCompany ? uploadedFiles[selectedCompany] || [] : [];
  const total = uploads.reduce((sum, f) => sum + (typeof f === "object" && "size" in f ? f.size/100 : 0), 0); // Demo: use file size as mock "amount"

  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    // Only call AI if there's a company and at least one file
    if (!selectedCompany || uploads.length === 0) {
      setAiSummary(null);
      return;
    }
    const fetchAI = async () => {
      setAiLoading(true);
      setAiSummary(null);
      try {
        const company = companies.find(c => c.id === selectedCompany);
        const body = JSON.stringify({
          companyName: company?.name || "",
          countryCode: selectedCountry,
          files: uploads.map(f => ({ name: f.name, size: f.size })),
        });
        const resp = await fetch(
          "https://irhkslejkxhlmhvcyozv.supabase.co/functions/v1/tax-overview-summary",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }
        );
        const data = await resp.json();
        setAiSummary(data.summary);
      } catch {
        setAiSummary("AI failed to summarize your tax situation.");
      } finally {
        setAiLoading(false);
      }
    };
    fetchAI();
  // Only refetch if uploaded files, selected company, or country changes
  // eslint-disable-next-line
  }, [selectedCompany, uploads.length, selectedCountry]);

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
          <select
            value={selectedCompany || ""}
            onChange={e => setSelectedCompany(e.target.value)}
            className="border rounded px-3 py-2 bg-muted"
          >
            <option value="" disabled>{t("Select company")}</option>
            {companyList.map(c => (
              <option value={c.id} key={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1 font-semibold">{t("Country")}</label>
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="border rounded px-3 py-2 bg-muted"
          >
            {countryList.map(code => (
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
                <th className="py-2 px-4 text-left">{t("File Size (KB)")}</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((f, idx) => (
                <tr key={f.name + idx} className="border-t">
                  <td className="py-2 px-4">{f.name}</td>
                  <td className="py-2 px-4">{Math.round(f.size / 1024)}</td>
                </tr>
              ))}
              <tr className="font-semibold bg-accent border-t">
                <td className="py-2 px-4">{t("Total files")}</td>
                <td className="py-2 px-4">{uploads.length}</td>
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
          <div className="mb-2 font-medium">{countryForms[selectedCountry] || t("Country Tax Form")}</div>
          <ul className="text-sm mb-2">
            <li>{t("Total Files")}: <b>{uploads.length}</b></li>
            <li>{t("Simulated Income")}: <b>${total.toFixed(2)}</b> (sum of file sizes/100)</li>
          </ul>
          <div className="mb-3">
            {aiLoading ? (
              <div className="text-sm text-muted-foreground animate-pulse">
                {t("AI is analyzing your files...")}
              </div>
            ) : aiSummary ? (
              <div className="text-primary text-sm font-medium">{aiSummary}</div>
            ) : (
              <div className="text-muted-foreground text-sm">{t("Auto-filling tax forms by AI coming soon!")}</div>
            )}
          </div>
          <Button variant="outline" disabled>
            {t("Download completed tax form (coming soon)")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaxOverview;
