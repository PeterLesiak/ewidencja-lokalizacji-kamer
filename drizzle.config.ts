import { defineConfig } from 'drizzle-kit';

import { databaseURL } from './src/db';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  casing: 'snake_case',
  dbCredentials: {
    url: databaseURL.toString(),
  },
});
