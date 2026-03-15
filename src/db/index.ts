import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/sqlite3';
import { join } from 'node:path';

import { relations } from './schema';

const client = createClient({ url: join(process.cwd(), './database/sqlite.db') });

export const db = drizzle({
  client,
  relations,
  casing: 'snake_case',
});
