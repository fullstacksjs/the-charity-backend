import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Dependent } from '../../dependent/entities/dependent.entity';
import { Project } from '../../project/entities/project.entity';
import { FamilySeverity } from './family-severity.enum';
import { FamilyStatus } from './family-status.enum';

@ObjectType()
export class DraftFamily {
  @Field(() => ID)
  declare id: string;

  @Field()
  declare code: number;

  @Field(() => FamilyStatus)
  declare status: FamilyStatus;

  @Field(() => FamilySeverity)
  declare severity: FamilySeverity;

  @Field({ nullable: true })
  declare name?: string;

  @Field({ nullable: true })
  declare archived?: boolean;

  @Field({ nullable: true })
  declare referrerCode?: string;

  @Field()
  declare draftDate: Date;

  @Field(() => [Project])
  declare projects: Project[];

  @Field(() => [Dependent])
  declare dependents: Dependent[];
}
