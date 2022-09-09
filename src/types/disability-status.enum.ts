import { registerEnumType } from '@nestjs/graphql';

export enum DisabilityStatus {
  Sth = 'STH',
}

registerEnumType(DisabilityStatus, {
  name: 'DisabilityStatus',
  description: 'disability status',
});
