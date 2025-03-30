<template>
  <q-header elevated class="q-py-xs" height-hint="58">
    <q-toolbar>
      <q-btn flat dense round @click="emit('menuClick')" aria-label="Menu" icon="menu" />

      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
        <q-btn
          round
          dense
          flat
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          @click="toggleTheme"
        >
          <q-tooltip>Notifications</q-tooltip>
        </q-btn>
        <q-btn round flat>
          <q-avatar size="26px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-tooltip>Account</q-tooltip>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { applicationStorage } from 'boot/application-storage';

const $q = useQuasar();

const emit = defineEmits<{
  menuClick: [];
}>();

function toggleTheme() {
  $q.dark.toggle();
  applicationStorage.setItem('theme', $q.dark.isActive ? 'dark' : 'light');
}
</script>
