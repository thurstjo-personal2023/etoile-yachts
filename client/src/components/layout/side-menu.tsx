import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export default function SideMenu() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SideMenuContent />
        </SheetContent>
      </Sheet>

      <div className="hidden lg:flex fixed top-0 left-0 bottom-0 w-72 border-r border-border bg-card p-4">
        <SideMenuContent />
      </div>
    </>
  );
}

function SideMenuContent() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-8">Etoile Yachts</h2>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => setLocation("/")}>
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setLocation("/explore")}>
            Explore
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setLocation("/bookings")}>
            Bookings
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setLocation("/profile")}>
            Profile
          </Button>
        </nav>
      </div>
      
      <div className="border-t border-border pt-4">
        <div className="mb-4">
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.role}</p>
        </div>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
