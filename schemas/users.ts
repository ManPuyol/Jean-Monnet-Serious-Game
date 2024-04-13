import { pgTable, serial, varchar, pgEnum, timestamp, uuid, foreignKey } from "drizzle-orm/pg-core";

export const role = pgEnum('role', ['teacher', 'student', 'admin']);

export const users = pgTable("users", {
	id: uuid("auth_id").unique().primaryKey().notNull(),
	fullName: varchar("fullName", { length: 256 }),
	email: varchar("email", { length: 256 }),
	role: role("role").default('student'),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	authId: uuid("auth_id"),
},
(table) => {
	return {
		publicUsersAuthIdFkey: foreignKey({
			columns: [table.id],
			foreignColumns: [table.id],
			name: "public_users_auth_id_fkey"
		}),
	}
});

