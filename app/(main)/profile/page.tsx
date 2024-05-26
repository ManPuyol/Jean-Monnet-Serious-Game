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
import { CalendarDays, CircleUser, Flame, Trophy } from 'lucide-react';
import { getUserNameInitials, getUserStats } from '@/controllers/profiles';
import { Button } from '@/components/ui/button';
import { Quests } from '@/components/quests';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default async function ProfilePage() {
  // Fetch user's achievements and streak here
  // For example: const achievements = userAchievement.fetch();
  const { nameInitials } = await getUserNameInitials();

  return (
    <div className="flex flex-col h-full flex-1 justify-start items-center gap-6 p-6 ">
      {/* <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row gap-4 align-middle items-center justify-center">

          <div className="flex justify-between space-x-4">
            <Avatar className="h-20 w-20 text-3xl">
              <AvatarImage src="" />
              <AvatarFallback>{nameInitials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">
                The React Framework – created and maintained by @vercel.
              </p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
                <span className="text-xs text-muted-foreground">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-row gap-4 items-center justify-center"> */}
      <Card className=" w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Achivements</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg shadow-lg bg-white dark:bg-gray-950 transition-all hover:scale-105 hover:shadow-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-full  text-white">
                <p className="text-4xl">✍️</p>
              </div>
              <p className="text-sm font-medium text-center">Lightning Fast</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Quests />
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          {/* <TabsTrigger value="Quests">Quests</TabsTrigger> */}
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        {/* <TabsContent value="Quests">
          <Quests points={0} />
        </TabsContent> */}
      </Tabs>
      {/* </CardContent>
      </Card> */}
    </div>
  );
}
