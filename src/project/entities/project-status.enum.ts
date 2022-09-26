import { registerEnumType } from '@nestjs/graphql';

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  INPROGRESS = 'IN_PROGRESS',
  SUSPENDED = 'SUSPENDED',
  DONE = 'DONE',
}

registerEnumType(ProjectStatus, {
  name: 'ProjectStatus',
  description: 'current status of project ',
});
