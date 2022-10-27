import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { MockProxy } from 'jest-mock-extended';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import {
  adminExpectedResponse,
  adminStub,
  loginInputInValidPasswordDtoStub,
  loginInputValidPasswordDtoStub,
} from './stubs';

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

    it('should be called with', async () => {
      const test = jest
        .spyOn(service, 'localLogin')
        .mockResolvedValue({} as any);

      await service.localLogin(loginInputInValidPasswordDtoStub);

      expect(test).toHaveBeenCalledWith(loginInputInValidPasswordDtoStub);
    });

    it('should return null: no admin found with this username', async () => {
      jest.spyOn(prisma.admin, 'findFirst').mockResolvedValue(null);

      const foundAdmin = await service.localLogin(
        loginInputInValidPasswordDtoStub,
      );

      expect(foundAdmin).toBeNull();
    });

    it('should return null: password not matched', async () => {
      jest.spyOn(prisma.admin, 'findFirst').mockResolvedValue(adminStub);

      const foundAdmin = await service.localLogin(
        loginInputInValidPasswordDtoStub,
      );

      expect(foundAdmin).toBeNull();
    });

    it('should be passed: return admin', async () => {
      jest.spyOn(prisma.admin, 'findFirst').mockResolvedValue(adminStub);

      const foundAdmin = await service.localLogin(
        loginInputValidPasswordDtoStub,
      );

      expect(foundAdmin).toEqual(adminExpectedResponse);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
