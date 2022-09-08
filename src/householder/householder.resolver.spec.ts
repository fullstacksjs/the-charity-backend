import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { HouseholderResolver } from './householder.resolver';
import { HouseholderService } from './householder.service';

describe('HouseholderResolver', () => {
  let resolver: HouseholderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseholderResolver, HouseholderService],
    }).compile();

    resolver = module.get<HouseholderResolver>(HouseholderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
