import { inject, injectable } from 'inversify';
import { applicationStorage } from 'src/boot';
import { UserEntity } from 'src/modules/user/domain/entities';
import { AuthRepository } from '../../domain/repositories';
import { UnauthorizedException } from '../../domain/exceptions';

@injectable()
export class ValidateTokenUseCase {
  constructor(
    @inject(AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {}

  async handle(): Promise<{ user: UserEntity; token: string }> {
    const tokenInStorage = applicationStorage.getItem('token');

    if (!tokenInStorage) throw new UnauthorizedException();

    return this.authRepository.validateToken(tokenInStorage);
  }
}
