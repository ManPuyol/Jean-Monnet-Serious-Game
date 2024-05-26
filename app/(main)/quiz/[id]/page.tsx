import { getQuiz } from '@/controllers/quizzes'
import React from 'react'
import { Quiz } from './Quiz';
import { getUser } from "@/lib/getUser";

export default async function page({ params }: { params: { id: number } }) {
  const data = await getQuiz(params.id);

  if (!data){
    throw new Error ("Quiz not found");
  }

  const {score, quizDetails} = data;
  const user = await getUser();

  return (
    <Quiz questions={quizDetails!} user={user} previousScore={score} quizId={params.id}/>
  )
}