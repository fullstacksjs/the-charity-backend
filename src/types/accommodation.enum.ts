import { registerEnumType } from '@nestjs/graphql';

export enum AccommodationType {
  owner = 'OWNER',
  rent = 'RENT',
}

registerEnumType(AccommodationType, {
  name: 'AccommodationType',
  description: 'accommodation type of the householder',
  valuesMap: {
    owner: {
      description: 'householder is owner of the house',
    },
    rent: {
      description: 'householder rents house for specific range of time',
    },
  },
});
