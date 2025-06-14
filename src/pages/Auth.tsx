
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background =
      "linear-gradient(135deg, #a0e7e5 0%, #b4aee8 50%, #fbc2eb 100%)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  // Auto redirect after successful login with a short delay
  useEffect(() => {
    if (successMsg === "Success! Redirecting...") {
      const timeout = setTimeout(() => {
        navigate("/", { replace: true });
      }, 1200); // 1200ms = 1.2s to let user see the success message
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
          data: {} // Could pass meta fields like username/avatar
        }
      });
      if (error) setErrorMsg(error.message || "Error signing up");
      else setSuccessMsg("Check your email for a confirmation link!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="rounded-2xl bg-white/80 shadow-xl p-8 w-full max-w-sm flex flex-col gap-6 backdrop-blur border-2 border-primary/20">
        <h2 className="text-2xl font-bold text-center text-primary">
          {view === "login" ? "Welcome back" : "Create an account"}
        </h2>
        <div className="flex gap-2">
          <Button
            variant={view === "login" ? "default" : "outline"}
            className="w-1/2"
            onClick={() => setView("login")}
          >
            Login
          </Button>
          <Button
            variant={view === "signup" ? "default" : "outline"}
            className="w-1/2"
            onClick={() => setView("signup")}
          >
            Sign Up
          </Button>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={e => {
            e.preventDefault();
            handleAuth(view);
          }}
        >
          <Input
            type="email"
            placeholder="Email"
            className="bg-muted"
            autoFocus
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            className="bg-muted"
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading} size="lg">
            {loading ? (view === "login" ? "Logging in..." : "Signing up...") : (view === "login" ? "Login" : "Sign Up")}
          </Button>
          {errorMsg && <div className="text-destructive text-center text-sm mt-2">{errorMsg}</div>}
          {successMsg && <div className="text-green-700 text-center text-sm mt-2">{successMsg}</div>}
        </form>
      </div>
    </div>
  );
};
export default Auth;
