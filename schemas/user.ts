import { pgTable, serial, text, varchar, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['teacher', 'student', 'admin']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  email: varchar('email', { length: 256 }),
  role: roleEnum('role'),
});
