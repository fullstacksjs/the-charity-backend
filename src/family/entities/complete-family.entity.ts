import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Dependent } from '../../dependent/entities/dependent.entity';
import { Project } from '../../project/entities/project.entity';

@ObjectType()
export class CompleteFamily {
  @Field(() => ID)
  declare id: number;

  @Field()
  declare name: string;

  @Field()
  declare archived: boolean;

  @Field()
  declare referrerCode: string;

  @Field({ nullable: true })
  declare completedDate: Date;

  @Field(() => [Project])
  declare projects: Project[];

  @Field(() => [Dependent])
  declare dependents: Dependent[];
}
