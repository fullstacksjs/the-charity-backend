import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Insurance {
  @Field()
  declare organization: string;

  @Field()
  declare startDate: Date;
}
