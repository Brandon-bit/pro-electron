<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

type Category = {
  id: number
  name: string
}

type Area = {
  id: number
  name: string
  description?: string
  categories: Category[]
}

type Classification = {
  id: number
  name: string
  description?: string
  active: boolean
}

const activeTab = ref<'areas' | 'classifications'>('areas')

// Datos mock de ejemplo. Luego puedes conectarlo a tu store/API.
const areas = ref<Area[]>([
  {
    id: 1,
    name: 'Tecnología de Información',
    description: 'Proyectos relacionados con sistemas, infraestructura y datos.',
    categories: [
      { id: 11, name: 'Aplicaciones' },
      { id: 12, name: 'Infraestructura' },
      { id: 13, name: 'Datos y Analítica' },
    ],
  },
  {
    id: 2,
    name: 'Operaciones',
    description: 'Mejoras de procesos, eficiencia operativa y automatización.',
    categories: [
      { id: 21, name: 'Optimización de Procesos' },
      { id: 22, name: 'Automatización' },
    ],
  },
  {
    id: 3,
    name: 'Innovación',
    description: 'Proyectos exploratorios, pilotos y nuevos modelos de negocio.',
    categories: [
      { id: 31, name: 'Pilotos' },
      { id: 32, name: 'Nuevos Productos' },
      { id: 33, name: 'Investigación' },
    ],
  },
])

const totalCategories = computed(() =>
  areas.value.reduce((sum, area) => sum + area.categories.length, 0)
)

// Datos mock de clasificaciones
const classifications = ref<Classification[]>([
  {
    id: 1,
    name: 'Estratégico',
    description: 'Proyectos clave para la estrategia del negocio',
    active: true,
  },
  {
    id: 2,
    name: 'Operativo',
    description: 'Mejoras y mantenimiento de operación actual',
    active: true,
  },
  {
    id: 3,
    name: 'Regulatorio',
    description: 'Cumplimiento de normativas y requerimientos legales',
    active: true,
  },
  {
    id: 4,
    name: 'Exploratorio',
    description: 'Pilotos o iniciativas de innovación con alto riesgo',
    active: false,
  },
])

const handleTabChange = (tab: 'areas' | 'classifications') => {
  activeTab.value = tab
}
</script>

<template>
  <div class="space-y-6">
    <BaseTitle
      title="Configuración General de Proyectos"
      subtitle="Administra parámetros base como áreas y categorías de proyectos"
    />

    <!-- Tabs -->
    <div class="tabs tabs-boxed bg-base-200 w-fit">
      <button
        :class="['tab', { 'tab-active': activeTab === 'areas' }]"
        @click="handleTabChange('areas')"
      >
        <span class="material-symbols-outlined text-sm mr-2">category</span>
        Áreas y Categorías
      </button>

      <button
        :class="['tab', { 'tab-active': activeTab === 'classifications' }]"
        @click="handleTabChange('classifications')"
      >
        <span class="material-symbols-outlined text-sm mr-2">segment</span>
        Clasificaciones
      </button>
    </div>

    <!-- Tab: Áreas y Categorías -->
    <section v-if="activeTab === 'areas'" class="space-y-4">
      <!-- Resumen pequeño -->
      <div class="flex flex-wrap gap-3 items-center text-sm opacity-70">
        <div class="badge badge-ghost gap-2">
          <span class="material-symbols-outlined text-sm">widgets</span>
          {{ areas.length }} áreas
        </div>
        <div class="badge badge-ghost gap-2">
          <span class="material-symbols-outlined text-sm">sell</span>
          {{ totalCategories }} categorías
        </div>
      </div>

      <!-- Grid de cards por área -->
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="area in areas"
          :key="area.id"
          class="card bg-base-100 border border-base-200/70 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="card-body p-4 space-y-3">
            <!-- Header del área -->
            <header class="flex items-start justify-between gap-2">
              <div>
                <h2 class="text-sm font-semibold leading-tight">
                  {{ area.name }}
                </h2>
                <p v-if="area.description" class="text-xs mt-1 opacity-70">
                  {{ area.description }}
                </p>
              </div>

              <span class="badge badge-sm badge-outline gap-1">
                <span class="material-symbols-outlined text-xs">sell</span>
                {{ area.categories.length }}
              </span>
            </header>

            <!-- Lista de categorías -->
            <ul class="mt-1 space-y-1 max-h-40 overflow-y-auto pr-1 text-xs">
              <li
                v-for="category in area.categories"
                :key="category.id"
                class="flex items-center justify-between rounded-md px-2 py-1 bg-base-200/60"
              >
                <span class="truncate flex-1">
                  {{ category.name }}
                </span>
              </li>
            </ul>

            <!-- Acciones mínimas (placeholder para futuro CRUD) -->
            <footer class="flex justify-end gap-2 pt-1">
              <button class="btn btn-ghost btn-xs">
                <span class="material-symbols-outlined text-xs">edit</span>
                Editar
              </button>
              <button class="btn btn-ghost btn-xs">
                <span class="material-symbols-outlined text-xs">add</span>
                Agregar categoría
              </button>
            </footer>
          </div>
        </article>
      </div>
    </section>

    <!-- Tab: Clasificaciones -->
    <section v-else class="space-y-4">
      <div class="flex flex-wrap gap-3 items-center text-sm opacity-70">
        <div class="badge badge-ghost gap-2">
          <span class="material-symbols-outlined text-sm">segment</span>
          {{ classifications.length }} clasificaciones
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="classification in classifications"
          :key="classification.id"
          class="card bg-base-100 border border-base-200/70 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="card-body p-4 space-y-3">
            <header class="flex items-start justify-between gap-2">
              <div>
                <h2 class="text-sm font-semibold leading-tight">
                  {{ classification.name }}
                </h2>
                <p v-if="classification.description" class="text-xs mt-1 opacity-70">
                  {{ classification.description }}
                </p>
              </div>

              <span
                :class="[
                  'badge badge-sm gap-1',
                  classification.active ? 'badge-success' : 'badge-ghost',
                ]"
              >
                <span class="material-symbols-outlined text-xs">
                  {{ classification.active ? 'check_circle' : 'pause_circle' }}
                </span>
                {{ classification.active ? 'Activa' : 'Inactiva' }}
              </span>
            </header>

            <footer class="flex justify-end gap-2 pt-1">
              <button class="btn btn-ghost btn-xs">
                <span class="material-symbols-outlined text-xs">edit</span>
                Editar
              </button>
              <button class="btn btn-ghost btn-xs">
                <span class="material-symbols-outlined text-xs">swap_horiz</span>
                Cambiar estado
              </button>
            </footer>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tab {
  display: flex;
  align-items: center;
}
</style>

