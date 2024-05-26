import { getUser } from "@/lib/getUser";
import SubjectSelectionCard from './SubjectSelectionCard';

export default async function Study() {

  const user = await getUser();
  return <SubjectSelectionCard user={user!} />;
}
