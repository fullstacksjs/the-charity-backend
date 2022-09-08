import { registerEnumType } from '@nestjs/graphql';

export enum Religion {
  islam = 'islam',
  christianity = 'CHRISTIANITY',
}

registerEnumType(Religion, {
  name: 'Religion',
  description: 'religion of the members',
  valuesMap: {
    islam: {
      description: 'the religion of the member is islam',
    },
    christianity: {
      description: 'the religion of the member is christian',
    },
  },
});
