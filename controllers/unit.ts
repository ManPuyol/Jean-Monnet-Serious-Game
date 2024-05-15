"use server";
import { quizzes } from "@/drizzle/schema";
import { InsertUnit, units } from "@/schemas/units";
import { db } from "@/utils/drizzle/db";
import { UUID } from "crypto";
import { eq, and } from "drizzle-orm";

export const addUnit = async (unit: InsertUnit) => {
  await db
    .insert(units)
    .values(unit);
};

export const allUnits = async () => {
  const data = await db.select().from(units);
  return data;
};

export const deleteUnit = async (id: number) => {
  await db
    .delete(units)
    .where(eq(units.id, id));
};

export const updateUnit = async (id: number, unit: InsertUnit) => {
  await db
    .update(units)
    .set({
      ...unit,
      updatedAt: new Date().toDateString(),
    })
    .where(eq(units.id, id));
};

export const getUnits = async (subjectId: number) => {
  const data = await db
    .select()
    .from(units)
    .where(eq(units.subjectId, subjectId));
  return data;
}

export const getActiveUnits = async (subjectId: number, userId: UUID) => {
  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.id)],
    where: (units, { eq }) => (and(
      eq(units.subjectId, subjectId),
      eq(units.active, true)
    )),
    with: {
      quizzes: {
        where: (quiz, { eq }) => eq(quiz.userId, userId),
      },
    }
  });

  return data;
}