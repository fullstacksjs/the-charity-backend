/* eslint-disable @typescript-eslint/no-empty-function */
import type { LoggerService } from '@nestjs/common';

export class EmptyLogger implements LoggerService {
  log(_message: string): void {}
  error(_message: string, _trace: string): void {}
  warn(_message: string): void {}
  debug(_message: string): void {}
  verbose(_message: string): void {}
}
