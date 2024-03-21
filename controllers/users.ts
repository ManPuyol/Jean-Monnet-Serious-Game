"use server";
import { users } from "@/schemas/users";
import { db } from "@/utils/drizzle/db";

export const allUsers = async () => {
  const data = await db.select().from(users);
  return data;
};
