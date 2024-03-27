import type { Config } from "drizzle-kit";
export default {
    schema: "./schemas/*",
    out: "./drizzle",
    driver: 'pg',
    dbCredentials: {
        user: "postgres.keaoczugubmmotgbjzct",
        password:  "J34nM0nn3tSG",
        host: "aws-0-eu-central-1.pooler.supabase.com",
        port: 5432,
        database: "postgres",
    }
} satisfies Config;