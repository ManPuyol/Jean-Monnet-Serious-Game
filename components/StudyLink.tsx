'use client';
import Link from 'next/link';
import * as React from 'react';
import { Library } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function StudyLink() {
  const path = usePathname();

  if (
    path === '/study' ||
    path.startsWith('/teach') ||
    path.startsWith('/build')
  ) {
    return null;
  }

  return (
    <Link href="/study" className="md:hidden">
      <Button variant="outline" size="icon" className="shrink-0">
        <Library className="h-5 w-5" />
      </Button>
    </Link>
  );
}
