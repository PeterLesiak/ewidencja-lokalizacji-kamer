import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/sqlite3';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

import { relations } from './schema';

export const databaseURL = pathToFileURL(join(process.cwd(), './sqlite.db'));

const client = createClient({ url: databaseURL.toString() });

export const db = drizzle({
  client,
  relations,
  casing: 'snake_case',
});
