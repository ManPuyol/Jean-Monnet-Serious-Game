import { getSubjects } from '@/controllers/subjects';
import { Enroll } from '@/app/(main)/study/[id]/enroll';
import SubjectNavigation from './SubjectNavigation';
import { Subject } from '@/schemas/subjects'; // Import the Subject type
import { createClient } from '@/utils/supabase/server';
import { UUID } from 'crypto';
import { redirect } from 'next/navigation';

export default async function StudentSidebar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) return redirect('/sign-in');

  const subjects: Subject[] = await getSubjects(user.id as UUID); // Specify the type of the subjects variable
  return (
    <div className="flex-1 md:border-r pt-2">
      <div className="py-2">
        <div className="flex items-center pl-7 pr-3 justify-between mb-2">
          <h3 className="font-semibold text-lg tracking-tight">Subjects</h3>
          <Enroll user={user}/>
        </div>
        <SubjectNavigation
          subjects={subjects}
          path="study"
        />
      </div>
    </div>
  );
}
