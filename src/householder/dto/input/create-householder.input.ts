import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateHouseholderInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  declare name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  declare family_id: string;
}
