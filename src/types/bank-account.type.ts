import { Field, ObjectType } from '@nestjs/graphql';

import { CustomIBAN } from '../scalars/iban.scalar';

@ObjectType()
export class BankAccount {
  @Field()
  declare bankName: string;

  @Field()
  declare cardNumber: string;

  @Field(() => CustomIBAN)
  declare iban: string;

  @Field()
  declare accountNumber: string;
}
