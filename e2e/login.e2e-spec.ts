import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';

import { AppModule } from '../src/app.module';
import { ErrorMessage } from '../src/auth/dto/errors';
import * as Stubs from '../src/auth/stubs';
import { PrismaService } from '../src/prisma/prisma.service';
import { graphqlRequest } from './utils';

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

  it('should be logged in successfully', async () => {
    const adminCreateDto = {
      username: Stubs.dbAdmin.username,
      password: Stubs.dbAdmin.password,
    };

    const admin = await prisma.admin.create({
      data: adminCreateDto,
    });

    const { username, password } = Stubs.validCredentials;

    const query = `
      mutation {
        login(input: { username: "${username}", password: "${password}" }) {
          id
          username
        }
      }
    `;

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

      expect(body.data.login).toEqual({
        id: admin.id,
        username: admin.username,
      });
    });

    return prisma.admin.delete({
      where: { username: adminCreateDto.username },
    });
  });

  it('should return error: admin not found', async () => {
    const { username, password } = Stubs.invalidUsername;

    const query = `
      mutation {
        login(input: { username: "${username}", password: "${password}" }) {
          id
          username
        }
      }
    `;

    await graphqlRequest(query).expect(ctx => {
      const { body } = ctx.res;

      expect(body.errors).toBeTruthy();
      expect(body.errors[0].message).toBe(ErrorMessage.InvalidCredentials);
      expect(body.data.login).toBeNull();
    });
  });

  it('should return error: admin password not correct', async () => {
    const adminCreateDto = {
      username: Stubs.dbAdmin.username,
      password: Stubs.dbAdmin.password,
    };

    await prisma.admin.create({ data: adminCreateDto });
    const { username } = Stubs.invalidPassword;

    const query = `
      mutation {
        login(input: { username: "${username}", password: "someRandomText" }) {
          id
          username
        }
      }
    `;

    await graphqlRequest(query).expect(ctx => {
      const { body } = ctx.res;

      const error = body.errors.find(
        (e: Error) => e.message === ErrorMessage.InvalidCredentials,
      );

      expect(error).toBeTruthy();
      expect(error.message).toBe(ErrorMessage.InvalidCredentials);
      expect(body.data.login).toBeNull();
    });

    await prisma.admin.delete({ where: { username: adminCreateDto.username } });
  });
});
