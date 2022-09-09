import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Document {
  @Field()
  declare url: string;
}
