<script setup lang="ts">
import { watch, computed } from 'vue'
import AccountClasificationForm from '@contabilidad/Configuracion/AccountClasification/components/AccountClasificationForm.vue'
import useAccountClasificationStore from '@contabilidad/Configuracion/AccountClasification/store/accountClasificationStore'
import { useAccountClasificationActions } from '@contabilidad/Configuracion/AccountClasification/composables/useAccountClasificationActions'
import { showNotification } from '@/utils/toastNotifications'
import type { AccountClasificationFormDTO } from '@contabilidad/Configuracion/AccountClasification/types/accountClasificationTypes'

interface Props {
    show: boolean
    accountClasificationId?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'success'])

const accountClasificationStore = useAccountClasificationStore()
const { getAccountClasificationById, createAccountClasification, updateAccountClasification } = useAccountClasificationActions()

const isEditMode = computed(() => !!props.accountClasificationId)
const modalTitle = computed(() => 
    isEditMode.value ? 'Editar Clasificación de Cuenta' : 'Nueva Clasificación de Cuenta'
)

watch(() => props.show, async (show) => {
    if (show) {
        if (props.accountClasificationId) {
            try {
                const accountClasification = await getAccountClasificationById(props.accountClasificationId)
                if (accountClasification) {
                    accountClasificationStore.setAccountClasification({
                        id: accountClasification.id,
                        name: accountClasification.name,
                        description: accountClasification.description,
                        active: accountClasification.active
                    })
                }
            } catch (error) {
                showNotification('Error al cargar la clasificación de cuenta', 'error')
                closeModal()
            }
        } else {
            accountClasificationStore.resetAccountClasification()
        }
    }
})

const handleSubmit = async (data: AccountClasificationFormDTO) => {
    try {
        if (isEditMode.value && props.accountClasificationId) {
            await updateAccountClasification(props.accountClasificationId, data)
            showNotification('Clasificación de cuenta actualizada exitosamente', 'success')
        } else {
            await createAccountClasification(data)
            showNotification('Clasificación de cuenta creada exitosamente', 'success')
        }
        emit('success')
        closeModal()
    } catch (error) {
        showNotification(
            isEditMode.value 
                ? 'Error al actualizar la clasificación de cuenta' 
                : 'Error al crear la clasificación de cuenta',
            'error'
        )
    }
}

const closeModal = () => {
    accountClasificationStore.resetAccountClasification()
    emit('close')
}
</script>

<template>
    <div v-if="show" class="modal modal-open">
        <div class="modal-box w-11/12 max-w-2xl">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold">{{ modalTitle }}</h3>
                <button 
                    class="btn btn-sm btn-circle btn-ghost" 
                    @click="closeModal"
                >
                    ✕
                </button>
            </div>

            <AccountClasificationForm 
                @submit="handleSubmit" 
                @cancel="closeModal" 
            />
        </div>
        <div class="modal-backdrop" @click="closeModal"></div>
    </div>
</template>
