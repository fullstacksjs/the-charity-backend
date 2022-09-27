import { registerEnumType } from '@nestjs/graphql';

export enum FamilyStatus {
  DRAFT = 'DRAFT',
  COMPLETED = 'COMPLETED',
}

registerEnumType(FamilyStatus, {
  name: 'FamilyStatus',
  description: 'religion of the members',
  valuesMap: {
    DRAFT: {
      description: 'Family is drafted',
    },
    COMPLETED: {
      description: 'FamilyStatus is completed.',
    },
  },
});
