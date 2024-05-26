import { getUser } from '@/lib/utils';
import SubjectSelectionCard from './SubjectSelectionCard';
import { redirect } from 'next/navigation';

export default async function Study() {

  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
    return;
  }

  return <SubjectSelectionCard user={user!} />;
}
