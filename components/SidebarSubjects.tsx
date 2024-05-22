import { allSubjects } from '@/controllers/subjects';
import AddSubject from '@/app/(main)/teach/create-subject';
import SubjectNavigation from './SubjectNavigation';
import { Subject } from '@/schemas/subjects'; // Import the Subject type

export default async function SidebarSubjects() {
  const subjects: Subject[] = await allSubjects();
  return (
    <div className="flex-1 md:border-r pt-2">
      <div className="px-3 py-2">
        <div className="flex items-center pl-4 justify-between mb-2">
          <h3 className="font-semibold text-lg tracking-tight">Subjects</h3>
          <AddSubject />
        </div>
        <SubjectNavigation subjects={subjects} path="teach" />
      </div>
    </div>
  );
}
