import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AudioPlayer from "@/components/audio/audio-player";
import SermonCard from "@/components/sermons/sermon-card";
import DevotionCard from "@/components/devotions/devotion-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sun, Moon, Book, Heart, Users, Mic, Calendar, Award } from "lucide-react";
import type { Sermon, Devotion, Leader } from "@shared/schema";

export default function Home() {
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);

  const { data: recentSermons, isLoading: sermonsLoading } = useQuery<Sermon[]>({
    queryKey: ['/api/sermons/recent'],
    queryFn: () => fetch('/api/sermons/recent?limit=3').then(res => res.json()),
  });

  const { data: todaysDevotions, isLoading: devotionsLoading } = useQuery<Devotion[]>({
    queryKey: ['/api/devotions/today'],
    queryFn: () => fetch('/api/devotions/today').then(res => res.json()),
  });

  const { data: leaders, isLoading: leadersLoading } = useQuery<Leader[]>({
    queryKey: ['/api/leaders'],
    queryFn: () => fetch('/api/leaders').then(res => res.json()),
  });

  const handlePlaySermon = (sermon: Sermon) => {
    setCurrentSermon(sermon);
  };

  const handleReadDevotion = (devotion: Devotion) => {
    // In a real app, this would open a modal or navigate to a detailed view
    console.log('Reading devotion:', devotion.title);
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
                Listen to Messages
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted" data-testid="section-stats">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2" data-testid="text-stat-members">500+</div>
              <div className="text-muted-foreground">Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2" data-testid="text-stat-messages">150+</div>
              <div className="text-muted-foreground">Messages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2" data-testid="text-stat-years">25</div>
              <div className="text-muted-foreground">Years Serving</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2" data-testid="text-stat-ministries">12</div>
              <div className="text-muted-foreground">Ministries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Audio Player */}
      {currentSermon && (
        <section className="py-8 bg-background" data-testid="section-current-player">
          <div className="container mx-auto px-4">
            <AudioPlayer sermon={currentSermon} />
          </div>
        </section>
      )}

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

      {/* Devotions Preview */}
      <section className="py-16 bg-muted" data-testid="section-devotions-preview">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4" data-testid="text-devotions-title">
              Daily Devotions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-devotions-subtitle">
              Grow in your faith with our daily devotional content and Bible study resources
            </p>
          </div>

          {/* Devotion Categories */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" data-testid="card-category-morning">
              <CardContent className="p-6">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="text-2xl text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Morning</h3>
                <p className="text-muted-foreground text-sm">Start your day with God</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" data-testid="card-category-evening">
              <CardContent className="p-6">
                <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="text-2xl text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Evening</h3>
                <p className="text-muted-foreground text-sm">End your day in reflection</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" data-testid="card-category-bible-study">
              <CardContent className="p-6">
                <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="text-2xl text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Bible Study</h3>
                <p className="text-muted-foreground text-sm">Deep dive into Scripture</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" data-testid="card-category-youth">
              <CardContent className="p-6">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-2xl text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Youth</h3>
                <p className="text-muted-foreground text-sm">Faith for young hearts</p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Devotion */}
          {devotionsLoading ? (
            <Card className="shadow-lg p-8 mb-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                  <Skeleton className="h-6 mb-4 w-3/4" />
                  <Skeleton className="h-20 mb-6" />
                  <Skeleton className="h-24 mb-6" />
                  <Skeleton className="h-10 w-48" />
                </div>
                <div className="lg:w-1/3">
                  <Skeleton className="rounded-lg w-full h-64" />
                </div>
              </div>
            </Card>
          ) : todaysDevotions && todaysDevotions.length > 0 ? (
            <Card className="shadow-lg p-8 mb-8" data-testid="card-todays-devotion">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-accent/20 p-2 rounded-lg">
                      <Calendar className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground" data-testid="text-todays-devotion-title">
                        {todaysDevotions[0].title}
                      </h3>
                      <p className="text-muted-foreground" data-testid="text-todays-devotion-date">
                        {new Date(todaysDevotions[0].date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 border-l-4 border-primary p-4 mb-6">
                    <p className="text-primary font-medium italic" data-testid="text-todays-devotion-verse">
                      "{todaysDevotions[0].verse}"
                    </p>
                    <p className="text-muted-foreground text-sm mt-2" data-testid="text-todays-devotion-reference">
                      - {todaysDevotions[0].reference}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-todays-devotion-content">
                    {todaysDevotions[0].content}
                  </p>

                  <Button 
                    onClick={() => handleReadDevotion(todaysDevotions[0])}
                    data-testid="button-read-full-devotion"
                  >
                    Read Full Devotion
                  </Button>
                </div>

                <div className="lg:w-1/3">
                  {todaysDevotions[0].imageUrl && (
                    <img
                      src={todaysDevotions[0].imageUrl}
                      alt={todaysDevotions[0].title}
                      className="rounded-lg w-full h-64 object-cover"
                      data-testid="img-todays-devotion"
                    />
                  )}
                </div>
              </div>
            </Card>
          ) : null}

          <div className="text-center">
            <Link href="/devotions">
              <Button 
                variant="secondary" 
                size="lg"
                data-testid="button-view-all-devotions"
              >
                View All Devotions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Church Information Preview */}
      <section className="py-16" data-testid="section-church-info">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4" data-testid="text-church-info-title">
                About Grace Community
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-church-info-subtitle">
                Learn more about our church family, our mission, and what we believe
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6" data-testid="text-mission-title">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-mission-content">
                  At Grace Community Church, our mission is to love God, love people, and make disciples. 
                  We believe in creating a welcoming environment where everyone can grow in their relationship 
                  with Jesus Christ and discover their purpose in God's kingdom.
                </p>
                <Link href="/about">
                  <Button data-testid="button-learn-more-about">Learn More About Us</Button>
                </Link>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                  alt="Diverse congregation worshiping together"
                  className="rounded-xl shadow-lg w-full"
                  data-testid="img-congregation"
                />
              </div>
            </div>

            {/* Service Times */}
            <Card className="shadow-lg p-8" data-testid="card-service-times">
              <h3 className="text-2xl font-bold text-foreground text-center mb-8" data-testid="text-service-times-title">
                Service Times
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sun className="text-2xl text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2" data-testid="text-sunday-morning">Sunday Morning</h4>
                  <p className="text-muted-foreground">9:00 AM & 11:00 AM</p>
                </div>
                <div className="text-center">
                  <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-2xl text-accent" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2" data-testid="text-bible-study">Wednesday Bible Study</h4>
                  <p className="text-muted-foreground">7:00 PM</p>
                </div>
                <div className="text-center">
                  <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-2xl text-secondary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2" data-testid="text-youth-group">Youth Group</h4>
                  <p className="text-muted-foreground">Friday 6:00 PM</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
