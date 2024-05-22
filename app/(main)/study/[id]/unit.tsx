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
  numberOfQuizzes: number;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
  numberOfQuizzes,
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
                  totalCount={numberOfQuizzes}
                  current={lesson.score === null} //lesson.id === activeLesson.id}
                  locked={false} //lesson.id !== activeLesson.id}
                  percentage={activeLessonPercentage}
                />
              );
            })}
            {lessons.length < numberOfQuizzes &&
              Array(numberOfQuizzes - lessons.length)
                .fill(0)
                .map((_, index) => (
                  <LessonButton
                    key={index}
                    id={2222}
                    index={lessons.length + index + 1}
                    totalCount={numberOfQuizzes}
                    current={false}
                    locked={true}
                    percentage={activeLessonPercentage}
                  />
                ))}
          </>
        ) : (
          <div className="opacity-50">
            {Array(numberOfQuizzes)
                .fill(0)
                .map((_, index) => (
                  <LessonButton
                    key={index}
                    id={2222}
                    index={index + 1}
                    totalCount={numberOfQuizzes}
                    current={false}
                    locked={true}
                    percentage={activeLessonPercentage}
                  />
              ))}
          </div>
        )}
      </div>
    </>
  );
};
