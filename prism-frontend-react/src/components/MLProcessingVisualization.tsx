import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Database,
  BarChart3,
  Users,
  CheckCircle,
  Activity,
} from "lucide-react";

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  progress: number;
  status: "pending" | "processing" | "complete";
  duration: number;
}

interface MLProcessingVisualizationProps {
  onComplete: () => void;
}

const MLProcessingVisualization = ({
  onComplete,
}: MLProcessingVisualizationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  const steps: ProcessingStep[] = [
    {
      id: "data-collection",
      title: "Data Collection",
      description:
        "Gathering your assessment responses and preprocessing inputs",
      icon: Database,
      progress: 0,
      status: "pending",
      duration: 1500,
    },
    {
      id: "feature-extraction",
      title: "Feature Extraction",
      description: "Analyzing patterns in your behavioral indicators",
      icon: BarChart3,
      progress: 0,
      status: "pending",
      duration: 2000,
    },
    {
      id: "ml-processing",
      title: "ML Algorithm Processing",
      description: "Running K-Nearest Neighbor classification on your profile",
      icon: Brain,
      progress: 0,
      status: "pending",
      duration: 2500,
    },
    {
      id: "similarity-matching",
      title: "Similarity Matching",
      description: "Finding patterns similar to your behavioral profile",
      icon: Users,
      progress: 0,
      status: "pending",
      duration: 1800,
    },
    {
      id: "result-generation",
      title: "Result Generation",
      description: "Generating personalized insights and recommendations",
      icon: CheckCircle,
      progress: 0,
      status: "pending",
      duration: 1200,
    },
  ];

  const [processSteps, setProcessSteps] = useState<ProcessingStep[]>(steps);

  useEffect(() => {
    if (currentStep >= steps.length) {
      setTimeout(onComplete, 500);
      return;
    }

    const currentStepData = steps[currentStep];

    setProcessSteps((prev) =>
      prev.map((step, index) =>
        index === currentStep
          ? { ...step, status: "processing" }
          : index < currentStep
          ? { ...step, status: "complete", progress: 100 }
          : step
      )
    );

    const progressInterval = setInterval(() => {
      setStepProgress((prev) => {
        const newProgress = prev + 100 / (currentStepData.duration / 50);
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setProcessSteps((prev) =>
              prev.map((step, index) =>
                index === currentStep
                  ? { ...step, status: "complete", progress: 100 }
                  : step
              )
            );
            setCurrentStep((prev) => prev + 1);
            setStepProgress(0);
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentStep, onComplete]);

  const getStepAnimation = (stepId: string, isActive: boolean) => {
    if (!isActive) return "";
    switch (stepId) {
      case "data-collection":
        return "data-collection-animation";
      case "feature-extraction":
        return "feature-extraction-animation";
      case "ml-processing":
        return "ml-processing-animation";
      case "similarity-matching":
        return "similarity-matching-animation";
      case "result-generation":
        return "result-generation-animation";
      default:
        return "";
    }
  };

  return (
    <>
      <style>{`
        /* Your CSS styles here */
        @keyframes dataDots {
          0% {
            left: 0;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 32px;
            opacity: 0;
          }
        }
        @keyframes barGrowth {
          0% {
            height: 20%;
          }
          25% {
            height: 60%;
          }
          50% {
            height: 30%;
          }
          75% {
            height: 80%;
          }
          100% {
            height: 50%;
          }
        }
        @keyframes neuralPulse {
          0% {
            transform: scale(1) rotate(0deg);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            transform: scale(1.1) rotate(180deg);
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
          }
          100% {
            transform: scale(1) rotate(360deg);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
        }
        @keyframes blobMorph {
          0% {
            border-radius: 50% 50% 50% 50%/50% 50% 50% 50%;
          }
          25% {
            border-radius: 60% 40% 50% 60%/60% 50% 40% 50%;
          }
          50% {
            border-radius: 40% 60% 60% 40%/50% 60% 50% 60%;
          }
          75% {
            border-radius: 50% 60% 40% 60%/60% 40% 60% 40%;
          }
          100% {
            border-radius: 50% 50% 50% 50%/50% 50% 50% 50%;
          }
        }
        @keyframes confetti {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.8) rotate(0deg);
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-24px) scale(1.2) rotate(360deg);
          }
        }
        @keyframes fillAnimation {
          0% {
            height: 0;
          }
          100% {
            height: 100%;
          }
        }
        .data-collection-animation {
          position: relative;
        }
        .data-collection-animation .data-dots {
          position: absolute;
          top: 50%;
          left: 8px;
          width: 32px;
          height: 8px;
          display: flex;
          align-items: center;
          pointer-events: none;
        }
        .data-collection-animation .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82f6;
          margin-right: 4px;
          opacity: 0;
          position: relative;
          animation: dataDots 1.2s infinite;
        }
        .data-collection-animation .dot:nth-child(1) {
          animation-delay: 0s;
          background: #3b82f6;
        }
        .data-collection-animation .dot:nth-child(2) {
          animation-delay: 0.2s;
          background: #fbbf24;
        }
        .data-collection-animation .dot:nth-child(3) {
          animation-delay: 0.4s;
          background: #22c55e;
        }
        .feature-extraction-animation {
          position: relative;
        }
        .bar-chart-mini {
          display: flex;
          align-items: end;
          gap: 2px;
          height: 20px;
          margin: 0 auto;
        }
        .bar-chart-mini .bar {
          width: 4px;
          animation: barGrowth 1.5s infinite;
        }
        .bar-chart-mini .bar:nth-child(1) {
          background: #3b82f6;
          animation-delay: 0s;
        }
        .bar-chart-mini .bar:nth-child(2) {
          background: #fbbf24;
          animation-delay: 0.2s;
        }
        .bar-chart-mini .bar:nth-child(3) {
          background: #22c55e;
          animation-delay: 0.4s;
        }
        .bar-chart-mini .bar:nth-child(4) {
          background: #f472b6;
          animation-delay: 0.6s;
        }
        .bar-chart-mini .bar:nth-child(5) {
          background: #a5b4fc;
          animation-delay: 0.8s;
        }
        .ml-processing-animation {
          animation: neuralPulse 2s infinite;
          border-radius: 50%;
        }
        .similarity-matching-animation {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .similarity-matching-animation .blob {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #22c55e55 0%, #3b82f655 100%);
          z-index: 0;
          animation: blobMorph 2.5s infinite linear;
        }
        .result-generation-animation {
          position: relative;
          overflow: visible;
        }
        .result-generation-animation .confetti {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }
        .result-generation-animation .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 2px;
          opacity: 0;
          animation: confetti 1.2s infinite;
        }
        .result-generation-animation .confetti-piece:nth-child(1) {
          left: 10%;
          background: #fbbf24;
          animation-delay: 0s;
        }
        .result-generation-animation .confetti-piece:nth-child(2) {
          left: 30%;
          background: #3b82f6;
          animation-delay: 0.2s;
        }
        .result-generation-animation .confetti-piece:nth-child(3) {
          left: 60%;
          background: #22c55e;
          animation-delay: 0.4s;
        }
        .result-generation-animation .confetti-piece:nth-child(4) {
          left: 80%;
          background: #f472b6;
          animation-delay: 0.6s;
        }
      `}</style>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
              <Activity className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold mb-3">Processing Your Profile</h2>
            <p className="text-lg">
              Our AI is analyzing your behavioral patterns using advanced
              machine learning
            </p>
          </div>
          <div className="space-y-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isComplete = step.status === "complete";
              const isPending = step.status === "pending";
              return (
                <Card
                  key={step.id}
                  className={`border-0 shadow-lg transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-r from-primary/10 to-primary/5 ring-2 ring-primary/20"
                      : isComplete
                      ? "bg-gradient-to-r from-green-50 to-green-50/50"
                      : "bg-card/80"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-center items-center mb-2 min-h-[56px]">
                      {isActive && step.id === "data-collection" && (
                        <div className="data-collection-animation flex items-center justify-center w-20 h-20 relative">
                          <Icon className="w-9 h-9 z-20 text-blue-700 drop-shadow-lg" />
                          <div className="data-dots">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                          </div>
                        </div>
                      )}
                      {isActive && step.id === "feature-extraction" && (
                        <div className="feature-extraction-animation flex flex-col items-center w-14 h-14 relative">
                          <Icon className="w-9 h-9 z-10 mb-1 text-blue-700" />
                          <div className="bar-chart-mini">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                          </div>
                        </div>
                      )}
                      {isActive && step.id === "ml-processing" && (
                        <div className="ml-processing-animation flex items-center justify-center w-20 h-20 relative">
                          <Icon className="w-10 h-10 z-10 text-blue-700" />
                        </div>
                      )}
                      {isActive && step.id === "similarity-matching" && (
                        <div className="similarity-matching-animation flex items-center justify-center w-20 h-20 relative">
                          <Icon className="w-9 h-9 z-20 text-green-700" />
                          <div className="blob z-10"></div>
                        </div>
                      )}
                      {isActive && step.id === "result-generation" && (
                        <div className="result-generation-animation flex items-center justify-center w-20 h-20 relative">
                          <Icon className="w-9 h-9 z-20 text-yellow-600" />
                          <div className="confetti">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className="confetti-piece"
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  background: `hsl(${
                                    Math.random() * 360
                                  }, 100%, 50%)`,
                                  animationDelay: `${Math.random() * 2}s`,
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      )}
                      {!isActive && (
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isComplete
                              ? "bg-green-500 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="flex items-center text-xl">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={
                              isComplete
                                ? "text-green-700"
                                : isActive
                                ? "text-primary"
                                : "text-muted-foreground"
                            }
                          >
                            {step.title}
                          </span>
                          <Badge
                            variant={
                              isComplete
                                ? "default"
                                : isActive
                                ? "secondary"
                                : "outline"
                            }
                            className={isComplete ? "bg-green-500" : ""}
                          >
                            {isComplete
                              ? "Complete"
                              : isActive
                              ? "Processing"
                              : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">{step.description}</p>
                    {(isActive || isComplete) && (
                      <div className="space-y-2">
                        <Progress
                          value={isComplete ? 100 : isActive ? stepProgress : 0}
                          className="h-2"
                        />
                        <div className="flex justify-between text-sm">
                          <span>
                            {isComplete
                              ? "Completed"
                              : isActive
                              ? "Processing..."
                              : "Waiting"}
                          </span>
                          <span>
                            {isComplete
                              ? "100%"
                              : isActive
                              ? `${Math.round(stepProgress)}%`
                              : "0%"}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <div className="flex justify-center items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span>Powered by Advanced Machine Learning</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MLProcessingVisualization;
