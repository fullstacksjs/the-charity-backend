import { Field, ID, InterfaceType } from '@nestjs/graphql';

import type { CompleteFamily } from '../family/entities/complete-family.entity';
import type { DraftFamily } from '../family/entities/draft-family.entity';
import { Family } from '../family/entities/family.entity';
import { Document } from './document.type';
import { Gender } from './gender.enum';
import { Religion } from './religion.enum';

@InterfaceType()
export default abstract class IMember {
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

  @Field(() => Family)
  declare family: CompleteFamily | DraftFamily;
}
