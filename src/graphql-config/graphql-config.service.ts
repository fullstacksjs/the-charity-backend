import { Env } from '@fullstacksjs/toolbox';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import type { EnvironmentVariables } from '../configuration/EnvironmentVariables';
import { IBAN, Money } from '../shared/scalars';
import { scalerMocks } from './scalerMocks';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}
  createGqlOptions(): ApolloDriverConfig {
    const isDev = Env.isDev;
    // https://www.debuggex.com/r/XTrC-yG2Yeq2_sAm
    const originAsRegex = /https?:\/\/[a-z0-9\-_]+-fullstacks\.vercel\.app/;
    const apolloSandbox = 'https://studio.apollographql.com';

    return {
      playground: false,
      debug: true,
      mocks: scalerMocks,
      autoSchemaFile: true,
      resolvers: { Money, IBAN },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: this.configService.get('INTROSPECTION_ENABLED'),
      cors: {
        origin: isDev ? [originAsRegex, apolloSandbox] : originAsRegex,
        credentials: true,
      },
    };
  }
}
