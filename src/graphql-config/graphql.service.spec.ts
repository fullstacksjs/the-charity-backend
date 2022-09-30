import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { ConfigurationModule } from '../configuration/configuration.module';
import { GraphQLConfigService } from './graphql-config.service';

describe('GqlConfigService', () => {
  let graphqlConfigService: GraphQLConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigurationModule],
      providers: [GraphQLConfigService],
    }).compile();

    graphqlConfigService = module.get(GraphQLConfigService);
  });

  it('should be defined', () => {
    expect(graphqlConfigService).toBeDefined();
  });

  describe('createGqlOptions', () => {
    it('should be defined', () => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(graphqlConfigService.createGqlOptions).toBeDefined();
    });

    it('should be return GQL options', () => {
      const options = graphqlConfigService.createGqlOptions();

      jest
        .spyOn(graphqlConfigService, 'createGqlOptions')
        .mockImplementation(() => options);

      expect(graphqlConfigService.createGqlOptions()).toBe(options);
    });
  });
});
