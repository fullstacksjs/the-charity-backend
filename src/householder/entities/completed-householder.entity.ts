import { Field, ObjectType } from '@nestjs/graphql';

import { Dependent } from '../../dependent/entities/dependent.entity';
import { Document, Member, Money } from '../../shared';
import {
  AccommodationType,
  BankAccount,
  Contact,
  Diploma,
  DisabilityStatus,
  EducationStatus,
  HealthStatus,
  Insurance,
  Job,
  MaritalStatus,
  Possession,
  SecondHouseholderProblem,
  Skill,
  Subsidy,
} from '../types';
import { DraftHouseholder } from './draft-householder.entity';

@ObjectType({ implements: Member })
export class CompletedHouseholder extends DraftHouseholder {
  @Field()
  declare firstName: string;

  @Field(() => Document)
  declare personalPhoto: Document;

  @Field()
  declare addicted: boolean;

  @Field()
  declare isAddicted: boolean;

  @Field()
  declare hasBeenAddicted: boolean;

  @Field(() => Money)
  declare rent: string;

  @Field()
  declare nearbyMosqueAddress: string;

  @Field()
  declare nearbySupermarketAddress: string;

  @Field()
  declare priorAccommodationAddress: string;

  @Field(() => AccommodationType)
  declare accommodationType: AccommodationType;

  @Field(() => EducationStatus)
  declare educationStatus: EducationStatus;

  @Field(() => Diploma)
  declare lastDiploma: Diploma;

  @Field(() => [Contact])
  declare contacts: Contact[];

  @Field(() => [Dependent])
  declare dependents: Dependent[];

  @Field(() => MaritalStatus)
  declare maritalStatus: MaritalStatus;

  @Field(() => [Skill])
  declare skills: Skill[];

  @Field(() => [Job])
  declare jobs: Job[];

  @Field(() => [Subsidy])
  declare subsidies: Subsidy[];

  @Field(() => [BankAccount])
  declare bankAccounts: BankAccount[];

  @Field()
  declare description: string;

  @Field(() => [Possession])
  declare possessions: Possession[];

  @Field(() => DisabilityStatus)
  declare disabilityStatus: DisabilityStatus;

  @Field(() => [Document])
  declare disabilityDocuments: Document[];

  @Field()
  declare disabilityDescription: string;

  @Field(() => HealthStatus)
  declare healthStatus: HealthStatus;

  @Field(() => [Document])
  declare healthDocuments: Document[];

  @Field()
  declare healthDescription: string;

  @Field(() => [Insurance])
  declare insurance: Insurance[];

  @Field(() => SecondHouseholderProblem)
  declare secondHouseholderProblem: SecondHouseholderProblem;
}
