"use server";
import { quizAnswers } from "@/app/(main)/quiz/[id]/Quiz";
import { quizDetails } from "@/drizzle/schema";
import { QuizAnswers } from "@/interfaces/quizAnswers";
import { InsertQuiz, quizzes, Quiz } from "@/schemas/quizzes";
import { units, Unit } from "@/schemas/units";
import { db } from "@/utils/drizzle/db";
import { UUID } from "crypto";

import { eq, and, count, gt, gte } from "drizzle-orm";
import { checkAndAssignAchievements } from "./achievements";
import { NextResponse } from "next/server";

// export const addQuiz = async (quiz: InsertQuiz) => {
//   await db
//     .insert(quizzes)
//     .values(quiz);
// };

// export const allQuizzes = async () => {
//   const data = await db
//     .select()
//     .from(quizzes);

//   return data;
// };

// export const deleteQuiz = async (id: number) => {
//   await db
//     .delete(quizzes)
//     .where(
//       eq(quizzes.id, id)
//     );
// };

// export const updateQuiz = async (id: number, quiz: InsertQuiz) => {
//   await db
//     .update(quizzes)
//     .set({
//       ...quiz,
//       updatedAt: new Date().toDateString(),
//     })
//     .where(
//       eq(quizzes.id, id)
//     );
// };

export const getActiveQuizzes = async (userId: UUID, subjectID: number) => {
  const data = await db
    .select({
      unit: {
        id: units.id,
        description: units.description,
        name: units.name
      },
      quiz: quizzes
    })
    .from(units)
    .where(eq(units.subjectId, subjectID))
    .leftJoin(quizzes, eq(units.id, quizzes.unitId))

  const result = data.reduce<Record<number, { unit: Unit; quizzes: Quiz[] }>>(
    (acc, row) => {
      const unit = row.unit;
      const quiz = row.quiz;
      if (!acc[unit.id]) {
        //@ts-ignore
        acc[unit.id] = { unit, quizzes: [] };
      }
      if (quiz) {
        acc[unit.id].quizzes.push(quiz);
      }
      return acc;
    },
    {}
  );

  return result;
}

export const getQuiz = async (quizId: number) => {

  const data = await db.query.quizzes.findFirst({
    where: (quizzes, { eq }) => (and(
      eq(quizzes.id, quizId),
    )),
    columns: {score: true},
    with: {
      quizDetails: {
        columns: {},
        with: {
          question: {
            columns: { question: true, hard: true },
            with: {
              answers: {
                columns: { questionId: true, name: true, correct: true }
              }
            }
          }
        }
      },
    }

  })

  return data;

}

export const submitQuiz = async (allQuizzesAnswers: quizAnswers, score : number, previousScore : number, quizId : number) => {

  if (score > previousScore || previousScore == null){

    try {
      await updateScore(score, quizId);

      for (const singularQuiz of allQuizzesAnswers.results) {
        await db
          .update(quizDetails)
          .set({ correct: singularQuiz.correct })
          .where(
            and(
              eq(quizDetails.userId, allQuizzesAnswers.userId),
              eq(quizDetails.questionId, singularQuiz.questionId)
            )
          );
      }

      NextResponse.json(await checkAndAssignAchievements());

    } catch (error) {
      console.error("Error updating quiz details");
    }
  }
 
}

export const updateScore = async (newScore: number, quizId: number) => {
  const data = await db
    .update(quizzes)
    .set({ score: newScore })
    .where(
        eq(quizzes.id, quizId)
    );


  return data;
}