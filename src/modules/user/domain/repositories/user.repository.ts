import type { UpdateUserDto } from '../dtos/update-user.dto';
import type { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract update(dto: UpdateUserDto): Promise<UserEntity>;
}
