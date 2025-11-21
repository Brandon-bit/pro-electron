<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import AccountTypeModal from '@contabilidad/Configuracion/AccountTypes/components/AccountTypeModal.vue'
import DeleteAccountType from '@contabilidad/Configuracion/AccountTypes/components/DeleteAccountType.vue'
import { useAccountTypesActions } from '@contabilidad/Configuracion/AccountTypes/composables/useAccountTypesActions'
import useAccountTypes from '@contabilidad/Configuracion/AccountTypes/composables/useAccountTypes'
import useAccountTypesStore from '@contabilidad/Configuracion/AccountTypes/store/accountTypesStore'
import { useModalStore } from '@/shared/stores/modal.store'

const { getAccountTypes, deleteAccountType } = useAccountTypesActions()
const { getTableColumns } = useAccountTypes()
const accountTypesStore = useAccountTypesStore()
const modalStore = useModalStore()

const tableRef = ref()
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingAccountTypeId = ref<number | undefined>(undefined)
const deletingAccountType = ref<{ id: number, name: string } | null>(null)

// Modal handlers
const openCreateModal = () => {
    editingAccountTypeId.value = undefined
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingAccountTypeId.value = undefined
    accountTypesStore.resetAccountType()
}

const handleModalSuccess = () => {
    tableRef.value?.fetchData()
}

// Delete handlers (triggered from BaseTable actions via store/modal)
// Note: BaseTable actions use modalStore, but we need to handle the actual delete confirmation here
// We can listen to modalStore events or just use the existing DeleteAccountType component
// For now, let's keep using the existing DeleteAccountType component but we need to hook into the table actions.
// The table actions in useAccountTypes.ts use modalStore.open().
// We need to make sure our view handles the modal opening if we want to use our custom modals,
// OR we adapt to the modalStore pattern.
// Given the current setup in useAccountTypes.ts:
/*
    const handleEdit = () => {
        accountTypesStore.setAccountType(data)
        modalStore.open(accountTypesStore.modalId, { type: 'EDIT', ... })
    }
*/
// So the table triggers modalStore. We should watch modalStore or use it to control visibility.

// However, to keep it simple and working with the current view structure:
// The BaseTable renders actions that call handleEdit/handleDelete in useAccountTypes.ts
// Those functions update accountTypesStore and call modalStore.open()
// We need to make sure this view reacts to that.

// Let's check how AccountingPoliciesView handles it.
// It seems it just renders the table. The actions might be handled globally or inside the view.
// In useAccountTypes.ts, it uses modalStore.
// Let's update this view to work with the modalStore pattern if possible, or override the actions.

// Actually, looking at useAccountTypes.ts again, it sets data in accountTypesStore and opens modal.
// So we should use a watcher or subscribe to the store/modal to show our modals.
// OR, we can pass custom actions to getTableColumns if we want to keep local control.
// But let's try to align with the existing pattern in useAccountTypes.ts

import { watch } from 'vue'

watch(
    () => modalStore.modals[accountTypesStore.modalId],
    (newVal) => {
        if (newVal?.status) {
            const type = newVal.type
            if (type === 'EDIT') {
                editingAccountTypeId.value = accountTypesStore.currentAccountType.id
                showModal.value = true
                modalStore.close(accountTypesStore.modalId)
            } else if (type === 'DELETE') {
                deletingAccountType.value = {
                    id: accountTypesStore.currentAccountType.id!,
                    name: accountTypesStore.currentAccountType.name
                }
                showDeleteModal.value = true
                modalStore.close(accountTypesStore.modalId)
            }
        }
    },
    { deep: true }
)

const closeDeleteModal = () => {
    showDeleteModal.value = false
    deletingAccountType.value = null
}

const handleDeleteConfirm = async () => {
    if (deletingAccountType.value) {
        try {
            await deleteAccountType(deletingAccountType.value.id)
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
        <BaseTable
            ref="tableRef"
            :headers="getTableColumns()"
            :fetch-callback="getAccountTypes"
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
