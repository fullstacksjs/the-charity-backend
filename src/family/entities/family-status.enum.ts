import { registerEnumType } from '@nestjs/graphql';

export enum FamilyStatus {
  Draft = 'DRAFT',
  Completed = 'COMPLETED',
}

registerEnumType(FamilyStatus, {
  name: 'FamilyStatus',
  description: 'religion of the members',
  valuesMap: {
    Draft: {
      description: 'Family is drafted',
    },
    Completed: {
      description: 'FamilyStatus is completed.',
    },
  },
});
