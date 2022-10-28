import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { MockProxy } from 'jest-mock-extended';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { ErrorMessage } from './dto/errors';
import * as Stubs from './stubs';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: MockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get(PrismaService);
  });

  describe('localLogin', () => {
    it('should be defined', () => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.localLogin).toBeDefined();
    });

    it('should throw error: no admin found with this username', async () => {
      jest.spyOn(prisma.admin, 'findFirst').mockResolvedValue(null);

      await expect(() =>
        service.localLogin(Stubs.invalidUsername),
      ).rejects.toThrow(ErrorMessage.InvalidCredentials);
    });

    it('should return null: password not matched', async () => {
      jest.spyOn(prisma.admin, 'findFirst').mockResolvedValue(Stubs.dbAdmin);

      await expect(() =>
        service.localLogin(Stubs.invalidPassword),
      ).rejects.toThrow(ErrorMessage.InvalidCredentials);
    });

    it('should be passed: return admin', async () => {
      jest.spyOn(prisma.admin, 'findFirst').mockResolvedValue(Stubs.dbAdmin);
      const foundAdmin = await service.localLogin(Stubs.validCredentials);

      expect(foundAdmin).toEqual(Stubs.adminExpectedResponse);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
