import type { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import type { EnvironmentVariables } from '../configuration/EnvironmentVariables';
import { IBAN, Money } from '../shared/scalars';

const mocks = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DateTime: () => {
    return new Date();
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  String: () => {
    return 'string-mock';
  },
};

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}
  createGqlOptions(): ApolloDriverConfig {
    return {
      playground: false,
      debug: true,
      mocks,
      autoSchemaFile: true,
      resolvers: { Money, IBAN },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: this.configService.get('INTROSPECTION_ENABLED'),
      //   cors: {
      //     // TODO: origin should be moved into configModule - not sure regex is valid!
      //     // https://www.debuggex.com/r/XTrC-yG2Yeq2_sAm
      //     origin: /https?:\/\/[a-z0-9\-_]+-fullstacks\.vercel\.app/,
      //     credentials: true,
      //   },
    };
  }
}
