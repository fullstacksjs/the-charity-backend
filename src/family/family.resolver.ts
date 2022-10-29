import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArray } from 'graphql-relay';

import { ConnectionArgs } from '../shared';
import {
  CreateFamilyInput,
  GetFamiliesFilters,
  GetFamiliesOrderBy,
} from './dto';
import { DraftFamily, Family, FamilyResponse } from './entities';
import { FamilyService } from './family.service';

@Resolver(() => Family)
export class FamilyResolver {
  constructor(private readonly familyService: FamilyService) {}

  @Query(() => FamilyResponse, { name: 'families' })
  async findAll(
    @Args() args: ConnectionArgs,
    @Args('filter', { nullable: true }) filter: GetFamiliesFilters,
    @Args('orderBy', { nullable: true }) orderBy: GetFamiliesOrderBy,
  ) {
    const families = await this.familyService.findAll(filter, orderBy);

    return connectionFromArray(families, args);
  }

  @Query(() => Family, { name: 'family', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.familyService.findById(id);
  }

  @Mutation(() => DraftFamily, { name: 'createFamily' })
  create(@Args('input') data: CreateFamilyInput) {
    return this.familyService.create(data);
  }
}
