import { pgTable, serial, boolean, timestamp, integer, uuid, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { achievements } from "./achievements";


export const userAchievement = pgTable('user_achievement', {
    userId: uuid('user_Id').references(() => users.id),
    achievementId: integer('achievement_id').references(() => achievements.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }, (table) => (
     {
        pk: primaryKey({columns: [table.userId, table.achievementId]}),
    }
));
