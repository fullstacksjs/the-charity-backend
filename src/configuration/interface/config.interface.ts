export interface Config {
  nest: NestConfig;
  graphql: GraphqlConfig;
}

export interface NestConfig {
  port: number;
  prismaLogLevel: 'error' | 'info' | 'query' | 'warn';
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
