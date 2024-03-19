import type { Config } from "drizzle-kit";
export default {
    schema: "./schemas/*",
    out: "./drizzle",
    driver: 'pg',
    dbCredentials: {

    }
} satisfies Config;