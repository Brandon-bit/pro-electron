<script setup lang="ts">
import { ref, h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import NewContractTypeModal from '../components/NewContractTypeModal.vue'
import NewRenewalModal from '../components/NewRenewalModal.vue'
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue'
import { useContractTypes } from '../composables/useContractTypes'
import type { ContractType, ContractRenewal } from '../types/contractTypeTypes'

const { fetchContractTypes, createContractType, createRenewal, deleteContractType, deleteRenewal } = useContractTypes()
const newContractTypeModalRef = ref<InstanceType<typeof NewContractTypeModal> | null>(null)
const newRenewalModalRef = ref<InstanceType<typeof NewRenewalModal> | null>(null)
const deleteModalRef = ref<InstanceType<typeof DeleteConfirmModal> | null>(null)
const tableKey = ref(0)

// Abrir modal de nuevo tipo de contrato
const openNewContractTypeModal = () => {
    newContractTypeModalRef.value?.openModal()
}

// Abrir modal de nueva renovación
const openNewRenewalModal = (contratoId: string | number) => {
    newRenewalModalRef.value?.openModal(contratoId)
}

// Abrir modal de eliminación
const openDeleteModal = (id: string | number, name: string) => {
    deleteModalRef.value?.openModal(id, name)
}

// Confirmar creación de tipo de contrato
const handleCreateContractType = async (tipo: string) => {
    await createContractType(tipo)
    tableKey.value++ // Recargar tabla
}

// Confirmar creación de renovación
const handleCreateRenewal = async (data: { contratoId: string | number, contrato: string }) => {
    await createRenewal(data.contratoId, data.contrato)
    tableKey.value++ // Recargar tabla
}

// Confirmar eliminación
const handleDelete = async (id: string | number) => {
    // Aquí determinarías si es un contrato o renovación
    await deleteContractType(id)
    tableKey.value++ // Recargar tabla
}

// Renderizar archivo como badge
const FileBadge = (archivo: string) => {
    return h('span', {
        class: 'badge badge-neutral badge-sm'
    }, archivo)
}

// Renderizar tabla de renovaciones
const RenovationsTable = (renovaciones: ContractRenewal[], contratoId: string | number) => {
    if (renovaciones.length === 0) {
        return h('div', { class: 'text-center py-4' }, [
            h('button', {
                class: 'btn btn-primary btn-sm',
                onClick: () => openNewRenewalModal(contratoId)
            }, [
                h('span', { class: 'material-symbols-outlined text-sm' }, 'add'),
                'Nuevo tipo de renovación'
            ])
        ])
    }

    return h('div', { class: 'space-y-2' }, [
        h('div', { class: 'flex justify-end mb-2' }, [
            h('button', {
                class: 'btn btn-primary btn-sm',
                onClick: () => openNewRenewalModal(contratoId)
            }, [
                h('span', { class: 'material-symbols-outlined text-sm' }, 'add'),
                'Nuevo tipo de renovación'
            ])
        ]),
        h('table', { class: 'table table-sm table-zebra w-full' }, [
            h('thead', { class: 'bg-neutral text-neutral-content' }, [
                h('tr', {}, [
                    h('th', {}, '#'),
                    h('th', {}, 'Contrato'),
                    h('th', {}, 'Archivo'),
                    h('th', {}, '')
                ])
            ]),
            h('tbody', {},
                renovaciones.map((ren, index) => 
                    h('tr', { key: ren.id }, [
                        h('td', {}, index + 1),
                        h('td', {}, ren.contrato),
                        h('td', {}, FileBadge(ren.archivo)),
                        h('td', { class: 'text-right' }, [
                            h('button', {
                                class: 'btn btn-error btn-sm',
                                onClick: () => openDeleteModal(ren.id, ren.contrato)
                            }, [
                                h('span', { class: 'material-symbols-outlined text-sm' }, 'delete'),
                                'Eliminar'
                            ])
                        ])
                    ])
                )
            )
        ])
    ])
}

// Definición de columnas
const columns: ColumnDef<ContractType>[] = [
    {
        accessorKey: 'tipo',
        header: 'Tipo',
        size: 200
    },
    {
        accessorKey: 'archivo',
        header: 'Archivo',
        cell: ({ row }) => FileBadge(row.original.archivo)
    },
    {
        id: 'renovaciones',
        header: 'Contratos de renovación',
        cell: ({ row }) => RenovationsTable(row.original.renovaciones, row.original.id)
    },
    {
        id: 'actions',
        header: '',
        size: 100,
        cell: ({ row }) => {
            return h('button', {
                class: 'btn btn-error btn-sm',
                onClick: () => openDeleteModal(row.original.id, row.original.tipo)
            }, [
                h('span', { class: 'material-symbols-outlined text-sm' }, 'delete'),
                'Eliminar'
            ])
        }
    }
]
</script>

<template>
    <div>
        <BaseTitle 
            title="Tipos de contrato" 
            subtitle="Gestión de tipos de contrato y renovaciones"
        />
        
        <div class="container mx-auto p-6">
            <!-- Botón Nuevo tipo de contrato -->
            <div class="mb-4">
                <button 
                    class="btn btn-primary"
                    @click="openNewContractTypeModal"
                >
                    <span class="material-symbols-outlined">add</span>
                    Nuevo tipo de contrato
                </button>
            </div>

            <!-- Tabla -->
            <BaseTable
                :key="tableKey"
                :headers="columns"
                :fetchCallback="fetchContractTypes"
            />
        </div>

        <!-- Modales -->
        <NewContractTypeModal
            ref="newContractTypeModalRef"
            @confirm="handleCreateContractType"
        />

        <NewRenewalModal
            ref="newRenewalModalRef"
            @confirm="handleCreateRenewal"
        />

        <DeleteConfirmModal
            ref="deleteModalRef"
            @confirm="handleDelete"
        />
    </div>
</template>
