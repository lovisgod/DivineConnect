import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import type { Devotion } from "@shared/schema";

interface DevotionCardProps {
  devotion: Devotion;
  onRead: (devotion: Devotion) => void;
}

export default function DevotionCard({ devotion, onRead }: DevotionCardProps) {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow"
      data-testid={`card-devotion-${devotion.id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-accent/20 p-2 rounded-lg">
            <BookOpen className="text-accent h-5 w-5" />
          </div>
          <div>
            <h3 
              className="text-xl font-semibold text-foreground"
              data-testid={`text-devotion-title-${devotion.id}`}
            >
              {devotion.title}
            </h3>
            <p 
              className="text-muted-foreground text-sm"
              data-testid={`text-devotion-date-${devotion.id}`}
            >
              {new Date(devotion.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        <div className="bg-primary/10 border-l-4 border-primary p-4 mb-4">
          <p 
            className="text-primary font-medium italic text-sm"
            data-testid={`text-devotion-verse-${devotion.id}`}
          >
            "{devotion.verse}"
          </p>
          <p 
            className="text-muted-foreground text-xs mt-2"
            data-testid={`text-devotion-reference-${devotion.id}`}
          >
            - {devotion.reference}
          </p>
        </div>

        <p 
          className="text-muted-foreground leading-relaxed mb-4 line-clamp-3"
          data-testid={`text-devotion-content-${devotion.id}`}
        >
          {devotion.content}
        </p>

        <Button
          onClick={() => onRead(devotion)}
          variant="outline"
          className="w-full"
          data-testid={`button-read-devotion-${devotion.id}`}
        >
          Read Full Devotion
        </Button>
      </CardContent>
    </Card>
  );
}
