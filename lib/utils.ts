import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from '@/utils/supabase/server';


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