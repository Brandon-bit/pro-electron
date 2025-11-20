<script setup lang="ts">
import { watch, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import { useMinuteActions } from '@/modules/GestionDeProyectos/Operacion/Minutas/composables/useMinuteActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { minuteSchema } from '@/modules/GestionDeProyectos/Operacion/Minutas/validations/minuteValidations'
import AddEditMinuteForm from './AddEditMinuteForm.vue'
import DeleteMinute from './DeleteMinute.vue'
import type { MinuteRequestType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

const modalStore = useModalStore()
const minuteStore = useMinuteStore()
const { createMinute, updateMinute, deleteMinute } = useMinuteActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(minuteSchema),
    validateOnMount: false,
    initialValues: {
        nombre: '',
        fecha: '',
        agenda: '',
        puntosDiscutidos: '',
        decisionesTomadas: ''
    }
})

// Watch for selected minute to populate form
watch(
    () => minuteStore.selectedMinute,
    (minute) => {
        if (minute) {
            setValues({
                nombre: minute.name,
                fecha: minute.date,
                agenda: minute.agenda,
                puntosDiscutidos: minute.discussionPoints,
                decisionesTomadas: minute.decisionsMade
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddEditMinuteForm,
        action: createMinute
    },
    UPDATE: {
        component: AddEditMinuteForm,
        action: updateMinute
    },
    DELETE: {
        component: DeleteMinute,
        action: deleteMinute
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[minuteStore.minuteModalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = async () => {
    const modalType = modalStore.modals[minuteStore.minuteModalId]?.type

    // For CREATE and UPDATE, use handleSubmit with validation
    if (modalType === 'CREATE' || modalType === 'UPDATE') {
        await handleSubmit(async (formValues) => {
            if (!minuteStore.selectedProject) {
                return
            }

            const data: MinuteRequestType = {
                dniProyecto: minuteStore.selectedProject.dni,
                nombre: formValues.nombre,
                fecha: formValues.fecha,
                agenda: formValues.agenda,
                puntosDiscutidos: formValues.puntosDiscutidos,
                decisionesTomadas: formValues.decisionesTomadas,
                activo: true
            }

            // Add dni for UPDATE
            if (modalType === 'UPDATE' && minuteStore.selectedMinute) {
                data.dni = minuteStore.selectedMinute.dni
            }

            const success = await modalMap[modalType].action(data)
            if (success) {
                minuteStore.clearSelectedMinute()
                modalStore.close(minuteStore.minuteModalId)
            }
        })()
        resetForm()
        return
    }

    // For DELETE, no validation needed
    if (modalType === 'DELETE' && minuteStore.selectedMinute) {
        const success = await deleteMinute(minuteStore.selectedMinute.dni)
        if (success) {
            minuteStore.clearSelectedMinute()
            modalStore.close(minuteStore.minuteModalId)
        }
    }
}

const onClose = () => {
    resetForm()
    minuteStore.clearSelectedMinute()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="minuteStore.minuteModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
        size="L"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
