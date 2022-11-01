import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

import { SortOrder } from '../../../shared/sort-order.enum';

@InputType()
export class GetFamiliesOrderBy {
  @Field(() => SortOrder, { nullable: true })
  @IsOptional()
  @IsString()
  created_at?: SortOrder;
}
