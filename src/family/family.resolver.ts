import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArray } from 'graphql-relay';

import ConnectionArgs from '../shared/connection.args';
import { CreateFamilyInput } from './dto/input/create-family-input.dto';
import { GetFamiliesFilters } from './dto/input/get-families-filter.dto';
import { GetFamiliesOrderBy } from './dto/input/get-families-order-by.dto';
import { DraftFamily, Family } from './entities';
import DraftFamilyResponse from './entities/draft-family.response.entity';
import { FamilyService } from './family.service';

@Resolver(() => Family)
export class FamilyResolver {
  constructor(private readonly familyService: FamilyService) {}

  @Query(() => DraftFamilyResponse, { name: 'families' })
  async findAll(
    @Args() args: ConnectionArgs,
    @Args('filter') filter: GetFamiliesFilters,
    @Args('orderBy') orderBy: GetFamiliesOrderBy,
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
