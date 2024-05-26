import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from "next/server";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();


  return user;
}

export async function updatePassword(newPassword : string){
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if(error){
    NextResponse.json(error);
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
