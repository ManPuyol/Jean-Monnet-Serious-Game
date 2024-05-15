import { redirect, useParams } from 'next/navigation';

import { Quests } from '@/components/quests';
import { FeedWrapper } from '@/components/feed-wrapper';
import { UserProgress } from '@/components/user-progress';
import { StickyWrapper } from '@/components/sticky-wrapper';
// import { lessons, units as unitsSchema } from "@/db/schema";
// import {
//   getCourseProgress,
//   getLessonPercentage,
//   getUnits,
//   getUserProgress,
//   getUserSubscription
// } from "@/db/queries";

import { Unit } from './unit';
import { Header } from './header';
import { getActiveUnits } from '@/controllers/unit';

import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

const LearnPage = async ({ params }: { params: { id: string } }) => {
  const [
    userProgress,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ]: any[] = [{}, {}, {}, {}];

  // if (!userProgress || !userProgress.activeCourse) {
  //   redirect("/courses");
  // }

  // if (!courseProgress) {
  //   redirect("/courses");
  // }
  const userId = 'e51f9ddf-4534-49e5-b1ff-aef5a43c8256';
  const units = await getActiveUnits(Number(params.id));

  return (
    <div className="flex flex-row-reverse gap-[24px] p-6 ">
      <StickyWrapper>
        <Quests points={userProgress.points} />
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
          />
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
