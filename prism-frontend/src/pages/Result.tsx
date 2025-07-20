import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, RefreshCw, Users, Sparkles, Shield } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { analyzeResults } from "@/utils/analysis";
import type { ResultData } from "@/types/assessment";

// Utility: get answers and prediction from localStorage
function getLocalStorageData() {
  const answers = JSON.parse(localStorage.getItem("quizAnswers") || "{}") || {};
  let prediction = null;
  try {
    prediction = JSON.parse(localStorage.getItem("quizPrediction") || "null");
  } catch {}
  return { answers, prediction };
}

// Utility: normalize backend prediction to ResultData shape
function normalizeResult(pred: any): ResultData {
  // If already in correct shape, return as is
  if (pred && pred.stressLevel) return pred;
  // Otherwise, fallback to minimal shape
  return {
    stressLevel: pred?.prediction || "-",
    stressDescription: "",
    copingStrategies: [],
    personalityType: "-",
    personalityDescription: "",
    confidence: 0,
    stressScore: 0,
    recommendations: [],
  };
}
import { fetchLLMInsights } from "@/utils/llmService";
import { EmailResultsModal } from "@/components/EmailResultsModal";
import MLProcessingVisualization from "@/components/MLProcessingVisualization";

// Fallback skeleton loader
function ResultSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center p-8 bg-white/80 rounded-xl shadow-lg max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full" />
        <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
        <div className="h-4 bg-gray-100 rounded w-full mx-auto mb-2" />
        <div className="h-4 bg-gray-100 rounded w-5/6 mx-auto" />
      </div>
    </div>
  );
}

// Fallback document title hook
function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

// Fallback header
function ResultHeader() {
  return null;
}

// Fallback InsightCard
function InsightCard({
  insight,
  title,
  icon,
}: {
  insight: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border-0 shadow-xl bg-gradient-to-br from-card to-card/80 hover:shadow-2xl transition-all duration-300 rounded-xl p-6">
      <div className="flex items-center mb-4">
        {icon}
        <span className="ml-3 text-xl font-bold">{title}</span>
      </div>
      <div className="prose prose-primary max-w-none text-lg text-muted-foreground leading-relaxed">
        <ReactMarkdown>{insight}</ReactMarkdown>
      </div>
    </div>
  );
}

// Fallback Disclaimer
function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
      <p className="text-sm text-yellow-800 text-center leading-relaxed">
        <strong>Important:</strong> This assessment is designed for
        self-reflection and educational purposes. It should not replace
        professional psychological evaluation or medical advice. If you're
        experiencing significant stress or mental health concerns, please reach
        out to a qualified professional.
      </p>
    </div>
  );
}

const Result = () => {
  useDocumentTitle("Your Assessment Results | MindMeld");
  const navigate = useNavigate();
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [llmInsight, setLlmInsight] = useState<string | null>(null);
  const [llmError, setLlmError] = useState<string | null>(null);

  // Process results from local storage
  const processResults = useCallback(async () => {
    try {
      const { answers, prediction } = getLocalStorageData();

      // Use backend prediction if available, otherwise analyze locally
      const resultData = prediction
        ? normalizeResult(prediction)
        : analyzeResults(answers);

      setResult(resultData);

      // Fetch AI insights if possible
      try {
        const insight = await fetchLLMInsights({
          answers,
          prediction: resultData,
        });
        setLlmInsight(insight);
        localStorage.setItem("llmInsight", insight);
      } catch (err) {
        setLlmError("AI insights are temporarily unavailable");
      }
    } catch (error) {
      console.error("Result processing failed:", error);
      navigate("/error", {
        state: { message: "Could not process your results" },
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Handle visualization completion
  const handleProcessingComplete = useCallback(() => {
    processResults();
  }, [processResults]);

  // Initial data check
  useEffect(() => {
    if (!localStorage.getItem("quizAnswers")) {
      navigate("/");
    }
  }, [navigate]);

  // Handle retake assessment
  const handleRetake = () => {
    localStorage.removeItem("quizAnswers");
    localStorage.removeItem("quizPrediction");
    localStorage.removeItem("llmInsight");
    navigate("/quiz", { replace: true });
  };

  // Show processing visualization
  if (isLoading && !result) {
    return <MLProcessingVisualization onComplete={handleProcessingComplete} />;
  }

  // Show skeleton while loading after visualization
  if (isLoading) {
    return <ResultSkeleton />;
  }

  if (!result) {
    return (
      <div className="min-h-screen warm-gradient flex items-center justify-center">
        <div className="text-center p-8 bg-white/90 rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Results Unavailable
          </h2>
          <p className="text-muted-foreground mb-6">
            We couldn't process your assessment results. Please try again.
          </p>
          <Button onClick={handleRetake} className="mt-4">
            Retake Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen warm-gradient relative">
      <ResultHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 hero-gradient rounded-full mb-6 float-animation">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Stress Profile
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            AI-powered analysis of your stress patterns
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 mb-12">
          {/* Enhanced Stress Level Card */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/80 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl md:text-3xl">
                <Brain className="w-8 h-8 md:w-10 md:h-10 mr-4 text-blue-600" />
                Stress Susceptibility Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="text-center mb-6">
                  <p className="text-lg text-muted-foreground mb-2">
                    Based on your responses
                  </p>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-semibold mb-2">
                      Your Stress Susceptibility Level:
                    </span>
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-25"></div>
                      <Badge className="text-2xl font-bold py-4 px-8 border-2 border-primary/30 relative z-10 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm">
                        {result.stressLevel}
                      </Badge>
                    </div>
                  </div>
                </div>

                {result.stressDescription && (
                  <div className="bg-muted/50 rounded-lg p-6 w-full border-l-4 border-primary">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 mt-1 mr-3 text-primary flex-shrink-0" />
                      <p className="text-lg text-foreground leading-relaxed">
                        {result.stressDescription}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights Card (only show if LLM is online and insight is present) */}
          {llmInsight && !llmError && (
            <InsightCard
              insight={llmInsight}
              title="Personalized Coping Strategies"
              icon={<Shield className="w-8 h-8 text-purple-600" />}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            <EmailResultsModal result={result} insight={llmInsight || ""} />
            <Button
              onClick={() => navigate("/resources")}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 py-3 pulse-glow"
            >
              <Users className="w-5 h-5" />
              Mental Wellness Resources
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleRetake}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3"
            >
              <RefreshCw className="w-5 h-5" />
              Retake Assessment
            </Button>
            <Button
              onClick={() => navigate("/about")}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3"
            >
              <Brain className="w-5 h-5" />
              Our Scientific Approach
            </Button>
          </div>
        </div>

        <Disclaimer />
      </div>
    </div>
  );
};

export default Result;
