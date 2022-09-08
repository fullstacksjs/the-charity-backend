import { Field, ObjectType } from '@nestjs/graphql';

import { CustomMoney } from '../scalars/money.scalar';
import { SubsidyType } from './subsidy-type.enum';

@ObjectType()
export class Subsidy {
  @Field(() => SubsidyType)
  declare type: SubsidyType;

  @Field()
  declare description: string;

  @Field(() => CustomMoney)
  declare income: string;
}
