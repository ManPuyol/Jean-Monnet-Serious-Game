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
      answers: ['Lagos', 'Abuja', 'Kano', 'Ibadan'],
     
    },
    {
      id: 2,
      question: '2 What is the capital of Ghana?',
      answers: ['Accra', 'Kumasi', 'Tamale', 'Tema'],
    },
    {
      id: 3,
      question: '3 What is the capital of South Africa?',
      answers: ['Cape Town', 'Johannesburg', 'Pretoria', 'Durban'],
    },
  ];

  return (
    <QuestionBuilder questions={questions}/>
  );
}


