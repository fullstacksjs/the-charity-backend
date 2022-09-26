import { faker } from '@faker-js/faker';
import type { Project } from '@prisma/client';

import { ProjectStatus } from '../entities/project-status.enum';

export const projectStub: Project = {
  id: faker.database.mongodbObjectId(),
  name: faker.name.fullName(),
  description: null,
  status: ProjectStatus.PLANNING,
  created_at: faker.date.recent(),
  updated_at: faker.date.future(),
};
