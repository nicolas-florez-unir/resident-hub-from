import { inject, injectable } from 'inversify';

import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import type { UpdateUserDto } from '../../domain/dtos/update-user.dto';
import type { UserRole } from '../../domain/enums/user-role.enum';
import { UserUpdatedDto } from '../dtos/user-updated.dto';

@injectable()
export class ApiUserRepository extends UserRepository {
  constructor(
    @inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {
    super();
  }

  async update(dto: UpdateUserDto): Promise<UserEntity> {
    const result = await this.httpClient.put<UserUpdatedDto>(`/user`, {
      email: dto.getEmail(),
      firstName: dto.getFistName(),
      lastName: dto.getLastName(),
      phone: dto.getPhone(),
      role: dto.getRole(),
    });

    return new UserEntity(
      result.id,
      result.email,
      result.firstName,
      result.lastName,
      result.phone,
      result.role as UserRole,
    );
  }
}
