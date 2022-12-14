import { faker } from '@faker-js/faker';
import type { Family, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { nanoid } from 'nanoid';

import { convertCodeNumberToFamilyCode } from '../src/utils';

const prisma = new PrismaClient();

async function main() {
  const originalPassword = nanoid();
  const hashedPassword = await argon2.hash(originalPassword);
  const adminCreateInput: Prisma.AdminCreateInput = {
    username: 'admin',
    password: hashedPassword,
  };

  const adminCounts = await prisma.admin.count({
    where: { username: adminCreateInput.username },
  });

  if (!adminCounts) {
    await prisma.admin.create({ data: adminCreateInput });
    console.log('the admin password is:', originalPassword);
  }

  const testFamily = {
    code: convertCodeNumberToFamilyCode(1),
    name: faker.name.fullName(),
  };
  const existedFamily = await prisma.family.findFirst({
    where: { code: testFamily.code },
  });

  // eslint-disable-next-line fp/no-let
  let family: Family;
  if (!existedFamily) {
    family = await prisma.family.create({ data: testFamily });
    console.log(
      `test family created, test family name is "${testFamily.name}"`,
    );
  } else {
    family = existedFamily;
  }

  const existedHouseholder = await prisma.householder.findFirst();

  if (existedHouseholder) {
    const testHouseholder = {
      name: faker.name.fullName(),
      family_id: family.id,
    };
    await prisma.householder.create({ data: testHouseholder });
    console.log(
      `The householder created, test householder name is ${testHouseholder.name} and she/he is ${family.name} householder`,
    );
  }

  const projectCounts = await prisma.project.count();
  if (!projectCounts) {
    const testProject = {
      name: faker.lorem.word(5),
      description: faker.lorem.sentence(3),
    };
    await prisma.project.create({ data: testProject });
    console.log(
      `The project created, The project name is "${testProject.name}"`,
    );
  }

  const membersCounts = await prisma.member.count();
  if (!membersCounts) {
    const testMembers = [
      { name: faker.name.fullName(), family_id: family.id },
      { name: faker.name.fullName(), family_id: family.id },
      { name: faker.name.fullName(), family_id: family.id },
      { name: faker.name.fullName(), family_id: family.id },
    ];
    await prisma.member.createMany({ data: testMembers });
    testMembers.forEach(member =>
      console.log(
        `The member created, test member name is ${member.name} with ${family.name} family name`,
      ),
    );
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
