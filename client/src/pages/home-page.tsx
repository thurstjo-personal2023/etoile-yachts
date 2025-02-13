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
        {/* Hero Section */}
        <div className="relative h-screen lg:h-[600px] flex items-center justify-center text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/yacht-hero.jpg)',
              backgroundPosition: 'center 65%'
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative text-center px-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Etoile Yachts</h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Experience luxury water sports, integrated packages, and hybrid adventures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto min-w-[200px] bg-white text-primary hover:bg-gray-100"
                onClick={() => setLocation("/auth")}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto min-w-[200px] border-white text-white hover:bg-white/10"
                onClick={() => setLocation("/explore")}
              >
                Explore as Guest
              </Button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <main className="container mx-auto px-4 py-16">
          <div className="grid gap-16">
            {/* Featured Experience Packages */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold">Featured Experience Packages</h2>
                <p className="text-muted-foreground mt-2">
                  Discover our curated collection of luxury yacht experiences
                </p>
              </div>
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

            {/* Recommended Products */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold">Recommended Products</h2>
                <p className="text-muted-foreground mt-2">
                  Premium add-ons to enhance your yacht experience
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src="/diving.jpg" 
                      alt="Scuba diving experience"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Premium Water Activities</h3>
                    <p className="text-muted-foreground">Sign in to explore exclusive water sports and activities</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Special Promotions */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold">Special Promotions</h2>
                <p className="text-muted-foreground mt-2">
                  Exclusive offers and limited-time deals
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src="/pool.jpg" 
                      alt="Luxury pool"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Limited Time Offers</h3>
                    <p className="text-muted-foreground">Register to access exclusive deals and promotions</p>
                  </CardContent>
                </Card>
              </div>
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