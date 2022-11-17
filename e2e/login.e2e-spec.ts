/* eslint-disable max-lines-per-function */
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { gql } from 'apollo-server-core';
import * as pactum from 'pactum';

import { AppModule } from '../src/app.module';
import * as Stubs from '../src/auth/stubs';
import { PrismaService } from '../src/prisma/prisma.service';
import { getCookies, graphqlRequest } from './utils';

const loginMutation = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => gql`
    mutation Login {
      login(input: { username: "${username}", password: "${password}" }) {
        id
      }
    }
`;

const password = Stubs.validCredentials.password;
const passwordHash = Stubs.dbAdmin.password;

describe('Login', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = app.get(PrismaService);

    await app.listen(0);
    const url = await app.getUrl();
    const baseUrl = url.replace('[::1]', 'localhost');
    pactum.request.setBaseUrl(baseUrl);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should set auth cookies successfully', async () => {
    const { username } = Stubs.validCredentials;
    await prisma.admin.deleteMany({ where: { username } });
    const admin = await prisma.admin.create({
      data: { username, password: passwordHash },
    });
    const query = loginMutation({ username, password });

    await graphqlRequest(query).expect(ctx => {
      const { body, headers } = ctx.res;
      const cookies = getCookies(headers);

      expect(cookies.session).toBeTruthy();
      expect(cookies.auth).toBeTruthy();
      expect(body.data.login).toEqual({ id: admin.id });
    });
  });

  it('auth cookies must be secure', async () => {
    const { username } = Stubs.validCredentials;
    await prisma.admin.deleteMany({ where: { username } });
    await prisma.admin.create({ data: { username, password: passwordHash } });
    const query = loginMutation({ username, password });

    await graphqlRequest(query).expect(ctx => {
      const { headers } = ctx.res;
      const cookies = getCookies(headers);

      expect(cookies.auth?.includes('Secure')).toBeTruthy();
    });
  });

  it('session cookie must be httpOnly', async () => {
    const { username } = Stubs.validCredentials;
    await prisma.admin.deleteMany({ where: { username } });
    await prisma.admin.create({ data: { username, password: passwordHash } });
    const query = loginMutation({ username, password });

    await graphqlRequest(query).expect(ctx => {
      const { headers } = ctx.res;
      const cookies = getCookies(headers);

      expect(cookies.session?.includes('HttpOnly')).toBeTruthy();
    });
  });

  it('auth cookie must not be httpOnly', async () => {
    const { username } = Stubs.validCredentials;
    await prisma.admin.deleteMany({ where: { username } });
    await prisma.admin.create({ data: { username, password: passwordHash } });
    const query = loginMutation({ username, password });

    await graphqlRequest(query).expect(ctx => {
      const { headers } = ctx.res;
      const cookies = getCookies(headers);

      expect(cookies.auth).toBeDefined();
      expect(cookies.auth?.includes('HttpOnly')).toBeFalsy();
    });
  });
});
