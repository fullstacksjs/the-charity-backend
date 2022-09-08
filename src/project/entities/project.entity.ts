import { Field, ID, ObjectType } from '@nestjs/graphql';

import type { CompleteFamily } from '../../family/entities/complete-family.entity';
import type { DraftFamily } from '../../family/entities/draft-family.entity';
import { Family } from '../../family/entities/family.entity';

@ObjectType()
export class Project {
  @Field(() => ID)
  declare id: number;

  @Field()
  declare name: string;

  @Field(() => [Family])
  declare families: CompleteFamily[] | DraftFamily[];
}
