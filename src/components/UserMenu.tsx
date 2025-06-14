
import { useUserSession } from "@/hooks/useUserSession";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const UserMenu = () => {
  const { user } = useUserSession();
  const navigate = useNavigate();

  if (!user) return null;

  const initials = user.email?.slice(0, 2).toUpperCase() || "US";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
      </Avatar>
      <span className="font-medium text-base max-w-[120px] truncate">{user.email}</span>
      <Button size="sm" variant="secondary" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default UserMenu;
