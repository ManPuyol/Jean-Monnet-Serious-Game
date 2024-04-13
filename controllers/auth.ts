"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (result.error) {
      console.error(result.error.message);
      return JSON.stringify(result);
     // throw new Error("Could not authenticate user");
    }else{
      console.log("User signed in");
      return redirect("/protected");
    }

  };

//   const signUp = async (formData: FormData) => {
//     "use server";

//     const origin = headers().get("origin");
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const supabase = createClient();

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo: `${origin}/auth/callback`,
//       },
//     });

//     if (error) {
//       return redirect("/login?message=Could not authenticate user");
//     }

//     return redirect("/login?message=Check email to continue sign in process");
//   };