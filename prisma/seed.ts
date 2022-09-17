import { faker } from '@faker-js/faker';
import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

async function main() {
  const originalPassword = nanoid();
  const hashedPassword = await argon2.hash(originalPassword);
  const adminCreateInput: Prisma.AdminCreateInput = {
    username: 'admin',
    password: hashedPassword,
  };

  const isAdminExists = await prisma.admin.count({
    where: { username: adminCreateInput.username },
  });

  if (!isAdminExists) {
    await prisma.admin.create({ data: adminCreateInput, select: null });
    console.log('the admin password is:', originalPassword);
  }

  const testFamily = { slug: 'test-family', name: faker.name.fullName() };
  const isTestFamilyExists = await prisma.family.findFirst({
    where: { slug: testFamily.slug },
  });

  if (!isTestFamilyExists) {
    await prisma.family.create({ data: testFamily });
    console.log(
      `test family created, test family name is "${testFamily.name}"`,
    );
  }

  const testProject = {
    name: faker.lorem.word(5),
    description: faker.lorem.sentence(3),
  };
  await prisma.project.create({ data: testProject });
  console.log('New Project added');
}

main()
  .catch(error => {
    console.error({ error });
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
