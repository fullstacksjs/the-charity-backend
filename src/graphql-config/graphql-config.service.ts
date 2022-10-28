import { Env } from '@fullstacksjs/toolbox';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { GqlOptionsFactory } from '@nestjs/graphql';

import type { Config, GraphqlConfig } from '../configuration';
import { IBAN, Money } from '../shared/scalars';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService<Config, true>) {}
  createGqlOptions(): ApolloDriverConfig {
    const isDev = Env.isDev;
    const graphqlConfig = this.configService.get<GraphqlConfig>('graphql');
    const originAsRegex = graphqlConfig.cors.originAsRegex;
    const apolloSandbox = graphqlConfig.cors.apolloSandboxOrigin;

    return {
      context: ({ req, res }) => ({ req, res }),
      playground: graphqlConfig.playground,
      debug: graphqlConfig.debug,
      mocks: false,
      autoSchemaFile: true,
      resolvers: { Money, IBAN },
      introspection: graphqlConfig.introspection,
      cors: {
        origin: isDev ? [originAsRegex, apolloSandbox] : originAsRegex,
        credentials: true,
      },
    };
  }
}
