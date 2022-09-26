import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  declare name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  declare description?: string;
}
