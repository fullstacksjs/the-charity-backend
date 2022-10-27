import type { ApolloServerPluginLandingPageGraphQLPlaygroundOptions } from 'apollo-server-core';
import type { SessionOptions } from 'express-session';

export interface Config {
  server: ServerConfig;
  graphql: GraphqlConfig;
  prisma: PrismaConfig;
  auth: AuthConfig;
}

export type PrismaLogLevel = 'error' | 'info' | 'query' | 'warn';

export interface ServerConfig {
  port: number;
}

export interface PrismaConfig {
  logLevel: PrismaLogLevel[] | undefined;
}

export interface GraphqlConfig {
  playground?: ApolloServerPluginLandingPageGraphQLPlaygroundOptions | boolean;
  debug: boolean;
  introspection: boolean;
  cors: CorsConfig;
}

export interface CorsConfig {
  originAsRegex: RegExp;
  apolloSandboxOrigin: string;
  credentials: boolean;
}

export interface AuthConfig {
  session: SessionOptions;
}
