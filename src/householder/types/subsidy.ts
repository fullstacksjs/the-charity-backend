import { Field, ObjectType } from '@nestjs/graphql';

import { Money } from '../../shared/scalars/money.scalar';
import { SubsidyType } from './subsidy-type.enum';

@ObjectType()
export class Subsidy {
  @Field(() => SubsidyType)
  declare type: SubsidyType;

  @Field()
  declare description: string;

  @Field(() => Money)
  declare income: string;
}
