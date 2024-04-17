import { integer, pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { subjects } from "./subjects";
import { users } from "./users";

export const userSubjects = pgTable("user_subjects", {
	userId: uuid("user_id").defaultRandom().notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	subjectId: integer("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		userSubjectsPkey: primaryKey({ columns: [table.userId, table.subjectId], name: "user_subjects_pkey"})
	}
});