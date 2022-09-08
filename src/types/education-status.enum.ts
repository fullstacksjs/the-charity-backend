import { registerEnumType } from '@nestjs/graphql';

export enum EducationStatus {
  sth = 'STH',
}

registerEnumType(EducationStatus, {
  name: 'EducationStatus',
  description: 'education status of people',
});
