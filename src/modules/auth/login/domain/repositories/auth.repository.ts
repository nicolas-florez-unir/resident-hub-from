import type { UserEntity } from 'src/modules/user/domain/entities/user.entity';

export abstract class AuthRepository {
  abstract login(email: string, password: string): Promise<{ user: UserEntity; token: string }>;

  abstract validateToken(token: string): Promise<{ user: UserEntity; token: string }>;
}
