/* eslint-disable max-lines-per-function */
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { gql } from 'apollo-server-core';
import * as pactum from 'pactum';

import { AppModule } from '../src/app.module';
import * as Stubs from '../src/auth/stubs';
import { PrismaService } from '../src/prisma/prisma.service';
import { graphqlRequest } from './utils';

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
    await prisma.admin.deleteMany();

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

      // eslint-disable-next-line
      const cookies = headers['set-cookie'] ?? [];

      const isCookieExists = cookies.some(cookie =>
        cookie.includes('is-logged-in=true'),
      );

      const isSessionExists = cookies.some(cookie =>
        cookie.includes('connect.sid'),
      );

      expect(isCookieExists).toBeTruthy();
      expect(isSessionExists).toBeTruthy();

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

      // eslint-disable-next-line
      const cookies = headers['set-cookie'] ?? [];

      const isCookieExists = cookies
        .find(cookie => cookie.includes('is-logged-in=true'))
        ?.includes('Secure');

      const isSessionExists = cookies
        .find(cookie => cookie.includes('connect.sid'))
        ?.includes('Secure');

      expect(isCookieExists).toBeTruthy();
      expect(isSessionExists).toBeTruthy();
    });
  });

  it('session cookie must be httpOnly', async () => {
    const { username } = Stubs.validCredentials;
    await prisma.admin.deleteMany({ where: { username } });
    await prisma.admin.create({ data: { username, password: passwordHash } });
    const query = loginMutation({ username, password });

    await graphqlRequest(query).expect(ctx => {
      const { headers } = ctx.res;

      // eslint-disable-next-line
      const cookies = headers['set-cookie'] ?? [];

      const isCookieExists = cookies
        .find(cookie => cookie.includes('is-logged-in=true'))
        ?.includes('Secure');

      const isSessionExists = cookies
        .find(cookie => cookie.includes('connect.sid'))
        ?.includes('Secure');

      expect(isCookieExists).toBeTruthy();
      expect(isSessionExists).toBeTruthy();
    });
  });
});
