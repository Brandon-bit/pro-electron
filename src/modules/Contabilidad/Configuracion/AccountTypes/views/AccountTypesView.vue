<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import AccountTypeTable from '@contabilidad/Configuracion/AccountTypes/components/AccountTypeTable.vue'
import AccountTypeModal from '@contabilidad/Configuracion/AccountTypes/components/AccountTypeModal.vue'
import DeleteAccountType from '@contabilidad/Configuracion/AccountTypes/components/DeleteAccountType.vue'
import { useAccountTypesActions } from '@contabilidad/Configuracion/AccountTypes/composables/useAccountTypesActions'
import { showNotification } from '@/utils/toastNotifications'
import type { AccountTypeDTO } from '@contabilidad/Configuracion/AccountTypes/types/accountTypesTypes'

const { getAccountTypes, deleteAccountType } = useAccountTypesActions()

const accountTypes = ref<AccountTypeDTO[]>([])
const loading = ref(false)
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingAccountTypeId = ref<number | undefined>(undefined)
const deletingAccountType = ref<AccountTypeDTO | null>(null)

const fetchAccountTypes = async () => {
    loading.value = true
    try {
        accountTypes.value = await getAccountTypes()
    } catch (error) {
        showNotification('Error al cargar tipos de cuenta', 'error')
    } finally {
        loading.value = false
    }
}

const openCreateModal = () => {
    editingAccountTypeId.value = undefined
    showModal.value = true
}

const openEditModal = (id: number) => {
    editingAccountTypeId.value = id
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingAccountTypeId.value = undefined
}

const handleModalSuccess = async () => {
    await fetchAccountTypes()
}

const openDeleteModal = (id: number) => {
    const accountType = accountTypes.value.find(t => t.id === id)
    if (accountType) {
        deletingAccountType.value = accountType
        showDeleteModal.value = true
    }
}

const closeDeleteModal = () => {
    showDeleteModal.value = false
    deletingAccountType.value = null
}

const handleDeleteConfirm = async () => {
    if (deletingAccountType.value) {
        try {
            await deleteAccountType(deletingAccountType.value.id)
            showNotification('Tipo de cuenta eliminado exitosamente', 'success')
            await fetchAccountTypes()
        } catch (error) {
            showNotification('Error al eliminar el tipo de cuenta', 'error')
        } finally {
            closeDeleteModal()
        }
    }
}

onMounted(() => {
    fetchAccountTypes()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Tipos de Cuentas" 
                subtitle="Gestiona los tipos de cuentas contables"
            />
            <BaseButton 
                text="Nuevo Tipo"
                icon="add"
                @click="openCreateModal"
            />
        </div>

        <!-- Table -->
        <AccountTypeTable
            :account-types="accountTypes"
            :loading="loading"
            @edit="openEditModal"
            @delete="openDeleteModal"
        />

        <!-- Create/Edit Modal -->
        <AccountTypeModal
            :show="showModal"
            :account-type-id="editingAccountTypeId"
            @close="closeModal"
            @success="handleModalSuccess"
        />

        <!-- Delete Confirmation Modal -->
        <DeleteAccountType
            :show="showDeleteModal"
            :account-type-name="deletingAccountType?.name || ''"
            @confirm="handleDeleteConfirm"
            @cancel="closeDeleteModal"
        />
    </div>
</template>
