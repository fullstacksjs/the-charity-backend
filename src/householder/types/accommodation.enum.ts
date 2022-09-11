import { registerEnumType } from '@nestjs/graphql';

export enum AccommodationType {
  Owner = 'OWNER',
  Rent = 'RENT',
}

registerEnumType(AccommodationType, {
  name: 'AccommodationType',
  description: 'accommodation type of the householder',
  valuesMap: {
    Owner: {
      description: 'householder is owner of the house',
    },
    Rent: {
      description: 'householder rents house for specific range of time',
    },
  },
});
