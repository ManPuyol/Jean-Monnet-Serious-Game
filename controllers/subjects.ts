"use server";
import { InsertSubject, subjects } from "@/schemas/subjects";
import { db } from "@/utils/drizzle/db";
import { eq } from "drizzle-orm";

export const addSubject = async (subject: InsertSubject) => {
  await db.insert(subjects).values(subject);
};

export const allSubjects = async () => {
  const data = await db.select().from(subjects);
  return data;
};

export const deleteSubject = async (id: number) => {
  await db.delete(subjects).where(eq(subjects.id, id));
};

export const updateSubject = async (id: number, subject: InsertSubject) => {
  await db
    .update(subjects)
    .set({
      ...subject,
      updatedAt: new Date().toDateString(),
    })
    .where(eq(subjects.id, id));
};