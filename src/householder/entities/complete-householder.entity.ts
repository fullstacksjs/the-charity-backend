import { Field, ObjectType } from '@nestjs/graphql';

import { Dependent } from '../../dependent/entities/dependent.entity';
import { CustomMoney } from '../../scalars/money.scalar';
import { AccommodationType } from '../../types/accommodation.enum';
import { BankAccount } from '../../types/bank-account.type';
import { Contact } from '../../types/contact.type';
import { Diploma } from '../../types/diploma.enum';
import { DisabilityStatus } from '../../types/disability-status.enum';
import { Document } from '../../types/document.type';
import { EducationStatus } from '../../types/education-status.enum';
import { HealthStatus } from '../../types/health-status.enum';
import { Insurance } from '../../types/insurance.type';
import { Job } from '../../types/job.type';
import { MaritalStatus } from '../../types/marital-status.enum';
import IMember from '../../types/member.entity';
import { Possession } from '../../types/possession.type';
import type {
  Death,
  Divorced,
  Prison,
} from '../../types/second-householder-problem.union';
import { SecondHouseholderProblem } from '../../types/second-householder-problem.union';
import { Skill } from '../../types/skill.type';
import { Subsidy } from '../../types/subsidy';
import { DraftHouseholder } from './draft-householder.entity';

@ObjectType({ implements: IMember })
export class CompleteHouseholder extends DraftHouseholder {
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

  @Field(() => CustomMoney)
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
  declare secondHouseholderProblem: Death | Divorced | Prison;
}
