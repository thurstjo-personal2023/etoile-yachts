import { Home, Search, Calendar, User } from "lucide-react";
import { useLocation } from "wouter";

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  const items = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Explore", path: "/explore" },
    { icon: Calendar, label: "Bookings", path: "/bookings" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border lg:hidden">
      <div className="grid grid-cols-4">
        {items.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => setLocation(path)}
            className={`flex flex-col items-center py-2 ${
              location === path ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
