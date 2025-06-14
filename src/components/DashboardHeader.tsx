
import { BarChart3 } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="px-8 py-6 border-b bg-white/70 backdrop-blur flex items-center gap-3 shadow-sm h-[80px]">
      <span className="flex items-center gap-2">
        <BarChart3 size={32} className="text-primary" />
        <span className="text-2xl font-extrabold tracking-tight select-none">AI TAX Assistant</span>
      </span>
      <span className="ml-auto text-sm text-muted-foreground hidden md:block">
        Smarter tax. Less work. Handle compliance for every country.
      </span>
    </header>
  );
};
export default DashboardHeader;
