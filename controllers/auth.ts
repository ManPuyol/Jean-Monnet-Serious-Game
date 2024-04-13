'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const signIn = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (result.error) {
    console.error(result.error.message);
    return JSON.stringify(result);
    // throw new Error("Could not authenticate user");
  } else {
    console.log('User signed in');
    return redirect('/protected');
  }
};

export const signUp = async (formData: FormData) => {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm-password') as string;

  if (password !== confirmPassword) {
    return JSON.stringify({ error: { message: 'Password did not match' } });
  }

  const email = formData.get('email') as string;
  const supabase = createClient();
  const firstName = formData.get('first-name') as string;
  const lastName = formData.get('last-name') as string;
  const fullName = `${firstName} ${lastName}`;

  const role = 'student';

  const result = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      },
    },
  });

  if (result.error) {
    console.error(result.error.message);
    return JSON.stringify(result);
  } else {
    console.log('User created succesfully');
    return redirect('/sign-in');
  }

  // return redirect("/login?message=Check email to continue sign in process");
};
