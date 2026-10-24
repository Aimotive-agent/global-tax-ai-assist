import { useAppState } from "@/components/AppStateContext";
import { useTranslation } from "react-i18next";
import { FileText, Sparkles, ExternalLink, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import CountrySelector from "@/components/CountrySelector";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getCountry, formatKb } from "@/lib/taxData";

const TaxOverview = () => {
  const { t } = useTranslation();
  const {
    companies,
    selectedCompany,
    setSelectedCompany,
    uploadedFiles,
    selectedCountry,
    setSelectedCountry,
  } = useAppState();

  const uploads = selectedCompany ? uploadedFiles[selectedCompany] || [] : [];
  const company = companies.find((c) => c.id === selectedCompany);
  const taxCountry = getCountry(selectedCountry);
  const totalBytes = uploads.reduce((sum, f) => sum + f.size, 0);

  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRequested, setAiRequested] = useState(false);

  const uploadsKey = uploads.map((f) => `${f.name}:${f.size}`).join("|");

  const fetchSummary = async () => {
    if (!selectedCompany || uploads.length === 0) return;
    setAiLoading(true);
    setAiRequested(true);
    try {
      const { data, error } = await supabase.functions.invoke("tax-overview-summary", {
        body: {
          companyName: company?.name || "",
          countryCode: selectedCountry,
          files: uploads.map((f) => ({ name: f.name, size: f.size })),
        },
      });
      if (error) throw error;
      setAiSummary(data?.summary ?? "Unable to generate summary.");
    } catch {
      setAiSummary("AI is unavailable right now. Please try again shortly.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedCompany || uploads.length === 0) {
      setAiSummary(null);
      setAiRequested(false);
      return;
    }
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany, uploadsKey, selectedCountry]);

  return (
    <AppShell title="Tax Overview" eyebrow="Compliance">
      {/* Controls */}
      <div className="brand-card mb-6 flex flex-wrap items-end gap-6 p-5">
        <div>
          <label className="brand-eyebrow mb-1.5 block">{t("Company")}</label>
          <select
            value={selectedCompany || ""}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="h-9 rounded-md border border-line bg-white px-3 text-sm"
          >
            <option value="" disabled>
              {t("Select company")}
            </option>
            {companies.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="brand-eyebrow mb-1.5 block">{t("Country")}</label>
          <CountrySelector selected={selectedCountry} onSelect={setSelectedCountry} />
        </div>
        <div className="ml-auto">
          <a
            href={taxCountry.authorityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-3 py-2 text-sm font-medium text-navy transition hover:border-navy/30"
          >
            {taxCountry.authority} official forms <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={FileText}
          label="Documents"
          value={uploads.length}
          hint={uploads.length ? `Total ${formatKb(totalBytes)}` : "No documents uploaded"}
        />
        <StatCard
          icon={FileText}
          label="Tax form"
          value={taxCountry.code}
          hint={taxCountry.form}
        />
        <StatCard
          icon={Sparkles}
          label="AI summary"
          value={aiLoading ? "Analyzing…" : aiSummary ? "Available" : "Awaiting documents"}
          hint={company ? company.name : "Select a company"}
        />
      </div>

      {/* Documents */}
      <section className="brand-card mb-6 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <FileText size={18} className="text-navy" />
          {t("Uploaded Receipts & Invoices")}
        </h2>
        <div className="section-rule mt-2 mb-4" />
        {uploads.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line bg-paper-2/50 p-6 text-sm text-muted-foreground">
            {t("No uploaded documents for this company.")}
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-paper-2 text-left">
                  <th className="px-4 py-2.5 font-semibold text-ink">{t("Filename")}</th>
                  <th className="px-4 py-2.5 font-semibold text-ink">{t("File Size")}</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {uploads.map((f, idx) => (
                  <tr key={f.name + idx} className="border-t border-line">
                    <td className="px-4 py-2.5">{f.name}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{formatKb(f.size)}</td>
                  </tr>
                ))}
                <tr className="border-t border-line bg-paper-2/60 font-semibold">
                  <td className="px-4 py-2.5">{t("Total files")}</td>
                  <td className="px-4 py-2.5">{uploads.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* AI summary */}
      <section className="brand-card p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Sparkles size={18} className="text-gold" />
          {t("AI-filled Tax Form Preview")}
        </h2>
        <div className="section-rule mt-2 mb-4" />
        <div className="rounded-lg border-l-2 border-gold bg-paper-2/50 px-5 py-4">
          <div className="mb-2 font-medium text-ink">
            {taxCountry.flag} {taxCountry.form}
          </div>
          {aiLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw size={14} className="animate-spin" />
              {t("AI is analyzing your files...")}
            </div>
          ) : aiSummary ? (
            <div className="text-sm leading-relaxed text-ink prose prose-sm max-w-none prose-p:my-1.5 prose-headings:font-serif prose-headings:text-ink prose-strong:text-ink prose-li:my-0.5 prose-ul:my-1.5">
              <ReactMarkdown>{aiSummary}</ReactMarkdown>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              {aiRequested
                ? "No summary available."
                : "Upload documents to generate an AI summary of your tax position."}
            </div>
          )}
          {uploads.length > 0 && !aiLoading && (
            <Button variant="outline" size="sm" className="mt-3" onClick={fetchSummary}>
              <RefreshCw size={13} className="mr-1.5" /> Regenerate summary
            </Button>
          )}
        </div>
      </section>
    </AppShell>
  );
};

export default TaxOverview;
