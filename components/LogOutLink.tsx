'use client';
import Link from 'next/link';
import * as React from 'react';
import { createClient } from '@/utils/supabase/client';
import { DropdownMenuItem } from './ui/dropdown-menu';

export const LogOutLink = () => {
  return (
    <Link href={'/sign-in'} onClick={() => signOut()}>
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </Link>
  );
};

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  //console.log('signOut', error);
  return error;
}
