'use client';
import { useEffect, useState } from 'react';
import Test from './Test';
import { QuizResults } from './QuizResults';
import { submitQuiz } from '@/controllers/quizzes';
import { toast as sonnerToast } from 'sonner';

export type quizAnswers = {
  userId: string;
  results: {
    questionId: number;
    correct: boolean;
  }[];
};

const getEmoji = (type: number) => {
  switch (type) {
    case 1:
      return '✍️';
    case 2:
      return '🏅';
    case 3:
      return '💯';
    default:
      return '🏆';
  }
};

const submitResults = async (
  answers: any,
  user: any,
  score: number,
  previousScore: number,
  quizId: number,
) => {
  const query: quizAnswers = {
    userId: user!.id,
    results: answers,
  };

  const achievements = await submitQuiz(query, score, previousScore, quizId);
  achievements?.forEach(achievement => {
    sonnerToast(
      `${getEmoji(achievement.type as number)} ${achievement.name as string}`,
      {
        description: achievement.description as string,
      },
    );
  });
};

export function Quiz({
  questions,
  user,
  previousScore,
  quizId,
}: {
  questions: any[];
  user: any;
  previousScore: any;
  quizId: number;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any>([]);

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      void submitResults(answers, user, getScore(), previousScore, quizId);
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
          answers={questions[currentQuestion].question.answers}
        />
      ) : (
        <QuizResults getScore={getScore} />
      )}
    </>
  );
}
