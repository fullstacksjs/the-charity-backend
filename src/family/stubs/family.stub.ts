import { faker } from '@faker-js/faker';
import type { Family } from '@prisma/client';

import { convertCodeNumberToFamilyCode } from '../../utils';

export const familyStub: Family = {
  id: faker.database.mongodbObjectId(),
  name: faker.name.fullName(),
  status: 'DRAFT',
  severity: 'NORMAL',
  code: convertCodeNumberToFamilyCode(Math.floor(Math.random() * 100_000)),
  created_at: faker.date.recent(),
  updated_at: faker.date.future(),
};
