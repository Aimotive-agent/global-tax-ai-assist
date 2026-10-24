import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { useUserSession } from "@/hooks/useUserSession";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 px-2 py-1.5 hover:bg-secondary">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-navy text-xs font-semibold text-paper">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[180px] truncate text-sm font-medium md:block">
            {user.email}
          </span>
          <ChevronDown size={14} className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex items-center gap-2 font-normal">
          <UserRound size={15} className="text-muted-foreground" />
          <span className="truncate text-sm">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
          <LogOut size={15} className="mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
