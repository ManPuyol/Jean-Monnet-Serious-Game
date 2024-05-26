'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
// import { userAchievement } from '@/schemas/user_achievements.ts';
import { Flame, Trophy } from 'lucide-react';

export default function ProfilePage() {
  // Fetch user's achievements and streak here
  // For example: const achievements = userAchievement.fetch();

  return (
    <div className="flex flex-col h-full flex-1 justify-center items-center gap-6 p-6 ">
      <Card>
        <CardHeader>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>DF</AvatarFallback>
          </Avatar>
          <Flame />
        </CardHeader>
        <CardContent>{/* Display user's streak here */}</CardContent>
      </Card>

      <Card>
        <CardHeader>Achievements</CardHeader>
        <CardContent>{/* Display user's achievements here */}</CardContent>
      </Card>
    </div>
  );
}
