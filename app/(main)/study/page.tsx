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
    <div className="flex flex-row-reverse gap-[24px] p-6 ">
      <StickyWrapper>
        <Quests points={userProgress.points} />
      </StickyWrapper>
        <FeedWrapper>
          <Unit
            id={1}
            order={1}
            description={'desc'}
            title="Unit 1"
            lessons={null}
            activeLesson={
              courseProgress.activeLesson as
                | (any & {
                    unit: any;
                  })
                | undefined
            }
            activeLessonPercentage={lessonPercentage}
          />
          <Unit
            id={1}
            order={1}
            description={'desc'}
            title="Unit 1"
            lessons={null}
            activeLesson={
              courseProgress.activeLesson as
                | (any & {
                    unit: any;
                  })
                | undefined
            }
            activeLessonPercentage={lessonPercentage}
          />
          <Unit
            id={1}
            order={1}
            description={'desc'}
            title="Unit 1"
            lessons={null}
            activeLesson={
              courseProgress.activeLesson as
                | (any & {
                    unit: any;
                  })
                | undefined
            }
            activeLessonPercentage={lessonPercentage}
          />
          <Unit
            id={1}
            order={1}
            description={'desc'}
            title="Unit 1"
            lessons={null}
            activeLesson={
              courseProgress.activeLesson as
                | (any & {
                    unit: any;
                  })
                | undefined
            }
            activeLessonPercentage={lessonPercentage}
          />
        </FeedWrapper>
    </div>
  );
};

export default LearnPage;
