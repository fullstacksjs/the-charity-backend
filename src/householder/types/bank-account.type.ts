import { Field, ObjectType } from '@nestjs/graphql';

import { IBAN } from '../../shared/scalars/iban.scalar';

@ObjectType()
export class BankAccount {
  @Field()
  declare bankName: string;

  @Field()
  declare cardNumber: string;

  @Field(() => IBAN)
  declare iban: string;

  @Field()
  declare accountNumber: string;
}
