import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Send, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResultData } from "@/types/assessment";
import { quizQuestions } from "@/data/questions";

interface EmailResultsModalProps {
  result: ResultData;
  insight?: string;
}

export const EmailResultsModal = ({
  result,
  insight: insightProp,
}: EmailResultsModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSendEmail = async () => {
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Try to get answers and prediction from localStorage for completeness
      let answers = {};
      let prediction = result;

      // Use the passed-in insight prop if available, else fallback to localStorage or result
      let insight = insightProp || "";
      try {
        if (!insight) {
          insight = localStorage.getItem("llmInsight") || "";
        }
        if (!insight) {
          insight = result.copingStrategies?.length
            ? result.copingStrategies.join("\n")
            : result.recommendations?.length
            ? result.recommendations.join("\n")
            : "";
        }
        const rawAnswers =
          JSON.parse(localStorage.getItem("quizAnswers") || "{}") || {};
        // Map answers to {question text: answer string} for email
        const mappedAnswers = {};
        for (const q of quizQuestions) {
          const answerValue = rawAnswers[q.id];
          const option = q.options.find((opt) => opt.value === answerValue);
          mappedAnswers[q.text] = option ? option.text : "";
        }
        answers = mappedAnswers;
        // If result is not full prediction, try to get from localStorage
        if (!result.stressLevel && localStorage.getItem("quizPrediction")) {
          prediction = JSON.parse(
            localStorage.getItem("quizPrediction") || "null"
          );
        }
      } catch {}

      const response = await fetch("http://localhost:5000/send-results-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers,
          prediction,
          insight,
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast({
          title: "Email Sent! 📧",
          description: "Your results have been sent to your email address.",
        });
        setIsOpen(false);
        setEmail("");
      } else {
        toast({
          title: "Sending Failed",
          description: data.error || "Failed to send email.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Mail className="w-4 h-4" />
          Email Results
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Email Your Results
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            We'll send you a beautifully formatted summary of your behavioral
            profile and coping strategies.
          </p>
          <Button
            onClick={handleSendEmail}
            disabled={isLoading || !email.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Results
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
