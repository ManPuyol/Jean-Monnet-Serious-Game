import { answers } from '@/drizzle/schema';
import { QuestionBuilder } from './QuestionBuilder';
import { getQuestionsFromUnit } from '@/controllers/questions';

export default async function page({
  params,
}: {
  params: { id: number; unitId: number };
}) {
  const questions = await getQuestionsFromUnit(params.unitId);

  return (
    <QuestionBuilder questions={questions}/>
  );
}


