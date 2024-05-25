import SidebarSubjects from '@/components/SidebarSubjects';
import { allSubjects } from '@/controllers/subjects';
import { Subject } from '@/schemas/subjects'; // Import the Subject type

export default async function TeacherSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const subjects: Subject[] = await allSubjects();

  return (
    <div className="flex-1 flex-col md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:flex h-full max-h-screen flex-col">
        <SidebarSubjects subjects={subjects} />
      </div>
      <div className="h-[calc(100vh-60px)]">{children}</div>
    </div>
  );
}
