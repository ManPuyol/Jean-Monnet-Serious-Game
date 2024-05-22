import { getQuiz } from '@/controllers/quizzes'
import React from 'react'
import { Quiz } from './Quiz';

export default async function page({ params }: { params: { id: number } }) {
  const quizData = await getQuiz(params.id);
  return (
    <>
    <Quiz questions={quizData!}/>
    </>
  )
}