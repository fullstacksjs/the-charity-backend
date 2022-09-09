import { registerEnumType } from '@nestjs/graphql';

export enum SubsidyType {
  Sth = 'STH',
}

registerEnumType(SubsidyType, {
  name: 'SubsidyType',
  description: 'subsidy types',
});
