import { registerEnumType } from '@nestjs/graphql';

export enum FamilySeverity {
  NORMAL = 'NORMAL',
  CRITICAL = 'CRITICAL',
}

registerEnumType(FamilySeverity, { name: 'FamilySeverity' });
