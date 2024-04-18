// import { lessons, units } from "@/db/schema"

import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: any
  activeLesson:any
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
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
          <LessonButton
            key={1}
            id={1}
            index={1}
            totalCount={ 7}
            current={false}
            locked={false}
            percentage={40}
          />
        <LessonButton
            key={2}
            id={2}
            index={2}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={3}
            id={3}
            index={3}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={4}
            id={4}
            index={4}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={5}
            id={5}
            index={5}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={6}
            id={6}
            index={6}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={7}
            id={7}
            index={7}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
          <LessonButton
            key={1}
            id={1}
            index={1}
            totalCount={ 7}
            current={false}
            locked={false}
            percentage={40}
          />
        <LessonButton
            key={2}
            id={2}
            index={2}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={3}
            id={3}
            index={3}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={4}
            id={4}
            index={4}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={5}
            id={5}
            index={5}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={6}
            id={6}
            index={6}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={7}
            id={7}
            index={7}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
          <LessonButton
            key={1}
            id={1}
            index={1}
            totalCount={ 7}
            current={false}
            locked={false}
            percentage={40}
          />
        <LessonButton
            key={2}
            id={2}
            index={2}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={3}
            id={3}
            index={3}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={4}
            id={4}
            index={4}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={5}
            id={5}
            index={5}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={6}
            id={6}
            index={6}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        <LessonButton
            key={7}
            id={7}
            index={7}
            totalCount={ 7}
            current={false}
            locked={true}
            percentage={40}
          />
        {/* {lessons.map((lesson: any, index: any) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          );
        })} */}
      </div>
    </>
  );
};