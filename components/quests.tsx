import Link from 'next/link';
import Image from 'next/image';

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { quests } from '@/constants';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getUserStats } from '@/controllers/profiles';
import { Award, BookOpenCheck, CircleUser, Flame, Trophy } from 'lucide-react';

export const Quests = async () => {
  const userstats = await getUserStats();
  console.log(userstats);
  return (
    <Card className="space-y-2 w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>Quests</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="w-full space-y-4">
          <div className="flex items-center w-full pb-4 gap-x-3">
            <p className="text-4xl">✍️</p>

            <div className="flex flex-col gap-y-2 w-full">
              <p className=" text-sm font-bold">Quizzes done</p>
              <Progress value={30} className="h-2" />
            </div>
          </div>
          <div className="flex items-center w-full pb-4 gap-x-3">
            <p className="text-4xl">🏅</p>

            <div className="flex flex-col gap-y-2 w-full">
              <p className=" text-sm font-bold">Quizzes approved</p>
              <Progress value={30} className="h-2" />
            </div>
          </div>
          <div className="flex items-center w-full pb-4 gap-x-3">
            <p className="text-4xl">💯</p>

            <div className="flex flex-col gap-y-2 w-full">
              <p className=" text-sm font-bold">Perfect scores</p>
              <Progress value={30} className="h-2" />
            </div>
          </div>
        </ul>
        {/* <ul className="w-full space-y-4">
        {quests.map((quest, index) => {
          const progress = (points / quest.value) * 100;

          return (
            <div
              className="flex items-center w-full pb-4 gap-x-3"
              key={quest.title + index}
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <Trophy className=" h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
              </Button>

              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-neutral-700 text-sm font-bold">asdasd</p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          );
        })}
      </ul> */}
      </CardContent>
    </Card>
  );
};
