import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { quizQuestions } from "@/data/questions";
import { predictStressLevel } from "@/utils/api";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Allow string or number for answers, and multi-select for study locations
  const [answers, setAnswers] = useState<
    Record<number, string | number | string[]>
  >({});

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // Handles both single and multi-select answers
  const handleAnswer = (
    questionId: number,
    value: string | number,
    multi = false
  ) => {
    setAnswers((prev) => {
      if (multi) {
        const prevArr = Array.isArray(prev[questionId])
          ? (prev[questionId] as string[])
          : [];
        let newArr;
        if (prevArr.includes(value as string)) {
          newArr = prevArr.filter((v) => v !== value);
        } else {
          newArr = [...prevArr, value as string];
        }
        // Debug: log the selected study locations
        // eslint-disable-next-line no-console
        console.log(`Answer selected: Question ${questionId}, Value:`, newArr);
        return { ...prev, [questionId]: newArr };
      } else {
        // Debug: log the selected answer value
        // eslint-disable-next-line no-console
        console.log(`Answer selected: Question ${questionId}, Value:`, value);
        return { ...prev, [questionId]: value };
      }
    });
  };

  const [submitting, setSubmitting] = useState(false);

  // Map frontend answers to backend payload
  function mapAnswersToPayload(
    answers: Record<number, string | number | string[]>
  ) {
    return {
      "Been upset because of something that happened unexpectedly?":
        answers[1] ?? 0,
      "Felt that you were unable to control the important things in your life?":
        answers[2] ?? 0,
      'Felt nervous and "stressed"?': answers[3] ?? 0,
      "Felt difficulties were piling up so high that you could not overcome them?":
        answers[4] ?? 0,
      "About how often did you feel tired out for no good reason?":
        answers[5] ?? 0,
      "About how often did you feel so nervous that nothing could calm you down?":
        answers[6] ?? 0,
      "About how often did you feel hopeless?": answers[7] ?? 0,
      "About how often did you feel restless or fidgety?": answers[8] ?? 0,
      "About how often did you feel that everything was an effort? ":
        answers[9] ?? 0,
      "About how often did you feel worthless? ": answers[10] ?? 0,
    };
  }

  const handleNext = async () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((current) => current + 1);
    } else {
      // Quiz completed, submit to backend
      setSubmitting(true);
      try {
        const payload = mapAnswersToPayload(answers);
        const prediction = await predictStressLevel(payload);
        localStorage.setItem("quizAnswers", JSON.stringify(answers));
        localStorage.setItem("quizPrediction", JSON.stringify(prediction));
        navigate("/result");
      } catch (error) {
        alert("Failed to get prediction from backend. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((current) => current - 1);
    }
  };

  const currentQ = quizQuestions[currentQuestion];
  // For multi-select, consider answered if at least one is checked
  const isAnswered = Array.isArray(answers[Number(currentQ.id)])
    ? (answers[Number(currentQ.id)] as string[]).length > 0
    : answers[Number(currentQ.id)] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
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
        <div className="text-center mb-8">
          <div className="max-w-md mx-auto">
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-center text-gray-800">
                {currentQ.text}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswer(Number(currentQ.id), option.value)
                    }
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all hover:border-blue-300 hover:shadow-md ${
                      answers[Number(currentQ.id)] === option.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          answers[Number(currentQ.id)] === option.value
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {answers[Number(currentQ.id)] === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                      <span className="font-medium">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!isAnswered || submitting}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {submitting
                    ? "Submitting..."
                    : currentQuestion === quizQuestions.length - 1
                    ? "Get Results"
                    : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
