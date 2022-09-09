import { Field, ObjectType } from '@nestjs/graphql';

import { Dependent } from '../../dependent/entities/dependent.entity';
import { Document } from '../../shared/document.type';
import { Member } from '../../shared/member';
import { Money } from '../../shared/scalars';
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

@ObjectType({ implements: Member })
export class DraftHouseholder extends Member {
  @Field(() => Document, { nullable: true })
  personalPhoto?: Document;

  @Field({ nullable: true })
  addicted?: boolean;

  @Field({ nullable: true })
  isAddicted?: boolean;

  @Field({ nullable: true })
  hasBeenAddicted?: boolean;

  @Field(() => Money, { nullable: true })
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

  @Field(() => [Dependent])
  dependent: Dependent[];

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
  secondHouseholderProblem?: SecondHouseholderProblem;
}
