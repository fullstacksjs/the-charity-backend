import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'religion of the members',
  valuesMap: {
    Male: {
      description: 'gender is male',
    },
    Female: {
      description: 'gender is female.',
    },
  },
});
