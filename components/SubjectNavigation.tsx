'use client';
import { Button } from './ui/button';
import { BookOpenText } from 'lucide-react';
import { Subject } from '@/schemas/subjects';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function SubjectNavigation({
  subjects,
  path,
}: {
  subjects: Array<Subject>;
  path: string;
}) {
  const router = useRouter();
  const [activeSubject, setActiveSubject] = useState<number | null>();
  return (
    <nav className="space-y-1 ">
      {subjects.map((subject, index) => (
        <Button
          key={index}
          title={subject.name as string}
          variant={activeSubject == index ? 'secondary' : 'ghost'}
          className="justify-start w-full truncate"
          onClick={() => {
            setActiveSubject(index);
            router.push(`/${path}/${subject.id}`);
          }}
        >
          <BookOpenText className="mr-2 min-h-4 min-w-4 h-4 w-4" />
          <div className="text-left w-full truncate">{subject.name}</div>
        </Button>
      ))}
    </nav>
  );
}
