import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFamilyInput {
  @Field()
  name: string;
}
