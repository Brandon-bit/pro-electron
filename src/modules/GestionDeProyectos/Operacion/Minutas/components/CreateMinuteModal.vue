<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import MinuteForm from '@/modules/GestionDeProyectos/Operacion/Minutas/components/MinuteForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import type { ActionItemType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { minuteSchema } from '@/modules/GestionDeProyectos/Operacion/Minutas/validations/minuteValidations'
import { showNotification } from '@/utils/toastNotifications'

const modalStore = useModalStore()
const minuteStore = useMinuteStore()

const MODAL_ID = 'create-minute-modal'

// Array para asistentes (no validado por el schema)
const attendees = ref<string[]>([])

// Configurar vee-validate
const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(minuteSchema),
    validateOnMount: false,
    initialValues: {
        title: '',
        date: '',
        time: '',
        agenda: '',
        discussion: '',
        decisions: ''
    }
})

watch(() => minuteStore.isModalOpen, (isOpen) => {
    if (isOpen) {
        modalStore.open(MODAL_ID, {
            title: 'Nueva Minuta de Reunión'
        })
    } else {
        modalStore.close(MODAL_ID)
    }
})

// Handlers para asistentes
const handleAddAttendee = (value: string) => {
    attendees.value.push(value)
}

const handleRemoveAttendee = (index: number) => {
    attendees.value.splice(index, 1)
}


const onSubmit = async () => {
    if (!minuteStore.selectedProject) {
        showNotification('Debe seleccionar un proyecto primero', 'error')
        return
    }

    await handleSubmit(async (formValues) => {
        // Combinar datos del formulario validado con arrays adicionales
        minuteStore.addMinute({
            projectId: minuteStore.selectedProject!.dni,
            ...formValues,
            attendees: attendees.value,
            absentees: [], // Array vacío ya que se eliminó la funcionalidad
            actionItems: [], // Las acciones se agregarán después mediante el botón en el accordion
            distributed: false
        })
        
        showNotification('Minuta creada exitosamente', 'success')
        
        // Reset array
        attendees.value = []
        
        minuteStore.closeModal()
    })()
}

const onClose = () => {
    resetForm()
    attendees.value = []
    minuteStore.closeModal()
}
</script>

<template>
    <BaseModal
        :modal-id="MODAL_ID"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="isSubmitting"
        submit-text="Guardar Minuta"
        size="L"
    >
        <template #modalBody>
            <MinuteForm
                :attendees="attendees"
                @add-attendee="handleAddAttendee"
                @remove-attendee="handleRemoveAttendee"
            />
        </template>
    </BaseModal>
</template>
