import { db } from "@/utils/drizzle/db";
import { achievements, userAchievement, users } from "@/drizzle/schema";
import { eq, min, notInArray, sql } from "drizzle-orm";
import { getUser } from "@/lib/getUser";
import { getUserStats } from "./profiles";

export const getAchievements = async () => {
    const user = await getUser();

    if (!user){
        console.log("Missing user")
    }

    const data = await db
    .select({
        type: achievements.type,
        name : achievements.name,
        description : achievements.description
    })
    .from(achievements)
    .innerJoin(userAchievement, eq(achievements.id, userAchievement.achievementId))
    .where(eq(userAchievement.userId, user!.id));

    return data;
}

export const checkAndAssignAchievements = async () => {

    const user = await getUser();

    if (!user){
        console.log("Missing user")
    }

    const user__id = user?.id;

    const query = sql`
    SELECT achievements.id, achievements.name, achievements.description, achievements.type
    FROM ((
    view_counter_achievements
    CROSS JOIN achievements
    )
    LEFT OUTER JOIN user_achievement ON (
        achievements.id = user_achievement.achievement_id
        AND view_counter_achievements.user_id = user_achievement."user_Id"
    )
    )
    WHERE view_counter_achievements.user_id = ${user__id}
    AND (user_achievement.achievement_id IS NULL)
    AND ((
        quizzes_done >= threshold)
        AND ( type = 1 )
        OR ((quizzes_passed >= threshold)
        AND ( type = 2)
        )
        OR ((quizzes_perfect >= threshold)
        AND (type = 3)
        )
    );`;

    const result = await db.execute(query);

    for (const each of result){
        await db
        .insert(userAchievement)
        //@ts-ignore
        .values({userId: user__id, achievementId: each.id});
    }

    return result;

}

export const getAchievementsProgress = async () => {
    const user = await getUser();

    if (!user){
        console.log("Missing user")
    }

    const subQuery = db.select({ achievementId: userAchievement.achievementId })
    .from(userAchievement)
    .where(eq(userAchievement.userId, user!.id));

    const remainingAchievements = await db
    .select({
        type : achievements.type,
        threshold : min(achievements.threshold),
    })
    .from(achievements)
    .where(notInArray(achievements.id, subQuery))
    .groupBy(achievements.type)
    .orderBy(achievements.type);

    const stats = await getUserStats();

    //@ts-ignore
    const { quizzesDone, quizzesPassed, quizzesPerfect } = stats;

    const typeToValueMap = {
        1: quizzesDone,
        2: quizzesPassed,
        3: quizzesPerfect
    };

    const resultArray = remainingAchievements.map(item => ({
        type: item.type,
        threshold: item.threshold,
        //@ts-ignore
        current: typeToValueMap[item.type] || 0
    }));

    return resultArray;
}
