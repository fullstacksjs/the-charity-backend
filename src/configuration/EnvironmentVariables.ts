export interface EnvironmentVariables {
  /* eslint-disable @typescript-eslint/naming-convention */
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  DATABASE_URL: string;
  /* eslint-enable @typescript-eslint/naming-convention */
}
