import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sun, Users, Heart, Flame } from "lucide-react";
import type { Leader } from "@shared/schema";

export default function About() {
  const { data: leaders, isLoading } = useQuery<Leader[]>({
    queryKey: ['/api/leaders'],
    queryFn: () => fetch('/api/leaders').then(res => res.json()),
  });

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4" data-testid="text-about-title">
              About Adorned Church
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-about-subtitle">
              Learn more about our church family, our mission, and what we believe
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="text-mission-title">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-mission-content-1">
                At Adorned Church, our mission is to love God, love people, and make disciples. 
                We believe in creating a welcoming environment where everyone can grow in their relationship 
                with Jesus Christ and discover their purpose in God's kingdom.
              </p>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-mission-content-2">
                Through worship, fellowship, and service, we strive to be the hands and feet of Jesus 
                in our community and around the world. We are committed to studying God's Word, 
                supporting one another, and reaching out to those in need.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Diverse congregation worshiping together"
                className="rounded-xl shadow-lg w-full"
                data-testid="img-congregation-worship"
              />
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-12" data-testid="text-leadership-title">
              Our Leadership Team
            </h2>
            
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="text-center shadow-lg">
                    <CardContent className="p-6">
                      <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                      <Skeleton className="h-6 mb-2" />
                      <Skeleton className="h-4 mb-3 w-2/3 mx-auto" />
                      <Skeleton className="h-12" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="grid-leadership">
                {leaders?.map((leader) => (
                  <Card key={leader.id} className="text-center shadow-lg" data-testid={`card-leader-${leader.id}`}>
                    <CardContent className="p-6">
                      <img
                        src={leader.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"}
                        alt={leader.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        data-testid={`img-leader-${leader.id}`}
                      />
                      <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`text-leader-name-${leader.id}`}>
                        {leader.name}
                      </h3>
                      <p className="text-primary font-medium mb-3" data-testid={`text-leader-position-${leader.id}`}>
                        {leader.position}
                      </p>
                      <p className="text-muted-foreground text-sm" data-testid={`text-leader-description-${leader.id}`}>
                        {leader.description || "Serving our church community with dedication and love."}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Our Beliefs */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-12" data-testid="text-beliefs-title">
              What We Believe
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="text-belief-scripture-title">
                    The Authority of Scripture
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-belief-scripture-content">
                    We believe the Bible is the inspired, infallible Word of God and our ultimate authority 
                    for faith and life. It is God's revelation to humanity and contains everything we need 
                    for salvation and godly living.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="text-belief-trinity-title">
                    The Trinity
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-belief-trinity-content">
                    We believe in one God who exists eternally in three persons: Father, Son, and Holy Spirit. 
                    Each person is fully God, yet there is one God. This mystery is central to our faith 
                    and worship.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="text-belief-salvation-title">
                    Salvation by Grace
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-belief-salvation-content">
                    We believe salvation is a gift from God, received by faith in Jesus Christ alone. 
                    It cannot be earned through good works but is given freely to all who believe 
                    in Christ's death and resurrection.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="text-belief-church-title">
                    The Church
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-belief-church-content">
                    We believe the church is the body of Christ, made up of all believers. We are called 
                    to worship God, build each other up, and share the gospel with the world through 
                    word and deed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Service Times */}
          <Card className="shadow-lg p-8" data-testid="card-service-times">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8" data-testid="text-service-times-title">
              Service Times & Programs
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="text-2xl text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-sunday-service">
                  Sunday Worship
                </h3>
                <p className="text-muted-foreground mb-2">9:00 AM & 11:00 AM</p>
                <p className="text-sm text-muted-foreground">
                  Join us for worship, prayer, and biblical teaching
                </p>
              </div>

              <div className="text-center">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-2xl text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-bible-study">
                  Bible Study
                </h3>
                <p className="text-muted-foreground mb-2">Wednesday 7:00 PM</p>
                <p className="text-sm text-muted-foreground">
                  Deep dive into God's Word with fellow believers
                </p>
              </div>

              <div className="text-center">
                <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="text-2xl text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-youth-ministry">
                  Transfiguration (PITHG)
                </h3>
                <p className="text-muted-foreground mb-2">Last Friday of the Month  7:00 PM</p>
                <p className="text-sm text-muted-foreground">
                  A 12 Hours prayer program designed to help you connect with God on a deeper level.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-location-title">
                Visit Us
              </h3>
              <div className="text-muted-foreground">
                <p data-testid="text-church-address">123 Grace Street</p>
                <p data-testid="text-church-city">Community City, CC 12345</p>
                <p data-testid="text-church-phone" className="mt-2">(555) 123-4567</p>
                <p data-testid="text-church-email">info@gracecommunity.org</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
