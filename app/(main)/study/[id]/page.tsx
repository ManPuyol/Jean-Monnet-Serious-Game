import { redirect } from 'next/navigation';

import { Quests } from '@/components/quests';
import { FeedWrapper } from '@/components/feed-wrapper';
import { StickyWrapper } from '@/components/sticky-wrapper';

import { Unit } from './unit';
import { getActiveUnits } from '@/controllers/unit';

import { getUser } from "@/lib/getUser";
import { UUID } from 'crypto';

const LearnPage = async ({ params }: { params: { id: string } }) => {
  const [
    userProgress,
    courseProgress,
    lessonPercentage,
  ]: any[] = [{}, {}, {}, {}];


  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
  }
  const units = await getActiveUnits(Number(params.id), user.id as UUID);

  return (
    <div className="flex flex-row-reverse gap-[24px] p-6 ">
      <StickyWrapper>
        <Quests/>
      </StickyWrapper>
      <FeedWrapper>
        {units.map(unit => (
          <Unit
            key={unit.id}
            id={unit.id}
            order={1}
            description={unit.description}
            title={unit.name}
            lessons={unit.quizzes}
            activeLesson={courseProgress.activeLesson}
            activeLessonPercentage={lessonPercentage}
            numberOfQuizzes={unit.numOfQuizzes}
          />
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
