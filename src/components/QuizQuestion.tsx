
import React, { useState } from "react";
import { Question, Answer } from "../types/quiz";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QuizQuestionProps {
  question: Question;
  onAnswerSelected: (isCorrect: boolean) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswerSelected,
}) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
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

  return (
    <div className="mb-8 animate-fade-in">
      <h3 className="text-xl font-medium mb-4">{question.text}</h3>
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
                {showResult && isCorrect && (
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 flex items-center">
                    <Check className="mr-1 h-3 w-3" /> Correct
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </RadioGroup>
      
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
