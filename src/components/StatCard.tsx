import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
}

const StatCard = ({ icon: Icon, label, value, hint }: StatCardProps) => (
  <div className="brand-card p-5">
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy/[0.06] text-navy">
        <Icon size={18} />
      </span>
      <span className="brand-eyebrow">{label}</span>
    </div>
    <div className="mt-3 font-serif text-3xl font-semibold leading-none text-navy tracking-[-0.03em]">
      {value}
    </div>
    {hint && <div className="mt-2 text-xs text-muted-foreground truncate">{hint}</div>}
  </div>
);

export default StatCard;
