import { GraphQLScalarType } from 'graphql';

function validate(iban: unknown): never | string {
  if (typeof iban !== 'string') {
    throw new Error('invalid iban');
  }
  return iban;
}

export const CustomIBAN = new GraphQLScalarType({
  name: 'IBAN',
  description: 'A simple IBAN parser',
  serialize: value => validate(value),
  parseValue: value => validate(value),
});
