import { faker } from '@faker-js/faker';
import type { INestApplication } from '@nestjs/common';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { FamilySeverity } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server-express';

import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { convertCodeNumberToFamilyCode } from '../utils';
import { FamilyStatus } from './entities/family-status.enum';

// eslint-disable-next-line max-lines-per-function
describe('Family Queries', () => {
  let app: INestApplication;
  let apolloServer: ApolloServer;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    const { schema } = app.get(GraphQLSchemaHost);
    apolloServer = new ApolloServer({ schema });
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return null for an invalid id', async () => {
    const query = gql`
      query {
        family(id: "1") {
          ... on DraftFamily {
            id
          }
          ... on CompletedFamily {
            id
          }
        }
      }
    `;

    const result = await apolloServer.executeOperation({ query });

    expect(result.errors).toBeFalsy();
    expect(result.data).toBeTruthy();
    expect(result.data?.['family']).toBeNull();
  });

  it("should return a completed family from the DB when it's exists", async () => {
    const family = await prisma.family.create({
      data: {
        name: faker.name.firstName(),
        status: FamilyStatus.COMPLETED,
        code: convertCodeNumberToFamilyCode(99999),
      },
    });

    const query = gql`
      query {
        family(id: "${family.id}") {
          ... on DraftFamily {
            id
            draftName: name
            status
          }
          ... on CompletedFamily {
            id
            completedName: name
            status
          }
        }
      }
    `;

    const result = await apolloServer.executeOperation({ query });

    expect(result.errors).toBeFalsy();
    expect(result.data).toBeTruthy();
    expect(result.data?.['family']).toBeTruthy();
    expect(result.data?.['family']).toMatchObject({
      completedName: family.name,
      status: 'COMPLETED',
      id: family.id,
    });

    await prisma.family.delete({ where: { id: family.id } });
  });

  it("should return a draft family from the DB when it's exists", async () => {
    const family = await prisma.family.create({
      data: {
        name: faker.name.firstName(),
        status: FamilyStatus.DRAFT,
        code: convertCodeNumberToFamilyCode(99999),
      },
    });

    const query = gql`
      query {
        family(id: "${family.id}") {
          ... on DraftFamily {
            id
            draftName: name
            status
            code
          }
          ... on CompletedFamily {
            id
            completedName: name
            status
            code
          }
        }
      }
    `;

    const result = await apolloServer.executeOperation({ query });

    expect(result.errors).toBeFalsy();
    expect(result.data).toBeTruthy();
    expect(result.data?.['family']).toBeTruthy();
    expect(result.data?.['family']).toMatchObject({
      draftName: family.name,
      status: 'DRAFT',
      code: expect.any(String),
      id: family.id,
    });

    await prisma.family.delete({ where: { id: family.id } });
  });

  it('should create family and returns it', async () => {
    const familyName = faker.name.fullName();

    const query = gql`mutation { createFamily(input: { name: "${familyName}" }) { ... on DraftFamily { id status severity } } }`;

    const result = await apolloServer.executeOperation({ query });

    expect(result.errors).toBeFalsy();
    expect(result.data).toBeTruthy();
    expect(result.data?.['createFamily']?.status).toBe(FamilyStatus.DRAFT);
    expect(result.data?.['createFamily']?.severity).toBe(FamilySeverity.NORMAL);
    expect(result.data?.['createFamily']?.id).toBeTruthy();

    const createdFamily = await prisma.family.findUnique({
      where: { id: result.data?.['createFamily']?.id },
    });

    expect(createdFamily).toBeTruthy();

    await prisma.family.delete({
      where: { id: result.data?.['createFamily']?.id },
    });
  });

  it('should create two family with same name and different code', async () => {
    const familyName = faker.name.fullName();

    const query = gql`mutation { createFamily(input: { name: "${familyName}" }) { ... on DraftFamily { code } } }`;

    const firstRequestResult = await apolloServer.executeOperation({ query });
    const secondRequestResult = await apolloServer.executeOperation({
      query,
    });

    const firstCode = firstRequestResult.data?.['createFamily']?.code;
    const secondCode = secondRequestResult.data?.['createFamily']?.code;

    expect(firstCode).toBeTruthy();
    expect(secondCode).toBeTruthy();
    expect(firstCode).not.toEqual(secondCode);

    await prisma.family.deleteMany({
      where: {
        code: {
          in: [firstCode, secondCode],
        },
      },
    });
  });
});
