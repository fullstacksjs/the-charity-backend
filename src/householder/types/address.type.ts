import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Address {
  @Field()
  declare city: string;

  @Field()
  declare street: string;

  @Field()
  declare plaque: string;
}
