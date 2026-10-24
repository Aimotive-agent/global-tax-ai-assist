import { useTranslation } from "react-i18next";
import { Globe2, Info, LogOut, UserRound } from "lucide-react";
import AppShell from "@/components/AppShell";
import LanguageSelector from "@/components/LanguageSelector";
import { useUserSession } from "@/hooks/useUserSession";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { user } = useUserSession();
  const navigate = useNavigate();

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    toast({
      title: t("Language changed!"),
      description: `${t("App language set to")} ${code}`,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <AppShell title="Settings" eyebrow="Account">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile */}
        <section className="brand-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <UserRound size={18} className="text-navy" />
            {t("Profile")}
          </h2>
          <div className="section-rule mt-2 mb-5" />
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy font-semibold text-paper">
              {user?.email?.slice(0, 2).toUpperCase() || "US"}
            </span>
            <div className="min-w-0">
              <div className="truncate font-medium text-ink">{user?.email}</div>
              <div className="text-xs text-muted-foreground">
                {user?.created_at
                  ? `Member since ${new Date(user.created_at).toLocaleDateString()}`
                  : "Signed in"}
              </div>
            </div>
          </div>
          <Button variant="outline" className="mt-5 text-destructive hover:text-destructive" onClick={handleLogout}>
            <LogOut size={15} className="mr-1.5" /> {t("Log out")}
          </Button>
        </section>

        {/* Language */}
        <section className="brand-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Globe2 size={18} className="text-navy" />
            {t("Language")}
          </h2>
          <div className="section-rule mt-2 mb-5" />
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </section>

        {/* About */}
        <section className="brand-card p-6 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Info size={18} className="text-navy" />
            {t("About")}
          </h2>
          <div className="section-rule mt-2 mb-5" />
          <div className="flex flex-wrap items-center gap-6">
            <img src="/veritas-mark.png" alt="Veritas Global AI" className="h-14 w-14 object-contain" />
            <div className="min-w-0 flex-1">
              <div className="font-serif text-xl font-semibold text-ink">Veritas Tax AI</div>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Multi-country tax compliance, invoice capture and AI-assisted tax form preparation.
                Built by Veritas Global AI — intelligence, engineered for the enterprise.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-line px-2.5 py-1 text-xs text-muted-foreground">
                  Version 1.0.0
                </span>
                <span className="rounded-full border border-line px-2.5 py-1 text-xs text-muted-foreground">
                  {t("More settings coming soon!")}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
};

export default Settings;
