<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import AccountNatureTable from '@contabilidad/Configuracion/AccountNature/components/AccountNatureTable.vue'
import AccountNatureModal from '@contabilidad/Configuracion/AccountNature/components/AccountNatureModal.vue'
import DeleteAccountNature from '@contabilidad/Configuracion/AccountNature/components/DeleteAccountNature.vue'
import { useAccountNatureActions } from '@contabilidad/Configuracion/AccountNature/composables/useAccountNatureActions'
import { showNotification } from '@/utils/toastNotifications'
import type { AccountNatureDTO } from '@contabilidad/Configuracion/AccountNature/types/accountNatureTypes'

const { getAccountNatures, deleteAccountNature } = useAccountNatureActions()

const accountNatures = ref<AccountNatureDTO[]>([])
const loading = ref(false)
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingAccountNatureId = ref<number | undefined>(undefined)
const deletingAccountNature = ref<AccountNatureDTO | null>(null)

const fetchAccountNatures = async () => {
    loading.value = true
    try {
        accountNatures.value = await getAccountNatures()
    } catch (error) {
        showNotification('Error al cargar naturalezas de cuenta', 'error')
    } finally {
        loading.value = false
    }
}

const openCreateModal = () => {
    editingAccountNatureId.value = undefined
    showModal.value = true
}

const openEditModal = (id: number) => {
    editingAccountNatureId.value = id
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingAccountNatureId.value = undefined
}

const handleModalSuccess = async () => {
    await fetchAccountNatures()
}

const openDeleteModal = (id: number) => {
    const accountNature = accountNatures.value.find(n => n.id === id)
    if (accountNature) {
        deletingAccountNature.value = accountNature
        showDeleteModal.value = true
    }
}

const closeDeleteModal = () => {
    showDeleteModal.value = false
    deletingAccountNature.value = null
}

const handleDeleteConfirm = async () => {
    if (deletingAccountNature.value) {
        try {
            await deleteAccountNature(deletingAccountNature.value.id)
            showNotification('Naturaleza de cuenta eliminada exitosamente', 'success')
            await fetchAccountNatures()
        } catch (error) {
            showNotification('Error al eliminar la naturaleza de cuenta', 'error')
        } finally {
            closeDeleteModal()
        }
    }
}

onMounted(() => {
    fetchAccountNatures()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Naturaleza de Cuentas" 
                subtitle="Gestiona las naturalezas de cuentas contables"
            />
            <BaseButton 
                text="Nueva Naturaleza"
                icon="add"
                @click="openCreateModal"
            />
        </div>

        <!-- Table -->
        <AccountNatureTable
            :account-natures="accountNatures"
            :loading="loading"
            @edit="openEditModal"
            @delete="openDeleteModal"
        />

        <!-- Create/Edit Modal -->
        <AccountNatureModal
            :show="showModal"
            :account-nature-id="editingAccountNatureId"
            @close="closeModal"
            @success="handleModalSuccess"
        />

        <!-- Delete Confirmation Modal -->
        <DeleteAccountNature
            :show="showDeleteModal"
            :account-nature-name="deletingAccountNature?.name || ''"
            @confirm="handleDeleteConfirm"
            @cancel="closeDeleteModal"
        />
    </div>
</template>
