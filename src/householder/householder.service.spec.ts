import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { MockProxy } from 'jest-mock-extended';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '../prisma/prisma.service';
import { EmptyLogger } from '../shared/empty-logger';
import { HouseholderService } from './householder.service';
import {
  createHouseholderInput,
  householderStub,
} from './stubs/householder.stub';

describe('HouseholderService', () => {
  let service: HouseholderService;
  let prisma: MockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseholderService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    module.useLogger(new EmptyLogger());
    service = module.get<HouseholderService>(HouseholderService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CreateHouseholder', () => {
    it('should be defined', () => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toBeDefined();
    });

    it('should called with', async () => {
      const test = jest.spyOn(service, 'create');
      await service.create(createHouseholderInput);

      expect(test).toHaveBeenCalledWith(createHouseholderInput);
    });

    it('should fail: throw categorized error', async () => {
      const errorMessage = 'householder can not created';

      jest
        .spyOn(prisma.householder, 'create')
        .mockRejectedValue(new Error(errorMessage));
      const result = service.create(createHouseholderInput);

      await expect(result).rejects.toThrow(errorMessage);
    });

    it('should pass: return created householder', async () => {
      jest
        .spyOn(prisma.householder, 'create')
        .mockResolvedValue(householderStub);

      const householder = await service.create({
        name: householderStub.name,
        family_id: householderStub.family_id,
      });

      expect(householder).toEqual(householderStub);
    });
  });
});
