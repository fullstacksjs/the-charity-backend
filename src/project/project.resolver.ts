import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProjectInput } from './dto/input';
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

  @Mutation(() => Project, { name: 'project' })
  createOne(@Args('input') data: CreateProjectInput) {
    return this.projectService.createOne(data);
  }
}
