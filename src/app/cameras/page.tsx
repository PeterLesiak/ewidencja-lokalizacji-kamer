import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from './columns';

async function getTasks() {
  const data = await readFile(
    path.join(process.cwd(), './src/app/cameras/data.json'),
    'utf8',
  );

  return JSON.parse(data);
}

export default async function Page() {
  const tasks = await getTasks();

  return (
    <div className="p-8">
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
