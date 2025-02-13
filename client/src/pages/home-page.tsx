import { useAuth } from "@/hooks/use-auth";
import BottomNav from "@/components/layout/bottom-nav";
import SideMenu from "@/components/layout/side-menu";
import YachtCard from "@/components/yacht-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Yacht } from "@shared/schema";
import { Loader2, Gift, Calendar, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export default function HomePage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { data: yachts, isLoading } = useQuery<Yacht[]>({ 
    queryKey: ["/api/yachts"]
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto p-4 pb-16">
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to Etoile Yachts</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover luxury water sports, integrated packages, and hybrid adventures
            </p>
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full max-w-md" 
                onClick={() => setLocation("/auth")}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full max-w-md"
                onClick={() => setLocation("/explore")}
              >
                Explore as Guest
              </Button>
            </div>
          </div>

          <div className="grid gap-6 mt-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                Featured Experiences
              </h2>
              {isLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yachts?.slice(0, 3).map((yacht) => (
                    <YachtCard key={yacht.id} yacht={yacht} isGuest />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Gift className="h-6 w-6" />
                Special Offers
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Sign up to view our exclusive promotions and special offers!
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Upcoming Events
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Create an account to stay updated with our latest events and activities!
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SideMenu />
      <main className="pb-16 lg:pl-72">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name}</h1>

          <div className="grid gap-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                Featured Experiences
              </h2>
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
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Gift className="h-6 w-6" />
                Promotions & Offers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.role === 'consumer' && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Loyalty Rewards</h3>
                      <p className="text-muted-foreground">
                        You have {user.loyaltyPoints} points available
                      </p>
                      <Button className="mt-4" variant="outline">View Rewards</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Upcoming Events
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">No upcoming events</p>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}