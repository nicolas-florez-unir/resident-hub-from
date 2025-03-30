<template>
  <q-page class="q-pa-md">
    <div class="col-12 col-md-10 col-lg-8">
      <div class="text-h3 q-mb-md">Perfil Personal</div>
      <q-separator spaced />

      <q-form @submit="onSubmit">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input filled v-model="form.firstName" label="Nombre" />
          </div>
          <div class="col-12 col-md-6">
            <q-input filled v-model="form.lastName" label="Apellido" />
          </div>
          <div class="col-12 col-md-6">
            <q-input filled v-model="form.email" label="Email" type="email" />
          </div>
          <div class="col-12 col-md-6">
            <q-input filled v-model="form.phone" label="Teléfono" type="tel" />
          </div>
          <div class="col-12">
            <q-select filled v-model="form.role" label="Rol" :options="roles" />
          </div>
        </div>

        <q-card-actions align="right">
          <q-btn label="Guardar" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useQuasar } from 'quasar';
import { applicationContainer } from 'src/boot';
import { useAuthStore } from 'src/modules/common/infrastructure/stores/auth.store';
import { UpdateUserUseCase } from 'src/modules/user/application/use-cases';
import { UpdateUserDto } from 'src/modules/user/domain/dtos';

const $q = useQuasar();
const store = useAuthStore();
const updateUserUseCase = applicationContainer.getFromContainer(UpdateUserUseCase);

const form = reactive({
  email: store.user?.getEmail(),
  firstName: store.user?.getFirstName(),
  lastName: store.user?.getLastName(),
  phone: store.user?.getPhone(),
  role: store.user?.getRole(),
});

const roles = [
  { label: 'Administrador', value: 'Admin' },
  { label: 'Propietario', value: 'HouseOwner' },
];

const onSubmit = async () => {
  $q.loading.show({
    message: 'Actualizando datos...',
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const updatedUser = await updateUserUseCase.handle(
      new UpdateUserDto(
        store.user?.getId() ?? 0,
        form.email ?? '',
        form.firstName ?? '',
        form.lastName ?? '',
        form.phone ?? '',
        form.role ?? '',
      ),
    );

    store.login(updatedUser, store.token);

    $q.notify({
      type: 'positive',
      message: 'Datos actualizados correctamente',
      position: 'bottom-right',
    });
  } catch (error) {
    console.log(error);
  } finally {
    $q.loading.hide();
  }
};
</script>
