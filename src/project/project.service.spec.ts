import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ProjectStatus } from '@prisma/client';
import type { MockProxy } from 'jest-mock-extended';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '../prisma/prisma.service';
import type { CreateProjectInput } from './dto/input';
import { ProjectService } from './project.service';
import { projectStub } from './stubs';

describe('ProjectService', () => {
  let service: ProjectService;
  let prisma: MockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toBeDefined();
    });

    it('should called with', async () => {
      const data: CreateProjectInput = { name: 'HELLO' };
      const method = jest
        .spyOn(prisma.project, 'create')
        .mockResolvedValue(projectStub);
      await service.create(data);

      // eslint-disable-next-line jest/prefer-called-with
      expect(method).toHaveBeenCalled();
    });

    it('should create a new project without optional fields', async () => {
      const data: CreateProjectInput = { name: 'test' };
      jest
        .spyOn(prisma.project, 'create')
        .mockResolvedValue({ ...projectStub, ...data });
      const project = await service.create(data);

      expect(project).toMatchObject({
        ...data,
        description: null,
        status: ProjectStatus.PLANNING,
      });
    });

    // eslint-disable-next-line jest/no-focused-tests
    it('should create a new project with optional fields', async () => {
      const data: CreateProjectInput = {
        name: 'test',
        description: 'SOME DESC',
      };
      jest
        .spyOn(prisma.project, 'create')
        .mockResolvedValue({ ...projectStub, ...data });
      const project = await service.create(data);

      expect(project).toMatchObject({
        ...data,
        status: ProjectStatus.PLANNING,
      });
    });
  });
});
