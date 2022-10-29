import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Min, Validate, ValidateIf } from 'class-validator';
import type { ConnectionArguments } from 'graphql-relay';
import { ConnectionCursor } from 'graphql-relay';

import { CannotUseWith, CannotUseWithout } from '../constraints';

@ArgsType()
export class ConnectionArgs implements ConnectionArguments {
  @Field(() => String, {
    nullable: true,
    description: 'Paginate before opaque cursor',
  })
  @ValidateIf(o => o.before !== undefined)
  @Validate(CannotUseWithout, ['last'])
  @Validate(CannotUseWith, ['after', 'first'])
  readonly before?: ConnectionCursor;

  @Field(() => String, {
    nullable: true,
    description: 'Paginate after opaque cursor',
  })
  @ValidateIf(o => o.after !== undefined)
  @Validate(CannotUseWithout, ['first'])
  @Validate(CannotUseWith, ['before', 'last'])
  readonly after?: ConnectionCursor;

  @Field(() => Int, { nullable: true, description: 'Paginate first' })
  @ValidateIf(o => o.first !== undefined)
  @Min(1)
  @Validate(CannotUseWith, ['before', 'last'])
  readonly first?: number;

  @Field(() => Int, { nullable: true, description: 'Paginate last' })
  @ValidateIf(o => o.last !== undefined)

  // Required `before`. This is a weird corner case.
  // We'd have to invert the ordering of query to get the last few items then re-invert it when emitting the results.
  // We'll just ignore it for now.
  @Validate(CannotUseWithout, ['before'])
  @Validate(CannotUseWith, ['after', 'first'])
  @Min(1)
  readonly last?: number;
}
