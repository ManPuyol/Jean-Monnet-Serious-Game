'use client';
import { use, useState } from 'react';
import Test from './Quesition';
import { Question } from '@/schemas/questions';

export default function Quiz() {
  // Get the question and answers from the server
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
  // Set currect question counter (this will be the progress bar value)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any>([]);

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
          ].sort(() => Math.random() - 0.5)}
        />
      ) : (
        <div>
          <h1>Quiz is over</h1>
        </div>
      )}
    </>
  );
}
