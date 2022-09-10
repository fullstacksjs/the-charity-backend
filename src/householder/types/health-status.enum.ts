import { registerEnumType } from '@nestjs/graphql';

export enum HealthStatus {
  Sth = 'STH',
}

registerEnumType(HealthStatus, {
  name: 'HealthStatus',
  description: 'health status',
});
