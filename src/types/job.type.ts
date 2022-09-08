import { Field, ObjectType } from '@nestjs/graphql';

import { CustomMoney } from '../scalars/money.scalar';

@ObjectType()
export class Job {
  @Field()
  declare title: string;

  @Field(() => CustomMoney)
  declare averageIncome: string;

  @Field()
  declare active: boolean;
}
