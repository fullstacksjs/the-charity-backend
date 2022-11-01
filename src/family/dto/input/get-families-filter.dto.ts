import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class GetFamiliesFilters {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  householder_id?: string;
}
