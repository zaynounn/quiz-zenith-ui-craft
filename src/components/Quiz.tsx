
import React, { useState, useEffect } from "react";
import { Quiz as QuizType } from "../types/quiz";
import QuizQuestion from "./QuizQuestion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuizProps {
  quiz: QuizType;
}

const Quiz: React.FC<QuizProps> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = (answeredQuestions.size / totalQuestions) * 100;

  const handleAnswerSelected = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      toast({
        title: "Correct!",
        description: "Well done, that's the right answer!",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "That's not the right answer, try again next time!",
        variant: "destructive",
      });
    }
    
    setAnsweredQuestions(prev => new Set(prev).add(currentQuestion.id));
    
    // Auto advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else if (!quizCompleted) {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions(new Set());
    setQuizCompleted(false);
  };

  const isQuestionAnswered = (questionId: string) => {
    return answeredQuestions.has(questionId);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          <CardDescription>{quiz.description}</CardDescription>
          {!quizCompleted && (
            <div className="w-full bg-secondary h-2 rounded-full mt-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {!quizCompleted ? (
            <QuizQuestion 
              question={currentQuestion} 
              onAnswerSelected={handleAnswerSelected}
            />
          ) : (
            <div className="text-center py-8 space-y-4">
              <h2 className="text-3xl font-bold">Quiz Complete!</h2>
              <p className="text-xl">
                You scored <span className="font-bold text-primary">{score}</span> out of <span className="font-bold">{totalQuestions}</span>
              </p>
              <p>({Math.round((score / totalQuestions) * 100)}%)</p>
              
              <div className="my-4 p-6 bg-muted rounded-lg">
                {score === totalQuestions ? (
                  <p className="text-lg">Perfect score! Well done!</p>
                ) : score >= totalQuestions / 2 ? (
                  <p className="text-lg">Good job! You passed the quiz!</p>
                ) : (
                  <p className="text-lg">Keep practicing! You'll do better next time.</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!quizCompleted ? (
            <>
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion} 
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </div>
              <Button 
                variant="outline" 
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === totalQuestions - 1 || !isQuestionAnswered(currentQuestion.id)}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;
