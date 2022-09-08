import { Field, ObjectType } from '@nestjs/graphql';

import { Address } from './address.type';

@ObjectType()
export class Contact {
  @Field(() => Address)
  declare address: Address;

  @Field()
  declare phoneNumber: string;

  @Field()
  declare mobilePhoneNumber: string;
}
