
interface CompanyListProps {
  companies: { id: string, name: string }[];
  selectedCompany: string | null;
  onSelect: (id: string) => void;
}

const CompanyList = ({ companies, selectedCompany, onSelect }: CompanyListProps) => (
  <ul className="divide-y">
    {companies.length === 0 && (
      <li className="p-4 text-muted-foreground text-center">
        No companies yet. Click "Add Company" to get started.
      </li>
    )}
    {companies.map(company => (
      <li
        key={company.id}
        className={`p-3 cursor-pointer rounded transition group ${
          selectedCompany === company.id
            ? "bg-primary/10 border-l-4 border-primary"
            : "hover:bg-muted/20"
        }`}
        onClick={() => onSelect(company.id)}
      >
        <div className="font-medium">{company.name}</div>
      </li>
    ))}
  </ul>
);

export default CompanyList;
