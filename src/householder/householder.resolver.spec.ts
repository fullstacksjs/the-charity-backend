import { faker } from '@faker-js/faker';
import type { INestApplication } from '@nestjs/common';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server-express';

import { AppModule } from '../app.module';
import { FamilyService } from '../family/family.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmptyLogger } from '../shared/empty-logger';

describe('HouseholderResolver', () => {
  let app: INestApplication;
  let apolloServer: ApolloServer;
  let prisma: PrismaClient;
  let familyService: FamilyService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    module.useLogger(new EmptyLogger());
    app = module.createNestApplication();
    await app.init();
    const { schema } = app.get(GraphQLSchemaHost);
    apolloServer = new ApolloServer({ schema });
    prisma = app.get(PrismaService);
    familyService = app.get(FamilyService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create', () => {
    it('should fail: throw error for required fields', async () => {
      const input = {
        name: faker.name.firstName(),
        family_id: faker.database.mongodbObjectId(),
      };
      const query = gql`
        mutation CreateHouseholder($input: CreateHouseholderInput!) {
          createHouseholder(input: $input) {
            ... on DraftHouseholder {
              id
              status
            }
          }
        }
      `;

      const result = await apolloServer.executeOperation({ query });

      const householder = await prisma.householder.findFirst({
        where: { name: input.name },
      });

      expect(householder).toBeNull();
      expect(result.errors).toBeTruthy();
      expect(result.data).toBeUndefined();
    });

    it('should fail: throw error for no family (relation)', async () => {
      const input = {
        name: faker.name.firstName(),
        family_id: faker.database.mongodbObjectId(),
      };
      const query = gql`
        mutation CreateHouseholder($input: CreateHouseholderInput!) {
          createHouseholder(input: $input) {
            ... on DraftHouseholder {
              id
              status
            }
          }
        }
      `;

      const result = await apolloServer.executeOperation({
        query,
        variables: { input },
      });

      const householder = await prisma.householder.findFirst({
        where: { name: input.name },
      });

      expect(householder).toBeNull();
      expect(result.errors).toBeTruthy();
      expect(result.data?.['']).toBeUndefined();
    });

    it('should pass: create a householder for a family', async () => {
      const input = {
        name: faker.name.firstName(),
        family_id: '',
      };

      const familyInput = { name: faker.name.firstName() };
      const family = await familyService.create(familyInput);
      input.family_id = family.id;

      const query = gql`
        mutation CreateHouseholder($input: CreateHouseholderInput!) {
          createHouseholder(input: $input) {
            ... on DraftHouseholder {
              id
              status
              created_at
              updated_at
            }
          }
        }
      `;

      const result = await apolloServer.executeOperation({
        query,
        variables: { input },
      });

      const householder = await prisma.householder.findFirst({
        where: { name: input.name },
      });

      expect(result.errors).toBeFalsy();
      expect(result.data).toBeTruthy();
      expect(result.data?.['createHouseholder']).toBeTruthy();
      expect(result.data?.['createHouseholder']).toMatchObject({});

      expect(householder).toBeTruthy();
      expect(householder).toMatchObject(input);

      await prisma.householder.deleteMany({ where: { name: input.name } });
    });
  });
});
