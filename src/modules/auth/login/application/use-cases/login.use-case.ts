import { inject, injectable } from 'inversify';
import { AuthRepository } from '../../domain/repositories';

@injectable()
export class LoginUseCase {
  constructor(
    @inject(AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {}

  public handle(email: string, password: string) {
    return this.authRepository.login(email, password);
  }
}
