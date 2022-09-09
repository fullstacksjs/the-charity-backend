import { registerEnumType } from '@nestjs/graphql';

export enum MaritalStatus {
  Married = 'MARRIED',
  Single = 'SINGLE',
  Separated = 'SEPARATED',
  Divorced = 'DIVORCED',
  Widowed = 'WIDOWED',
}

registerEnumType(MaritalStatus, {
  name: 'MaritalStatus',
  description: 'marital status of the householder',
});
