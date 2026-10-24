import { FileCheck2, Sparkles, ExternalLink } from "lucide-react";
import { getCountry } from "@/lib/taxData";
import type { DocFile } from "@/components/AppStateContext";

interface Props {
  company?: { id: string; name: string };
  files: DocFile[];
  country: string;
}

const TaxFormPreview = ({ company, files, country }: Props) => {
  const taxCountry = getCountry(country);

  if (!company) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-paper-2/50 p-6 text-sm text-muted-foreground">
        Select a company to view AI tax analysis and the applicable tax form.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-paper-2/50 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 size={19} className="text-navy" />
            <span className="font-semibold text-ink">
              {taxCountry.flag} {taxCountry.form}
            </span>
          </div>
          <div className="mt-1.5 text-xs text-muted-foreground">
            {files.length === 0
              ? "Upload invoices and receipts to run AI analysis for deductions and compliance."
              : `${files.length} document${files.length === 1 ? "" : "s"} captured for ${company.name} — ready for AI analysis.`}
          </div>
        </div>
        <a
          href={taxCountry.authorityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-3 py-1.5 text-xs font-medium text-navy transition hover:border-navy/30"
        >
          {taxCountry.authority} official forms
          <ExternalLink size={12} />
        </a>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-lg border-l-2 border-gold bg-white px-4 py-3">
        <Sparkles size={16} className="mt-0.5 shrink-0 text-gold" />
        <div className="text-sm">
          <div className="font-medium text-ink">
            AI tax analysis and automatic form filling will appear here.
          </div>
          <div className="mt-1 text-muted-foreground">
            Coming soon: automatic deduction detection, payable calculation and claimable expenses
            per company and jurisdiction.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxFormPreview;
