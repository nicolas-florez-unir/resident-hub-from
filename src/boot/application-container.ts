import type { Newable, ServiceIdentifier } from 'inversify';
import { Container } from 'inversify';
import { LoginUseCase, ValidateTokenUseCase } from 'src/modules/auth/login/application/use-cases';
import { AuthRepository } from 'src/modules/auth/login/domain/repositories';
import { ApiAuthRepository } from 'src/modules/auth/login/infrastructure/repositories';
import { HttpClient } from 'src/modules/common/http/domain/HttpClient';
import { AxiosHttpClient } from 'src/modules/common/http/infrastructure/AxiosHttpClient';
import { UpdateUserUseCase } from 'src/modules/user/application/use-cases/update-user.use-case';
import { UserRepository } from 'src/modules/user/domain/repositories';
import { ApiUserRepository } from 'src/modules/user/infrastructure/repositories';

class ApplicationContainer {
  private readonly container: Container = new Container();

  private readonly repositories: Array<{
    abstract: ServiceIdentifier;
    resolve: Newable;
  }> = [
    {
      abstract: AuthRepository,
      resolve: ApiAuthRepository,
    },
    {
      abstract: HttpClient,
      resolve: AxiosHttpClient,
    },
    {
      abstract: UserRepository,
      resolve: ApiUserRepository,
    },
  ];

  private readonly useCases: Array<ServiceIdentifier> = [
    LoginUseCase,
    ValidateTokenUseCase,
    UpdateUserUseCase,
  ];

  constructor() {
    this.bindRepositories();
    this.bindUseCases();
  }

  private bindRepositories() {
    this.repositories.forEach(({ abstract, resolve }) => this.container.bind(abstract).to(resolve));
  }

  private bindUseCases() {
    this.useCases.forEach((useCase) => this.container.bind(useCase).toSelf());
  }

  getFromContainer<T>(key: ServiceIdentifier<T>): T {
    return this.container.get(key);
  }
}

const applicationContainer = new ApplicationContainer();

export { applicationContainer };
