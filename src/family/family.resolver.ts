import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';

import ConnectionArgs, { getPagingParameters } from '../shared/connection.args';
import { CreateFamilyInput } from './dto/input/create-family-input.dto';
import { DraftFamily, Family } from './entities';
import FamilyResponse from './entities/family.response.entity';
import { FamilyService } from './family.service';

@Resolver(() => Family)
export class FamilyResolver {
  constructor(private readonly familyService: FamilyService) {}

  @Query(() => FamilyResponse, { name: 'families' })
  async findAll(@Args() args: ConnectionArgs) {
    const { limit: take, offset: skip } = getPagingParameters(args);

    const families = await this.familyService.findAll({ take, skip });

    return connectionFromArraySlice(families, args, {
      arrayLength: families.length,
      sliceStart: skip ?? 0,
    });
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
