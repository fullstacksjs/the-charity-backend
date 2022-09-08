import { registerEnumType } from '@nestjs/graphql';

export enum HealthStatus {
  sth = 'STH',
}

registerEnumType(HealthStatus, {
  name: 'HealthStatus',
  description: 'health status',
});
