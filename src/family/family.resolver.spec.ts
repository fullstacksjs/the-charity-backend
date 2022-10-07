import { faker } from '@faker-js/faker';
import type { INestApplication } from '@nestjs/common';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server-express';
import slug from 'slug';

import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
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

  it('should create family and returns it', async () => {
    const familyName = faker.name.fullName();

    const query = gql`mutation { createFamily(input: { name: "${familyName}" }) { ... on DraftFamily { id status } } }`;

    const result = await apolloServer.executeOperation({ query });

    expect(result.errors).toBeFalsy();
    expect(result.data).toBeTruthy();
    expect(result.data?.['createFamily']?.status).toBe(FamilyStatus.DRAFT);
    expect(result.data?.['createFamily']?.id).toBeTruthy();

    await prisma.family.delete({
      where: { id: result.data?.['createFamily']?.id },
    });
  });

  it('should create two family with same name and different slug', async () => {
    const familyName = 'some random big name which does not exist really';
    const familySlug = slug(familyName);

    const query = gql`mutation { createFamily(input: { name: "${familyName}" }) { ... on DraftFamily { slug } } }`;

    const firstRequestResult = await apolloServer.executeOperation({ query });
    const secondRequestResult = await apolloServer.executeOperation({
      query,
    });

    const firstSlug = firstRequestResult.data?.['createFamily']?.slug;
    const secondSlug = secondRequestResult.data?.['createFamily']?.slug;

    expect(firstSlug).toBeTruthy();
    expect(secondSlug).toBeTruthy();
    expect(firstSlug).not.toEqual(secondSlug);

    await prisma.family.deleteMany({
      where: {
        slug: {
          startsWith: familySlug,
        },
      },
    });
  });
});
