import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Field()
  declare username: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  declare password: string;
}
