import { pgTable, varchar, timestamp, foreignKey, uuid, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
	fullName: varchar("full_name", { length: 256 }),
	email: varchar("email", { length: 256 }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		usersIdFkey: foreignKey({
			columns: [table.id],
			foreignColumns: [table.id],
			name: "users_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
		usersAuthIdUnique: unique("users_auth_id_unique").on(table.id),
	}
});