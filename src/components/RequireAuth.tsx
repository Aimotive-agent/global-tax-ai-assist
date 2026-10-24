import { useUserSession } from "@/hooks/useUserSession";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, checking } = useUserSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checking && !user) {
      navigate("/auth", { replace: true });
    }
    // eslint-disable-next-line
  }, [checking, user]);

  if (checking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper">
        <img src="/veritas-mark.png" alt="" className="h-12 w-12 animate-pulse object-contain" />
        <div className="font-serif text-lg text-navy">Loading Veritas Tax AI…</div>
      </div>
    );
  }
  return <>{children}</>;
};

export default RequireAuth;
