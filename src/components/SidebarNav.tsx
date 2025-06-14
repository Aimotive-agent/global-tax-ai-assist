
import {
  Building2,
  FilePlus2,
  Receipt,
  Globe2,
  Bot,
  Settings
} from "lucide-react";

interface NavProps {
  companies: { id: string, name: string }[];
  selectedCompany: string | null;
  onSelectCompany: (id: string) => void;
  onAddCompany: () => void;
}

const navSections = [
  { label: "Tax AI", icon: Bot },
  { label: "Invoices / Receipts", icon: Receipt },
  { label: "Tax Forms", icon: FilePlus2 },
  { label: "Settings", icon: Settings }
];

const SidebarNav = ({ companies, selectedCompany, onSelectCompany, onAddCompany }: NavProps) => (
  <nav className="h-screen w-[245px] shrink-0 border-r bg-sidebar-DEFAULT px-4 py-8 flex flex-col justify-between sticky top-0">
    <div>
      <div className="mb-8">
        <div className="text-sm font-bold text-sidebar-foreground/80 mb-2 tracking-widest">YOUR COMPANIES</div>
        <ul className="space-y-1">
          {companies.length === 0 && (
            <li>
              <span className="block text-xs text-muted-foreground/70 py-2 px-3">No companies yet</span>
            </li>
          )}
          {companies.map(company => (
            <li key={company.id}>
              <button
                className={`group flex items-center gap-2 py-2 px-3 w-full rounded hover:bg-primary/10 hover:text-primary text-sm font-medium transition ${
                  selectedCompany === company.id
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground"
                }`}
                onClick={() => onSelectCompany(company.id)}
              >
                <Building2 size={18} className="shrink-0" />
                <span className="truncate">{company.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onAddCompany}
          className="mt-3 flex items-center gap-1 px-3 py-2 bg-sidebar-accent text-sidebar-accent-foreground rounded hover:bg-primary/5 transition text-xs font-semibold"
        >
          <Building2 size={16} /> Add Company
        </button>
      </div>
      <hr className="my-6 border-sidebar-border" />
      <div className="text-xs text-sidebar-foreground/70 mb-3 font-semibold px-2">NAVIGATION</div>
      <ul className="space-y-1">
        {navSections.map(sec => (
          <li key={sec.label}>
            <button
              className="flex gap-2 items-center py-1.5 px-3 rounded text-sm hover:bg-primary/10 focus:bg-primary/10 group transition text-sidebar-foreground"
              disabled
            >
              <sec.icon size={18} className="opacity-70" />
              <span>{sec.label}</span>
              <span className="text-[10px] opacity-40 ml-auto">soon</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
    <div className="text-xs text-sidebar-foreground/50 text-center py-4">ⓒ {new Date().getFullYear()} AI TAX Assistant</div>
  </nav>
);

export default SidebarNav;
