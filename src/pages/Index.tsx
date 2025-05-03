
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Quiz from "@/components/Quiz"; 
import { sampleQuiz } from "@/data/sampleQuiz";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full p-4 flex justify-between">
        <h1 className="text-2xl font-bold text-foreground">MCQ Quiz</h1>
        <ThemeToggle />
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <Quiz quiz={sampleQuiz} />
      </main>
    </div>
  );
};

export default Index;
