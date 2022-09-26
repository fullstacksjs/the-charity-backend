import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ProjectStatus } from './project-status.enum';

@ObjectType()
export class Project {
  @Field(() => ID)
  declare id: number;

  @Field()
  declare name: string;

  @Field({ nullable: true })
  declare description?: string;

  @Field(() => ProjectStatus, { defaultValue: ProjectStatus.PLANNING })
  declare status: ProjectStatus;

  @Field()
  declare updated_at: Date;

  @Field()
  declare created_at: Date;
}
