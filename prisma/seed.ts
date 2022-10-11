import { faker } from '@faker-js/faker';
import type { Family, Prisma } from '@prisma/client';
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

  // eslint-disable-next-line fp/no-let
  let family: Family;
  if (!isTestFamilyExists) {
    family = await prisma.family.create({ data: testFamily });
    console.log(
      `test family created, test family name is "${testFamily.name}"`,
    );
  } else {
    family = isTestFamilyExists;
  }

  const testHouseholder = { name: faker.name.fullName() };
  const isTestHouseholderExits = await prisma.householder.findFirst();

  if (!isTestHouseholderExits) {
    await prisma.householder.create({
      data: { ...testHouseholder, familyId: family.id },
    });
    console.log(
      `The householder created, test householder name is ${testHouseholder.name} and she/he is ${family.name} householder`,
    );
  }

  const isTestProjectExists = await prisma.project.findFirst();
  if (!isTestProjectExists) {
    const testProject = {
      name: faker.lorem.word(5),
      description: faker.lorem.sentence(3),
    };
    await prisma.project.create({ data: testProject });
    console.log(
      `The project created, The project name is "${testProject.name}"`,
    );
  }

  const isTestMemberExits = await prisma.member.findFirst();
  if (!isTestMemberExits) {
    const testMembers = [
      { name: faker.name.fullName(), family_id: family.id },
      { name: faker.name.fullName(), family_id: family.id },
      { name: faker.name.fullName(), family_id: family.id },
      { name: faker.name.fullName(), family_id: family.id },
    ];
    await prisma.member.createMany({ data: testMembers });
    testMembers.map(member =>
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
