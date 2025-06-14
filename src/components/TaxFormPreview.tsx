
import { FileText } from "lucide-react";

interface Props {
  company?: { id: string; name: string };
  files: File[];
  country: string;
}

const formByCountry: Record<string, string> = {
  US: "IRS Form 1120 (Corporate Tax Return)",
  GB: "UK CT600 Corporation Tax Return",
  AU: "ATO Company Tax Return",
  CA: "T2 Corporation Income Tax Return",
  DE: "USt 1 A (Value Added Tax Form)",
  IN: "ITR-6 (Company Income Tax Return)",
  // ...add more as needed
};

const TaxFormPreview = ({ company, files, country }: Props) => (
  <div>
    {!company ? (
      <div className="text-muted-foreground text-sm">
        Select a company above to view AI tax analysis and forms.
      </div>
    ) : (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText size={20} className="text-primary" />
          <span className="font-semibold">{formByCountry[country] || "Tax Form"}</span>
        </div>
        <div className="text-xs mb-3 text-muted-foreground">
          {files.length === 0 ? "Upload invoices/receipts to run AI analysis for tax savings and compliance" 
          : `${files.length} files uploaded — AI Assistant in progress!`}
        </div>
        <div className="rounded bg-primary/5 p-4 text-sm text-primary font-semibold animate-pulse">
          AI tax analysis and automatic filling of this tax form will show here.
          <br />
          <span className="font-normal text-muted-foreground">Coming soon: Automatic deductions, payable calculation, and claimable expenses by company & country.</span>
        </div>
      </div>
    )}
  </div>
);

export default TaxFormPreview;
