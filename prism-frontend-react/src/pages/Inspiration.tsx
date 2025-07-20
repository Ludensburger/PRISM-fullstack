import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Heart, Star, ExternalLink } from "lucide-react";
import famousPeopleData from "@/data/famousPeople.json";

interface FamousPerson {
  name: string;
  profession: string;
  personalityType: string;
  stressLevel: string;
  achievements: string[];
  quote: string;
  wikipediaUrl?: string;
  image?: string;
}

const Inspiration = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FamousPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Load famous people data from JSON file
  const mockFamousPeople: FamousPerson[] = famousPeopleData as FamousPerson[];

  // Live search: run search logic whenever searchQuery changes, with debounce
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const filtered = mockFamousPeople
        .map((person) => {
          let matchCount = 0;
          for (const key of Object.keys(person)) {
            const value = person[key as keyof FamousPerson];
            if (
              typeof value === "string" &&
              value.toLowerCase().includes(query)
            ) {
              matchCount++;
            }
            if (Array.isArray(value)) {
              for (const item of value) {
                if (
                  typeof item === "string" &&
                  item.toLowerCase().includes(query)
                ) {
                  matchCount++;
                }
              }
            }
          }
          return matchCount > 0 ? { person, matchCount } : null;
        })
        .filter(Boolean) as { person: FamousPerson; matchCount: number }[];
      filtered.sort(
        (a, b) =>
          b.matchCount - a.matchCount ||
          a.person.name.localeCompare(b.person.name)
      );
      const results = filtered.map((f) => f.person);
      setSearchResults(results);
      setIsLoading(false);
    }, 300); // 300ms debounce
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Keep handleSearch for Enter key and button, but just set searchQuery to trigger effect
  const handleSearch = () => {
    setSearchQuery(searchQuery); // triggers useEffect
  };

  const getPersonalityBadgeColor = (type: string) => {
    if (type.includes("Introverted")) return "bg-blue-100 text-blue-800";
    if (type.includes("Leader")) return "bg-green-100 text-green-800";
    if (type.includes("Visionary")) return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };

  const getStressBadgeColor = (level: string) => {
    if (level === "High") return "bg-red-100 text-red-800";
    if (level === "Moderate") return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  // Gather all unique suggestion words/phrases from the data for fuzzy search
  const allSuggestionSet = new Set<string>();
  for (const person of mockFamousPeople) {
    // Add stressLevel as a phrase (e.g., 'high stress', 'moderate stress')
    if (person.stressLevel) {
      allSuggestionSet.add(person.stressLevel.toLowerCase() + " stress");
    }
    // Add each word from personalityType and profession
    [person.personalityType, person.profession].forEach((field) => {
      field.split(/\s|&|,|\.|-/).forEach((word) => {
        const clean = word.trim().toLowerCase();
        if (
          clean &&
          clean.length > 2 &&
          ![
            "and",
            "the",
            "for",
            "with",
            "from",
            "show",
            "inc",
            "of",
            "to",
            "can",
            "his",
            "her",
            "him",
            "she",
            "who",
            "has",
            "are",
            "was",
            "not",
            "all",
            "but",
            "how",
            "you",
            "out",
            "one",
            "may",
            "had",
            "get",
            "got",
            "let",
            "see",
            "see:",
            "see;",
            "see,",
            "see.",
          ].includes(clean)
        ) {
          allSuggestionSet.add(clean);
        }
      });
    });
  }
  const allSuggestions = Array.from(allSuggestionSet);

  // Fuzzy filter suggestions based on current input
  let suggestions: string[] = [];
  if (searchQuery.trim().length > 0) {
    const q = searchQuery.trim().toLowerCase();
    suggestions = allSuggestions.filter((s) => s.includes(q)).slice(0, 12);
  } else {
    // If no input, show the first 12 suggestions (could randomize or sort by frequency if desired)
    suggestions = allSuggestions.slice(0, 12);
  }

  return (
    <div className="min-h-screen warm-gradient relative">
      {/* Return to Home Button - Top Left */}
      <div className="absolute left-4 top-4 z-50">
        <a href="/">
          <button className="px-5 py-2 rounded bg-primary text-white font-semibold shadow hover:bg-primary/80 transition">
            Return to Home
          </button>
        </a>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 float-animation">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Find Your Inspiration
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover famous people who share similar personality traits and
            stress patterns. You're not alone in your journey – many successful
            people have faced similar challenges!
          </p>

          {/* Search Section */}
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              placeholder="Search by personality type or trait..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 pulse-glow"
            >
              {isLoading ? (
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery(suggestion);
                }}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {searchResults.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {searchResults.map((person, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-foreground mb-2">
                        {person.name}
                      </CardTitle>
                      <p className="text-muted-foreground font-medium">
                        {person.profession}
                      </p>
                    </div>
                    {person.wikipediaUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          window.open(person.wikipediaUrl, "_blank")
                        }
                        className="p-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge
                      className={getPersonalityBadgeColor(
                        person.personalityType
                      )}
                    >
                      {person.personalityType}
                    </Badge>
                    <Badge className={getStressBadgeColor(person.stressLevel)}>
                      {person.stressLevel} Stress
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-primary" />
                        Key Achievements
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {person.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center">
                        <Heart className="w-4 h-4 mr-2 text-primary" />
                        Inspiring Quote
                      </h4>
                      <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary/30 pl-3">
                        "{person.quote}"
                      </blockquote>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Encouragement Section */}
        <div className="max-w-3xl mx-auto text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Remember: You're In Great Company
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Many of history's most successful and influential people have
                faced similar challenges to yours. What made them extraordinary
                wasn't the absence of stress or personality challenges – it was
                how they learned to work with their unique traits and turn them
                into strengths.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* No Return to Home Button at the bottom - now at top left */}
      </div>
    </div>
  );
};

export default Inspiration;
