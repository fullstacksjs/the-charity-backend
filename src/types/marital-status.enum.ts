import { registerEnumType } from '@nestjs/graphql';

export enum MaritalStatus {
  married = 'MARRIED',
  single = 'SINGLE',
  separated = 'SEPARATED',
  divorced = 'DIVORCED',
  widowed = 'WIDOWED',
}

registerEnumType(MaritalStatus, {
  name: 'MaritalStatus',
  description: 'marital status of the householder',
});
