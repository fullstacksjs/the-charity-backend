import {
  createUnionType,
  Field,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

@ObjectType()
export class Prison {
  @Field()
  declare relation: string;

  @Field()
  declare duration: string;

  @Field()
  declare cause: string;

  @Field()
  declare address: string;

  @Field()
  declare freedomDate: Date;

  @Field()
  declare description: string;
}

export enum MehrieStatus {
  Sth = 'STH',
}

registerEnumType(MehrieStatus, {
  name: 'MehrieStatus',
  description: 'status of mehrie',
});

@ObjectType()
export class Divorced {
  @Field()
  declare date: Date;

  @Field()
  declare cause: string;

  @Field()
  declare mehrie: string;

  @Field()
  declare mehrieStatus: MehrieStatus;

  @Field()
  declare mehrieDescription: string;

  @Field()
  declare currentCareTaker: string;

  @Field()
  declare description: string;
}

@ObjectType()
export class Death {
  @Field()
  declare relation: string;

  @Field()
  declare date: Date;

  @Field()
  declare cause: string;
}

export const SecondHouseholderProblem = createUnionType({
  name: 'SecondHouseholderProblem',
  description: 'second householder problem = [ prison | divorced | death ]',
  types: () => [Prison, Divorced, Death] as const,
});
