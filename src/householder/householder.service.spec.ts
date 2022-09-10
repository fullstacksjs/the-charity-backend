import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { HouseholderService } from './householder.service';

describe('HouseholderService', () => {
  let service: HouseholderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseholderService],
    }).compile();

    service = module.get<HouseholderService>(HouseholderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
