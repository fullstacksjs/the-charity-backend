import { Field, ID, InterfaceType } from '@nestjs/graphql';

import { Family } from '../../family/entities/family.entity';
import { HouseholderStatus } from '../../householder/entities/householder-status.enum';
import { Document } from '../document.type';
import { Gender } from './gender.enum';
import { Religion } from './religion.enum';

@InterfaceType()
export abstract class Member {
  @Field(() => ID)
  declare id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  fatherName?: string;

  @Field({ nullable: true })
  nationalId?: string;

  @Field({ nullable: true })
  ssn?: string;

  @Field(() => [Document], { nullable: false })
  identityDocument?: Document[];

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  cityOfBirth?: Date;

  @Field({ nullable: true })
  issuedAt?: Date;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  nationality?: string;

  @Field(() => Religion, { nullable: true })
  religion?: Religion;

  @Field(() => HouseholderStatus)
  declare status: HouseholderStatus;

  @Field(() => Family)
  declare family: Family;

  @Field(() => Date)
  declare created_at: Date;

  @Field(() => Date)
  declare updated_at: Date;
}
