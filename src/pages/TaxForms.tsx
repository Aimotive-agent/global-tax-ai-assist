import { useTranslation } from "react-i18next";
import { ExternalLink, FileCheck2, Clock } from "lucide-react";
import AppShell from "@/components/AppShell";
import { countries } from "@/lib/taxData";

const TaxForms = () => {
  const { t } = useTranslation();

  return (
    <AppShell title="Tax Forms" eyebrow="Form library">
      <div className="mb-6 max-w-2xl">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Headline filing form for every jurisdiction Veritas Tax AI supports. Templates and
          AI-prepared filings are on the way — until then, each card links to the official source.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {countries.map((c) => (
          <div key={c.code} className="brand-card flex flex-col p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/[0.06] text-xl">
                {c.flag}
              </span>
              <div>
                <div className="font-semibold text-ink">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.authority}</div>
              </div>
            </div>
            <div className="mt-4 flex-1">
              <div className="flex items-start gap-2 text-sm">
                <FileCheck2 size={16} className="mt-0.5 shrink-0 text-navy" />
                <span className="text-ink">{c.form}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={c.authorityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-navy/20 px-3 py-2 text-sm font-medium text-navy transition hover:bg-navy/[0.04]"
              >
                Official source <ExternalLink size={12} />
              </a>
              <span
                className="inline-flex items-center gap-1.5 rounded-md bg-paper-2 px-3 py-2 text-xs text-muted-foreground"
                title="Prepared templates are coming soon"
              >
                <Clock size={12} /> {t("Template soon")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
};

export default TaxForms;
