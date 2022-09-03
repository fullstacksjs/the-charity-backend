import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

describe('AppModule', () => {
  it('should compile and load app module', async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(ConfigModule)).toBeInstanceOf(ConfigModule);
  });
});
