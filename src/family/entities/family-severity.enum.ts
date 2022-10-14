import { registerEnumType } from '@nestjs/graphql';

export enum FamilySeverity {
  NORMAL = 'NORMAL',
  CRITICAL = 'CRITICAL',
}

registerEnumType(FamilySeverity, {
  name: 'FamilySeverity',
  valuesMap: {
    NORMAL: {
      description: 'FamilySeverity is normal.',
    },
    CRITICAL: {
      description: 'FamilySeverity is critical.',
    },
  },
});
