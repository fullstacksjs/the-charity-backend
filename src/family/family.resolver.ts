import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateFamilyInput } from './dto/input/create-family.input';
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

  @Mutation(() => Family)
  createFamily(@Args('data') createFamilyInput: CreateFamilyInput) {
    return this.familyService.create({ name: createFamilyInput.name });
  }
}
