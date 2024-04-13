import { pgTable, pgEnum, serial, varchar, timestamp, foreignKey, integer, uuid, boolean, smallint, unique, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const role = pgEnum("role", ['teacher', 'student', 'admin'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])


export const achievements = pgTable("achievements", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }),
	description: varchar("description", { length: 256 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const languages = pgTable("languages", {
	id: serial("id").primaryKey().notNull(),
	language: varchar("language", { length: 256 }).notNull(),
});

export const quizDetails = pgTable("quiz_details", {
	id: serial("id").primaryKey().notNull(),
	quizId: integer("quiz_id").references(() => quizzes.id),
	userId: uuid("user_Id").references(() => users.authId),
	questionId: integer("question_id").references(() => questions.id),
	subjectId: integer("subject_id").references(() => subjects.id),
	answerId: integer("answer_id").references(() => answers.id),
	correct: boolean("correct").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const quizzes = pgTable("quizzes", {
	id: serial("id").primaryKey().notNull(),
	userId: uuid("user_id").references(() => users.authId),
	score: smallint("score").notNull(),
	meta: varchar("meta", { length: 256 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const subjects = pgTable("subjects", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }),
	description: varchar("description", { length: 256 }),
	active: boolean("active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const units = pgTable("units", {
	id: serial("id").primaryKey().notNull(),
	description: varchar("description", { length: 256 }),
	subjectId: integer("subject_id").references(() => subjects.id),
	active: boolean("active").default(true),
	questionsPerQuiz: smallint("questions_per_quiz").default(10),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	authId: uuid("auth_id"),
	fullName: varchar("fullName", { length: 256 }),
	email: varchar("email", { length: 256 }),
	role: role("role").default('student'),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		publicUsersAuthIdFkey: foreignKey({
			columns: [table.authId],
			foreignColumns: [table.id],
			name: "public_users_auth_id_fkey"
		}),
		usersAuthIdUnique: unique("users_auth_id_unique").on(table.authId),
	}
});

export const questions = pgTable("questions", {
	id: serial("id").primaryKey().notNull(),
	unitId: integer("unit_id").references(() => units.id),
	question: varchar("question", { length: 256 }),
	hard: boolean("hard").default(false),
	active: boolean("active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const answers = pgTable("answers", {
	id: serial("id").primaryKey().notNull(),
	questionId: integer("question_id").references(() => questions.id),
	name: varchar("name", { length: 256 }),
	correct: boolean("correct").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const userAchievement = pgTable("user_achievement", {
	userId: uuid("user_Id").notNull().references(() => users.authId),
	achievementId: integer("achievement_id").notNull().references(() => achievements.id),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userAchievementUserIdAchievementIdPk: primaryKey({ columns: [table.userId, table.achievementId], name: "user_achievement_user_Id_achievement_id_pk"})
	}
});