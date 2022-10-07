import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateFamilyInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  declare name: string;
}
