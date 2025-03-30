import type { RouteRecordRaw } from 'vue-router';
import HomeLayout from 'src/modules/home/infrastructure/ui/layout/HomeLayout.vue';
import DashboardPage from 'src/modules/dashboard/infrastructure/ui/pages/DashboardPage.vue';
import ProfilePage from 'src/modules/user/infrastructure/ui/pages/ProfilePage.vue';

export enum PrivateRoutesName {
  Home = 'home',
  Dashboard = 'dashboard',
  Profile = 'profile',
}

const privateRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: PrivateRoutesName.Home,
    redirect: { name: PrivateRoutesName.Dashboard },
    component: HomeLayout,
    children: [
      {
        path: '/dashboard',
        name: PrivateRoutesName.Dashboard,
        component: DashboardPage,
      },
      {
        path: '/profile',
        name: PrivateRoutesName.Profile,
        component: ProfilePage,
      },
    ],
  },
];

export default privateRoutes;
