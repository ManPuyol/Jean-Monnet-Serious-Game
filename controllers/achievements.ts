import { db } from "@/utils/drizzle/db";
import { achievements, userAchievement, users } from "@/drizzle/schema";
import { eq, min, notInArray, sql } from "drizzle-orm";
import { getUser } from "@/lib/utils";
import { getUserStats } from "./profiles";

export const updateAchievementsState = async () => {

    const user = await getUser();

    if (!user){
        console.log("Missing user")
    }

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
    WHERE view_counter_achievements.user_id = '2b9c3b78-c680-4667-a67f-73fee79e84a6'
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
    )`;

    const result = await db.execute(query);

    for (const each of result){
        await db
        .insert(userAchievement)
        //@ts-ignore
        .currents({userId: user!.id, achievementId: each.id});
    }

    return result;

}

export const getClosestAchievements = async () => {
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

    const { quizzesDone, quizzesPassed, quizzesPerfect } = stats[0];

    // const resultArray = remainingAchievements.map(item => {
    //   let current;
    //   switch (item.type) {
    //     case 1:
    //       current = quizzesDone;
    //       break;
    //     case 2:
    //       current = quizzesPassed;
    //       break;
    //     case 3:
    //       current = quizzesPerfect;
    //       break;
    //     default:
    //       current = 0;
    //   }
    //   return { type: item.type, threshold: item.threshold, current: current };
    // });

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