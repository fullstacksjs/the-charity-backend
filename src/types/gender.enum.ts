import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
  male = 'MALE',
  female = 'FEMALE',
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'religion of the members',
  valuesMap: {
    male: {
      description: 'gender is male',
    },
    female: {
      description: 'gender is female.',
    },
  },
});
