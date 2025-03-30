import type { RouteRecordRaw } from 'vue-router';
import LoginPage from '../modules/auth/login/infrastructure/ui/pages/LoginPage.vue';

enum PublicRoutesPath {
  Login = '/login',
}

export enum PublicRoutesName {
  Login = 'login',
}

const routes: RouteRecordRaw[] = [
  {
    path: PublicRoutesPath.Login,
    name: PublicRoutesName.Login,
    component: LoginPage,
  },
];

export default routes;
