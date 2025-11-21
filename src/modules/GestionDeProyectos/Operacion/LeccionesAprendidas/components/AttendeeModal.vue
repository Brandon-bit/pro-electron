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
