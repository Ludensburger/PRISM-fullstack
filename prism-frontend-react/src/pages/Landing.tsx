import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Heart,
  Shield,
  ArrowRight,
  Users,
  Sparkles,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced behavioral science meets artificial intelligence for personalized insights",
    },
    {
      icon: Heart,
      title: "Stress Assessment",
      description:
        "Understand your stress susceptibility and learn healthy coping mechanisms",
    },
    {
      icon: Shield,
      title: "Personalized Strategies",
      description:
        "Get tailored advice based on your unique personality and behavioral patterns",
    },
    {
      icon: Users,
      title: "Find Inspiration",
      description:
        "Discover famous people who share your traits and overcame similar challenges",
    },
  ];

  return (
    <div className="min-h-screen warm-gradient">
      <div className="container mx-auto px-4 py-12">
        {/* App Name Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary mb-2 tracking-tight drop-shadow-lg">
            PRISM
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-6 tracking-wide">
            Psychological Response Inference via Stress Modeling
          </h2>
        </div>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 hero-gradient rounded-full mb-8 float-animation">
            <Sparkles className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-6xl font-bold text-foreground mb-6 leading-tight">
            Discover Your
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent block">
              Behavioral Blueprint
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock the science behind your personality and stress patterns. Get
            personalized insights, coping strategies, and find inspiration from
            others who share your unique traits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate("/quiz")}
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 pulse-glow"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              onClick={() => navigate("/about")}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
            >
              Learn the Science
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            ✨ Takes only 5 minutes • 🔒 Completely anonymous • 📧 Email your
            results
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-card/80"
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inspiration Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Need Inspiration?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Remember, even the most successful people have faced stress,
            self-doubt, and setbacks. What sets them apart is how they turned
            challenges into strengths. <br />
            <span className="font-semibold text-primary">
              Find role models who share your traits and see how they thrived!
            </span>
          </p>
          <Button
            onClick={() => navigate("/inspiration")}
            size="lg"
            className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 pulse-glow"
          >
            Explore Inspirational Figures
            <Users className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Take the Assessment
              </h3>
              <p className="text-muted-foreground">
                Answer carefully designed questions based on established
                psychological frameworks
              </p>
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                AI Analysis
              </h3>
              <p className="text-muted-foreground">
                Our advanced algorithms analyze your responses using behavioral
                science principles
              </p>
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Get Your Blueprint
              </h3>
              <p className="text-muted-foreground">
                Receive personalized insights, coping strategies, and
                inspirational connections
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Understand Yourself Better?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands who have discovered their behavioral patterns and
              learned to thrive with their unique traits.
            </p>
            <Button
              onClick={() => navigate("/quiz")}
              size="lg"
              className="text-xl px-10 py-5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 pulse-glow"
            >
              Begin Assessment Now
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Landing;
