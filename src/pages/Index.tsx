
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full p-4 flex justify-end">
        <ThemeToggle />
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <h1 className="text-4xl font-bold text-foreground">MCQ Website</h1>
            <p className="text-xl text-muted-foreground mt-2">Your interactive quiz platform</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-foreground">Start building your amazing quizzes here!</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
