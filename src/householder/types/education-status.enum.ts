import { registerEnumType } from '@nestjs/graphql';

export enum EducationStatus {
  Sth = 'STH',
}

registerEnumType(EducationStatus, {
  name: 'EducationStatus',
  description: 'education status of people',
});
