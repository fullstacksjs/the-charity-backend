import { registerEnumType } from '@nestjs/graphql';

export enum HouseholderStatus {
  DRAFT = 'DRAFT',
  COMPLETED = 'COMPLETED',
}

registerEnumType(HouseholderStatus, {
  name: 'HouseholderStatus',
  description: 'householder status',
});
