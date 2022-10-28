import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResponseDto {
  @Expose()
  declare readonly id: string;

  @Expose()
  declare readonly username: string;
}
