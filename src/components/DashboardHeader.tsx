import { useEffect } from "react";
import UserMenu from "./UserMenu";
import LanguageSelector from "./LanguageSelector";

interface DashboardHeaderProps {
  title: string;
  eyebrow?: string;
}

const DashboardHeader = ({ title, eyebrow = "Veritas Tax AI" }: DashboardHeaderProps) => {
  useEffect(() => {
    document.title = `${title} — Veritas Tax AI`;
  }, [title]);

  return (
    <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center gap-4 border-b border-line bg-paper/95 px-6 backdrop-blur md:px-10">
      <div className="min-w-0">
        <div className="brand-eyebrow leading-tight">{eyebrow}</div>
        <h1 className="truncate text-[26px] font-semibold leading-tight">{title}</h1>
      </div>
      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <LanguageSelector />
        <UserMenu />
      </div>
    </header>
  );
};

export default DashboardHeader;
