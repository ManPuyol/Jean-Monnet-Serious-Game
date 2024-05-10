import { pgTable, serial, boolean, timestamp, integer, uuid, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { achievements } from "./achievements";


export const userAchievement = pgTable("user_achievement", {
	userId: uuid("user_Id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	achievementId: integer("achievement_id").notNull().references(() => achievements.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userAchievementPkey: primaryKey({ columns: [table.userId, table.achievementId], name: "user_achievement_pkey"})
	}
});
