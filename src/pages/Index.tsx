
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Quiz from "@/components/Quiz"; 
import { sampleQuiz } from "@/data/sampleQuiz";
import { Code, Trophy, Layers } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full p-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">CodeQuiz Challenge</h1>
        </div>
        <ThemeToggle />
      </header>
      
      <div className="bg-gradient-to-b from-primary/10 to-background py-6 px-4 text-center">
        <h2 className="text-xl font-semibold flex justify-center items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Test Your Programming Knowledge
          <Trophy className="h-5 w-5 text-yellow-500" />
        </h2>
        <p className="text-muted-foreground mt-2">
          From beginner concepts to monster challenges - how far can you go?
        </p>
      </div>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <Quiz quiz={sampleQuiz} />
      </main>
      
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        <div className="flex items-center justify-center gap-1">
          <Layers className="h-4 w-4" />
          <span>CodeQuiz Challenge © 2025</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
