import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AudioPlayer from "@/components/audio/audio-player";
import SermonCard from "@/components/sermons/sermon-card";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Sermon } from "@shared/schema";

export default function Messages() {
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: sermons, isLoading } = useQuery<Sermon[]>({
    queryKey: ['/api/sermons'],
    queryFn: () => fetch('/api/sermons').then(res => res.json()),
  });

  const filteredSermons = sermons?.filter(sermon =>
    sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handlePlaySermon = (sermon: Sermon) => {
    setCurrentSermon(sermon);
    // Scroll to audio player
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-8">
      {/* Current Audio Player */}
      {currentSermon && (
        <section className="mb-8 bg-muted py-8" data-testid="section-current-player">
          <div className="container mx-auto px-4">
            <AudioPlayer sermon={currentSermon} />
          </div>
        </section>
      )}

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4" data-testid="text-messages-title">
            Sermon Messages
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-messages-subtitle">
            Listen to inspiring messages from our pastoral team and guest speakers
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search messages by title or speaker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-messages"
            />
          </div>
        </div>

        {/* Messages Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 mb-2" />
                  <Skeleton className="h-4 mb-3 w-2/3" />
                  <Skeleton className="h-4 mb-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredSermons.length === 0 ? (
          <Card className="p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-no-messages">
              No messages found
            </h3>
            <p className="text-muted-foreground">
              {searchQuery ? `No messages found for "${searchQuery}"` : "No messages available at the moment."}
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-messages">
            {filteredSermons.map((sermon) => (
              <SermonCard
                key={sermon.id}
                sermon={sermon}
                onPlay={handlePlaySermon}
              />
            ))}
          </div>
        )}

        {/* Results count */}
        {!isLoading && filteredSermons.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground" data-testid="text-results-count">
              Showing {filteredSermons.length} of {sermons?.length || 0} messages
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
