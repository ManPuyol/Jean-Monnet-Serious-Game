import { getUser } from '@/lib/utils';
import SubjectSelectionCard from './SubjectSelectionCard';
import { redirect } from 'next/navigation';
import { updateAchievementsState } from '@/controllers/achievements';

export default async function Study() {
  // const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  // const [subjects, setSubjects] = useState<Subject[]>([]);
  // const [isPending, startTransition] = useTransition();
  // const [user, setUser] = useState<User>({} as User);
  // const router = useRouter();

  // useEffect(() => {
  //   startTransition(() => {
  //     getUser().then(user => {
  //       if (!user) {
  //         router.push('/sign-in');
  //         return;
  //       }
  //       setUser(user);
  //       getEnrolledSubjects(user.id as UUID).then(enrolledSubjects => {
  //         allSubjects().then(allSubjects => {
  //           const selectedSubjects = allSubjects.filter(subject =>
  //             enrolledSubjects.some(
  //               enrolledSubject => enrolledSubject.id === subject.id,
  //             ),
  //           );
  //           setSubjects(allSubjects);
  //           setSelectedSubjects(selectedSubjects);
  //         });
  //       });
  //     });
  //   });
  // }, []);

  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
    return;
  }

  const aa = await updateAchievementsState();
  console.log(aa)

  return <SubjectSelectionCard user={user!} />;
}
