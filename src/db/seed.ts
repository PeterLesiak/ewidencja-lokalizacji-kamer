import { db } from './index';
import { roles, users } from './schema';

await db
  .insert(roles)
  .values([{ name: 'admin' }, { name: 'operator' }, { name: 'viewer' }]);

const admin = await db.query.roles.findFirst({ where: { name: 'admin' } });

await db.insert(users).values([
  {
    firstName: 'Piotr',
    lastName: 'Lesiak',
    login: 'piotr.lesiak',
    password: 'qwerty123',
    roleId: admin!.id,
  },
]);
