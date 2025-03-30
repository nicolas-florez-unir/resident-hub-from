import { defineBoot } from '@quasar/app-vite/wrappers';
import { useAuthStore } from 'src/modules/common/infrastructure/stores/auth.store';

export default defineBoot(async () => {
  const authStore = useAuthStore();
  await authStore.validateToken();
});
