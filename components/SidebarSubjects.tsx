import Link from 'next/link';
import { allSubjects } from '@/controllers/subjects';
import { Enroll } from '@/app/(main)/study/enroll';
import * as React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { BookOpenText } from 'lucide-react';

export default async function SidebarSubjects() {
  const subjects = await allSubjects();

  return (
    <>
      <div className="px-3 py-2">
        <div className="flex items-center pl-4 justify-between mb-2">
          <h3 className="font-semibold text-lg tracking-tight">Subjects</h3>
          <Enroll />
        </div>

        <nav className="space-y-1 ">
          {subjects.map((subject, index) => (
            <Button
              key={index}
              variant={index === 0 ? "secondary" : "ghost"}
              className="justify-start w-full truncate"
            >
              <BookOpenText className="mr-2 min-h-4 min-w-4 h-4 w-4" />
              <div className="text-left w-full truncate">{subject.name}</div>
            </Button>
          ))}
        </nav>
      </div>
    </>
  );
}