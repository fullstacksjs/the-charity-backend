import { createUnionType } from '@nestjs/graphql';

import { CompleteFamily } from './complete-family.entity';
import { DraftFamily } from './draft-family.entity';

export const Family = createUnionType({
  name: 'family',
  description: 'family = [ draft-family, complete-family ]',
  types: () => [DraftFamily, CompleteFamily] as const,
});
