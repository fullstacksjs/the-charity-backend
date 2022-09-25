import { createUnionType } from '@nestjs/graphql';
import { FamilyStatus } from '@prisma/client';

import { CompletedFamily } from './completed-family.entity';
import { DraftFamily } from './draft-family.entity';

export const Family = createUnionType({
  name: 'family',
  description: 'family = [ draft-family, complete-family ]',
  resolveType: value =>
    value.status === FamilyStatus.COMPLETE ? CompletedFamily : DraftFamily,
  types: () => [DraftFamily, CompletedFamily] as const,
});
export type Family = typeof Family;
