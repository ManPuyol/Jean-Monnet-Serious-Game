import Link from 'next/link';
import { allSubjects } from '@/controllers/subjects';

export default async function SidebarSubjects() {
  const subjects = await allSubjects();

  return (
    <>
      <nav className="grid items-start  text-sm font-medium  ">
        {subjects.map((subject, index) => (
          <Link
            key={index}
            href="#"
            className="flex-none items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary truncate"
          >
            {subject.name}
          </Link>
        ))}
      </nav>
    </>
  );
}