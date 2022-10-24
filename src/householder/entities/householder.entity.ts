import { createUnionType } from '@nestjs/graphql';
import { HouseholderStatus } from '@prisma/client';

import { CompletedHouseholder } from './completed-householder.entity';
import { DraftHouseholder } from './draft-householder.entity';

export const Householder = createUnionType({
  name: 'householder',
  description: 'householder = [ draft-householder, completed-householder ]',
  resolveType: value =>
    value.status === HouseholderStatus.COMPLETED
      ? CompletedHouseholder
      : DraftHouseholder,
  types: () => [DraftHouseholder, CompletedHouseholder] as const,
});
