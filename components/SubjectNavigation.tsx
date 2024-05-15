import { Button } from './ui/button';
import { BookOpenText } from 'lucide-react';
import { Subject } from '@/schemas/subjects';
import Link from 'next/link';

export default function SubjectNavigation({
  subjects,
  path,
  activeSubjectId,
}: {
  subjects: Array<Subject>;
  path: string;
  activeSubjectId: string;
}) {
  return (
    <nav className="space-y-1 ">
      {subjects.map((subject, index) => (
        <Link href={`/${path}/${subject.id}`} key={index}>
          <Button
            key={index}
            title={subject.name as string}
            variant={
              Number(activeSubjectId) === subject.id ? 'secondary' : 'ghost'
            } // Convert params.id to number before comparison
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
