<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseUserSelect from '@/shared/components/BaseUserSelect.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import { useUsers } from '@/modules/GestionDeProyectos/Operacion/Minutas/composables/useUsers'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { showNotification } from '@/utils/toastNotifications'

const modalStore = useModalStore()
const minuteStore = useMinuteStore()
const { users, loadUsers } = useUsers()

const MODAL_ID = 'add-action-modal'

// Schema de validación
const actionSchema = z.object({
    description: z.string().min(1, 'La descripción es requerida'),
    dueDate: z.string().min(1, 'La fecha límite es requerida')
})

// Configurar vee-validate
const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(actionSchema),
    validateOnMount: false,
    initialValues: {
        description: '',
        dueDate: ''
    }
})

// Responsable no está en el schema porque usa BaseUserSelect
const responsible = ref('')

onMounted(() => {
    loadUsers()
})

watch(() => minuteStore.isActionModalOpen, (isOpen) => {
    if (isOpen) {
        const isEditing = !!minuteStore.selectedAction
        
        // Si estamos editando, prellenar los campos
        if (isEditing && minuteStore.selectedAction) {
            resetForm({
                values: {
                    description: minuteStore.selectedAction.description,
                    dueDate: minuteStore.selectedAction.dueDate
                }
            })
            responsible.value = minuteStore.selectedAction.responsible
        }
        
        modalStore.open(MODAL_ID, {
            title: isEditing ? 'Editar Acción Acordada' : 'Agregar Acción Acordada'
        })
    } else {
        modalStore.close(MODAL_ID)
    }
})

const onSubmit = async () => {
    // Validar responsable (no está en el schema)
    if (!responsible.value) {
        showNotification('El responsable es requerido', 'error')
        return
    }

    await handleSubmit(async (formValues) => {
        try {
            const isEditing = !!minuteStore.selectedAction
            
            if (isEditing) {
                // Actualizar acción existente
                minuteStore.updateActionInMinute(
                    minuteStore.selectedMinuteId!,
                    minuteStore.selectedAction.id,
                    {
                        description: formValues.description,
                        responsible: responsible.value,
                        dueDate: formValues.dueDate
                    }
                )
                showNotification('Acción actualizada exitosamente', 'success')
            } else {
                // Crear nueva acción
                minuteStore.addActionToMinute(
                    minuteStore.selectedMinuteId!,
                    {
                        description: formValues.description,
                        responsible: responsible.value,
                        dueDate: formValues.dueDate
                    }
                )
                showNotification('Acción agregada exitosamente', 'success')
            }
            
            // Reset
            responsible.value = ''
            minuteStore.closeActionModal()
        } catch (error) {
            showNotification('Error al procesar la acción', 'error')
        }
    })()
}

const onClose = () => {
    resetForm()
    responsible.value = ''
    minuteStore.closeActionModal()
}
</script>

<template>
    <BaseModal
        :modal-id="MODAL_ID"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="isSubmitting"
        :submit-text="minuteStore.selectedAction ? 'Actualizar Acción' : 'Agregar Acción'"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Descripción -->
                <BaseTextArea
                    name="description"
                    label="Descripción de la Acción"
                    class="mb-4"
                />

                <!-- Responsable -->
                <BaseUserSelect
                    v-model="responsible"
                    :users="users"
                    label="Responsable"
                    placeholder="Buscar usuario..."
                    :required="true"
                />

                <!-- Fecha Límite -->
                <BaseFormInput
                    name="dueDate"
                    type="date"
                    label="Fecha Límite"
                    :required="true"
                />
            </div>
        </template>
    </BaseModal>
</template>
