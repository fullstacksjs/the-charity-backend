import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateHouseholderInput } from './dto/input/create-householder.input';
import { Householder } from './entities/householder.entity';
import { HouseholderService } from './householder.service';

@Resolver(() => Householder)
export class HouseholderResolver {
  constructor(private readonly householderService: HouseholderService) {}

  @Mutation(() => Householder, { name: 'createHouseholder' })
  create(@Args('input') data: CreateHouseholderInput) {
    return this.householderService.create(data);
  }
}
