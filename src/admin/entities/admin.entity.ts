import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Admin {
  @Field(() => ID)
  declare id: string;

  @Field()
  declare username: string;
}
