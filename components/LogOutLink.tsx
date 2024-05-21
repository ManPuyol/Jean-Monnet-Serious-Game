"use client"
import Link from 'next/link';
import * as React from 'react';
import { signOut } from '@/lib/utils';


export const LogOutLink = () => {
  return (
    <Link href={'/sign-in'} onClick={() => signOut()}>
      Logout
    </Link>
  );
};
