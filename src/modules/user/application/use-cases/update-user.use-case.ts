import { inject, injectable } from 'inversify';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../domain/dtos/update-user.dto';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async handle(dto: UpdateUserDto): Promise<UserEntity> {
    return await this.userRepository.update(dto);
  }
}
