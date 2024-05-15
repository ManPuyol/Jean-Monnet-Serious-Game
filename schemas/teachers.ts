import { pgTable, uuid, serial } from "drizzle-orm/pg-core";
import { users } from "./users";


export const teachers = pgTable("teachers", {
	id: integer("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});