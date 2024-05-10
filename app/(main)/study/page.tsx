import { redirect } from 'next/navigation';

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

const LearnPage = async () => {
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

  const userId = "9ad9571a-8c75-49ca-a658-9da64516dad7"
  const units = await getActiveUnits(2);
  console.log(units)

  return (
    <div className="flex flex-row-reverse gap-[24px] p-6 ">
      <StickyWrapper>
        <Quests points={userProgress.points} />
      </StickyWrapper>
        <FeedWrapper>
            {
            units.map((unit) => (
              <Unit
                key={unit.id}
                id={unit.id}
                order={1}
                description={unit.description}
                title={unit.name}
                lessons={null}
                activeLesson={courseProgress.activeLesson}
                activeLessonPercentage={lessonPercentage}
              />
            ))
          }
        </FeedWrapper>
    </div>
  );
};

export default LearnPage;
