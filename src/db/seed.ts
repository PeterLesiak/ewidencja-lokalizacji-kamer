import argon2 from 'argon2';

import { db } from './index';
import { roles, users } from './schema';

const rolesMap = await db
  .insert(roles)
  .values([{ name: 'admin' }, { name: 'operator' }, { name: 'viewer' }])

  .returning();

const availableRoles = rolesMap.reduce<Record<string, number>>(
  (acc, cur) => ({ ...acc, [cur.name]: cur.id }),
  {},
);

const password = await argon2.hash('qwerty123');

await db.insert(users).values([
  {
    firstName: 'Piotr',
    lastName: 'Lesiak',
    login: 'admin.piotr.lesiak',
    password,
    roleId: availableRoles.admin,
  },
]);

await db.insert(users).values([
  {
    firstName: 'Piotr',
    lastName: 'Lesiak',
    login: 'operator.piotr.lesiak',
    password,
    roleId: availableRoles.operator,
  },
]);

await db.insert(users).values([
  {
    firstName: 'Piotr',
    lastName: 'Lesiak',
    login: 'viewer.piotr.lesiak',
    password,
    roleId: availableRoles.viewer,
  },
]);
