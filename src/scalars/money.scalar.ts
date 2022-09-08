import { GraphQLScalarType } from 'graphql';

function validate(money: unknown): never | string {
  if (typeof money !== 'string') {
    throw new Error('invalid money');
  }
  return money;
}

export const CustomMoney = new GraphQLScalarType({
  name: 'Money',
  description: 'A simple Money parser',
  serialize: value => validate(value),
  parseValue: value => validate(value),
});
