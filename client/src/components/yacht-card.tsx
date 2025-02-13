import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Yacht } from "@shared/schema";

export default function YachtCard({ yacht }: { yacht: Yacht }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={yacht.images[0]} 
          alt={yacht.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{yacht.name}</span>
          <span className="text-primary">${yacht.pricePerDay}/day</span>
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
          <Button>Book Now</Button>
        </div>
      </CardContent>
    </Card>
  );
}
