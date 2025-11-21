<script setup lang="ts">
import { watch, computed } from 'vue'
import AccountTypeForm from '@contabilidad/Configuracion/AccountTypes/components/AccountTypeForm.vue'
import useAccountTypesStore from '@contabilidad/Configuracion/AccountTypes/store/accountTypesStore'
import { useAccountTypesActions } from '@contabilidad/Configuracion/AccountTypes/composables/useAccountTypesActions'
import { showNotification } from '@/utils/toastNotifications'
import type { AccountTypeFormDTO } from '@contabilidad/Configuracion/AccountTypes/types/accountTypesTypes'

interface Props {
    show: boolean
    accountTypeId?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'success'])

const accountTypesStore = useAccountTypesStore()
const { getAccountTypeById, createAccountType, updateAccountType } = useAccountTypesActions()

const isEditMode = computed(() => !!props.accountTypeId)
const modalTitle = computed(() => 
    isEditMode.value ? 'Editar Tipo de Cuenta' : 'Nuevo Tipo de Cuenta'
)

// Load account type data when modal opens in edit mode
watch(() => props.show, async (show) => {
    if (show) {
        if (props.accountTypeId) {
            try {
                const accountType = await getAccountTypeById(props.accountTypeId)
                if (accountType) {
                    accountTypesStore.setAccountType({
                        id: accountType.id,
                        name: accountType.name,
                        description: accountType.description,
                        active: accountType.active
                    })
                }
            } catch (error) {
                showNotification('Error al cargar el tipo de cuenta', 'error')
                closeModal()
            }
        } else {
            accountTypesStore.resetAccountType()
        }
    }
})

const handleSubmit = async (data: AccountTypeFormDTO) => {
    try {
        if (isEditMode.value && props.accountTypeId) {
            await updateAccountType(props.accountTypeId, data)
            showNotification('Tipo de cuenta actualizado exitosamente', 'success')
        } else {
            await createAccountType(data)
            showNotification('Tipo de cuenta creado exitosamente', 'success')
        }
        emit('success')
        closeModal()
    } catch (error) {
        showNotification(
            isEditMode.value 
                ? 'Error al actualizar el tipo de cuenta' 
                : 'Error al crear el tipo de cuenta',
            'error'
        )
    }
}

const closeModal = () => {
    accountTypesStore.resetAccountType()
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

            <AccountTypeForm 
                @submit="handleSubmit" 
                @cancel="closeModal" 
            />
        </div>
        <div class="modal-backdrop" @click="closeModal"></div>
    </div>
</template>
