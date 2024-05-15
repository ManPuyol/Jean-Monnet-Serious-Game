// import { lessons, units } from "@/db/schema"

import { UnitBanner } from './unit-banner';
import { LessonButton } from './lesson-button';
import { Quiz } from '@/schemas/quizzes';

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons?: Quiz[];
  activeLesson: any;
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <>
      <UnitBanner
        title={title}
        description={description}
        locked={!lessons?.length}
      />
      <div className="flex items-center flex-col relative">
        {lessons && lessons.length > 0 ? (
          <>
            {lessons.map((lesson: Quiz, index: number) => {
              return (
                <LessonButton
                  key={lesson.id}
                  id={lesson.id}
                  index={index + 1}
                  totalCount={8}
                  current={lesson.score === null} //lesson.id === activeLesson.id}
                  locked={false} //lesson.id !== activeLesson.id}
                  percentage={activeLessonPercentage}
                />
              );
            })}
            {lessons.length < 8 &&
              Array(8 - lessons.length)
                .fill(0)
                .map((_, index) => (
                  <LessonButton
                    key={index}
                    id={2222}
                    index={lessons.length + index + 1}
                    totalCount={8}
                    current={false}
                    locked={true}
                    percentage={activeLessonPercentage}
                  />
                ))}
          </>
        ) : (
          <div className="opacity-50">
            <LessonButton
              id={2222}
              index={1}
              totalCount={8}
              current={false} //lesson.id === activeLesson.id}
              locked={true} //lesson.id !== activeLesson.id}
              percentage={activeLessonPercentage}
            />
            <LessonButton
              id={2223}
              index={2}
              totalCount={8}
              current={false} //lesson.id === activeLesson.id}
              locked={true} //lesson.id !== activeLesson.id}
              percentage={activeLessonPercentage}
            />
            <LessonButton
              id={2224}
              index={3}
              totalCount={8}
              current={false} //lesson.id === activeLesson.id}
              locked={true} //lesson.id !== activeLesson.id}
              percentage={activeLessonPercentage}
            />
            <LessonButton
              id={2223}
              index={4}
              totalCount={8}
              current={false} //lesson.id === activeLesson.id}
              locked={true} //lesson.id !== activeLesson.id}
              percentage={activeLessonPercentage}
            />
            <LessonButton
              id={2224}
              index={5}
              totalCount={8}
              current={false} //lesson.id === activeLesson.id}
              locked={true} //lesson.id !== activeLesson.id}
              percentage={activeLessonPercentage}
            />
            <LessonButton
              id={2224}
              index={6}
              totalCount={8}
              current={false} //lesson.id === activeLesson.id}
              locked={true} //lesson.id !== activeLesson.id}
              percentage={activeLessonPercentage}
            />
            <LessonButton
              id={2224}
              index={7}
              totalCount={8}
              current={false} //lesson.id === activeLesson.id}
              locked={true} //lesson.id !== activeLesson.id}
              percentage={activeLessonPercentage}
            />
            <LessonButton
              id={2224}
              index={8}
              totalCount={8}
              current={false} //lesson.id === activeLesson.id}
              locked={true} //lesson.id !== activeLesson.id}
              percentage={activeLessonPercentage}
            />
          </div>
        )}
      </div>
    </>
  );
};
