/* eslint-disable jest/no-conditional-in-test, max-lines-per-function */
import { faker } from '@faker-js/faker';
import type { INestApplication } from '@nestjs/common';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { FamilySeverity } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server-express';
import { randomInt } from 'crypto';

import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { convertCodeNumberToFamilyCode } from '../utils';
import { FamilyStatus } from './entities/family-status.enum';

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

  describe('family', () => {
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
          code: convertCodeNumberToFamilyCode(randomInt(99999)),
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
          code: convertCodeNumberToFamilyCode(randomInt(99999)),
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
      expect(result.data?.['createFamily']?.severity).toBe(
        FamilySeverity.NORMAL,
      );
      expect(result.data?.['createFamily']?.id).toBeTruthy();

      const createdFamily = await prisma.family.findUnique({
        where: { id: result.data?.['createFamily']?.id },
      });

      expect(createdFamily).toBeTruthy();
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
    });
  });

  describe('families', () => {
    it('should return list of families', async () => {
      const familiesToCreate = [
        {
          name: faker.name.fullName(),
          code: convertCodeNumberToFamilyCode(randomInt(99999)),
        },
        {
          name: faker.name.fullName(),
          code: convertCodeNumberToFamilyCode(randomInt(99999)),
        },
      ];

      await prisma.family.createMany({ data: familiesToCreate });

      const query = gql`
        query {
          families(filter: {}, orderBy: {}) {
            edges {
              node {
                ... on DraftFamily {
                  dId: id
                  dName: name
                }
                ... on CompletedFamily {
                  cId: id
                  cName: name
                }
              }
            }
          }
        }
      `;

      const result = await apolloServer.executeOperation({ query });

      expect(result.errors).toBeFalsy();
      expect(result.data).toBeTruthy();

      const names = result.data?.['families']?.edges
        .map((e: any) => e.node.dName ?? e.node.cName)
        .filter((n: any) => familiesToCreate.some(x => n === x.name));

      expect(names).toHaveLength(familiesToCreate.length);

      await prisma.family.deleteMany({ where: { name: { in: names } } });
    });

    it('should return list of families by specified filter', async () => {
      const familyWithHouseHolder = await prisma.family.create({
        data: {
          name: faker.name.fullName(),
          code: convertCodeNumberToFamilyCode(randomInt(99999)),
        },
      });

      const familiesToCreate = [
        {
          name: faker.name.fullName(),
          code: convertCodeNumberToFamilyCode(randomInt(99999)),
        },
        {
          name: faker.name.fullName(),
          code: convertCodeNumberToFamilyCode(randomInt(99999)),
        },
      ];

      await prisma.family.createMany({
        data: familiesToCreate,
      });

      const householder = await prisma.householder.create({
        data: {
          name: faker.name.fullName(),
          family_id: familyWithHouseHolder.id,
        },
      });

      const query = gql`
      query {
        families(filter: { householder_id: "${householder.id}" }, orderBy: {}) {
          edges {
            node {
              ... on DraftFamily {
                dId: id
                dCode: code
              }
              ... on CompletedFamily {
                cId: id
                cCode: code
              }
            }
          }
        }
      }
    `;

      const result = await apolloServer.executeOperation({ query });

      expect(result.errors).toBeFalsy();
      expect(result.data).toBeTruthy();
      expect(result.data?.['families']?.edges).toHaveLength(1);
      expect(result.data?.['families']?.edges[0].node).toMatchObject({
        dId: familyWithHouseHolder.id,
        dCode: familyWithHouseHolder.code,
      });

      await prisma.householder.delete({ where: { id: householder.id } });
      await prisma.family.deleteMany({
        where: {
          name: {
            in: [
              familyWithHouseHolder.name,
              ...familiesToCreate.map(x => x.name),
            ],
          },
        },
      });
    });

    it('should return list of draft families and completed families', async () => {
      const familiesToCreate = [
        {
          name: faker.name.fullName(),
          code: convertCodeNumberToFamilyCode(randomInt(99999)),
          status: FamilyStatus.DRAFT,
        },
        {
          name: faker.name.fullName(),
          code: convertCodeNumberToFamilyCode(randomInt(99999)),
          status: FamilyStatus.COMPLETED,
        },
      ];

      await prisma.family.createMany({
        data: familiesToCreate,
      });

      const query = gql`
        query {
          families {
            edges {
              node {
                ... on DraftFamily {
                  dId: id
                  dCode: code
                }
                ... on CompletedFamily {
                  cId: id
                  cCode: code
                }
              }
            }
          }
        }
      `;

      const result = await apolloServer.executeOperation({ query });

      const codes: string[] = result.data?.['families']?.edges
        .map((e: any) => e.node.dCode ?? e.node.cCode)
        .filter((n: any) => familiesToCreate.some(x => n === x.code));

      expect(result.errors).toBeFalsy();
      expect(result.data).toBeTruthy();
      expect(codes).toHaveLength(familiesToCreate.length);
      expect(codes[0]).toBe(familiesToCreate[0]?.code);
      expect(codes[1]).toBe(familiesToCreate[1]?.code);

      await prisma.family.deleteMany({
        where: { name: { in: familiesToCreate.map(x => x.name) } },
      });
    });

    it('should return list of families ordered by created_at (desc)', async () => {
      const familiesToCreate = [
        {
          name: faker.name.fullName(),
          code: convertCodeNumberToFamilyCode(randomInt(99999)),
        },
        {
          name: faker.name.fullName(),
          code: convertCodeNumberToFamilyCode(randomInt(99999)),
          created_at: faker.date.future(),
        },
      ];

      await prisma.family.createMany({
        data: familiesToCreate,
      });

      const query = gql`
        query ($orderBy: GetFamiliesOrderBy!) {
          families(filter: {}, orderBy: $orderBy) {
            edges {
              node {
                ... on DraftFamily {
                  dId: id
                  dCode: code
                }
                ... on CompletedFamily {
                  cId: id
                  cCode: code
                }
              }
            }
          }
        }
      `;

      const result = await apolloServer.executeOperation({
        query,
        variables: { orderBy: { created_at: 'DESC' } },
      });

      const codes: string[] = result.data?.['families']?.edges
        .map((e: any) => e.node.dCode ?? e.node.cCode)
        .filter((n: any) => familiesToCreate.some(x => n === x.code));

      expect(result.errors).toBeFalsy();
      expect(result.data).toBeTruthy();
      expect(codes).toHaveLength(familiesToCreate.length);
      expect(codes[0]).toBe(
        familiesToCreate[familiesToCreate.length - 1]?.code,
      );

      await prisma.family.deleteMany({ where: { code: { in: codes } } });
    });
  });
});
