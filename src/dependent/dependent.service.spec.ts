import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { DependentService } from './dependent.service';

describe('DependentService', () => {
  let service: DependentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DependentService],
    }).compile();

    service = module.get<DependentService>(DependentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
