import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Family } from '../../family/entities/family.entity';

@ObjectType()
export class Project {
  @Field(() => ID)
  declare id: number;

  @Field()
  declare name: string;

  @Field(() => [Family])
  declare families: Family[];
}
