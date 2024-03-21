"use server";
import { InsertSubject, subjects } from "@/schemas/subjects";
import { db } from "@/utils/drizzle/db";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";

export const addSubject = async (subject: InsertSubject) => {
  await db.insert(subjects).values(subject);
  revalidatePath("/");
};

export const allSubjects = async () => {
    const data = await db.select().from(subjects);
    return data;
  };
  

// export const deleteTodo = async (id: number) => {
//   await db.delete(todo).where(eq(todo.id, id));

//   revalidatePath("/");
// };

// export const toggleTodo = async (id: number, done: boolean) => {
//   await db
//     .update(todo)
//     .set({
//       done: done,
//     })
//     .where(eq(todo.id, id));

//   revalidatePath("/");
// };

// export const editTodo = async (id: number, text: string) => {
//   await db
//     .update(todo)
//     .set({
//       text: text,
//     })
//     .where(eq(todo.id, id));

//   revalidatePath("/");
// };