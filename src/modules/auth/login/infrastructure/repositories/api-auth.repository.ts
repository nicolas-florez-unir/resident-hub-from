import { inject, injectable } from 'inversify';
import { AxiosError } from 'axios';

import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import type { UserRole } from 'src/modules/user/domain/enums/user-role.enum';
import { UnknownException } from 'src/modules/common/exceptions/unknown.exception';
import { UnauthorizedException } from '../../domain/exceptions/Unauthorized.exception';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { UserAuthenticatedDto } from '../dtos/user-authenticated.dto';

@injectable()
export class ApiAuthRepository extends AuthRepository {
  constructor(@inject(HttpClient) private readonly httpClient: HttpClient) {
    super();
  }

  async login(email: string, password: string): Promise<{ user: UserEntity; token: string }> {
    const result = await this.httpClient.post<UserAuthenticatedDto>('/auth/login', {
      email,
      password,
    });

    const userEntity = new UserEntity(
      result.user.id,
      result.user.email,
      result.user.firstName,
      result.user.lastName,
      result.user.phone,
      result.user.role as UserRole,
    );

    return {
      user: userEntity,
      token: result.token,
    };
  }

  async validateToken(): Promise<{ user: UserEntity; token: string }> {
    try {
      const result = await this.httpClient.post<UserAuthenticatedDto>('/auth/validate-token', {});

      const userEntity = new UserEntity(
        result.user.id,
        result.user.email,
        result.user.firstName,
        result.user.lastName,
        result.user.phone,
        result.user.role as UserRole,
      );

      return {
        user: userEntity,
        token: result.token,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new UnauthorizedException();
        }
      }

      throw new UnknownException();
    }
  }
}
