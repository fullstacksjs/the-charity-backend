import { registerEnumType } from '@nestjs/graphql';

export enum Diploma {
  none = 'NONE',
  highschool = 'HIGHSCHOOL',
  bachelor = 'BACHELOR',
  master = 'MASTER',
}

registerEnumType(Diploma, {
  name: 'Diploma',
  description: 'religion of the members',
  valuesMap: {
    none: {
      description: 'none',
    },
    highschool: {
      description: 'highschool',
    },
    bachelor: {
      description: 'bachelor',
    },
    master: {
      description: 'master',
    },
  },
});
