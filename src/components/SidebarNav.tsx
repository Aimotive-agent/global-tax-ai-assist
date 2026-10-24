import { Building2, FilePlus2, Receipt, Globe2, Bot, Settings, LayoutDashboard, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppState } from "./AppStateContext";

const navSections = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Tax Overview", icon: Globe2, to: "/tax-overview" },
  { label: "Tax AI Assistant", icon: Bot, to: "/tax-ai" },
  { label: "Invoices & Receipts", icon: Receipt, to: "/invoices" },
  { label: "Tax Forms", icon: FilePlus2, to: "/tax-forms" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

interface SidebarNavProps {
  onAddCompany: () => void;
}

const SidebarNav = ({ onAddCompany }: SidebarNavProps) => {
  const { companies, selectedCompany, setSelectedCompany } = useAppState();
  const location = useLocation();

  return (
    <nav className="sticky top-0 flex h-screen w-[264px] shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand lockup */}
      <Link to="/" className="flex items-center gap-3 px-5 pb-5 pt-6">
        <img
          src="/veritas-mark.png"
          alt="Veritas Global AI"
          className="h-11 w-11 shrink-0 object-contain"
        />
        <span className="min-w-0">
          <span className="block font-serif text-[17px] font-semibold leading-tight text-white">
            Veritas Tax AI
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
            Global Tax Compliance
          </span>
        </span>
      </Link>

      <div className="mx-4 h-px bg-white/10" />

      {/* Companies */}
      <div className="px-4 pt-5">
        <div className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
          Your Companies
        </div>
        <ul className="space-y-0.5">
          {companies.length === 0 && (
            <li className="px-3 py-2 text-xs text-white/40">
              No companies yet.
            </li>
          )}
          {companies.map((company) => {
            const active = selectedCompany === company.id;
            return (
              <li key={company.id}>
                <button
                  onClick={() => setSelectedCompany(company.id)}
                  className={`flex w-full items-center gap-2.5 rounded-md border-l-2 py-2 pl-3 pr-2 text-left text-sm transition ${
                    active
                      ? "border-gold bg-white/10 text-white"
                      : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Building2 size={16} className={active ? "text-gold" : "opacity-70"} />
                  <span className="truncate">{company.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <button
          onClick={onAddCompany}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold transition hover:bg-gold/10"
        >
          <Plus size={14} /> Add Company
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-6 px-4">
        <div className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
          Navigation
        </div>
        <ul className="space-y-0.5">
          {navSections.map((sec) => {
            const active = location.pathname === sec.to;
            return (
              <li key={sec.to}>
                <Link
                  to={sec.to}
                  className={`flex items-center gap-2.5 rounded-md border-l-2 py-2 pl-3 pr-2 text-sm transition ${
                    active
                      ? "border-gold bg-white/10 font-semibold text-white"
                      : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <sec.icon size={16} className={active ? "text-gold" : "opacity-70"} />
                  <span>{sec.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-white/10 px-5 py-4">
        <div className="text-[11px] leading-relaxed text-white/40">
          © {new Date().getFullYear()} Veritas Global AI
          <span className="mt-0.5 block text-white/30">
            Intelligence, engineered for the enterprise.
          </span>
        </div>
      </div>
    </nav>
  );
};

export default SidebarNav;
