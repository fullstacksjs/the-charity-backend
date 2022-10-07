import { faker } from '@faker-js/faker';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { MockProxy } from 'jest-mock-extended';
import { mockDeep } from 'jest-mock-extended';
import slug from 'slug';

import { PrismaService } from '../prisma/prisma.service';
import type { CreateFamilyInput } from './dto/input/create-family-input.dto';
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
      expect(service.findById).toBeDefined();
    });

    it('should called with', async () => {
      const test = jest.spyOn(service, 'findById');
      await service.findById('familyId');

      expect(test).toHaveBeenCalledWith('familyId');
    });

    it('should return null: no family found', async () => {
      jest.spyOn(prisma.family, 'findUnique').mockResolvedValue(null);
      const family = await service.findById('familyId');

      expect(family).toBeNull();
    });

    it('should return unique family', async () => {
      jest.spyOn(prisma.family, 'findUnique').mockResolvedValue(familyStub);
      const family = await service.findById('familyId');

      expect(family).toEqual(familyStub);
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toBeDefined();
    });

    it('should called with correct argument', async () => {
      const data: CreateFamilyInput = { name: faker.name.fullName() };
      const method = jest
        .spyOn(prisma.family, 'create')
        .mockResolvedValue(familyStub);
      await service.create(data);

      expect(method).toHaveBeenCalledWith({
        data: { ...data, slug: slug(data.name) },
      });
    });

    it('should throw unrecognized error', async () => {
      const errorMessage = 'Wrong Input';

      jest
        .spyOn(prisma.family, 'create')
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        service.create({ name: faker.name.fullName() }),
      ).rejects.toThrow(errorMessage);
    });

    it('should return created family', async () => {
      jest.spyOn(prisma.family, 'create').mockResolvedValue(familyStub);
      const family = await service.create({ name: familyStub.name });

      expect(family).toEqual(familyStub);
    });
  });
});
