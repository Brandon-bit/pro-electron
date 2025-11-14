<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import UserModal from '@/modules/DefaultModule/Usuarios/Lista/components/UserModal.vue'
import DeleteUserModal from '@/modules/DefaultModule/Usuarios/Lista/components/DeleteUserModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useUserStore from '@/modules/DefaultModule/Usuarios/Lista/store/userStore'
import useUser from '@/modules/DefaultModule/Usuarios/Lista/composables/useUser'
import { useUserActions } from '@/modules/DefaultModule/Usuarios/Lista/composables/useUserActions'

const modalStore = useModalStore()
const userStore = useUserStore()
const { getTableColumns } = useUser()
const { getUsers, handleExportExcel, handleExportPDF } = useUserActions()

const tableRef = ref()

const openCreateModal = () => {
    userStore.clearData()
    modalStore.open(userStore.modalId, { 
        type: 'CREATE', 
        title: 'Nuevo usuario' 
    })
}

const handleExportExcelClick = () => {
    handleExportExcel(userStore.filters)
}

const handleExportPDFClick = () => {
    handleExportPDF(userStore.filters)
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle title="Lista de usuarios" />

        <!-- Action Buttons -->
        <div class="flex justify-between items-center">
            <BaseButton 
                text="Nuevo usuario" 
                @click="openCreateModal" 
                variant="primary"
            />
            
            <div class="flex gap-2">
                <BaseButton 
                    text="Excel" 
                    @click="handleExportExcelClick" 
                    variant="success"
                    className="btn-sm"
                />
                <BaseButton 
                    text="PDF" 
                    @click="handleExportPDFClick" 
                    variant="error"
                    className="btn-sm"
                />
            </div>
        </div>

        <!-- Table -->
        <BaseTable
            ref="tableRef"
            :headers="getTableColumns()"
            :fetch-callback="getUsers"
        />

        <!-- Modals -->
        <UserModal :on-refresh="tableRef?.fetchData" />
        <DeleteUserModal :on-refresh="tableRef?.fetchData" />
    </div>
</template>
