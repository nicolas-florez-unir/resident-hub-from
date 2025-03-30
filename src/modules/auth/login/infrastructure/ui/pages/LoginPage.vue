<template>
  <!-- Contenedor principal con fondo oscuro, ocupando toda la pantalla -->
  <div class="fullscreen q-pa-xl flex flex-center">
    <!-- Contenedor con dos columnas (izquierda: características, derecha: formulario) -->
    <div
      class="row items-start justify-center q-col-gutter-xl"
      style="max-width: 1200px; width: 100%"
    >
      <!-- Columna Izquierda: Descripción de producto/servicio -->
      <div class="col-12 col-md-6 q-mb-md">
        <div class="text-h4 q-mb-md">Stormwork</div>

        <!-- Lista de características -->
        <q-list separator class="rounded-borders">
          <q-item>
            <q-item-section>
              <div class="text-subtitle1">Adaptable performance</div>
              <div class="text-body2">
                Your product effortlessly adjusts to your needs, boosting efficiency and simplifying
                your tasks.
              </div>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <div class="text-subtitle1">Built-in best</div>
              <div class="text-body2">
                Experience streamlined durability that goes above and beyond new industry standards.
              </div>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <div class="text-subtitle1">Great user experience</div>
              <div class="text-body2">
                Integrate into and optimize your routine with an intuitive and versatile interface.
              </div>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <div class="text-subtitle1">Innovative functionality</div>
              <div class="text-body2">
                Stay ahead with features that set new standards, addressing evolving needs for years
                to come.
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Columna Derecha: Formulario de Inicio de Sesión -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-lg">
          <!-- Sección de cabecera con título -->
          <q-card-section>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <div class="text-h5 q-mb-lg">Login</div>
              <q-input
                v-model="form.email"
                label="Email"
                type="email"
                outlined
                :rules="[
                  (val) => !!val || 'Email is required',
                  (val) => /.+@.+\..+/.test(val) || 'Invalid email',
                ]"
              />
              <q-input
                v-model="form.password"
                label="Password"
                outlined
                type="password"
                :rules="[(val) => !!val || 'Password is required']"
              />
              <div class="row justify-end">
                <q-btn type="reset" label="Reset" color="secondary" flat />
                <q-btn type="submit" label="Login" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { applicationContainer } from 'src/boot/application-container';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { LoginUseCase } from 'src/modules/auth/login/application/use-cases';
import { useAuthStore } from 'src/modules/common/infrastructure/stores/auth.store';

const router = useRouter();
const store = useAuthStore();
const $q = useQuasar();

const loginUseCase = applicationContainer.getFromContainer(LoginUseCase);

const form = reactive({
  email: '',
  password: '',
});

const onSubmit = async () => {
  $q.loading.show();
  try {
    const { user, token } = await loginUseCase.handle(form.email, form.password);
    store.login(user, token);
    await router.replace('/');
  } catch (error) {
    console.log(error);
  } finally {
    $q.loading.hide();
  }
};

const onReset = () => {
  form.email = '';
  form.password = '';
};
</script>
