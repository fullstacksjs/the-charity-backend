import { createUnionType } from '@nestjs/graphql';

import { CompleteHouseholder } from './complete-householder.entity';
import { DraftHouseholder } from './draft-householder.entity';

export const Householder = createUnionType({
  name: 'householder',
  description: 'householder = [ draft-house, complete-house ]',
  types: () => [DraftHouseholder, CompleteHouseholder] as const,
});
