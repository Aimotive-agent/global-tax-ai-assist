
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
      <div className="w-full min-h-screen flex items-center justify-center text-xl text-primary">
        Loading...
      </div>
    );
  }
  return <>{children}</>;
};

export default RequireAuth;
