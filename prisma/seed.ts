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

  const testFamilyName = 'خانواده تستی';
  const isTestFamilyExists = await prisma.family.findFirst({
    where: { name: testFamilyName },
  });

  if (!isTestFamilyExists) {
    await prisma.family.create({ data: { name: testFamilyName } });
    console.log(`test family created, test family name is "${testFamilyName}"`);
  }
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
