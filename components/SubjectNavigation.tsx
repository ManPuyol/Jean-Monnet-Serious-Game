'use client';
import { Button } from './ui/button';
import { BookOpenText } from 'lucide-react';
import { Subject } from '@/schemas/subjects';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SubjectNavigation({
  subjects,
  path,
}: {
  subjects: Array<Subject>;
  path: string;
}) {
  const pathname = usePathname();
  const [activeSubject, setActiveSubject] = useState(0);
  useEffect(() => {
    setActiveSubject(Number(pathname.split('/').slice(-1)[0]));
  }, [pathname]);

  return (
    <nav className="space-y-1 ">
      {subjects.map((subject, index) => (
        <Link href={`/${path}/${subject.id}`} key={index}>
          <Button
            key={index}
            title={subject.name as string}
            variant={activeSubject === subject.id ? 'secondary' : 'ghost'}
            className="justify-start w-full truncate"
          >
            <BookOpenText className="mr-2 min-h-4 min-w-4 h-4 w-4" />
            <div className="text-left w-full truncate">{subject.name}</div>
          </Button>
        </Link>
      ))}
    </nav>
  );
}
