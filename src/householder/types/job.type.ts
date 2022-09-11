import { Field, ObjectType } from '@nestjs/graphql';

import { Money } from '../../shared/scalars/money.scalar';

@ObjectType()
export class Job {
  @Field()
  declare title: string;

  @Field(() => Money)
  declare rageIncome: string;

  @Field()
  declare active: boolean;
}
