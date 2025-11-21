# Lessons Learned - Implementation Guide

## ✅ Completed Files

1. **types/lessonTypes.ts** - All API and internal types
2. **services/lessonService.ts** - All API endpoints
3. **validations/lessonValidations.ts** - Form validation schemas
4. **store/lessonStore.ts** - Updated with real data structure
5. **composables/mappingLessonData.ts** - Data transformation utilities
6. **composables/useLessonActions.ts** - Lesson CRUD actions
7. **composables/useAttendeeActions.ts** - Attendee management actions
8. **components/LessonModal.vue** - Main modal with dynamic body rendering

## 🔨 Files You Need to Create

### 1. components/AddEditLessonForm.vue
```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseTagInput from '@/shared/components/BaseTagInput.vue'
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'
import { useLessonActions } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/composables/useLessonActions'

const lessonStore = useLessonStore()
const { loadCategoryOptions } = useLessonActions()

const projectPhaseOptions = [
    { id: 'Inicio', label: 'Inicio' },
    { id: 'Planificacion', label: 'Planificación' },
    { id: 'Ejecucion', label: 'Ejecución' },
    { id: 'Monitoreo y Control', label: 'Monitoreo y Control' },
    { id: 'Cierre', label: 'Cierre' }
]

const lessonTypeOptions = [
    { id: 'Positiva', label: 'Positiva' },
    { id: 'Negativa', label: 'Negativa' }
]

onMounted(() => {
    loadCategoryOptions()
})
</script>

<template>
    <div class="space-y-4">
        <!-- Category -->
        <BaseFormSelect
            name="dniCategoria"
            label="Categoría"
            :options="lessonStore.categoryOptions"
            :required="true"
        />

        <!-- Project Phase -->
        <BaseFormSelect
            name="faseProyecto"
            label="Fase del Proyecto"
            :options="projectPhaseOptions"
            :required="true"
        />

        <!-- Description -->
        <BaseTextArea
            name="descripcion"
            label="Descripción de la Situación"
            :required="true"
            placeholder="Describe la situación que generó esta lección..."
        />

        <!-- Causes -->
        <BaseTextArea
            name="causas"
            label="Causas"
            :required="false"
            placeholder="¿Qué causó esta situación?"
        />

        <!-- Impact -->
        <BaseTextArea
            name="impacto"
            label="Impacto"
            :required="false"
            placeholder="¿Cuál fue el impacto en el proyecto?"
        />

        <!-- Lesson Learned -->
        <BaseTextArea
            name="leccionAprendida"
            label="Lección Aprendida"
            :required="false"
            placeholder="¿Qué aprendimos de esta experiencia?"
        />

        <!-- Recommendation -->
        <BaseTextArea
            name="recomendacion"
            label="Recomendación"
            :required="false"
            placeholder="¿Qué recomendamos para futuros proyectos?"
        />

        <!-- Type -->
        <BaseFormSelect
            name="tipo"
            label="Tipo de Lección"
            :options="lessonTypeOptions"
            :required="true"
        />

        <!-- Tags -->
        <BaseTagInput
            name="etiquetas"
            label="Etiquetas"
            placeholder="Agregar etiqueta..."
        />

        <!-- Author -->
        <BaseFormInput
            name="autor"
            type="text"
            label="Autor"
            :required="true"
        />
    </div>
</template>
```

### 2. components/DeleteLesson.vue
```vue
<script setup lang="ts">
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'

const lessonStore = useLessonStore()
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <h3 class="font-bold">¿Estás seguro?</h3>
                <div class="text-sm">
                    Esta acción eliminará permanentemente la lección aprendida y no se podrá recuperar.
                    <br>
                    <span class="font-semibold">Autor: {{ lessonStore.selectedLesson?.author }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
```

### 3. components/AttendeeModal.vue
```vue
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'
import { useAttendeeActions } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/composables/useAttendeeActions'
import AddAttendee from './AddAttendee.vue'
import DeleteAttendee from './DeleteAttendee.vue'
import type { AttendeeRequestType } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/types/lessonTypes'

const modalStore = useModalStore()
const lessonStore = useLessonStore()
const { addAttendee, deleteAttendee } = useAttendeeActions()

const selectedUserDni = ref<string>('')

// Validation schema for adding attendee
const attendeeSchema = z.object({
    dniUsuario: z.string().min(1, 'Debes seleccionar un usuario')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(attendeeSchema),
    validateOnMount: false,
    initialValues: {
        dniUsuario: ''
    }
})

// Watch for modal data (for delete action)
watch(
    () => modalStore.modals[lessonStore.attendeeModalId],
    (modal) => {
        if (modal?.data?.userDni) {
            selectedUserDni.value = modal.data.userDni
        } else if (!modal?.isOpen) {
            selectedUserDni.value = ''
            resetForm()
        }
    },
    { deep: true, immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddAttendee,
        action: addAttendee
    },
    DELETE: {
        component: DeleteAttendee,
        action: deleteAttendee
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[lessonStore.attendeeModalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = async () => {
    if (!lessonStore.selectedLesson) return

    const modalType = modalStore.modals[lessonStore.attendeeModalId]?.type

    // For CREATE, use handleSubmit with validation
    if (modalType === 'CREATE') {
        await handleSubmit(async (formValues) => {
            const data: AttendeeRequestType = {
                dniLeccionAprendida: lessonStore.selectedLesson!.dni,
                dniUsuario: formValues.dniUsuario
            }

            const success = await addAttendee(data)
            if (success) {
                modalStore.close(lessonStore.attendeeModalId)
            }
        })()
        return
    }

    // For DELETE, no validation needed
    if (modalType === 'DELETE') {
        const data: AttendeeRequestType = {
            dniLeccionAprendida: lessonStore.selectedLesson.dni,
            dniUsuario: selectedUserDni.value
        }

        const success = await deleteAttendee(data)
        if (success) {
            selectedUserDni.value = ''
            modalStore.close(lessonStore.attendeeModalId)
        }
    }
}

const onClose = () => {
    resetForm()
    selectedUserDni.value = ''
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="lessonStore.attendeeModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
```

### 4. components/AddAttendee.vue
```vue
<script setup lang="ts">
import { computed } from 'vue'
import BaseUserSelect from '@/shared/components/BaseUserSelect.vue'
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'

const lessonStore = useLessonStore()

// Filter out users already added as attendees
const availableParticipants = computed(() => {
    if (!lessonStore.selectedLesson) return lessonStore.participants

    const attendeeDnis = lessonStore.selectedLesson.attendees.map(a => a.dni)
    return lessonStore.participants.filter(p => !attendeeDnis.includes(p.dni))
})
</script>

<template>
    <div class="space-y-4">
        <BaseUserSelect
            name="dniUsuario"
            label="Seleccionar Usuario"
            :users="availableParticipants"
            :required="true"
            placeholder="Buscar usuario para agregar..."
        />

        <div v-if="availableParticipants.length === 0" class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span>Todos los usuarios disponibles ya están agregados como asistentes.</span>
        </div>
    </div>
</template>
```

### 5. components/DeleteAttendee.vue
```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'

const modalStore = useModalStore()
const lessonStore = useLessonStore()

const attendeeToDelete = computed(() => {
    const userDni = modalStore.modals[lessonStore.attendeeModalId]?.data?.userDni
    return lessonStore.selectedLesson?.attendees.find(a => a.dni === userDni)
})
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <h3 class="font-bold">¿Estás seguro?</h3>
                <div class="text-sm">
                    Esta acción eliminará a
                    <span class="font-semibold">{{ attendeeToDelete?.name }}</span>
                    de la lista de asistentes.
                </div>
            </div>
        </div>
    </div>
</template>
```

### 6. Update views/LessonsView.vue

Key changes needed:
1. Add project selector at the top
2. Load project options on mount
3. Watch for project selection to load lessons
4. Update lesson cards to show real data
5. Add edit/delete buttons to each lesson card
6. Add attendee management section
7. Replace CreateLessonModal with LessonModal
8. Add AttendeeModal

### 7. Update components/TrendsAnalysis.vue

Use real data from `lessonStore.lessons` to calculate:
- Positive vs Negative lessons
- Lessons by category
- Lessons by phase
- Tag cloud

## 📝 Key Implementation Notes

1. **Project Selection**: User must select a project before seeing lessons
2. **Modal Pattern**: Each CRUD operation (CREATE, UPDATE, DELETE) renders different component bodies
3. **Attendee Management**: Similar to Minutas, with add/remove functionality
4. **Tags**: Use BaseTagInput component for tag management
5. **Validation**: All forms use Zod schemas with vee-validate
6. **Error Handling**: All API calls wrapped in try-catch with toast notifications
7. **Loading States**: Use `lessonStore.isLoading` for loading indicators

## 🔗 Reference Modules

- **Minutas**: `/src/modules/GestionDeProyectos/Operacion/Minutas`
- **General Config**: `/src/modules/GestionDeProyectos/Configuracion/General`

## 🚀 Next Steps

1. Create the remaining component files listed above
2. Update LessonsView.vue with project selector and real data
3. Update TrendsAnalysis.vue to use real lesson data
4. Test all CRUD operations
5. Test attendee management
6. Verify trends analysis calculations
