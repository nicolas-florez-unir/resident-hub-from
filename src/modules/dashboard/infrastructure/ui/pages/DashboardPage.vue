<template>
  <q-page class="q-my-sm q-mx-md">
    <div class="text-h3 q-my-md">Dashboard</div>

    <div class="row q-col-gutter-md">
      <div class="col-3">
        <q-card class="">
          <q-card-section>
            <div class="text-h6">Usuarios Activos</div>
            <div class="text-h4 text-primary">1,235</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-3">
        <q-card>
          <q-card-section>
            <div class="text-h6">Ventas</div>
            <div class="text-h4 text-green">$45,320</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-3">
        <q-card>
          <q-card-section>
            <div class="text-h6">Tickets Abiertos</div>
            <div class="text-h4 text-red">23</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-3">
        <q-card>
          <q-card-section>
            <div class="text-h6">Tasa de Conversión</div>
            <div class="text-h4 text-orange">5.7%</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-mt-xs q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Ventas Mensuales</div>
            <q-img src="https://via.placeholder.com/400x200" fit="contain" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Usuarios Activos</div>
            <q-img src="https://via.placeholder.com/400x200" fit="contain" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-mt-md">
      <q-card class="col-12">
        <q-card-section>
          <div class="text-h6">Últimas Transacciones</div>
          <q-table :rows="transactions" :columns="columns" row-key="id" />
        </q-card-section>
      </q-card>
    </div>

    <div class="row q-mt-xs q-col-gutter-md">
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Tareas Pendientes</div>
            <q-list bordered separator>
              <q-item v-for="task in tasks" :key="task.id">
                <q-item-section>{{ task.name }}</q-item-section>
                <q-item-section side>
                  <q-btn icon="done" flat color="green" size="sm" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Notificaciones</div>
            <q-list bordered separator>
              <q-item v-for="notification in notifications" :key="notification.id">
                <q-item-section>
                  <q-item-label>{{ notification.message }}</q-item-label>
                  <q-item-label caption>{{ notification.time }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Usuarios Recientes</div>
            <q-list bordered separator>
              <q-item v-for="user in recentUsers" :key="user.id">
                <q-item-section>{{ user.name }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import { ref } from 'vue';

const transactions = ref([
  { id: 1, name: 'Cliente A', amount: '$500', date: '2025-03-28' },
  { id: 2, name: 'Cliente B', amount: '$1200', date: '2025-03-27' },
  { id: 3, name: 'Cliente C', amount: '$700', date: '2025-03-26' },
]);

const columns = ref<QTableColumn[]>([
  { name: 'name', label: 'Cliente', field: 'name', align: 'left' },
  { name: 'amount', label: 'Monto', field: 'amount', align: 'right' },
  { name: 'date', label: 'Fecha', field: 'date', align: 'right' },
]);

const tasks = ref([
  { id: 1, name: 'Revisar reporte de ventas' },
  { id: 2, name: 'Actualizar inventario' },
  { id: 3, name: 'Llamar a cliente importante' },
]);

const notifications = ref([
  { id: 1, message: 'Nuevo pedido recibido', time: 'Hace 5 minutos' },
  { id: 2, message: 'Usuario registrado', time: 'Hace 10 minutos' },
  { id: 3, message: 'Servidor actualizado', time: 'Hace 1 hora' },
]);

const recentUsers = ref([
  { id: 1, name: 'Juan Pérez' },
  { id: 2, name: 'Ana Gómez' },
  { id: 3, name: 'Carlos López' },
]);
</script>
