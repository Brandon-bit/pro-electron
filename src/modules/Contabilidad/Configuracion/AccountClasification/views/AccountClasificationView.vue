<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import AccountClasificationModal from '@contabilidad/Configuracion/AccountClasification/components/AccountClasificationModal.vue'
import DeleteAccountClasification from '@contabilidad/Configuracion/AccountClasification/components/DeleteAccountClasification.vue'
import { useAccountClasificationActions } from '@contabilidad/Configuracion/AccountClasification/composables/useAccountClasificationActions'
import useAccountClasification from '@contabilidad/Configuracion/AccountClasification/composables/useAccountClasification'
import useAccountClasificationStore from '@contabilidad/Configuracion/AccountClasification/store/accountClasificationStore'
import { useModalStore } from '@/shared/stores/modal.store'

const { getAccountClasifications, deleteAccountClasification } = useAccountClasificationActions()
const { getTableColumns } = useAccountClasification()
const accountClasificationStore = useAccountClasificationStore()
const modalStore = useModalStore()

const tableRef = ref()
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingAccountClasificationId = ref<number | undefined>(undefined)
const deletingAccountClasification = ref<{ id: number, name: string } | null>(null)

// Modal handlers
const openCreateModal = () => {
    editingAccountClasificationId.value = undefined
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingAccountClasificationId.value = undefined
    accountClasificationStore.resetAccountClasification()
}

const handleModalSuccess = () => {
    tableRef.value?.fetchData()
}

// Watch modalStore for table action triggers
watch(
    () => modalStore.modals[accountClasificationStore.modalId],
    (newVal) => {
        if (newVal?.status) {
            const type = newVal.type
            if (type === 'EDIT') {
                editingAccountClasificationId.value = accountClasificationStore.currentAccountClasification.id
                showModal.value = true
                modalStore.close(accountClasificationStore.modalId)
            } else if (type === 'DELETE') {
                deletingAccountClasification.value = {
                    id: accountClasificationStore.currentAccountClasification.id!,
                    name: accountClasificationStore.currentAccountClasification.name
                }
                showDeleteModal.value = true
                modalStore.close(accountClasificationStore.modalId)
            }
        }
    },
    { deep: true }
)

const closeDeleteModal = () => {
    showDeleteModal.value = false
    deletingAccountClasification.value = null
}

const handleDeleteConfirm = async () => {
    if (deletingAccountClasification.value) {
        try {
            await deleteAccountClasification(deletingAccountClasification.value.id)
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
                title="Clasificación de Cuentas" 
                subtitle="Gestiona las clasificaciones de las cuentas contables"
            />
            <BaseButton 
                text="Nueva Clasificación"
                icon="add"
                @click="openCreateModal"
            />
        </div>

        <!-- Table -->
        <BaseTable
            ref="tableRef"
            :headers="getTableColumns()"
            :fetch-callback="getAccountClasifications"
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
