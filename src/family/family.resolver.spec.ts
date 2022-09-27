import { faker } from '@faker-js/faker';
import type { INestApplication } from '@nestjs/common';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server-express';

import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { FamilyStatus } from './entities/family-status.enum';

describe('family Query', () => {
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

  it('Should return null for an invalid id', async () => {
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

  it("Should return a completed family from the DB when it's exists", async () => {
    const family = await prisma.family.create({
      data: {
        name: faker.name.firstName(),
        slug: faker.name.firstName(),
        status: FamilyStatus.COMPLETED,
      },
    });

    const query = gql`
      query {
        family(id: "${family.id}") {
          ... on DraftFamily {
            id
            draftName: name
            slug
            status
          }
          ... on CompletedFamily {
            id
            completedName: name
            slug
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
      slug: family.slug,
      id: family.id,
    });

    await prisma.family.delete({ where: { id: family.id } });
  });

  it("Should return a draft family from the DB when it's exists", async () => {
    const family = await prisma.family.create({
      data: {
        name: faker.name.firstName(),
        slug: faker.name.firstName(),
        status: FamilyStatus.DRAFT,
      },
    });

    const query = gql`
      query {
        family(id: "${family.id}") {
          ... on DraftFamily {
            id
            draftName: name
            slug
            status
          }
          ... on CompletedFamily {
            id
            completedName: name
            slug
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
      draftName: family.name,
      status: 'DRAFT',
      slug: family.slug,
      id: family.id,
    });

    await prisma.family.delete({ where: { id: family.id } });
  });
});
