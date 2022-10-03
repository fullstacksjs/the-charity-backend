import type { INestApplication } from '@nestjs/common';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server-express';

import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateProjectInput } from './dto/input';
import { ProjectStatus } from './entities/project-status.enum';

// eslint-disable-next-line max-lines-per-function
describe('Project Query', () => {
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

  describe('Create One', () => {
    it('Should create a project without optional fields', async () => {
      const input: CreateProjectInput = { name: 'new name' };
      const query = gql`
        mutation Project($input: CreateProjectInput!) {
          project(input: $input) {
            id
            name
            description
            status
            updated_at
            created_at
          }
        }
      `;

      const result = await apolloServer.executeOperation({
        query,
        variables: { input },
      });
      const project = await prisma.project.findUnique({
        where: { id: result.data?.['project'].id },
      });

      expect(project).toBeTruthy();
      expect(project).toMatchObject(input);

      expect(result.errors).toBeFalsy();
      expect(result.data).toBeTruthy();
      expect(result.data?.['project']).toBeTruthy();
      expect(result.data?.['project']).toMatchObject({
        ...input,
        status: ProjectStatus.PLANNING,
        description: null,
      });

      await prisma.project.delete({
        where: { id: result.data?.['project'].id },
      });
    });

    it('Should create a project with optional fields', async () => {
      const input: CreateProjectInput = {
        name: 'new name',
        description: 'SOME-DESC',
      };
      const query = gql`
        mutation Project($input: CreateProjectInput!) {
          project(input: $input) {
            id
            name
            description
            status
            updated_at
            created_at
          }
        }
      `;

      const result = await apolloServer.executeOperation({
        query,
        variables: { input },
      });

      const project = await prisma.project.findUnique({
        where: { id: result.data?.['project'].id },
      });

      expect(project).toBeTruthy();
      expect(project).toMatchObject(input);

      expect(result.errors).toBeFalsy();
      expect(result.data).toBeTruthy();
      expect(result.data?.['project']).toBeTruthy();
      expect(result.data?.['project']).toMatchObject({
        ...input,
        status: ProjectStatus.PLANNING,
      });

      await prisma.project.delete({
        where: { id: result.data?.['project'].id },
      });
    });

    it('Should throw error for required fields', async () => {
      const input = { description: 'SOME-DESC2' };
      const query = gql`
        mutation Project($input: CreateProjectInput!) {
          project(input: $input) {
            id
            name
            description
            status
            updated_at
            created_at
          }
        }
      `;

      const result = await apolloServer.executeOperation({
        query,
        variables: { input },
      });

      const project = await prisma.project.findFirst({
        where: { ...input },
      });

      expect(project).toBeFalsy();
      expect(result.errors).toBeTruthy();
      expect(result.data).toBeUndefined();
    });
  });
});
