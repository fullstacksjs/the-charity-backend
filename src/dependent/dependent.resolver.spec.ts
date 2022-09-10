import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { DependentResolver } from './dependent.resolver';
import { DependentService } from './dependent.service';

describe('DependentResolver', () => {
  let resolver: DependentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DependentResolver, DependentService],
    }).compile();

    resolver = module.get<DependentResolver>(DependentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
