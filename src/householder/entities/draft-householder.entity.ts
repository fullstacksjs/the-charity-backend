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

@ObjectType({ implements: IMember })
export class DraftHouseholder extends IMember {
  @Field(() => Document, { nullable: true })
  personalPhoto?: Document;

  @Field({ nullable: true })
  addicted?: boolean;

  @Field({ nullable: true })
  isAddicted?: boolean;

  @Field({ nullable: true })
  hasBeenAddicted?: boolean;

  @Field(() => CustomMoney, { nullable: true })
  rent?: string;

  @Field({ nullable: true })
  nearbyMosqueAddress?: string;

  @Field({ nullable: true })
  nearbySupermarketAddress?: string;

  @Field({ nullable: true })
  priorAccommodationAddress?: string;

  @Field(() => AccommodationType, { nullable: true })
  accommodationType?: AccommodationType;

  @Field(() => EducationStatus, { nullable: true })
  educationStatus?: EducationStatus;

  @Field(() => Diploma, { nullable: true })
  lastDiploma?: Diploma;

  @Field(() => [Contact], { nullable: true })
  contacts?: Contact[];

  @Field(() => [Dependent], { nullable: true })
  dependent?: Dependent[];

  @Field(() => MaritalStatus, { nullable: true })
  maritalStatus?: MaritalStatus;

  @Field(() => [Skill], { nullable: true })
  skills?: Skill[];

  @Field(() => [Job], { nullable: true })
  jobs?: Job[];

  @Field(() => [Subsidy], { nullable: true })
  subsidies?: Subsidy[];

  @Field(() => [BankAccount], { nullable: true })
  bankAccounts?: BankAccount[];

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Possession], { nullable: true })
  possessions?: Possession[];

  @Field(() => DisabilityStatus, { nullable: true })
  disabilityStatus?: DisabilityStatus;

  @Field(() => [Document], { nullable: true })
  disabilityDocuments?: Document[];

  @Field({ nullable: true })
  disabilityDescription?: string;

  @Field(() => HealthStatus, { nullable: true })
  healthStatus?: HealthStatus;

  @Field(() => [Document], { nullable: true })
  healthDocuments?: Document[];

  @Field({ nullable: true })
  healthDescription?: string;

  @Field(() => [Insurance], { nullable: true })
  insurance?: Insurance[];

  @Field(() => SecondHouseholderProblem, { nullable: true })
  secondHouseholderProblem?: Death | Divorced | Prison;
}
