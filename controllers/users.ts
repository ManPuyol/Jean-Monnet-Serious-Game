"use server";
import { users } from "@/schemas/users";
import { db } from "@/utils/drizzle/db";
import { createClient } from "@/utils/supabase/server";

export const allUsers = async () => {
  const data = await db.select().from(users);
  return data;
};


export const signUp = async (body: { email: any; password: any; data: any; }) => {

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp(
    {
      email: body.email,
      password: body.password,
      options: { 
        data: body.data
      }
    }
  )
  return data;
}
