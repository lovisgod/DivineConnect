import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock } from "lucide-react";
import type { Sermon } from "@shared/schema";

interface SermonCardProps {
  sermon: Sermon;
  onPlay: (sermon: Sermon) => void;
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${minutes} minutes`;
}

export default function SermonCard({ sermon, onPlay }: SermonCardProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-xl transition-shadow"
      data-testid={`card-sermon-${sermon.id}`}
    >
      {sermon.imageUrl && (
        <img
          src={sermon.imageUrl}
          alt={sermon.title}
          className="w-full h-48 object-cover"
          data-testid={`img-sermon-${sermon.id}`}
        />
      )}
      <CardContent className="p-6">
        <h3 
          className="text-lg font-semibold text-foreground mb-2"
          data-testid={`text-sermon-title-${sermon.id}`}
        >
          {sermon.title}
        </h3>
        <p 
          className="text-muted-foreground text-sm mb-3"
          data-testid={`text-sermon-speaker-${sermon.id}`}
        >
          {sermon.speaker}
        </p>
        <p 
          className="text-muted-foreground text-sm mb-3"
          data-testid={`text-sermon-date-${sermon.id}`}
        >
          {new Date(sermon.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
        {sermon.duration && (
          <div className="flex items-center text-muted-foreground text-sm mb-4">
            <Clock className="h-4 w-4 mr-1" />
            <span data-testid={`text-sermon-duration-${sermon.id}`}>
              Duration: {formatDuration(sermon.duration)}
            </span>
          </div>
        )}
        <Button
          onClick={() => onPlay(sermon)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
          data-testid={`button-play-sermon-${sermon.id}`}
        >
          <Play className="h-4 w-4 mr-2" />
          Play Message
        </Button>
      </CardContent>
    </Card>
  );
}
