import { registerEnumType } from '@nestjs/graphql';

export enum DisabilityStatus {
  sth = 'STH',
}

registerEnumType(DisabilityStatus, {
  name: 'DisabilityStatus',
  description: 'disability status',
});
