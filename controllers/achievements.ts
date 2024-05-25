import { db } from "@/utils/drizzle/db";
import { achievements, userAchievement, users } from "@/drizzle/schema";
import { eq, inArray, min, notInArray, sql } from "drizzle-orm";
import { UUID } from "crypto";
import { getUser } from "@/lib/utils";
import { NextResponse } from "next/server";
import { getUserStats } from "./profiles";

enum Achievements_Types {
    QUIZZES_DONE = 1,
    QUIZZES_PASSED = 2,
    QUIZZES_PERFECT = 3,
}


export const updateAchievementsState = async () => {

    const user = await getUser();

    if (!user){
        NextResponse.json("Missing user");
    }
    
    const closestAchievements = await getClosestAchievements(user);
    const userStats = await getUserStats();

    for (const achievement of closestAchievements){
        if (achievement.type == Achievements_Types.QUIZZES_DONE){
            checkIfItCanGainAchievement(achievement.threshold, userStats.quizzesDone)
        } else if (achievement.type == Achievements_Types.QUIZZES_PASSED){
            checkIfItCanGainAchievement(achievement.threshold, userStats.quizzesPassed)
        }
    }

}

export const checkIfItCanGainAchievement = async (currentNumber : any, numberToReach : any) => {

}

export const getClosestAchievements = async (user : any) => {
    const subQuery = db.select({ achievementId: userAchievement.achievementId })
    .from(userAchievement)
    .where(eq(userAchievement.userId, user.id));

    const remainingAchievements = await db
    .select({
        type : achievements.type,
        threshold : min(achievements.threshold),
    })
    .from(achievements)
    .where(notInArray(achievements.id, subQuery))
    .groupBy(achievements.type)
    .orderBy(achievements.type);

    console.log(remainingAchievements);
    //de los remaining achievements hay que sacar los que tengan el treshold menor y 1 de cada tipo

    return remainingAchievements;
}