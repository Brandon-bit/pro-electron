<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useGeneralConfigStore from '@/modules/GestionDeProyectos/Configuracion/General/store/generalConfigStore'
import { useGeneralConfigActions } from '@/modules/GestionDeProyectos/Configuracion/General/composables/useGeneralConfigActions'
import AreaModal from '@/modules/GestionDeProyectos/Configuracion/General/components/AreaModal.vue'
import CategoryModal from '@/modules/GestionDeProyectos/Configuracion/General/components/CategoryModal.vue'
import ClassificationModal from '@/modules/GestionDeProyectos/Configuracion/General/components/ClassificationModal.vue'

const activeTab = ref<'areas' | 'classifications'>('areas')

const modalStore = useModalStore()
const configStore = useGeneralConfigStore()
const { loadAreasAndCategories, loadClassifications } = useGeneralConfigActions()

const areas = computed(() => configStore.areas)
const classifications = computed(() => configStore.classifications)

const totalCategories = computed(() =>
  areas.value.reduce((sum, area) => sum + area.categories.length, 0)
)

const handleTabChange = (tab: 'areas' | 'classifications') => {
  activeTab.value = tab
}

// Acciones para modales de Áreas
const openCreateAreaModal = () => {
  // Seteamos un área vacía para que el watch del modal reinicie el formulario con valores limpios
  configStore.setArea({
    id: 0,
    name: '',
    description: '',
    active: true,
    categories: [],
  })
  modalStore.open(configStore.areaModalId, {
    type: 'CREATE',
    title: 'Nueva área',
  })
}

const openEditAreaModal = (areaId: number) => {
  const area = areas.value.find((a) => a.id === areaId)
  if (!area) return
  configStore.setArea(area)
  modalStore.open(configStore.areaModalId, {
    type: 'EDIT',
    title: 'Editar área',
  })
}

const openDeleteAreaModal = (areaId: number) => {
  const area = areas.value.find((a) => a.id === areaId)
  if (!area) return
  configStore.setArea(area)
  modalStore.open(configStore.areaModalId, {
    type: 'DELETE',
    title: 'Eliminar área',
  })
}

// Acciones para modales de Categorías
const openCreateCategoryModal = (areaId: number) => {
  configStore.setCategory({
    id: 0,
    areaId,
    name: '',
    active: true,
  })
  modalStore.open(configStore.categoryModalId, {
    type: 'CREATE',
    title: 'Nueva categoría',
  })
}

const openEditCategoryModal = (areaId: number, categoryId: number) => {
  const area = areas.value.find((a) => a.id === areaId)
  const category = area?.categories.find((c) => c.id === categoryId)
  if (!category) return
  configStore.setCategory(category)
  modalStore.open(configStore.categoryModalId, {
    type: 'EDIT',
    title: 'Editar categoría',
  })
}

const openDeleteCategoryModal = (areaId: number, categoryId: number) => {
  const area = areas.value.find((a) => a.id === areaId)
  const category = area?.categories.find((c) => c.id === categoryId)
  if (!category) return
  configStore.setCategory(category)
  modalStore.open(configStore.categoryModalId, {
    type: 'DELETE',
    title: 'Eliminar categoría',
  })
}

// Acciones para modales de Clasificaciones
const openCreateClassificationModal = () => {
  // Seteamos una clasificación vacía para que el modal reinicie el formulario con valores limpios
  configStore.setClassification({
    id: 0,
    name: '',
    description: '',
    active: true,
  })
  modalStore.open(configStore.classificationModalId, {
    type: 'CREATE',
    title: 'Nueva clasificación',
  })
}

const openEditClassificationModal = (classificationId: number) => {
  const classification = classifications.value.find((c) => c.id === classificationId)
  if (!classification) return
  configStore.setClassification(classification)
  modalStore.open(configStore.classificationModalId, {
    type: 'EDIT',
    title: 'Editar clasificación',
  })
}

const openDeleteClassificationModal = (classificationId: number) => {
  const classification = classifications.value.find((c) => c.id === classificationId)
  if (!classification) return
  configStore.setClassification(classification)
  modalStore.open(configStore.classificationModalId, {
    type: 'DELETE',
    title: 'Eliminar clasificación',
  })
}

onMounted(() => {
  loadAreasAndCategories()
  loadClassifications()
})
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
      <div class="flex flex-wrap gap-3 items-center justify-between text-sm">
        <div class="flex flex-wrap gap-3 items-center opacity-70">
          <div class="badge badge-ghost gap-2">
            <span class="material-symbols-outlined text-sm">widgets</span>
            {{ areas.length }} áreas
          </div>
          <div class="badge badge-ghost gap-2">
            <span class="material-symbols-outlined text-sm">sell</span>
            {{ totalCategories }} categorías
          </div>
        </div>
        <BaseButton
          text="Nueva área"
          icon="add"
          variant="primary"
          class-name="btn-sm"
          @click="openCreateAreaModal"
        />
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

              <div class="flex items-center gap-3 text-xs text-base-content/70">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">sell</span>
                  <span>{{ area.categories.length }}</span>
                </div>
                <span
                  class="material-symbols-outlined text-xs"
                  :class="area.active ? 'text-success' : 'text-base-content/40'"
                >
                  {{ area.active ? 'check_circle' : 'pause_circle' }}
                </span>
              </div>
            </header>

            <!-- Lista de categorías -->
            <ul class="mt-1 space-y-1 max-h-40 overflow-y-auto pr-1 text-xs">
              <li
                v-for="category in area.categories"
                :key="category.id"
                class="flex items-center justify-between rounded-md px-2 py-1 bg-base-200/60"
              >
                <span class="flex items-center gap-1 truncate flex-1">
                  <span class="material-symbols-outlined text-[14px]">
                    {{ category.active ? 'check_circle' : 'pause_circle' }}
                  </span>
                  <span class="truncate">
                    {{ category.name }}
                  </span>
                </span>
                <div class="flex gap-1 ml-2 items-center shrink-0">
                  <BaseButton
                    text=""
                    icon="edit"
                    variant="ghost"
                    class-name="btn-xs px-2"
                    @click="openEditCategoryModal(area.id, category.id)"
                  />
                  <BaseButton
                    text=""
                    icon="delete"
                    variant="ghost"
                    class-name="btn-xs text-error"
                    @click="openDeleteCategoryModal(area.id, category.id)"
                  />
                </div>
              </li>
              <li
                v-if="area.categories.length === 0"
                class="text-xs text-base-content/60 px-2 py-2"
              >
                Sin categorías registradas
              </li>
            </ul>

            <!-- Acción: agregar categoría -->
            <footer class="flex items-center justify-between gap-2 pt-1">
              <div class="flex gap-1">
                <BaseButton
                  text=""
                  icon="edit_square"
                  variant="ghost"
                  class-name="btn-xs"
                  @click="openEditAreaModal(area.id)"
                />
                <BaseButton
                  text=""
                  icon="delete"
                  variant="ghost"
                  class-name="btn-xs text-error"
                  @click="openDeleteAreaModal(area.id)"
                />
              </div>

              <BaseButton
                text="Agregar categoría"
                icon="add"
                variant="ghost"
                class-name="btn-xs"
                @click="openCreateCategoryModal(area.id)"
              />
            </footer>
          </div>
        </article>
      </div>
    </section>

    <!-- Tab: Clasificaciones -->
    <section v-else class="space-y-4">
      <div class="flex flex-wrap gap-3 items-center justify-between text-sm">
        <div class="flex flex-wrap gap-3 items-center opacity-70">
          <div class="badge badge-ghost gap-2">
            <span class="material-symbols-outlined text-sm">segment</span>
            {{ classifications.length }} clasificaciones
          </div>
        </div>
        <BaseButton
          text="Nueva clasificación"
          icon="add"
          variant="primary"
          class-name="btn-sm"
          @click="openCreateClassificationModal"
        />
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

              <div class="flex flex-col items-end gap-2">
                <span
                  class="material-symbols-outlined text-xs"
                  :class="classification.active ? 'text-success' : 'text-base-content/40'"
                >
                  {{ classification.active ? 'check_circle' : 'pause_circle' }}
                </span>
                <div class="flex gap-1">
                  <BaseButton
                    text=""
                    icon="edit"
                    variant="ghost"
                    class-name="btn-xs"
                    @click="openEditClassificationModal(classification.id)"
                  />
                  <BaseButton
                    text=""
                    icon="delete"
                    variant="ghost"
                    class-name="btn-xs text-error"
                    @click="openDeleteClassificationModal(classification.id)"
                  />
                </div>
              </div>
            </header>
          </div>
        </article>
      </div>
    </section>
    
    <!-- Modales -->
    <AreaModal />
    <CategoryModal />
    <ClassificationModal />
  </div>
</template>

<style scoped>
.tab {
  display: flex;
  align-items: center;
}
</style>

