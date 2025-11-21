<script setup lang="ts">
import { watch, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'
import { useLessonActions } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/composables/useLessonActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { lessonSchema } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/validations/lessonValidations'
import AddEditLessonForm from './AddEditLessonForm.vue'
import DeleteLesson from './DeleteLesson.vue'
import type { LessonLearnedRequestType } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/types/lessonTypes'

const modalStore = useModalStore()
const lessonStore = useLessonStore()
const { createLesson, updateLesson, deleteLesson } = useLessonActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(lessonSchema),
    validateOnMount: false,
    initialValues: {
        dniCategoria: 0,
        faseProyecto: '',
        descripcion: '',
        causas: '',
        impacto: '',
        leccionAprendida: '',
        recomendacion: '',
        tipo: '',
        etiquetas: [],
        autor: ''
    }
})

// Watch for selected lesson to populate form
watch(
    () => lessonStore.selectedLesson,
    (lesson) => {
        if (lesson) {
            setValues({
                dniCategoria: lesson.category.dni,
                faseProyecto: lesson.projectPhase,
                descripcion: lesson.description,
                causas: lesson.causes,
                impacto: lesson.impact,
                leccionAprendida: lesson.lessonLearned,
                recomendacion: lesson.recommendation,
                tipo: lesson.type,
                etiquetas: lesson.tags,
                autor: lesson.author
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddEditLessonForm,
        action: createLesson
    },
    UPDATE: {
        component: AddEditLessonForm,
        action: updateLesson
    },
    DELETE: {
        component: DeleteLesson,
        action: deleteLesson
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[lessonStore.lessonModalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = async () => {
    const modalType = modalStore.modals[lessonStore.lessonModalId]?.type

    // For CREATE and UPDATE, use handleSubmit with validation
    if (modalType === 'CREATE' || modalType === 'UPDATE') {
        await handleSubmit(async (formValues) => {
            if (!lessonStore.selectedProject) {
                return
            }

            const data: LessonLearnedRequestType = {
                dniProyecto: lessonStore.selectedProject.dni,
                dniCategoria: formValues.dniCategoria,
                faseProyecto: formValues.faseProyecto,
                descripcion: formValues.descripcion,
                causas: formValues.causas || '',
                impacto: formValues.impacto || '',
                leccionAprendida: formValues.leccionAprendida || '',
                recomendacion: formValues.recomendacion || '',
                tipo: formValues.tipo,
                etiquetas: formValues.etiquetas || [],
                autor: formValues.autor,
                activo: true
            }

            // Add dni for UPDATE
            if (modalType === 'UPDATE' && lessonStore.selectedLesson) {
                data.dni = lessonStore.selectedLesson.dni
            }

            const success = await modalMap[modalType].action(data)
            if (success) {
                lessonStore.clearSelectedLesson()
                modalStore.close(lessonStore.lessonModalId)
            }
        })()
        resetForm()
        return
    }

    // For DELETE, no validation needed
    if (modalType === 'DELETE' && lessonStore.selectedLesson) {
        const success = await deleteLesson(lessonStore.selectedLesson.dni)
        if (success) {
            lessonStore.clearSelectedLesson()
            modalStore.close(lessonStore.lessonModalId)
        }
    }
}

const onClose = () => {
    resetForm()
    lessonStore.clearSelectedLesson()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="lessonStore.lessonModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
        size="L"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
