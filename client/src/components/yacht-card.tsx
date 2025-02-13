import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Yacht } from "@shared/schema";
import { useLocation } from "wouter";

export default function YachtCard({ yacht, isGuest }: { yacht: Yacht; isGuest?: boolean }) {
  const [, setLocation] = useLocation();

  const imageUrl = yacht.images[0] || 'yachts/placeholder.jpg';

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/9] relative bg-muted">
        <img 
          src={imageUrl} 
          alt={yacht.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'yachts/placeholder.jpg';
          }}
        />
      </div>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{yacht.name}</span>
          <span className="text-primary">${yacht.pricePerDay.toLocaleString()}/day</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{yacht.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {yacht.features.map((feature, i) => (
            <span 
              key={i}
              className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-sm"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Capacity: {yacht.capacity} people
          </span>
          {isGuest ? (
            <Button variant="outline" onClick={() => setLocation("/auth")}>
              Sign in to Book
            </Button>
          ) : (
            <Button onClick={() => setLocation(`/yachts/${yacht.id}/book`)}>
              Book Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}