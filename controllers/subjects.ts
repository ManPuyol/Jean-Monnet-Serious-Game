"use server";
import { InsertSubject, subjects } from "@/schemas/subjects";
import { db } from "@/utils/drizzle/db";

import { eq, and } from "drizzle-orm";
import { userSubjects } from "@/drizzle/schema";
import { UUID } from "crypto";

export const addSubject = async (subject: InsertSubject) => {
  await db
    .insert(subjects)
    .values(subject);
};

export const allSubjects = async () => {
  const data = await db
    .select()
    .from(subjects);
  return data;
};

export const allActiveSubjects = async () => {
  const data = await db
    .select()
    .from(subjects)
    .where(
      eq(subjects.active, true)
    );
  return data;
};

export const deleteSubject = async (id: number) => {
  await db
  .delete(subjects)
  .where(
    eq(subjects.id, id)
  );
};

export const updateSubject = async (id: number, subject: InsertSubject) => {
  await db
    .update(subjects)
    .set({
      ...subject,
      updatedAt: new Date().toDateString(),
    })
    .where(
      eq(subjects.id, id)
    );
};

export const getSubjectsFromUserID = async (userId : UUID) => {
  const data = await db
    .select({
      subjects
    })
    .from(subjects)
    .innerJoin(userSubjects, eq(subjects.id, userSubjects.subjectId))
    .where(
      eq(userSubjects.userId, userId)
    );

  return data;
}

export const getActiveSubjectsFromUserID = async (userId : UUID) => {
  const data = await db
    .select({
      subjects
    })
    .from(subjects)
    .innerJoin(userSubjects, eq(subjects.id, userSubjects.subjectId))
    .where(
      and(
        eq(userSubjects.userId, userId), 
        eq(subjects.active, true)
      )
    );
    
  return data;
}
