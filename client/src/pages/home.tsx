import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SermonCard from "@/components/sermons/sermon-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mic } from "lucide-react";
import { useAudio } from "@/contexts/audio-context";
import type { Sermon } from "@shared/schema";

export default function Home() {
  const { playSermon } = useAudio();

  const { data: recentSermons, isLoading: sermonsLoading } = useQuery<Sermon[]>({
    queryKey: ['/api/sermons/recent'],
    queryFn: () => fetch('/api/sermons/recent?limit=3').then(res => res.json()),
  });


  const handlePlaySermon = (sermon: Sermon) => {
    playSermon(sermon);
  };


  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6" data-testid="text-hero-title">
            Welcome to Grace Community
          </h1>
          <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            A place where faith grows, community thrives, and hope is found. Join us as we worship together and grow in God's love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/messages">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                data-testid="button-listen-messages"
              >
                <Mic className="mr-2 h-5 w-5" />
                Listen to Messages
              </Button>
            </Link>
            <Link href="/devotions">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                data-testid="button-daily-devotions"
              >
                Daily Devotions
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* Recent Messages */}
      <section className="py-16" data-testid="section-recent-messages">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4" data-testid="text-recent-messages-title">
              Recent Messages
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-recent-messages-subtitle">
              Listen to our latest sermons and be encouraged in your faith journey
            </p>
          </div>

          {sermonsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
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
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentSermons?.map((sermon) => (
                <SermonCard
                  key={sermon.id}
                  sermon={sermon}
                  onPlay={handlePlaySermon}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/messages">
              <Button 
                variant="secondary" 
                size="lg"
                data-testid="button-view-all-messages"
              >
                View All Messages
              </Button>
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}
