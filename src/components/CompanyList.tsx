import { Building2, Plus } from "lucide-react";

interface CompanyListProps {
  companies: { id: string; name: string }[];
  selectedCompany: string | null;
  onSelect: (id: string) => void;
  onAddCompany?: () => void;
}

const CompanyList = ({ companies, selectedCompany, onSelect, onAddCompany }: CompanyListProps) => (
  <div>
    <ul className="divide-y overflow-hidden rounded-lg border border-line">
      {companies.length === 0 && (
        <li className="p-6 text-center text-sm text-muted-foreground">
          No companies yet.
          {onAddCompany ? "" : " Use “Add Company” to get started."}
        </li>
      )}
      {companies.map((company) => {
        const active = selectedCompany === company.id;
        return (
          <li
            key={company.id}
            className={`flex cursor-pointer items-center gap-3 px-4 py-3 text-sm transition ${
              active
                ? "border-l-2 border-gold bg-navy/[0.04]"
                : "border-l-2 border-transparent hover:bg-paper-2/70"
            }`}
            onClick={() => onSelect(company.id)}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                active ? "bg-navy text-paper" : "bg-paper-2 text-navy/70"
              }`}
            >
              <Building2 size={15} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-ink">{company.name}</span>
              <span className="block text-xs text-muted-foreground">
                {active ? "Selected company" : "Select to work with this company"}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
    {onAddCompany && (
      <button
        onClick={onAddCompany}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-navy/20 px-3 py-2 text-sm font-medium text-navy transition hover:bg-navy/[0.04]"
      >
        <Plus size={15} /> Add Company
      </button>
    )}
  </div>
);

export default CompanyList;
