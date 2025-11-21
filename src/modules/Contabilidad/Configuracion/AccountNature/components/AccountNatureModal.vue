<script setup lang="ts">
import { watch, computed } from 'vue'
import AccountNatureForm from '@contabilidad/Configuracion/AccountNature/components/AccountNatureForm.vue'
import useAccountNatureStore from '@contabilidad/Configuracion/AccountNature/store/accountNatureStore'
import { useAccountNatureActions } from '@contabilidad/Configuracion/AccountNature/composables/useAccountNatureActions'
import { showNotification } from '@/utils/toastNotifications'
import type { AccountNatureFormDTO } from '@contabilidad/Configuracion/AccountNature/types/accountNatureTypes'

interface Props {
    show: boolean
    accountNatureId?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'success'])

const accountNatureStore = useAccountNatureStore()
const { getAccountNatureById, createAccountNature, updateAccountNature } = useAccountNatureActions()

const isEditMode = computed(() => !!props.accountNatureId)
const modalTitle = computed(() => 
    isEditMode.value ? 'Editar Naturaleza de Cuenta' : 'Nueva Naturaleza de Cuenta'
)

watch(() => props.show, async (show) => {
    if (show) {
        if (props.accountNatureId) {
            try {
                const accountNature = await getAccountNatureById(props.accountNatureId)
                if (accountNature) {
                    accountNatureStore.setAccountNature({
                        id: accountNature.id,
                        name: accountNature.name,
                        description: accountNature.description,
                        active: accountNature.active
                    })
                }
            } catch (error) {
                showNotification('Error al cargar la naturaleza de cuenta', 'error')
                closeModal()
            }
        } else {
            accountNatureStore.resetAccountNature()
        }
    }
})

const handleSubmit = async (data: AccountNatureFormDTO) => {
    try {
        if (isEditMode.value && props.accountNatureId) {
            await updateAccountNature(props.accountNatureId, data)
            showNotification('Naturaleza de cuenta actualizada exitosamente', 'success')
        } else {
            await createAccountNature(data)
            showNotification('Naturaleza de cuenta creada exitosamente', 'success')
        }
        emit('success')
        closeModal()
    } catch (error) {
        showNotification(
            isEditMode.value 
                ? 'Error al actualizar la naturaleza de cuenta' 
                : 'Error al crear la naturaleza de cuenta',
            'error'
        )
    }
}

const closeModal = () => {
    accountNatureStore.resetAccountNature()
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

            <AccountNatureForm 
                @submit="handleSubmit" 
                @cancel="closeModal" 
            />
        </div>
        <div class="modal-backdrop" @click="closeModal"></div>
    </div>
</template>
