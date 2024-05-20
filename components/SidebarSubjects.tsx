import { allSubjects } from '@/controllers/subjects';
import AddSubject from '@/app/(main)/teach/create-subject';
import SubjectNavigation from './SubjectNavigation';
import { Subject } from '@/schemas/subjects'; // Import the Subject type

export default async function SidebarSubjects({
  activeSubjectId,
}: {
  activeSubjectId: string;
}) {
  const subjects: Subject[] = await allSubjects();
  console.log(activeSubjectId);
  return (
    <div className="flex-1 md:border-r pt-2">
      <div className="px-3 py-2">
        <div className="flex items-center pl-4 justify-between mb-2">
          <h3 className="font-semibold text-lg tracking-tight">Subjects</h3>
          <AddSubject />
        </div>
        <SubjectNavigation
          subjects={subjects}
          path="teach"
          activeSubjectId={activeSubjectId}
        />
      </div>
    </div>
  );
}
