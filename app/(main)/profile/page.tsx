import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
// import { userAchievement } from '@/schemas/user_achievements.ts';
import { CalendarDays } from 'lucide-react';
import { getProfileInfo } from '@/controllers/profiles';
import { Button } from '@/components/ui/button';
import { Quests } from '@/components/quests';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAchievements } from '@/controllers/achievements';
import { getEmoji } from '@/lib/utils';
import ChangePasswordForm from './ChangePasswordForm';


export default async function ProfilePage() {
  const { nameInitials, userName, joinedAt } = await getProfileInfo();
  const achievements = await getAchievements();

  return (
    <ScrollArea className="h-[calc(100vh-60px)]">
      <div className="flex flex-col flex-1 justify-start items-center gap-6 p-6 ">
        <Card className="w-full max-w-3xl">
          <CardHeader className="flex flex-row gap-4 align-middle items-center justify-center">
            <div className="flex justify-between space-x-4">
              <Avatar className="h-20 w-20 text-3xl">
                <AvatarImage src="" />
                <AvatarFallback>{nameInitials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex flex-col justify-center">
                <h4 className="text-lg font-semibold">{userName}</h4>

                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
                  <span className="text-xs text-muted-foreground">
                    {`Joined on ${new Date(joinedAt!).toDateString()}`}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 p-3 rounded-lg border transition-all hover:scale-105 hover:shadow-accent hover:shadow-xl ">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full  text-white">
                      <p className="text-4xl">{getEmoji(achievement.type)}</p>
                    </div>
                    <p className="text-sm font-semibold text-center">
                      {achievement.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm items-center align-middle p-6 text-center w-full text-muted-foreground">
                No achievements yet
              </p>
            )}
          </CardContent>
        </Card>
        <Quests />
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Change password</CardTitle>
            <CardDescription>
              Change your password here. Make sure to use a strong password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 w-full">
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
