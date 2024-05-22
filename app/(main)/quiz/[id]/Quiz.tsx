'use client';
import { useState } from 'react';
import { Question } from '@/schemas/questions';
import Test from './Test';
import { QuizResults } from './QuizResults';


export function Quiz() {
  const questions: Question[] = [
    {
      id: 1,
      unitId: 1,
      question: 'What is the capital of France?',
      hard: false,
      active: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 2,
      unitId: 1,
      question: 'What is the capital of Germany?',
      hard: false,
      active: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 3,
      unitId: 1,
      question: 'What is the capital of Spain?',
      hard: false,
      active: true,
      createdAt: '',
      updatedAt: '',
    },
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any>([]);

  function getScore() {
    const correctAnswers = answers.reduce((acc: number, answer: any) => {
      if (answer.correct) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return (correctAnswers * 100) / questions.length;
  }

  return (
    <>
      {currentQuestion < questions.length ? (
        <Test
          question={questions[currentQuestion].question}
          setCurrentQuestion={setCurrentQuestion}
          setAnswers={setAnswers}
          progress={(currentQuestion * 100) / questions.length}
          answers={[
            {
              id: 1,
              name: 'a',
              createdAt: '',
              updatedAt: '',
              questionId: 1,
              correct: true,
            },
            {
              id: 2,
              name: 'b',
              createdAt: '',
              updatedAt: '',
              questionId: 1,
              correct: false,
            },
            {
              id: 3,
              name: 'c',
              createdAt: '',
              updatedAt: '',
              questionId: 1,
              correct: false,
            },
          ].sort(() => Math.random() - 0.5)} />
      ) : (
        <QuizResults getScore={getScore} />
      )}
    </>
  );
}
