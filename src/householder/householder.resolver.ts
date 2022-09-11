import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { Householder } from './entities/householder.entity';
import { HouseholderService } from './householder.service';

@Resolver(() => Householder)
export class HouseholderResolver {
  constructor(private readonly householderService: HouseholderService) {}

  @Query(() => [Householder], { name: 'householders' })
  findAll() {
    return this.householderService.findAll();
  }

  @Query(() => Householder, { name: 'householder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.householderService.findOne(id);
  }
}
