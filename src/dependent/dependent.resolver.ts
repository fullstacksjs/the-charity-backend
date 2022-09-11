import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { DependentService } from './dependent.service';
import { Dependent } from './entities/dependent.entity';

@Resolver(() => Dependent)
export class DependentResolver {
  constructor(private readonly dependentService: DependentService) {}

  @Query(() => [Dependent], { name: 'dependents' })
  findAll() {
    return this.dependentService.findAll();
  }

  @Query(() => Dependent, { name: 'dependent' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dependentService.findOne(id);
  }
}
