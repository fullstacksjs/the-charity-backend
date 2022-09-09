import { GraphQLScalarType } from 'graphql';

function validate(iban: unknown): never | string {
  if (typeof iban !== 'string') {
    throw new Error('invalid iban');
  }
  return iban;
}

export const IBAN = new GraphQLScalarType({
  name: 'IBAN',
  description: 'An IBAN',
  serialize: value => validate(value),
  parseValue: value => validate(value),
});
