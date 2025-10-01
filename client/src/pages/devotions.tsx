import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DevotionCard from "@/components/devotions/devotion-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sun, Moon, Book, Heart } from "lucide-react";
import type { Devotion } from "@shared/schema";

const categories = [
  { name: "All", value: "", icon: Book, color: "bg-primary/20 text-primary" },
  { name: "Morning", value: "morning", icon: Sun, color: "bg-accent/20 text-accent" },
  { name: "Evening", value: "evening", icon: Moon, color: "bg-primary/20 text-primary" },
  { name: "Bible Study", value: "bible-study", icon: Book, color: "bg-secondary/20 text-secondary" },
  // { name: "Youth", value: "youth", icon: Heart, color: "bg-accent/20 text-accent" },
];

export default function Devotions() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDevotion, setSelectedDevotion] = useState<Devotion | null>(null);

  const { data: devotions, isLoading } = useQuery<Devotion[]>({
    queryKey: ['/api/devotions', selectedCategory],
    queryFn: () => {
      const url = selectedCategory 
        ? `/api/devotions?category=${selectedCategory}`
        : '/api/devotions';
      return fetch(url).then(res => res.json());
    },
  });

  const handleReadDevotion = (devotion: Devotion) => {
    setSelectedDevotion(devotion);
  };

  const closeModal = () => {
    setSelectedDevotion(null);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4" data-testid="text-devotions-title">
            Daily Devotions
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-devotions-subtitle">
            Grow in your faith with our daily devotional content and Bible study resources
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className="flex items-center space-x-2"
                data-testid={`button-category-${category.name.toLowerCase()}`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Devotions Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-6 mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                  <Skeleton className="h-20 mb-4" />
                  <Skeleton className="h-24 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : devotions && devotions.length === 0 ? (
          <Card className="p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-no-devotions">
              No devotions found
            </h3>
            <p className="text-muted-foreground">
              No devotions available for this category at the moment.
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-devotions">
            {devotions?.map((devotion) => (
              <DevotionCard
                key={devotion.id}
                devotion={devotion}
                onRead={handleReadDevotion}
              />
            ))}
          </div>
        )}

        {/* Results count */}
        {!isLoading && devotions && devotions.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground" data-testid="text-results-count">
              Showing {devotions.length} devotion{devotions.length !== 1 ? 's' : ''}
              {selectedCategory && ` in ${categories.find(c => c.value === selectedCategory)?.name} category`}
            </p>
          </div>
        )}
      </div>

      {/* Devotion Detail Modal */}
      <Dialog open={!!selectedDevotion} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="dialog-devotion-detail">
          {selectedDevotion && (
            <>
              <DialogHeader>
                <DialogTitle data-testid="text-devotion-modal-title">
                  {selectedDevotion.title}
                </DialogTitle>
                <p className="text-muted-foreground" data-testid="text-devotion-modal-date">
                  {new Date(selectedDevotion.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </DialogHeader>

              <div className="space-y-6">
                {selectedDevotion.imageUrl && (
                  <img
                    src={selectedDevotion.imageUrl}
                    alt={selectedDevotion.title}
                    className="w-full h-48 object-cover rounded-lg"
                    data-testid="img-devotion-modal"
                  />
                )}

                <div className="bg-primary/10 border-l-4 border-primary p-4">
                  <p className="text-primary font-medium italic" data-testid="text-devotion-modal-verse">
                    "{selectedDevotion.verse}"
                  </p>
                  <p className="text-muted-foreground text-sm mt-2" data-testid="text-devotion-modal-reference">
                    - {selectedDevotion.reference}
                  </p>
                </div>

                <div className="prose prose-gray max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap" data-testid="text-devotion-modal-content">
                    {selectedDevotion.content}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
