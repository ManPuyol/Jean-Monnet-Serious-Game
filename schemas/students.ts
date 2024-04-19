import { pgTable, integer, uuid} from "drizzle-orm/pg-core"
import { users } from "./users";

export const students = pgTable("students", {
	id: integer("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => users.id),
});