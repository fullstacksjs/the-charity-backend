import { Field, ObjectType } from '@nestjs/graphql';

import { CompleteFamily } from './complete-family.entity';

@ObjectType()
export class DraftFamily extends CompleteFamily {
  @Field({ nullable: true })
  declare draftDate?: Date;
}
