<template>
  <q-layout view="lHh Lpr lff">
    <home-header @menu-click="toggleLeftDrawer" />

    <q-drawer elevated v-model="leftDrawerOpen" show-if-above :width="300" :breakpoint="800">
      <q-scroll-area style="height: calc(100% - 80px); margin-bottom: 80px">
        <q-list>
          <q-item
            clickable
            v-ripple
            v-for="item in options"
            :key="item.route"
            :to="{ name: item.route }"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section> {{ item.label }} </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" color="red" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="absolute-bottom" style="height: 80px">
        <q-separator />
        <q-card class="row items-center no-shadow full-width full-height q-px-md">
          <q-item-section avatar>
            <q-avatar color="orange">
              {{ store.user?.getFullName().charAt(0) }}
            </q-avatar>
          </q-item-section>
          <div class="col overflow-hidden">
            <div class="text-weight-bold ellipsis">{{ store.user?.getFullName() }}</div>
            <div class="text-grey-6 text-subtitle2 ellipsis">{{ store.user?.getEmail() }}</div>
          </div>
          <q-space />
          <q-btn flat round dense icon="more_vert" />
        </q-card>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useAuthStore } from 'src/modules/common/infrastructure/stores/auth.store';
import { PublicRoutesName } from 'src/router/auth-routes';
import { PrivateRoutesName } from 'src/router/private-routes';
import { useRouter } from 'vue-router';
import HomeHeader from '../components/HomeHeader.vue';

const leftDrawerOpen = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const store = useAuthStore();
const $router = useRouter();

const options = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    route: PrivateRoutesName.Dashboard,
  },
  {
    icon: 'person',
    label: 'Perfil',
    route: PrivateRoutesName.Profile,
  },
];

function logout() {
  store.logout();
  $router.push(PublicRoutesName.Login).catch(() => {});
}
</script>
