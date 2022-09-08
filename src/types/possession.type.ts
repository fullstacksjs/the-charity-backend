import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Possession {
  @Field()
  declare description: string;
}
