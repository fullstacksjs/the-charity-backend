import { faker } from '@faker-js/faker';
import type { Project } from '@prisma/client';
import { ProjectStatus } from '@prisma/client';

export const projectStub: Project = {
  id: faker.database.mongodbObjectId(),
  name: faker.name.fullName(),
  description: null,
  status: ProjectStatus.IN_PROGRESS,
  created_at: faker.date.recent(),
  updated_at: faker.date.future(),
};
