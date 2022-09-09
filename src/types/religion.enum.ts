import { registerEnumType } from '@nestjs/graphql';

export enum Religion {
  Islam = 'ISLAM',
  Christianity = 'CHRISTIANITY',
}

registerEnumType(Religion, {
  name: 'Religion',
  description: 'religion of the members',
  valuesMap: {
    Islam: {
      description: 'the religion of the member is islam',
    },
    Christianity: {
      description: 'the religion of the member is christian',
    },
  },
});
