import { Field, ObjectType } from '@nestjs/graphql';

import { DraftFamily } from './draft-family.entity';

@ObjectType()
export class CompleteFamily extends DraftFamily {
  @Field()
  declare name: string;

  @Field()
  declare archived: boolean;

  @Field()
  declare referrerCode: string;

  @Field()
  declare completedDate: Date;
}
