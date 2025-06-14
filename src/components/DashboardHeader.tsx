import { BarChart3 } from "lucide-react";
import UserMenu from "./UserMenu";
import LanguageSelector from "./LanguageSelector";

const DashboardHeader = () => {
  return (
    <header className="px-8 py-6 border-b bg-gradient-to-r from-[#6a82fb]/80 to-[#fc5c7d]/80 backdrop-blur flex items-center gap-3 shadow-md h-[80px]">
      <span className="flex items-center gap-2">
        <BarChart3 size={32} className="text-primary drop-shadow" />
        <span className="text-2xl font-extrabold tracking-tight select-none bg-gradient-to-r from-[#fc5c7d] via-[#6a82fb] to-[#fbc2eb] bg-clip-text text-transparent">AI TAX Assistant</span>
      </span>
      <span className="ml-auto text-sm text-muted-foreground hidden md:block font-medium italic">
        Smarter tax. Less work. Handle compliance for every country.
      </span>
      <div className="ml-6 flex items-center gap-2">
        <UserMenu />
        <div className="hidden md:block">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
