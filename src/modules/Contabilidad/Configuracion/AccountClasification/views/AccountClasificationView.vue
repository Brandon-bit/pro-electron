<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import AccountClasificationTable from '@contabilidad/Configuracion/AccountClasification/components/AccountClasificationTable.vue'
import AccountClasificationModal from '@contabilidad/Configuracion/AccountClasification/components/AccountClasificationModal.vue'
import DeleteAccountClasification from '@contabilidad/Configuracion/AccountClasification/components/DeleteAccountClasification.vue'
import { useAccountClasificationActions } from '@contabilidad/Configuracion/AccountClasification/composables/useAccountClasificationActions'
import { showNotification } from '@/utils/toastNotifications'
import type { AccountClasificationDTO } from '@contabilidad/Configuracion/AccountClasification/types/accountClasificationTypes'

const { getAccountClasifications, deleteAccountClasification } = useAccountClasificationActions()

const accountClasifications = ref<AccountClasificationDTO[]>([])
const loading = ref(false)
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingAccountClasificationId = ref<number | undefined>(undefined)
const deletingAccountClasification = ref<AccountClasificationDTO | null>(null)

const fetchAccountClasifications = async () => {
    loading.value = true
    try {
        accountClasifications.value = await getAccountClasifications()
    } catch (error) {
        showNotification('Error al cargar clasificaciones de cuenta', 'error')
    } finally {
        loading.value = false
    }
}

const openCreateModal = () => {
    editingAccountClasificationId.value = undefined
    showModal.value = true
}

const openEditModal = (id: number) => {
    editingAccountClasificationId.value = id
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingAccountClasificationId.value = undefined
}

const handleModalSuccess = async () => {
    await fetchAccountClasifications()
}

const openDeleteModal = (id: number) => {
    const accountClasification = accountClasifications.value.find(c => c.id === id)
    if (accountClasification) {
        deletingAccountClasification.value = accountClasification
        showDeleteModal.value = true
    }
}

const closeDeleteModal = () => {
    showDeleteModal.value = false
    deletingAccountClasification.value = null
}

const handleDeleteConfirm = async () => {
    if (deletingAccountClasification.value) {
        try {
            await deleteAccountClasification(deletingAccountClasification.value.id)
            showNotification('Clasificación de cuenta eliminada exitosamente', 'success')
            await fetchAccountClasifications()
        } catch (error) {
            showNotification('Error al eliminar la clasificación de cuenta', 'error')
        } finally {
            closeDeleteModal()
        }
    }
}

onMounted(() => {
    fetchAccountClasifications()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Clasificación de Cuentas" 
                subtitle="Gestiona las clasificaciones de cuentas contables"
            />
            <BaseButton 
                text="Nueva Clasificación"
                icon="add"
                @click="openCreateModal"
            />
        </div>

        <!-- Table -->
        <AccountClasificationTable
            :account-clasifications="accountClasifications"
            :loading="loading"
            @edit="openEditModal"
            @delete="openDeleteModal"
        />

        <!-- Create/Edit Modal -->
        <AccountClasificationModal
            :show="showModal"
            :account-clasification-id="editingAccountClasificationId"
            @close="closeModal"
            @success="handleModalSuccess"
        />

        <!-- Delete Confirmation Modal -->
        <DeleteAccountClasification
            :show="showDeleteModal"
            :account-clasification-name="deletingAccountClasification?.name || ''"
            @confirm="handleDeleteConfirm"
            @cancel="closeDeleteModal"
        />
    </div>
</template>
