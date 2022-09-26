import { Args, Query, Resolver } from '@nestjs/graphql';

import { Family } from './entities/family.entity';
import { FamilyService } from './family.service';

@Resolver(() => Family)
export class FamilyResolver {
  constructor(private readonly familyService: FamilyService) {}

  @Query(() => [Family], { name: 'families' })
  findAll() {
    return this.familyService.findAll();
  }

  @Query(() => Family, { name: 'family', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.familyService.findById(id);
  }
}
