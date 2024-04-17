import { integer, pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { achievements } from "./achievements";

export const userAchievement = pgTable("user_achievement", {
	userId: uuid("user_Id").notNull().references(() => users.id),
	achievementId: integer("achievement_id").notNull().references(() => achievements.id),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userAchievementUserIdAchievementIdPk: primaryKey({ columns: [table.userId, table.achievementId], name: "user_achievement_user_Id_achievement_id_pk"})
	}
});