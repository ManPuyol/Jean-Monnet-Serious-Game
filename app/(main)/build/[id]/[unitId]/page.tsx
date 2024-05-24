import { answers } from '@/drizzle/schema';
import { QuestionBuilder } from './QuestionBuilder';

export default async function page({
  params,
}: {
  params: { id: string; unitId: string };
}) {
  //GET questions from the database
  const questions: any[] = [
    {
      id: 1,
      question: '1 What is the capital of Nigeria?',
      answers: [{ name: 'Lagos', correct: false }, { name: 'Abuja', correct: true }, { name: 'Kano', correct: false }, { name: 'Ibadan', correct: false }]
    },
    {
      id: 2,
      question: '2 What is the capital of Ghana?',
      answers: [{ name: 'Accra', correct: true }, { name: 'Kumasi', correct: false }, { name: 'Tamale', correct: false }, { name: 'Tema', correct: false }]
    },
    {
      id: 3,
      question: '3 What is the capital of South Africa?',
      answers: [{ name: 'Cape Town', correct: false }, { name: 'Johannesburg', correct: false }, { name: 'Pretoria', correct: true }, { name: 'Durban', correct: false }]
    },
  ];

  return (
    <QuestionBuilder questions={questions}/>
  );
}


