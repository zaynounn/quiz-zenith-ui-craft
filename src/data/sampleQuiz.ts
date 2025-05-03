
import { Quiz } from "../types/quiz";

export const sampleQuiz: Quiz = {
  id: "1",
  title: "General Knowledge Quiz",
  description: "Test your general knowledge with these questions!",
  questions: [
    {
      id: "q1",
      text: "What is the capital of France?",
      answers: [
        { id: "q1a1", text: "London", isCorrect: false },
        { id: "q1a2", text: "Berlin", isCorrect: false },
        { id: "q1a3", text: "Paris", isCorrect: true },
        { id: "q1a4", text: "Madrid", isCorrect: false }
      ]
    },
    {
      id: "q2",
      text: "Which planet is known as the Red Planet?",
      answers: [
        { id: "q2a1", text: "Venus", isCorrect: false },
        { id: "q2a2", text: "Mars", isCorrect: true },
        { id: "q2a3", text: "Jupiter", isCorrect: false },
        { id: "q2a4", text: "Saturn", isCorrect: false }
      ]
    },
    {
      id: "q3",
      text: "Who painted the Mona Lisa?",
      answers: [
        { id: "q3a1", text: "Vincent Van Gogh", isCorrect: false },
        { id: "q3a2", text: "Pablo Picasso", isCorrect: false },
        { id: "q3a3", text: "Leonardo da Vinci", isCorrect: true },
        { id: "q3a4", text: "Michelangelo", isCorrect: false }
      ]
    },
    {
      id: "q4",
      text: "What is the largest mammal on Earth?",
      answers: [
        { id: "q4a1", text: "African Elephant", isCorrect: false },
        { id: "q4a2", text: "Blue Whale", isCorrect: true },
        { id: "q4a3", text: "Giraffe", isCorrect: false },
        { id: "q4a4", text: "Polar Bear", isCorrect: false }
      ]
    },
    {
      id: "q5",
      text: "In what year did the first moon landing occur?",
      answers: [
        { id: "q5a1", text: "1965", isCorrect: false },
        { id: "q5a2", text: "1969", isCorrect: true },
        { id: "q5a3", text: "1972", isCorrect: false },
        { id: "q5a4", text: "1975", isCorrect: false }
      ]
    }
  ]
};
