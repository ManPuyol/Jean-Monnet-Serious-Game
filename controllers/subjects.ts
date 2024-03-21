"use server";
import { InsertSubject, subjects } from "@/schemas/subjects";
import { db } from "@/utils/drizzle/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addSubject = async (subject: InsertSubject) => {
  await db.insert(subjects).values(subject);
  revalidatePath("/");
};

export const allSubjects = async () => {
  const data = await db.select().from(subjects);
  return data;
};

export const deleteSubject = async (id: number) => {
  await db.delete(subjects).where(eq(subjects.id, id));
  //revalidatePath("/");
};

// export const editTodo = async (id: number, text: string) => {
//   await db
//     .update(subjects)
//     .set({
//       text: text,
//     })
//     .where(eq(subjects.id, id));

//   revalidatePath("/");
// };