import { useAuth } from "@/hooks/use-auth";
import BottomNav from "@/components/layout/bottom-nav";
import SideMenu from "@/components/layout/side-menu";
import YachtCard from "@/components/yacht-card";
import { useQuery } from "@tanstack/react-query";
import { Yacht } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();
  const { data: yachts, isLoading } = useQuery<Yacht[]>({ 
    queryKey: ["/api/yachts"]
  });

  return (
    <div className="min-h-screen bg-background">
      <SideMenu />
      <main className="pb-16 lg:pl-72">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>
          
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yachts?.map((yacht) => (
                <YachtCard key={yacht.id} yacht={yacht} />
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
