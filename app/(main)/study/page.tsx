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
import { CardsChat } from './chat';

const LearnPage = async () => {
  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ]: any[] = [{}, {}, {}, {}, {}];

  // if (!userProgress || !userProgress.activeCourse) {
  //   redirect("/courses");
  // }

  // if (!courseProgress) {
  //   redirect("/courses");
  // }

  return (
    <div className="flex flex-row-reverse gap-[48px] p-6 ">
      <StickyWrapper>
        <div></div>
        {/* <Quests points={userProgress.points} /> */}
      </StickyWrapper>
      <FeedWrapper>
        {/* <Header title="aaaaa" /> */}
        <div>
          {/* <CardsChat /> */}
        </div>
        {/* <Unit
          id={1}
          order={1}
          description={"desc"}
          title="dadsdfs"
          lessons={null as any[]}
          activeLesson={courseProgress.activeLesson as any & {
            unit: any;
          } | undefined}
          activeLessonPercentage={lessonPercentage}
        /> */}
        {/* {units.map((unit: any) => (
          <div key={unit.id} className="mb-10">
          </div>
        ))} */}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
