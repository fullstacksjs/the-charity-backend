import { registerEnumType } from '@nestjs/graphql';

export enum SubsidyType {
  sth = 'STH',
}

registerEnumType(SubsidyType, {
  name: 'SubsidyType',
  description: 'subsidy types',
});
