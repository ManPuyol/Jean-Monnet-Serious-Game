import type { Config } from "drizzle-kit";
export default {
    schema: "./schemas/*",
    out: "./drizzle",
    driver: 'pg',
    dbCredentials: {
    connectionString: "postgres://postgres.keaoczugubmmotgbjzct:#J34nM0nn3t@aws-0-eu-central-1.pooler.supabase.com:6543/postgres",//process.env.DB_URL,
    }
    // dbCredentials: {
    //     user: "postgres",
    //     password: process.env.DATABASE_PASSWORD,
    //     host: "127.0.0.1",
    //     port: 5432,
    //     database: "db",
    // }
} satisfies Config;