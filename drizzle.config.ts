import './envConfig.ts'
import { defineConfig } from 'drizzle-kit';

const config = {
  out: './drizzle',
  schema: './app/(server)/db/schema.ts',
  dialect: 'postgresql' as const,
  dbCredentials: {
    url: "postgresql://neondb_owner:dNUl2Hhc6MBp@ep-wispy-cherry-a5r292ff.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
};

export default defineConfig(config);
