import { allSubjects } from '@/controllers/subjects';
import { Enroll } from '@/app/(main)/study/enroll';
import SubjectNavigation from './SubjectNavigation';
import { Subject } from '@/schemas/subjects'; // Import the Subject type

export default async function SidebarSubjects() {
  const subjects: Subject[] = await allSubjects(); // Specify the type of the subjects variable
  return (
    <>
      <div className="px-3 py-2">
        <div className="flex items-center pl-4 justify-between mb-2">
          <h3 className="font-semibold text-lg tracking-tight">Subjects</h3>
          <Enroll />
        </div>
        <SubjectNavigation subjects={subjects} />
      </div>
    </>
  );
}