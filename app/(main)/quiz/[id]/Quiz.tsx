'use client';
import { useEffect, useState } from 'react';
import { Question } from '@/schemas/questions';
import Test from './Test';
import { QuizResults } from './QuizResults';
import { UUID } from 'crypto';
import { submitQuiz } from '@/controllers/quizzes';
import { getUser } from '@/lib/utils';

export type quizAnswers = {
  userId: string,
  results: {
    questionId: number,
    correct: boolean,
  }[]
}

const submitResults = async (answers: any, user: any, score : number, previousScore : number, quizId : number) => {

  const query : quizAnswers = {
    userId : user!.id,
    results : answers,
  }

  submitQuiz(query, score, previousScore, quizId);

}

export function Quiz({ questions , user , previousScore, quizId}: { questions: any[] , user: any , previousScore : any, quizId : number}) {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any>([]);

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      void submitResults(answers, user, getScore() , previousScore, quizId);
    }
  }, [answers]);

  function getScore() {
    const correctAnswers = answers.reduce((acc: number, answer: any) => {
      if (answer.correct) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return Math.round((correctAnswers * 100) / questions.length);
  }

  return (
    <>
      {currentQuestion < questions.length ? (
        <Test
          question={questions[currentQuestion].question.question}
          setCurrentQuestion={setCurrentQuestion}
          setAnswers={setAnswers}
          progress={(currentQuestion * 100) / questions.length}
          answers={questions[currentQuestion].question.answers.sort(() => Math.random() - 0.5)} />
      ) : (
        <QuizResults getScore={getScore} />
      )}
    </>
  );
}
