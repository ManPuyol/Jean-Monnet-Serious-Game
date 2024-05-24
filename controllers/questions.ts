"use server";
import { InsertQuestion, questions } from "@/schemas/questions";
import { db } from "@/utils/drizzle/db";
import { eq, and } from "drizzle-orm";

export const addQuestion = async (question: InsertQuestion) => {
  await db
    .insert(questions)
    .values(question);
};

export const allquestions = async () => {
  const data = await db
    .select()
    .from(questions);
  return data;
};

export const allActiveQuestions = async () => {
  const data = await db
    .select()
    .from(questions)
    .where(
      eq(questions.active, true)
    );
  return data;
};

export const deleteQuestion = async (id: number) => {
  await db
  .delete(questions)
  .where(
    eq(questions.id, id)
  );
};

export const updateQuestion = async (id: number, question: InsertQuestion) => {
  await db
    .update(questions)
    .set({
      ...question,
      updatedAt: new Date().toDateString(),
    })
    .where(
      eq(questions.id, id)
    );
};

export const disableQuestion = async (id: number) => {
  await db
    .update(questions)
    .set({
      active : false,
      updatedAt: new Date().toDateString(),
    })
    .where(
      eq(questions.id, id)
    );
};

export const getQuestionsFromUnit = async (unit_id : number) => {

  const data = await db.query.questions.findMany({
    where: (questions, { eq }) => (and(
      eq(questions.unitId, unit_id),
    )),
    columns: {id : true, question : true},
    with: {
      answers: {
        columns: { name: true, correct: true },
      },
    }
  })

  return data;
}