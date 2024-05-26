import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient as createClientServer } from '@/utils/supabase/server';
import { createClient as createClientClient } from '@/utils/supabase/client';
import { NextResponse } from "next/server";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getUser() {
  const supabase = createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();


  return user;
}

export async function updatePassword(newPassword : string){

  const supabase = await createClientClient();

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if(error){
    return NextResponse.json(error);
  }

  return data;

}

export const getEmoji = (type: number) => {
  switch (type) {
    case 1:
      return '✍️';
    case 2:
      return '🏅';
    case 3:
      return '💯';
    default:
      return '🏆';
  }
};
