import { registerEnumType } from '@nestjs/graphql';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});
