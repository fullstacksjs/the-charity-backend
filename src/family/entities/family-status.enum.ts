import { registerEnumType } from '@nestjs/graphql';

export enum FamilyStatus {
  Draft = 'DRAFT',
  Completed = 'COMPLETE',
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
