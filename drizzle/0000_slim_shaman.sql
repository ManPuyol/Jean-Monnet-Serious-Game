DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('teacher', 'student', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_id" integer,
	"name" varchar(256),
	"correct" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"language" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"unit_id" integer,
	"question" varchar(256),
	"hard" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer,
	"user_Id" integer,
	"question_id" integer,
	"subject_id" integer,
	"answer_id" integer,
	"correct" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quizzes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"score" smallint NOT NULL,
	"meta" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" varchar(256),
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "units" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" varchar(256),
	"subject_id" integer,
	"active" boolean DEFAULT true,
	"questions_per_quiz" smallint DEFAULT 10,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullName" varchar(256),
	"email" varchar(256),
	"role" "role",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_details" ADD CONSTRAINT "quiz_details_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_details" ADD CONSTRAINT "quiz_details_user_Id_users_id_fk" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_details" ADD CONSTRAINT "quiz_details_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_details" ADD CONSTRAINT "quiz_details_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_details" ADD CONSTRAINT "quiz_details_answer_id_answers_id_fk" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "units" ADD CONSTRAINT "units_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
