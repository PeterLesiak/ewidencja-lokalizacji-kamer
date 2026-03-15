import { defineConfig } from 'drizzle-kit';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  casing: 'snake_case',
  dbCredentials: {
    url: pathToFileURL(join(process.cwd(), './database/sqlite.db')).toString(),
  },
});
