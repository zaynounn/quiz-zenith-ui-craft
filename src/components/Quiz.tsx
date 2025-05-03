
import React, { useState, useEffect } from "react";
import { Quiz as QuizType, DifficultyLevel, ProgrammingLanguage } from "../types/quiz";
import QuizQuestion from "./QuizQuestion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Trophy, Code, Languages, ListOrdered } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";

interface QuizProps {
  quiz: QuizType;
}

const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  expert: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  monster: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
};

const Quiz: React.FC<QuizProps> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage | 'all'>('all');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Filter questions by selected difficulty and language
  const filteredQuestions = quiz.questions.filter(q => {
    const difficultyMatch = selectedDifficulty === 'all' || q.difficultyLevel === selectedDifficulty;
    const languageMatch = selectedLanguage === 'all' || q.language === selectedLanguage;
    return difficultyMatch && languageMatch;
  });

  // Further filter by selected questions if in selection mode
  const activeQuestions = isSelectionMode && selectedQuestionIds.size > 0 
    ? filteredQuestions.filter(q => selectedQuestionIds.has(q.id))
    : filteredQuestions;

  // Make sure we have a valid current question index
  useEffect(() => {
    if (activeQuestions.length === 0) {
      return;
    }
    if (currentQuestionIndex >= activeQuestions.length) {
      setCurrentQuestionIndex(activeQuestions.length - 1);
    }
  }, [activeQuestions, currentQuestionIndex]);

  const currentQuestion = activeQuestions.length > 0 ? activeQuestions[currentQuestionIndex] : null;
  const totalQuestions = activeQuestions.length;
  const progress = totalQuestions > 0 ? (answeredQuestions.size / totalQuestions) * 100 : 0;

  const handleAnswerSelected = (isCorrect: boolean) => {
    if (!currentQuestion) return;
    
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
  
  const handleQuestionSelect = (questionId: string) => {
    setSelectedQuestionIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const toggleSelectionMode = () => {
    // If exiting selection mode and we have selections, restart the quiz
    if (isSelectionMode && selectedQuestionIds.size > 0) {
      setCurrentQuestionIndex(0);
      setScore(0);
      setAnsweredQuestions(new Set());
      setQuizCompleted(false);
    }
    setIsSelectionMode(!isSelectionMode);
  };
  
  // Reset currentQuestionIndex when difficulty or language changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [selectedDifficulty, selectedLanguage]);

  // Reset quiz if no questions match filter
  useEffect(() => {
    if (activeQuestions.length === 0) {
      setQuizCompleted(true);
    } else if (quizCompleted && activeQuestions.length > 0 && !isSelectionMode) {
      setQuizCompleted(false);
    }
  }, [activeQuestions, quizCompleted, isSelectionMode]);

  // Get unique languages from quiz questions
  const availableLanguages = Array.from(
    new Set(quiz.questions.map(q => q.language))
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              {quiz.title}
            </span>
            <div className="flex gap-2">
              <Select 
                value={selectedLanguage} 
                onValueChange={(value) => setSelectedLanguage(value as ProgrammingLanguage | 'all')}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {availableLanguages.map(lang => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={selectedDifficulty} 
                onValueChange={(value) => setSelectedDifficulty(value as DifficultyLevel | 'all')}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                  <SelectItem value="monster">Monster</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant={isSelectionMode ? "default" : "outline"} 
                size="sm" 
                onClick={toggleSelectionMode}
                className="flex items-center gap-1"
              >
                <ListOrdered className="h-4 w-4" />
                {isSelectionMode ? "Done" : "Select Questions"}
              </Button>
            </div>
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-muted-foreground" />
            {quiz.description}
          </CardDescription>
          
          {!quizCompleted && currentQuestion && activeQuestions.length > 0 && !isSelectionMode && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <Badge className={difficultyColors[currentQuestion.difficultyLevel]}>
                  {currentQuestion.difficultyLevel.charAt(0).toUpperCase() + currentQuestion.difficultyLevel.slice(1)}
                </Badge>
                <span className="text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
              </div>
              
              <div className="w-full bg-secondary h-2 rounded-full">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {isSelectionMode && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Select questions for your quiz:</span>
                <span className="text-sm text-muted-foreground">
                  {selectedQuestionIds.size} question{selectedQuestionIds.size !== 1 ? 's' : ''} selected
                </span>
              </div>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg">No questions available for the selected filters.</p>
            </div>
          ) : isSelectionMode ? (
            <div className="space-y-3 max-h-96 overflow-y-auto p-1">
              {filteredQuestions.map((question) => (
                <div key={question.id} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50">
                  <Checkbox 
                    id={`select-${question.id}`} 
                    checked={selectedQuestionIds.has(question.id)}
                    onCheckedChange={() => handleQuestionSelect(question.id)}
                  />
                  <div className="flex-1">
                    <label 
                      htmlFor={`select-${question.id}`} 
                      className="flex justify-between items-center cursor-pointer text-sm"
                    >
                      <div className="line-clamp-2">
                        {question.text.length > 50 ? `${question.text.substring(0, 50)}...` : question.text}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{question.language}</Badge>
                        <Badge className={`text-xs ${difficultyColors[question.difficultyLevel]}`}>
                          {question.difficultyLevel}
                        </Badge>
                      </div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ) : !quizCompleted ? (
            activeQuestions.map((question, index) => (
              <QuizQuestion 
                key={question.id}
                question={question}
                onAnswerSelected={handleAnswerSelected}
                isCurrentQuestion={index === currentQuestionIndex}
              />
            ))
          ) : (
            <div className="text-center py-8 space-y-4">
              <h2 className="text-3xl font-bold">Quiz Complete!</h2>
              <div className="flex justify-center items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <p className="text-xl">
                  You scored <span className="font-bold text-primary">{score}</span> out of <span className="font-bold">{totalQuestions}</span>
                </p>
              </div>
              <p>({totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}%)</p>
              
              <div className="my-4 p-6 bg-muted rounded-lg">
                {score === totalQuestions ? (
                  <p className="text-lg">Perfect score! You're a coding master!</p>
                ) : score >= totalQuestions * 0.8 ? (
                  <p className="text-lg">Excellent! You have strong programming knowledge!</p>
                ) : score >= totalQuestions * 0.6 ? (
                  <p className="text-lg">Good job! You're on your way to becoming a great programmer!</p>
                ) : score >= totalQuestions * 0.4 ? (
                  <p className="text-lg">Not bad! Keep practicing your coding skills!</p>
                ) : (
                  <p className="text-lg">Keep studying! Programming takes practice!</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {isSelectionMode ? (
            <div className="w-full flex justify-center">
              <Button 
                onClick={toggleSelectionMode} 
                disabled={selectedQuestionIds.size === 0}
                className="px-8"
              >
                Start Quiz with {selectedQuestionIds.size} Question{selectedQuestionIds.size !== 1 ? 's' : ''}
              </Button>
            </div>
          ) : !quizCompleted && currentQuestion && activeQuestions.length > 0 ? (
            <>
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion} 
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Pagination>
                <PaginationContent>
                  {activeQuestions.length <= 10 ? (
                    activeQuestions.map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={currentQuestionIndex === index}
                          onClick={() => setCurrentQuestionIndex(index)}
                          className={isQuestionAnswered(activeQuestions[index].id) ? "bg-green-100 dark:bg-green-900/20" : ""}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))
                  ) : (
                    <div className="flex items-center">
                      <span className="text-sm">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                    </div>
                  )}
                </PaginationContent>
              </Pagination>
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
              <Button onClick={handleRestartQuiz} className="animate-bounce">Restart Quiz</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;
