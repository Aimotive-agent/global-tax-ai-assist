import { type ReactNode, useState } from "react";
import SidebarNav from "./SidebarNav";
import DashboardHeader from "./DashboardHeader";
import CreateCompanyModal from "./CreateCompanyModal";
import { useAppState } from "./AppStateContext";

interface AppShellProps {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}

const AppShell = ({ title, eyebrow, children }: AppShellProps) => {
  const { setCompanies, setSelectedCompany } = useAppState();
  const [showCreateCompany, setShowCreateCompany] = useState(false);

  const handleCreateCompany = (name: string) => {
    const newCompany = { id: `${Date.now()}`, name };
    setCompanies((prev) => [...prev, newCompany]);
    setSelectedCompany(newCompany.id);
    setShowCreateCompany(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav onAddCompany={() => setShowCreateCompany(true)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader title={title} eyebrow={eyebrow} />
        <main className="flex-1 px-6 py-8 md:px-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
        <footer className="border-t border-line px-6 py-5 md:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Veritas Global AI. All rights reserved.</span>
            <span className="text-muted-foreground/70">
              Intelligence, engineered for the enterprise.
            </span>
          </div>
        </footer>
      </div>
      <CreateCompanyModal
        open={showCreateCompany}
        onClose={() => setShowCreateCompany(false)}
        onCreate={handleCreateCompany}
      />
    </div>
  );
};

export default AppShell;
