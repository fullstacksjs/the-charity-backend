export interface Config {
  server: ServerConfig;
  graphql: GraphqlConfig;
  prisma: PrismaConfig;
}

export type PrismaLogLevel = 'error' | 'info' | 'query' | 'warn';

export interface ServerConfig {
  port: number;
}

export interface PrismaConfig {
  logLevel: PrismaLogLevel[] | undefined;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  introspection: boolean;
  cors: CorsConfig;
}

export interface CorsConfig {
  originAsRegex: RegExp;
  apolloSandboxOrigin: string;
  credentials: boolean;
}
