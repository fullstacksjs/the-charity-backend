import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Family } from '../family/entities/family.entity';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project], { name: 'projects' })
  findAll() {
    return this.projectService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  project(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.findOne(id);
  }

  @ResolveField('families', () => [Family])
  findFamilies(@Parent() project: Project) {
    this.projectService.findAllFamilies(project.id);
  }
}
