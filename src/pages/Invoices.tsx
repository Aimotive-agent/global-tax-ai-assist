import { useTranslation } from "react-i18next";
import { FileText, Inbox } from "lucide-react";
import AppShell from "@/components/AppShell";
import FileUploader from "@/components/FileUploader";
import { useAppState } from "@/components/AppStateContext";
import { formatKb } from "@/lib/taxData";

const Invoices = () => {
  const { t } = useTranslation();
  const {
    companies,
    selectedCompany,
    setSelectedCompany,
    uploadedFiles,
    setUploadedFiles,
  } = useAppState();

  const company = companies.find((c) => c.id === selectedCompany);
  const files = selectedCompany ? uploadedFiles[selectedCompany] || [] : [];

  const handleUpload = (newFiles: File[]) => {
    if (!selectedCompany) return;
    const docs = newFiles.map((f) => ({ name: f.name, size: f.size, type: f.type }));
    setUploadedFiles((prev) => ({
      ...prev,
      [selectedCompany]: [...(prev[selectedCompany] || []), ...docs],
    }));
  };

  const handleRemove = (index: number) => {
    if (!selectedCompany) return;
    setUploadedFiles((prev) => ({
      ...prev,
      [selectedCompany]: (prev[selectedCompany] || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <AppShell title="Invoices & Receipts" eyebrow="Document capture">
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="brand-card p-6 lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              {company ? `Documents for ${company.name}` : t("Invoices & Receipts")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Every invoice and receipt you upload is matched to its company and feeds the AI tax
              analysis.
            </p>
            <div className="section-rule mt-2" />
          </div>

          {company ? (
            <FileUploader files={files} onUpload={handleUpload} onRemove={handleRemove} />
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-paper-2/50 p-10 text-center">
              <Inbox size={26} className="mx-auto mb-3 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                Select a company to manage its invoices and receipts.
              </div>
            </div>
          )}
        </section>

        <section className="brand-card p-6">
          <h2 className="text-lg font-semibold">{t("Company")}</h2>
          <div className="section-rule mt-2 mb-4" />
          <ul className="space-y-1">
            {companies.length === 0 && (
              <li className="rounded-lg border border-dashed border-line bg-paper-2/50 p-4 text-center text-sm text-muted-foreground">
                No companies yet. Add one from the sidebar.
              </li>
            )}
            {companies.map((c) => {
              const count = uploadedFiles[c.id]?.length || 0;
              const active = c.id === selectedCompany;
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setSelectedCompany(c.id)}
                    className={`flex w-full items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-left text-sm transition ${
                      active
                        ? "border-gold bg-navy/[0.04]"
                        : "border-transparent hover:bg-paper-2/70"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        active ? "bg-navy text-paper" : "bg-paper-2 text-navy/70"
                      }`}
                    >
                      <FileText size={15} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-ink">{c.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {count} document{count === 1 ? "" : "s"}
                        {count > 0 && ` · ${formatKb(uploadedFiles[c.id].reduce((s, f) => s + f.size, 0))}`}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </AppShell>
  );
};

export default Invoices;
