import { faker } from '@faker-js/faker';
import type { Householder } from '@prisma/client';

import type { CreateHouseholderInput } from '../dto';

export const createHouseholderInput: CreateHouseholderInput = {
  name: 'خانواده حمیدی',
  family_id: faker.database.mongodbObjectId(),
};

export const householderStub: Householder = {
  id: faker.database.mongodbObjectId(),
  name: faker.name.fullName(),
  status: 'DRAFT',
  family_id: faker.database.mongodbObjectId(),
  created_at: new Date(),
  updated_at: new Date(),
};
