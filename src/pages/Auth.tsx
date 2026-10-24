import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const trustPoints = [
  "Multi-country tax compliance in one workspace",
  "AI-assisted tax form preparation and review",
  "Invoice and receipt capture per legal entity",
];

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign in — Veritas Tax AI";
  }, []);

  // Auto redirect after successful login with a short delay
  useEffect(() => {
    if (successMsg === "Success! Redirecting...") {
      const timeout = setTimeout(() => {
        navigate("/", { replace: true });
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [successMsg, navigate]);

  const handleAuth = async (type: "login" | "signup") => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    if (!email || !password) {
      setErrorMsg("Enter email & password.");
      setLoading(false);
      return;
    }
    if (type === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message || "Error logging in");
      else setSuccessMsg("Success! Redirecting...");
    } else {
      const redirectUrl = window.location.origin + "/";
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {},
        },
      });
      if (error) setErrorMsg(error.message || "Error signing up");
      else setSuccessMsg("Check your email for a confirmation link!");
    }
    setLoading(false);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between bg-navy-deep p-12 text-paper lg:flex">
        <div className="flex items-center gap-3">
          <img src="/veritas-mark.png" alt="Veritas Global AI" className="h-12 w-12 object-contain" />
          <div>
            <div className="font-serif text-xl font-semibold leading-tight">Veritas Tax AI</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              Global Tax Compliance
            </div>
          </div>
        </div>

        <div>
          <h2 className="max-w-md text-4xl font-semibold leading-tight text-white">
            Intelligence, engineered for tax compliance.
          </h2>
          <div className="mt-8 space-y-3">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-start gap-3 text-sm text-white/80">
                <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-white/40">
          © {new Date().getFullYear()} Veritas Global AI. All rights reserved.
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-paper px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile brand */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <img src="/veritas-mark.png" alt="Veritas Global AI" className="h-10 w-10 object-contain" />
            <div>
              <div className="font-serif text-lg font-semibold leading-tight text-ink">
                Veritas Tax AI
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                Global Tax Compliance
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-ink">
            {view === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {view === "login"
              ? "Sign in to manage your company tax workspace."
              : "Set up your tax workspace in a few seconds."}
          </p>

          {/* Segmented control */}
          <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg border border-line bg-white p-1">
            {(["login", "signup"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setView(v);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  view === v ? "bg-navy text-paper" : "text-muted-foreground hover:text-ink"
                }`}
              >
                {v === "login" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleAuth(view);
            }}
          >
            <div>
              <label className="brand-eyebrow mb-1.5 block" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label className="brand-eyebrow mb-1.5 block" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete={view === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="mt-1">
              {loading
                ? view === "login"
                  ? "Signing in…"
                  : "Creating account…"
                : view === "login"
                  ? "Sign in"
                  : "Create account"}
            </Button>
            {errorMsg && (
              <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-center text-sm text-destructive">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="rounded-md border border-emerald/20 bg-emerald-bg px-3 py-2 text-center text-sm text-emerald">
                {successMsg}
              </div>
            )}
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            By continuing you agree to use Veritas Tax AI in line with your local tax regulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
