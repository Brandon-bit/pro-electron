<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import AccountNatureModal from '@contabilidad/Configuracion/AccountNature/components/AccountNatureModal.vue'
import DeleteAccountNature from '@contabilidad/Configuracion/AccountNature/components/DeleteAccountNature.vue'
import { useAccountNatureActions } from '@contabilidad/Configuracion/AccountNature/composables/useAccountNatureActions'
import useAccountNature from '@contabilidad/Configuracion/AccountNature/composables/useAccountNature'
import useAccountNatureStore from '@contabilidad/Configuracion/AccountNature/store/accountNatureStore'
import { useModalStore } from '@/shared/stores/modal.store'

const { getAccountNatures, deleteAccountNature } = useAccountNatureActions()
const { getTableColumns } = useAccountNature()
const accountNatureStore = useAccountNatureStore()
const modalStore = useModalStore()

const tableRef = ref()
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingAccountNatureId = ref<number | undefined>(undefined)
const deletingAccountNature = ref<{ id: number, name: string } | null>(null)

// Modal handlers
const openCreateModal = () => {
    editingAccountNatureId.value = undefined
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingAccountNatureId.value = undefined
    accountNatureStore.resetAccountNature()
}

const handleModalSuccess = () => {
    tableRef.value?.fetchData()
}

// Watch modalStore for table action triggers
watch(
    () => modalStore.modals[accountNatureStore.modalId],
    (newVal) => {
        if (newVal?.status) {
            const type = newVal.type
            if (type === 'EDIT') {
                editingAccountNatureId.value = accountNatureStore.currentAccountNature.id
                showModal.value = true
                modalStore.close(accountNatureStore.modalId)
            } else if (type === 'DELETE') {
                deletingAccountNature.value = {
                    id: accountNatureStore.currentAccountNature.id!,
                    name: accountNatureStore.currentAccountNature.name
                }
                showDeleteModal.value = true
                modalStore.close(accountNatureStore.modalId)
            }
        }
    },
    { deep: true }
)

const closeDeleteModal = () => {
    showDeleteModal.value = false
    deletingAccountNature.value = null
}

const handleDeleteConfirm = async () => {
    if (deletingAccountNature.value) {
        try {
            await deleteAccountNature(deletingAccountNature.value.id)
            tableRef.value?.fetchData()
        } catch (error) {
            console.error(error)
        } finally {
            closeDeleteModal()
        }
    }
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Naturaleza de Cuentas" 
                subtitle="Gestiona las naturalezas de las cuentas contables (Deudora/Acreedora)"
            />
            <BaseButton 
                text="Nueva Naturaleza"
                icon="add"
                @click="openCreateModal"
            />
        </div>

        <!-- Table -->
        <BaseTable
            ref="tableRef"
            :headers="getTableColumns()"
            :fetch-callback="getAccountNatures"
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
