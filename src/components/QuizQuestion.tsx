
import React, { useState } from "react";
import { Question, Answer } from "../types/quiz";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, CircleX, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

interface QuizQuestionProps {
  question: Question;
  onAnswerSelected: (isCorrect: boolean) => void;
  isCurrentQuestion: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswerSelected,
  isCurrentQuestion,
}) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const handleAnswerSelect = (answerId: string) => {
    if (isAnswered) return;
    
    const selectedAnswer = question.answers.find(answer => answer.id === answerId);
    setSelectedAnswerId(answerId);
    setIsAnswered(true);
    
    if (selectedAnswer) {
      onAnswerSelected(selectedAnswer.isCorrect);
    }
  };

  const getCorrectAnswer = (): Answer | undefined => {
    return question.answers.find(answer => answer.isCorrect);
  };

  // Determine if we should show code formatting for the question
  const hasCode = question.text.includes('\n') || question.text.includes('function');
  
  // Only show if this is the current question
  if (!isCurrentQuestion) return null;
  
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <Badge className="text-xs">{question.language}</Badge>
        <Badge variant="outline" className="text-xs">{question.category}</Badge>
      </div>
      
      <h3 className="text-xl font-medium mb-4">
        {hasCode ? (
          <div>
            <div className="mb-2">What is the result of the following code?</div>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              <code>{question.text}</code>
            </pre>
          </div>
        ) : (
          question.text
        )}
      </h3>
      <RadioGroup className="gap-3">
        {question.answers.map((answer) => {
          const isSelected = selectedAnswerId === answer.id;
          const isCorrect = answer.isCorrect;
          const showResult = isAnswered;

          return (
            <div
              key={answer.id}
              className={`relative border rounded-lg p-4 transition-all ${
                isSelected
                  ? isCorrect
                    ? "bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700"
                    : "bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700"
                  : "hover:bg-muted/50"
              } ${showResult && isCorrect ? "ring-2 ring-green-500" : ""}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={answer.id}
                  id={answer.id}
                  disabled={isAnswered}
                  onClick={() => handleAnswerSelect(answer.id)}
                />
                <Label
                  htmlFor={answer.id}
                  className={`flex-grow cursor-pointer ${
                    isSelected && isCorrect ? "font-semibold" : ""
                  }`}
                >
                  {answer.text}
                </Label>
                {showResult && isSelected && (
                  <div className="ml-2">
                    {isCorrect ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <CircleX className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </RadioGroup>
      
      {!isAnswered && question.difficultyLevel === "monster" && (
        <div className="mt-4 flex items-center">
          <Checkbox 
            id="show-hint" 
            checked={showHint} 
            onCheckedChange={(checked) => setShowHint(!!checked)}
          />
          <Label htmlFor="show-hint" className="ml-2 cursor-pointer">
            Need a hint? (competitive penalty)
          </Label>
        </div>
      )}
      
      {showHint && !isAnswered && (
        <Alert className="mt-2 bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-200 dark:border-amber-800">
          <AlertDescription>
            {question.difficultyLevel === "monster" && question.id === "q13" && 
              "Think about function hoisting in JavaScript and how declarations are processed."
            }
            {question.difficultyLevel === "monster" && question.id === "q14" && 
              "Count how many times the inner loop executes for each iteration of the outer loop."
            }
            {question.difficultyLevel === "monster" && question.id === "q15" && 
              "Consider monads as a way to chain operations in a context (like handling effects)."
            }
          </AlertDescription>
        </Alert>
      )}
      
      {isAnswered && selectedAnswerId && !question.answers.find(a => a.id === selectedAnswerId)?.isCorrect && (
        <Alert className="mt-4 bg-muted/50 border-muted">
          <AlertDescription>
            The correct answer is: <strong>{getCorrectAnswer()?.text}</strong>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default QuizQuestion;
