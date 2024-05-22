'use client';
import { useState } from 'react';
import { Question } from '@/schemas/questions';
import Test from './Test';
import { QuizResults } from './QuizResults';


export function Quiz({ questions }: {questions : any[]}) {

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
          question={questions[currentQuestion].question.question}
          setCurrentQuestion={setCurrentQuestion}
          setAnswers={setAnswers}
          progress={(currentQuestion * 100) / questions.length}
          answers={questions[currentQuestion].question.answers}/>
      ) : (
        <QuizResults getScore={getScore} />
      )}
    </>
  );
}
