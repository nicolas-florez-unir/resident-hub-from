import { defineStore } from 'pinia';
import { applicationContainer, applicationStorage } from 'src/boot';
import { ValidateTokenUseCase } from 'src/modules/auth/login/application/use-cases';
import { UnauthorizedException } from 'src/modules/auth/login/domain/exceptions';
import type { UserEntity } from 'src/modules/user/domain/entities';

type StoreState = {
  isAuthenticated: boolean | null;
  user: UserEntity | null;
  token: string;
};

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      token: '',
      user: null,
      isAuthenticated: false,
    }) as StoreState,

  actions: {
    async validateToken() {
      const validateTokenUseCase = applicationContainer.getFromContainer(ValidateTokenUseCase);
      const token = applicationStorage.getItem('token');

      if (!token) {
        this.isAuthenticated = false;
        return;
      }

      try {
        const { user, token } = await validateTokenUseCase.handle();
        this.isAuthenticated = true;
        this.user = user;
        this.token = token;
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          applicationStorage.removeItem('token');
          this.isAuthenticated = false;
        }
      }
    },

    login(newUser: UserEntity, newToken: string) {
      this.isAuthenticated = true;
      this.user = newUser;
      this.token = newToken;
      applicationStorage.setItem('token', newToken);
    },

    logout(): void {
      this.isAuthenticated = false;
      this.user = null;
      this.token = '';
      applicationStorage.removeItem('token');
    },
  },
});
