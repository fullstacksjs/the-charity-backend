import { faker } from '@faker-js/faker';
import type { Family } from '@prisma/client';

export const familyStub: Family = {
  id: faker.database.mongodbObjectId(),
  name: faker.name.fullName(),
  status: 'DRAFT',
  slug: faker.helpers.slugify(faker.lorem.words(3)),
  created_at: faker.date.recent(),
  updated_at: faker.date.future(),
};
