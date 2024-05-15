import { getSubjects } from '@/controllers/subjects';
import { Enroll } from '@/app/(main)/study/[id]/enroll';
import SubjectNavigation from './SubjectNavigation';
import { Subject } from '@/schemas/subjects'; // Import the Subject type

export default async function StudentSidebar({activeSubjectId}: {activeSubjectId: string}) { // Specify the type of the activeSubject variable
  const userId = 'e51f9ddf-4534-49e5-b1ff-aef5a43c8256'

  const subjects: Subject[] = await getSubjects(userId); // Specify the type of the subjects variable
  return (
    <div className="flex-1 md:border-r pt-2">
      <div className="px-3 py-2">
        <div className="flex items-center pl-4 justify-between mb-2">
          <h3 className="font-semibold text-lg tracking-tight">Subjects</h3>
          <Enroll />
        </div>
        <SubjectNavigation subjects={subjects} path="study" activeSubjectId={activeSubjectId} />
      </div>
    </div>
  );
}