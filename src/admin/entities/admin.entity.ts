import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Admin {
  @Field(() => ID)
  declare id: number;

  @Field()
  declare email: string;

  @Field()
  declare password: string;
}
