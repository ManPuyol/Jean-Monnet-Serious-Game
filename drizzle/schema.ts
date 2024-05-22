import { pgTable, foreignKey, pgEnum, integer, uuid, serial, varchar, timestamp, boolean, smallint, text, unique, primaryKey } from "drizzle-orm/pg-core"
import { relations, sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const role = pgEnum("role", ['teacher', 'student', 'admin'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])


export const students = pgTable("students", {
	id: integer("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

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
	quizId: integer("quiz_id").references(() => quizzes.id, { onDelete: "cascade", onUpdate: "cascade" }),
	userId: uuid("user_id").references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	questionId: integer("question_id").references(() => questions.id, { onDelete: "cascade", onUpdate: "cascade" }),
	correct: boolean("correct").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const quizDetailsRelations = relations(quizDetails, ({ one }) => ({
	question: one(questions, {
		fields: [quizDetails.questionId],
		references: [questions.id],
	}),
	quiz: one(quizzes, {
		fields: [quizDetails.quizId],
		references: [quizzes.id],
	}),
}));

export const quizzes = pgTable("quizzes", {
	id: serial("id").primaryKey().notNull(),
	userId: uuid("user_id").references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	score: smallint("score"),
	meta: varchar("meta", { length: 256 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const quizzesRelations = relations(quizzes, ({ one, many }) => ({
	unit: one(units, {
		fields: [quizzes.unitId],
		references: [units.id],
	}),
	quizDetails: many(quizDetails),
}));

export const subjects = pgTable("subjects", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	description: varchar("description", { length: 256 }).notNull(),
	active: boolean("active").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const units = pgTable("units", {
	id: serial("id").primaryKey().notNull(),
	description: varchar("description", { length: 256 }).notNull(),
	subjectId: integer("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade", onUpdate: "cascade" }),
	active: boolean("active").default(true),
	questionsPerQuiz: smallint("questions_per_quiz").default(10).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	name: text("name").notNull(),
});

export const unitsRelations = relations(units, ({ many }) => ({
	quizzes: many(quizzes),
}));

export const questions = pgTable("questions", {
	id: serial("id").primaryKey().notNull(),
	unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade", onUpdate: "cascade" }),
	question: varchar("question", { length: 256 }),
	hard: boolean("hard").default(false),
	active: boolean("active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const answers = pgTable("answers", {
	id: serial("id").primaryKey().notNull(),
	questionId: integer("question_id").references(() => questions.id, { onDelete: "cascade", onUpdate: "cascade" }),
	name: varchar("name", { length: 256 }),
	correct: boolean("correct").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const questionRelations = relations(questions, ({ many }) => ({
	answers: many(answers),
	quizDetails: many(quizDetails)
}));

export const answersRelations = relations(answers, ({ one }) => ({
	question: one(questions, {
		fields: [answers.questionId],
		references: [questions.id],
	}),
}));

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

export const teachers = pgTable("teachers", {
	id: integer("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const userAchievement = pgTable("user_achievement", {
	userId: uuid("user_Id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	achievementId: integer("achievement_id").notNull().references(() => achievements.id, { onDelete: "cascade", onUpdate: "cascade" }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
	(table) => {
		return {
			userAchievementPkey: primaryKey({ columns: [table.userId, table.achievementId], name: "user_achievement_pkey" })
		}
	});

export const userSubjects = pgTable("user_subjects", {
	userId: uuid("user_id").defaultRandom().notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	subjectId: integer("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade", onUpdate: "cascade" }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
},
	(table) => {
		return {
			userSubjectsPkey: primaryKey({ columns: [table.userId, table.subjectId], name: "user_subjects_pkey" })
		}
	});