
import { Quiz } from "../types/quiz";

export const sampleQuiz: Quiz = {
  id: "1",
  title: "Programming Language Quiz",
  description: "Test your knowledge about programming languages and concepts!",
  questions: [
    // BEGINNER QUESTIONS
    {
      id: "q1",
      text: "Which of these is NOT a programming language?",
      category: "General Programming",
      difficultyLevel: "beginner",
      answers: [
        { id: "q1a1", text: "Java", isCorrect: false },
        { id: "q1a2", text: "Python", isCorrect: false },
        { id: "q1a3", text: "HTML", isCorrect: true },
        { id: "q1a4", text: "Ruby", isCorrect: false }
      ]
    },
    {
      id: "q2",
      text: "Which symbol is used for single-line comments in JavaScript?",
      category: "JavaScript",
      difficultyLevel: "beginner",
      answers: [
        { id: "q2a1", text: "#", isCorrect: false },
        { id: "q2a2", text: "//", isCorrect: true },
        { id: "q2a3", text: "/* */", isCorrect: false },
        { id: "q2a4", text: "--", isCorrect: false }
      ]
    },
    {
      id: "q3",
      text: "In Python, how do you create a variable named 'age' with the value 25?",
      category: "Python",
      difficultyLevel: "beginner",
      answers: [
        { id: "q3a1", text: "var age = 25", isCorrect: false },
        { id: "q3a2", text: "let age = 25", isCorrect: false },
        { id: "q3a3", text: "age = 25", isCorrect: true },
        { id: "q3a4", text: "int age = 25", isCorrect: false }
      ]
    },
    
    // INTERMEDIATE QUESTIONS
    {
      id: "q4",
      text: "What does CSS stand for?",
      category: "Web Development",
      difficultyLevel: "intermediate",
      answers: [
        { id: "q4a1", text: "Computer Style Sheets", isCorrect: false },
        { id: "q4a2", text: "Cascading Style Sheets", isCorrect: true },
        { id: "q4a3", text: "Creative Style System", isCorrect: false },
        { id: "q4a4", text: "Colorful Style Sheets", isCorrect: false }
      ]
    },
    {
      id: "q5",
      text: "What is the correct way to check if 'x' is equal to 5 in JavaScript?",
      category: "JavaScript",
      difficultyLevel: "intermediate",
      answers: [
        { id: "q5a1", text: "if x = 5", isCorrect: false },
        { id: "q5a2", text: "if(x == 5)", isCorrect: false },
        { id: "q5a3", text: "if(x === 5)", isCorrect: true },
        { id: "q5a4", text: "if(x equals 5)", isCorrect: false }
      ]
    },
    {
      id: "q6",
      text: "Which data structure follows the Last In First Out (LIFO) principle?",
      category: "Data Structures",
      difficultyLevel: "intermediate",
      answers: [
        { id: "q6a1", text: "Queue", isCorrect: false },
        { id: "q6a2", text: "Stack", isCorrect: true },
        { id: "q6a3", text: "Linked List", isCorrect: false },
        { id: "q6a4", text: "Array", isCorrect: false }
      ]
    },
    
    // ADVANCED QUESTIONS
    {
      id: "q7",
      text: "What is the time complexity of binary search?",
      category: "Algorithms",
      difficultyLevel: "advanced",
      answers: [
        { id: "q7a1", text: "O(n)", isCorrect: false },
        { id: "q7a2", text: "O(n²)", isCorrect: false },
        { id: "q7a3", text: "O(log n)", isCorrect: true },
        { id: "q7a4", text: "O(n log n)", isCorrect: false }
      ]
    },
    {
      id: "q8",
      text: "In React, what is the correct lifecycle method to fetch data from an API?",
      category: "React",
      difficultyLevel: "advanced",
      answers: [
        { id: "q8a1", text: "componentDidUpdate()", isCorrect: false },
        { id: "q8a2", text: "componentWillMount()", isCorrect: false },
        { id: "q8a3", text: "componentDidMount()", isCorrect: true },
        { id: "q8a4", text: "componentWillUpdate()", isCorrect: false }
      ]
    },
    {
      id: "q9",
      text: "Which of the following is NOT a valid way to handle asynchronous operations in JavaScript?",
      category: "JavaScript",
      difficultyLevel: "advanced",
      answers: [
        { id: "q9a1", text: "Callbacks", isCorrect: false },
        { id: "q9a2", text: "Promises", isCorrect: false },
        { id: "q9a3", text: "Async/await", isCorrect: false },
        { id: "q9a4", text: "For loops", isCorrect: true }
      ]
    },
    
    // EXPERT QUESTIONS
    {
      id: "q10",
      text: "What is a closure in JavaScript?",
      category: "JavaScript",
      difficultyLevel: "expert",
      answers: [
        { id: "q10a1", text: "A function that returns another function", isCorrect: false },
        { id: "q10a2", text: "A function bundled with references to its surrounding state", isCorrect: true },
        { id: "q10a3", text: "A way to close unused variables", isCorrect: false },
        { id: "q10a4", text: "A method to terminate a function execution", isCorrect: false }
      ]
    },
    {
      id: "q11",
      text: "What is the difference between 'let' and 'const' in JavaScript?",
      category: "JavaScript",
      difficultyLevel: "expert",
      answers: [
        { id: "q11a1", text: "'let' is block-scoped, 'const' is function-scoped", isCorrect: false },
        { id: "q11a2", text: "'const' variables can't be reassigned, 'let' variables can", isCorrect: true },
        { id: "q11a3", text: "'let' can only be used for primitives, 'const' for objects", isCorrect: false },
        { id: "q11a4", text: "There is no difference, they're interchangeable", isCorrect: false }
      ]
    },
    {
      id: "q12",
      text: "In TypeScript, what does the 'never' type represent?",
      category: "TypeScript",
      difficultyLevel: "expert",
      answers: [
        { id: "q12a1", text: "A value that is never used", isCorrect: false },
        { id: "q12a2", text: "A value that is never defined", isCorrect: false },
        { id: "q12a3", text: "A value that never occurs", isCorrect: true },
        { id: "q12a4", text: "A function that never returns", isCorrect: false }
      ]
    },
    
    // MONSTER QUESTIONS
    {
      id: "q13",
      text: "What is the output of this JavaScript code?\n\nlet a = 1;\nfunction b() {\n  a = 10;\n  return;\n  function a() {}\n}\nb();\nconsole.log(a);",
      category: "JavaScript",
      difficultyLevel: "monster",
      answers: [
        { id: "q13a1", text: "1", isCorrect: true },
        { id: "q13a2", text: "10", isCorrect: false },
        { id: "q13a3", text: "undefined", isCorrect: false },
        { id: "q13a4", text: "Error", isCorrect: false }
      ]
    },
    {
      id: "q14",
      text: "What is the time complexity of the following code?\n\nfunction mystery(n) {\n  let sum = 0;\n  for(let i = 0; i < n; i++) {\n    for(let j = i; j < n; j++) {\n      sum++;\n    }\n  }\n  return sum;\n}",
      category: "Algorithms",
      difficultyLevel: "monster",
      answers: [
        { id: "q14a1", text: "O(n)", isCorrect: false },
        { id: "q14a2", text: "O(n log n)", isCorrect: false },
        { id: "q14a3", text: "O(n²)", isCorrect: true },
        { id: "q14a4", text: "O(2^n)", isCorrect: false }
      ]
    },
    {
      id: "q15",
      text: "Which of the following describes monads correctly in functional programming?",
      category: "Functional Programming",
      difficultyLevel: "monster",
      answers: [
        { id: "q15a1", text: "A type of error handling mechanism", isCorrect: false },
        { id: "q15a2", text: "A design pattern for object-oriented programming", isCorrect: false },
        { id: "q15a3", text: "A structure that represents computations as sequences of steps", isCorrect: true },
        { id: "q15a4", text: "A way to create immutable variables", isCorrect: false }
      ]
    }
  ]
};
