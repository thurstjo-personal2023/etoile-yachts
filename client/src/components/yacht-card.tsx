import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Yacht } from "@shared/schema";
import { useLocation } from "wouter";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function YachtCard({ yacht, isGuest }: { yacht: Yacht; isGuest?: boolean }) {
  const [, setLocation] = useLocation();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Create the full URL path for the image
  const imageUrl = !imageError 
    ? `${window.location.origin}${yacht.images[0]}` 
    : `${window.location.origin}/yachts/placeholder.jpg`;

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="aspect-video relative bg-muted">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <img 
          src={imageUrl} 
          alt={`${yacht.name} yacht`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onError={(e) => {
            console.error(`Failed to load image: ${imageUrl}`);
            setImageError(true);
            setImageLoading(false);
          }}
          onLoad={() => {
            console.log(`Successfully loaded image: ${imageUrl}`);
            setImageLoading(false);
          }}
        />
      </div>
      <CardHeader className="space-y-2">
        <CardTitle className="flex justify-between items-start">
          <span className="text-xl">{yacht.name}</span>
          <span className="text-primary font-bold">${yacht.pricePerDay.toLocaleString()}/day</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-2">{yacht.description}</p>
        <div className="flex flex-wrap gap-2">
          {yacht.features.slice(0, 3).map((feature, i) => (
            <span 
              key={i}
              className="bg-accent/50 text-accent-foreground px-2 py-1 rounded-full text-xs"
            >
              {feature}
            </span>
          ))}
          {yacht.features.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{yacht.features.length - 3} more
            </span>
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
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