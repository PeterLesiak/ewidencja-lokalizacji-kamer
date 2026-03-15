import { defineRelations } from 'drizzle-orm';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const roles = sqliteTable('roles', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),

  name: text().notNull(),
});

export const users = sqliteTable('users', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),

  firstName: text().notNull(),
  lastName: text().notNull(),
  login: text().notNull(),
  password: text().notNull(),
  roleId: integer({ mode: 'number' }).references(() => roles.id),
});

export const addresses = sqliteTable('addresses', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),

  country: text().notNull(),
  city: text().notNull(),
  postalCode: text().notNull(),
  street: text().notNull(),
  buildingNumber: text().notNull(),
  apartmentNumber: text(),
});

export const infAdministrators = sqliteTable('inf_administrators', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),

  firstName: text().notNull(),
  lastName: text().notNull(),
  phoneNumber: text().notNull(),
  organization: text(),
  nip: text(),
  notice: text(),
  addressId: integer({ mode: 'number' }).references(() => addresses.id),
});

export const infrastructures = sqliteTable('infrastructures', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),

  latitude: real().notNull(),
  longitude: real().notNull(),
  objectType: text().notNull(),
  infAdministratorId: integer({ mode: 'number' }).references(() => infAdministrators.id),
  addressId: integer({ mode: 'number' }).references(() => addresses.id),
});

export const cameras = sqliteTable('cameras', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),

  cameraType: text().notNull(),
  installationDate: text().notNull(),
  storageDuration: integer({ mode: 'number' }).notNull(),
  locationDescription: text(),
  coverageArea: text(),
  infrastructureId: integer({ mode: 'number' }).references(() => infrastructures.id),
});

export const relations = defineRelations(
  { roles, users, addresses, infAdministrators, infrastructures, cameras },
  r => ({
    roles: {
      users: r.many.users(),
    },

    users: {
      role: r.one.roles({
        from: r.users.roleId,
        to: r.roles.id,
        optional: false,
      }),
    },

    addresses: {
      infAdministrators: r.many.infAdministrators(),
      infrastructures: r.many.infrastructures(),
    },

    infAdministrators: {
      address: r.one.addresses({
        from: r.infAdministrators.addressId,
        to: r.addresses.id,
        optional: false,
      }),
    },

    infrastructures: {
      address: r.one.addresses({
        from: r.infrastructures.addressId,
        to: r.addresses.id,
        optional: true,
      }),

      cameras: r.many.cameras(),
    },

    cameras: {
      infrastructure: r.one.infrastructures({
        from: r.cameras.infrastructureId,
        to: r.infrastructures.id,
        optional: false,
      }),
    },
  }),
);
