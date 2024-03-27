DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('teacher', 'student', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" varchar(256),
	"role" "role"
);
