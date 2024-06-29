'use client';
import * as React from 'react';
import { Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import StudyLink from './StudyLink';

export default function BackLink() {
  const path = usePathname();
  const router = useRouter();

  if (path === '/study' || path.startsWith('/quiz')) {
    return null;
  }

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        onClick={router.back}
        size="icon"
        className="shrink-0"
      >
        <Undo2 className="h-5 w-5" />
      </Button>
      <StudyLink />
    </div>
  );
}
