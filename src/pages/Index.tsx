import AppShell from "@/components/AppShell";
import CompanyList from "@/components/CompanyList";
import FileUploader from "@/components/FileUploader";
import CountrySelector from "@/components/CountrySelector";
import TaxFormPreview from "@/components/TaxFormPreview";
import StatCard from "@/components/StatCard";
import { useAppState } from "@/components/AppStateContext";
import { getCountry } from "@/lib/taxData";
import { Building2, FileText, Globe2, Sparkles, Bot, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const {
    companies,
    selectedCompany,
    setSelectedCompany,
    uploadedFiles,
    setUploadedFiles,
    selectedCountry,
    setSelectedCountry,
  } = useAppState();

  const selectedCompanyObj = companies.find((c) => c.id === selectedCompany);
  const companyFiles = selectedCompany ? uploadedFiles[selectedCompany] || [] : [];
  const totalFiles = Object.values(uploadedFiles).reduce((n, files) => n + files.length, 0);
  const country = getCountry(selectedCountry);

  const handleFileUpload = (files: File[]) => {
    if (!selectedCompany) return;
    const docs = files.map((f) => ({ name: f.name, size: f.size, type: f.type }));
    setUploadedFiles((prev) => ({
      ...prev,
      [selectedCompany]: [...(prev[selectedCompany] || []), ...docs],
    }));
  };

  const handleFileRemove = (index: number) => {
    if (!selectedCompany) return;
    setUploadedFiles((prev) => ({
      ...prev,
      [selectedCompany]: (prev[selectedCompany] || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <AppShell title="Dashboard" eyebrow="Overview">
      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Building2}
          label="Companies"
          value={companies.length}
          hint={selectedCompanyObj ? `Active: ${selectedCompanyObj.name}` : "No company selected"}
        />
        <StatCard
          icon={FileText}
          label="Documents"
          value={totalFiles}
          hint="Invoices & receipts captured"
        />
        <StatCard
          icon={Globe2}
          label="Jurisdiction"
          value={`${country.flag} ${country.code}`}
          hint={country.name}
        />
        <StatCard
          icon={Sparkles}
          label="AI analysis"
          value={totalFiles > 0 ? "Ready" : "Pending"}
          hint={totalFiles > 0 ? "Documents ready for review" : "Upload documents to begin"}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Companies */}
        <section className="brand-card p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Companies</h2>
            <div className="section-rule mt-2" />
          </div>
          <CompanyList
            companies={companies}
            selectedCompany={selectedCompany}
            onSelect={setSelectedCompany}
          />
        </section>

        {/* Uploads */}
        <section className="brand-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Upload invoices &amp; receipts</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedCompanyObj
                  ? `Adding documents for ${selectedCompanyObj.name}`
                  : "Select a company to upload documents."}
              </p>
            </div>
            <Link
              to="/tax-ai"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-navy/20 px-3 py-2 text-sm font-medium text-navy transition hover:bg-navy/[0.04]"
            >
              <Bot size={15} /> Ask Tax AI
            </Link>
          </div>
          {selectedCompany ? (
            <FileUploader
              files={companyFiles}
              onUpload={handleFileUpload}
              onRemove={handleFileRemove}
            />
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-paper-2/50 p-8 text-center text-sm text-muted-foreground">
              Select a company on the left to upload documents.
            </div>
          )}
        </section>

        {/* Tax AI preview */}
        <section className="brand-card p-6 lg:col-span-3">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Tax AI Assistant</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Automatically check what you can claim and generate country-specific tax forms.
              </p>
            </div>
            <CountrySelector selected={selectedCountry} onSelect={setSelectedCountry} />
          </div>
          <TaxFormPreview
            company={selectedCompanyObj}
            files={companyFiles}
            country={selectedCountry}
          />
          <Link
            to="/tax-overview"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-navy-deep"
          >
            Open full tax overview <ArrowRight size={15} />
          </Link>
        </section>
      </div>
    </AppShell>
  );
};

export default Index;
