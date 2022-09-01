import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

describe('AppModule', () => {
  it('should compile and load app module', async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(ConfigModule)).toBeInstanceOf(ConfigModule);
  });
});
