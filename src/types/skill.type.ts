import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field()
  declare name: string;

  @Field()
  declare description: string;
}
