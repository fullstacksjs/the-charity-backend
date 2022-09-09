import { registerEnumType } from '@nestjs/graphql';

export enum Diploma {
  None = 'NONE',
  Highschool = 'HIGHSCHOOL',
  Bachelor = 'BACHELOR',
  Master = 'MASTER',
}

registerEnumType(Diploma, {
  name: 'Diploma',
  description: 'religion of the members',
  valuesMap: {
    None: {
      description: 'none',
    },
    Highschool: {
      description: 'highschool',
    },
    Bachelor: {
      description: 'bachelor',
    },
    Master: {
      description: 'master',
    },
  },
});
