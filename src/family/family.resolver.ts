import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { Family } from './entities/family.entity';
import { FamilyService } from './family.service';

@Resolver(() => Family)
export class FamilyResolver {
  constructor(private readonly familyService: FamilyService) {}

  @Query(() => [Family], { name: 'families' })
  findAll() {
    return this.familyService.findAll();
  }

  @Query(() => Family, { name: 'family' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.familyService.findOne(id);
  }
}
