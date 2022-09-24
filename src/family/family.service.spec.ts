import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { MockProxy } from 'jest-mock-extended';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '../prisma/prisma.service';
import { FamilyService } from './family.service';
import { familyStub } from './stubs';

describe('FamilyService', () => {
  let service: FamilyService;
  let prisma: MockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get<FamilyService>(FamilyService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findFamilyById', () => {
    it('should be defined', () => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findFamilyById).toBeDefined();
    });

    it('should called with', async () => {
      const test = jest.spyOn(service, 'findFamilyById');
      await service.findFamilyById('familyId');

      expect(test).toHaveBeenCalledWith('familyId');
    });

    it('should return null: no family found', async () => {
      jest.spyOn(prisma.family, 'findUnique').mockResolvedValue(null);
      const family = await service.findFamilyById('familyId');

      expect(family).toBeNull();
    });

    it('should return unique family', async () => {
      jest.spyOn(prisma.family, 'findUnique').mockResolvedValue(familyStub);
      const family = await service.findFamilyById('familyId');

      expect(family).toEqual(familyStub);
    });
  });
});
