
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useTemplateStore } from '../store/templateStore'
import { useTemplateActions } from '../composables/useTemplateActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { templateSchema } from '../validations/templateValidations'
import { showNotification } from '@/utils/toastNotifications'
import DeleteTemplateModal from '../components/DeleteTemplateModal.vue'
import DeleteStageModal from '../components/DeleteStageModal.vue'
import DeleteActivityModal from '../components/DeleteActivityModal.vue'

// Stores y composables
const modalStore = useModalStore()
const templateStore = useTemplateStore()
const {
  loadTemplateOptions,
  loadTemplateById,
  createTemplate,
  updateTemplate,
  createStage,
  updateStage,
  createActivity,
  updateActivity,
} = useTemplateActions()

// Computed
const templates = computed(() => templateStore.templates)
const activeTemplate = computed(() => templateStore.activeTemplate)
const isLoading = computed(() => templateStore.isLoading)

const orderedStages = computed(() =>
  activeTemplate.value
    ? [...activeTemplate.value.stages].sort((a, b) => a.order - b.order)
    : []
)

// Cargar datos al montar
onMounted(async () => {
  await loadTemplateOptions()
})

// Watch para cargar plantilla cuando cambia la selección
watch(
  () => templateStore.activeTemplateId,
  async (newId) => {
    if (newId) {
      await loadTemplateById(newId)
    }
  }
)

// Funciones para etapas
const addStage = async () => {
  if (!activeTemplate.value) return
  
  const order = activeTemplate.value.stages.length
  await createStage(
    {
      templateId: activeTemplate.value.id,
      name: `Etapa ${order + 1}`,
      active: true,
    },
    order
  )
}

const openDeleteStageModal = (stageId: number) => {
  if (!activeTemplate.value) return
  
  const stage = activeTemplate.value.stages.find((s) => s.id === stageId)
  if (!stage) return
  
  templateStore.setSelectedStage(stage)
  modalStore.open(templateStore.deleteStageModalId, {
    type: 'DELETE',
    title: 'Eliminar etapa',
  })
}

const updateStageName = async (stageId: number, newName: string) => {
  if (!activeTemplate.value) return
  
  const stage = activeTemplate.value.stages.find((s) => s.id === stageId)
  if (!stage) return
  
  await updateStage({
    ...stage,
    name: newName,
  })
}

// Funciones para actividades
const addActivity = async (stageId: number) => {
  if (!activeTemplate.value) return
  
  const stage = activeTemplate.value.stages.find((s) => s.id === stageId)
  if (!stage) return
  
  const order = stage.activities.length
  await createActivity(
    {
      stageId,
      dependencyId: 0,
      name: `Nueva actividad ${order + 1}`,
      duration: 1,
      active: true,
    },
    order
  )
}

const openDeleteActivityModal = (activityId: number) => {
  if (!activeTemplate.value) return
  
  // Buscar la actividad en todas las etapas
  let activity = null
  for (const stage of activeTemplate.value.stages) {
    const found = stage.activities.find((a) => a.id === activityId)
    if (found) {
      activity = found
      break
    }
  }
  
  if (!activity) return
  
  templateStore.setSelectedActivity(activity)
  modalStore.open(templateStore.deleteActivityModalId, {
    type: 'DELETE',
    title: 'Eliminar actividad',
  })
}

const updateActivityData = async (
  activityId: number,
  field: 'name' | 'duration' | 'dependencyId',
  value: string | number
) => {
  if (!activeTemplate.value) return
  
  // Buscar la actividad en todas las etapas
  let activity = null
  for (const stage of activeTemplate.value.stages) {
    const found = stage.activities.find((a) => a.id === activityId)
    if (found) {
      activity = found
      break
    }
  }
  
  if (!activity) return
  
  await updateActivity({
    ...activity,
    [field]: value,
  })
}

// Función para obtener las actividades disponibles como dependencias
const getAvailableDependencies = (stageId: number, currentActivityId: number) => {
  if (!activeTemplate.value) return []
  
  const stage = activeTemplate.value.stages.find((s) => s.id === stageId)
  if (!stage) return []
  
  // Encontrar el índice de la actividad actual
  const currentIndex = stage.activities.findIndex((a) => a.id === currentActivityId)
  if (currentIndex === -1) return []
  
  // Retornar solo las actividades que están antes (tienen menor índice/orden)
  return stage.activities
    .filter((_, index) => index < currentIndex)
    .sort((a, b) => a.order - b.order)
}

// Drag & Drop para etapas
const draggedStageIndex = ref<number | null>(null)

const onStageDragStart = (index: number) => {
  draggedStageIndex.value = index
}

const onStageDrop = async (targetIndex: number) => {
  if (draggedStageIndex.value === null || draggedStageIndex.value === targetIndex)
    return

  if (!activeTemplate.value) return

  const stages = [...orderedStages.value]
  const [moved] = stages.splice(draggedStageIndex.value, 1)
  stages.splice(targetIndex, 0, moved)

  // Reordenar etapas y actualizar en batch
  try {
    templateStore.setLoading(true)
    const stagesToUpdate: any[] = []
    
    // Identificar etapas que necesitan actualización
    for (let i = 0; i < stages.length; i++) {
      if (stages[i].order !== i) {
        stagesToUpdate.push({
          ...stages[i],
          order: i,
        })
      }
    }

    // Actualizar todas las etapas sin mostrar notificaciones individuales
    if (stagesToUpdate.length > 0) {
      const updatePromises = stagesToUpdate.map(stage => 
        updateStage(stage, true) // true = silenciar notificación
      )
      
      await Promise.all(updatePromises)
      
      // Recargar la plantilla para reflejar los cambios
      if (templateStore.activeTemplateId) {
        await loadTemplateById(templateStore.activeTemplateId)
      }
      
      showNotification('Orden de etapas actualizado correctamente', 'success')
    }
  } catch (error) {
    console.error('Error al reordenar etapas:', error)
    showNotification('Error al actualizar el orden de las etapas', 'error')
  } finally {
    templateStore.setLoading(false)
  }

  draggedStageIndex.value = null
}

// Drag & Drop para actividades
type DraggedActivity = {
  stageId: number
  index: number
} | null

const draggedActivity = ref<DraggedActivity>(null)

const onActivityDragStart = (stageId: number, index: number) => {
  draggedActivity.value = { stageId, index }
}

const onActivityDrop = async (stageId: number, targetIndex: number) => {
  if (!draggedActivity.value) return
  if (!activeTemplate.value) return

  const sourceStage = activeTemplate.value.stages.find(
    (s) => s.id === draggedActivity.value?.stageId
  )
  const targetStage = activeTemplate.value.stages.find((s) => s.id === stageId)
  if (!sourceStage || !targetStage) return

  const sourceActivities = [...sourceStage.activities]
  const movedActivity = sourceActivities[draggedActivity.value.index]

  try {
    templateStore.setLoading(true)
    const activitiesToUpdate: any[] = []

    // Si se mueve a otra etapa
    if (sourceStage.id !== targetStage.id) {
      // Remover de la etapa origen
      sourceActivities.splice(draggedActivity.value.index, 1)
      
      // Recalcular orden en etapa origen
      sourceActivities.forEach((activity, idx) => {
        if (activity.order !== idx) {
          activitiesToUpdate.push({
            ...activity,
            order: idx,
          })
        }
      })

      // Insertar en etapa destino
      const targetActivities = [...targetStage.activities]
      targetActivities.splice(targetIndex, 0, movedActivity)
      
      // Recalcular orden en etapa destino (incluyendo la actividad movida)
      targetActivities.forEach((activity, idx) => {
        const newOrder = idx
        const newStageId = targetStage.id
        
        if (activity.id === movedActivity.id) {
          // La actividad movida necesita nuevo stageId, orden y limpiar dependencia
          activitiesToUpdate.push({
            ...activity,
            stageId: newStageId,
            order: newOrder,
            dependencyId: 0, // Limpiar dependencia al cambiar de etapa
          })
        } else if (activity.order !== newOrder) {
          // Otras actividades que cambiaron de orden
          activitiesToUpdate.push({
            ...activity,
            order: newOrder,
          })
        }
      })
    } else {
      // Movimiento dentro de la misma etapa
      sourceActivities.splice(draggedActivity.value.index, 1)
      sourceActivities.splice(targetIndex, 0, movedActivity)
      
      // Recalcular orden de todas las actividades afectadas
      sourceActivities.forEach((activity, idx) => {
        const updateData: any = {
          ...activity,
          order: idx,
        }
        
        // Verificar si la dependencia actual sigue siendo válida
        if (activity.dependencyId > 0) {
          // Buscar la actividad de la que depende
          const dependencyIndex = sourceActivities.findIndex(a => a.id === activity.dependencyId)
          
          // Si la dependencia está después de la actividad actual (o no existe), limpiarla
          if (dependencyIndex === -1 || dependencyIndex >= idx) {
            updateData.dependencyId = 0
          }
        }
        
        // Solo actualizar si cambió el orden o la dependencia
        if (activity.order !== idx || updateData.dependencyId !== activity.dependencyId) {
          activitiesToUpdate.push(updateData)
        }
      })
    }

    // Actualizar todas las actividades sin mostrar notificaciones individuales
    if (activitiesToUpdate.length > 0) {
      const updatePromises = activitiesToUpdate.map(activity => 
        updateActivity(activity, true) // true = silenciar notificación
      )
      
      await Promise.all(updatePromises)
      
      // Recargar la plantilla para reflejar los cambios
      if (templateStore.activeTemplateId) {
        await loadTemplateById(templateStore.activeTemplateId)
      }
      
      showNotification('Orden de actividades actualizado correctamente', 'success')
    }
  } catch (error) {
    console.error('Error al reordenar actividades:', error)
    showNotification('Error al actualizar el orden de las actividades', 'error')
  } finally {
    templateStore.setLoading(false)
  }

  draggedActivity.value = null
}

const allowDrop = (event: DragEvent) => {
  event.preventDefault()
}

// Modal para crear plantilla
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(templateSchema),
  validateOnMount: false,
  initialValues: {
    name: '',
    objective: '',
    scope: '',
    active: true,
  },
})

const openTemplateModal = () => {
  resetForm({
    values: {
      name: '',
      objective: '',
      scope: '',
      active: true,
    },
  })
  modalStore.open(templateStore.templateModalId, {
    type: 'CREATE',
    title: 'Nueva plantilla',
  })
}

const openEditTemplateModal = () => {
  if (!activeTemplate.value) return
  
  resetForm({
    values: {
      name: activeTemplate.value.name,
      objective: activeTemplate.value.objective,
      scope: activeTemplate.value.scope,
      active: activeTemplate.value.active,
    },
  })
  modalStore.open(templateStore.templateModalId, {
    type: 'EDIT',
    title: 'Editar plantilla',
  })
}

const onSubmitTemplate = async () => {
  const modalType = modalStore.modals[templateStore.templateModalId]?.type
  
  await handleSubmit(async (values) => {
    let success = false
    
    if (modalType === 'CREATE') {
      success = await createTemplate(values)
    } else if (modalType === 'EDIT' && activeTemplate.value) {
      success = await updateTemplate({
        ...activeTemplate.value,
        name: values.name,
        objective: values.objective,
        scope: values.scope,
        active: values.active,
      })
    }
    
    if (success) {
      modalStore.close(templateStore.templateModalId)
    }
  })()
}

const onCloseTemplateModal = () => {
  resetForm()
}

// Modal para eliminar plantilla
const openDeleteTemplateModal = () => {
  if (!activeTemplate.value) return
  
  templateStore.setSelectedTemplate(activeTemplate.value)
  modalStore.open(templateStore.deleteTemplateModalId, {
    type: 'DELETE',
    title: 'Eliminar plantilla',
  })
}
</script>

<template>
  <div class="space-y-6">
    <BaseTitle
      title="Plantillas de proyecto"
      subtitle="Define estructuras base de etapas y actividades para nuevos proyectos"
    />

    <!-- Encabezado de plantilla -->
    <section class="card bg-base-100 shadow-sm">
      <div class="card-body flex flex-wrap items-center gap-4 justify-between">
        <div class="space-y-2 min-w-[280px]">
          <h2 class="text-sm font-semibold">Plantilla actual</h2>
          <div class="flex items-center gap-2 text-sm">
            <label class="text-xs opacity-70">Selecciona plantilla:</label>
            <select
              v-model.number="templateStore.activeTemplateId"
              class="select select-sm select-bordered w-56 max-w-full"
              :disabled="isLoading"
            >
              <option
                v-for="tpl in templates"
                :key="tpl.id"
                :value="tpl.id"
              >
                {{ tpl.label }}
              </option>
            </select>
          </div>
          <div v-if="activeTemplate" class="text-xs text-base-content/70 space-y-0.5">
            <p>
              <span class="font-semibold">Objetivo:</span>
              {{ activeTemplate.objective || 'Sin objetivo definido' }}
            </p>
            <p>
              <span class="font-semibold">Alcance:</span>
              {{ activeTemplate.scope || 'Sin alcance definido' }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <BaseButton
            text="Agregar plantilla"
            icon="add"
            variant="outline"
            class-name="btn-sm"
            @click="openTemplateModal"
          />
          <BaseButton
            v-if="activeTemplate"
            text="Editar plantilla"
            icon="edit"
            variant="outline"
            class-name="btn-sm"
            @click="openEditTemplateModal"
          />
          <BaseButton
            v-if="activeTemplate"
            text="Eliminar plantilla"
            icon="delete"
            variant="error btn-outline"
            class-name="btn-sm"
            @click="openDeleteTemplateModal"
          />
          <BaseButton
            text="Nueva etapa"
            icon="add"
            variant="primary"
            class-name="btn-sm"
            @click="addStage"
          />
        </div>
      </div>
    </section>

    <!-- Etapas y actividades -->
    <section class="space-y-3">
      <div
        v-if="orderedStages.length === 0"
        class="alert alert-info flex items-center gap-2 text-sm"
      >
        <span class="material-symbols-outlined text-sm">info</span>
        <span>Crea la primera etapa para comenzar a definir tu plantilla.</span>
      </div>

      <div class="space-y-3">
        <article
          v-for="(stage, stageIndex) in orderedStages"
          :key="stage.id"
          class="card bg-base-100 border border-base-200/70 shadow-sm"
          draggable="true"
          @dragstart="onStageDragStart(stageIndex)"
          @dragover="allowDrop"
          @drop="onStageDrop(stageIndex)"
        >
          <div class="card-body p-3 md:p-4 space-y-3">
            <!-- Header de etapa -->
            <header class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2 flex-1 min-w-[200px]">
                <span
                  class="material-symbols-outlined text-base cursor-move select-none"
                  title="Arrastrar para reordenar etapa"
                >
                  drag_indicator
                </span>
                <div class="flex items-center gap-2 flex-1">
                  <label class="text-xs opacity-70">Nombre:</label>
                  <input
                    :value="stage.name"
                    @blur="(e) => updateStageName(stage.id, (e.target as HTMLInputElement).value)"
                    type="text"
                    class="input input-sm input-bordered w-full"
                    placeholder="Nombre de la etapa"
                  />
                </div>
              </div>

              <div class="flex items-center gap-3 text-xs text-base-content/70">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">sell</span>
                  <span>{{ stage.activities.length }}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <BaseButton
                  text="Agregar actividad"
                  icon="add"
                  variant="primary"
                  class-name="btn-xs"
                  @click="addActivity(stage.id)"
                />
                <BaseButton
                  text="Eliminar etapa"
                  icon="delete"
                  variant="error btn-outline"
                  class-name="btn-xs"
                  @click="openDeleteStageModal(stage.id)"
                />
              </div>
            </header>

            <!-- Actividades -->
            <ul class="space-y-1">
              <li
                v-for="(activity, activityIndex) in stage.activities"
                :key="activity.id"
                class="flex flex-wrap items-center gap-2 rounded bg-base-200/70 px-2 py-2 text-xs"
                draggable="true"
                @dragstart="onActivityDragStart(stage.id, activityIndex)"
                @dragover="allowDrop"
                @drop="onActivityDrop(stage.id, activityIndex)"
              >
                <span
                  class="material-symbols-outlined text-base cursor-move select-none"
                  title="Arrastrar para reordenar actividad"
                >
                  drag_indicator
                </span>

                <div class="flex-1 min-w-[160px]">
                  <label class="text-[10px] opacity-70">Nombre</label>
                  <input
                    :value="activity.name"
                    @blur="(e) => updateActivityData(activity.id, 'name', (e.target as HTMLInputElement).value)"
                    type="text"
                    class="input input-xs input-bordered w-full"
                  />
                </div>

                <div class="w-[90px]">
                  <label class="text-[10px] opacity-70">Duración (días)</label>
                  <input
                    :value="activity.duration"
                    @blur="(e) => updateActivityData(activity.id, 'duration', parseInt((e.target as HTMLInputElement).value) || 0)"
                    type="number"
                    min="0"
                    class="input input-xs input-bordered w-full"
                  />
                </div>

                <div class="flex-1 min-w-[160px]">
                  <label class="text-[10px] opacity-70">Dependencia</label>
                  <select
                    :value="activity.dependencyId"
                    @change="(e) => updateActivityData(activity.id, 'dependencyId', parseInt((e.target as HTMLSelectElement).value) || 0)"
                    class="select select-xs select-bordered w-full"
                  >
                    <option :value="0">-- Sin dependencia --</option>
                    <option
                      v-for="dep in getAvailableDependencies(stage.id, activity.id)"
                      :key="dep.id"
                      :value="dep.id"
                    >
                      {{ dep.name }}
                    </option>
                  </select>
                </div>

                <BaseButton
                  text=""
                  icon="delete"
                  variant="ghost btn-error"
                  class-name="btn-xs"
                  @click="openDeleteActivityModal(activity.id)"
                />
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- Modal para crear plantilla -->
    <BaseModal
      :onSubmit="onSubmitTemplate"
      :modalId="templateStore.templateModalId"
      :isSubmitting="isSubmitting"
      :onClose="onCloseTemplateModal"
    >
      <template #modalBody>
        <div class="space-y-3">
          <BaseFormInput
            name="name"
            label="Nombre"
            type="text"
            :required="true"
          />
          <BaseFormInput
            name="objective"
            label="Objetivo"
            type="text"
            :required="true"
          />
          <BaseFormInput
            name="scope"
            label="Alcance"
            type="text"
            :required="true"
          />
        </div>
      </template>
    </BaseModal>

    <!-- Modales de eliminación -->
    <DeleteTemplateModal />
    <DeleteStageModal />
    <DeleteActivityModal />
  </div>
</template>
