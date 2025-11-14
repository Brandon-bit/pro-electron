<script setup lang="ts">
import { ref, h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import ContractDetailModal from '../components/ContractDetailModal.vue'
import DeleteContractModal from '../components/DeleteContractModal.vue'
import { useContracts } from '../composables/useContracts'
import type { Contract } from '../types/contractTypes'

const { fetchContracts } = useContracts()
const detailModalRef = ref<InstanceType<typeof ContractDetailModal> | null>(null)
const deleteModalRef = ref<InstanceType<typeof DeleteContractModal> | null>(null)

// Abrir modal de detalle
const openDetailModal = (contract: Contract) => {
    detailModalRef.value?.openModal(contract.id)
}

// Abrir modal de eliminación
const openDeleteModal = (contract: Contract) => {
    deleteModalRef.value?.openModal(contract)
}

// Confirmar eliminación
const handleDeleteConfirm = (contractId: string | number) => {
    console.log('Contrato eliminado:', contractId)
    // Aquí se recargaría la tabla
}

// Badge de estatus
const StatusBadge = (estatus: string) => {
    const colorMap: Record<string, string> = {
        'En Trámite': 'badge-info',
        'Activo': 'badge-success',
        'Liquidado': 'badge-warning',
        'Cancelado': 'badge-error'
    }
    
    return h('span', {
        class: `badge ${colorMap[estatus] || 'badge-ghost'} text-xs`
    }, estatus)
}

// Botones de acción
const ActionButtons = (contract: Contract) => {
    return h('div', { class: 'flex gap-2 flex-nowrap' }, [
        h('button', {
            class: 'btn btn-info btn-sm',
            onClick: () => openDetailModal(contract)
        }, [
            h('span', { class: 'material-symbols-outlined text-sm' }, 'visibility'),
            'Detalle'
        ]),
        h('button', {
            class: 'btn btn-success btn-sm',
            onClick: () => console.log('Estado de Cuenta:', contract.id)
        }, [
            h('span', { class: 'material-symbols-outlined text-sm' }, 'account_balance'),
            'Estado de Cuenta'
        ]),
        h('button', {
            class: 'btn btn-error btn-sm',
            onClick: () => openDeleteModal(contract)
        }, [
            h('span', { class: 'material-symbols-outlined text-sm' }, 'delete'),
            'Eliminar'
        ])
    ])
}

// Definición de columnas
const columns: ColumnDef<Contract>[] = [
    {
        accessorKey: 'estatus',
        header: 'Estatus',
        cell: ({ row }) => StatusBadge(row.original.estatus)
    },
    {
        accessorKey: 'cliente',
        header: 'Cliente',
    },
    {
        accessorKey: 'contrato',
        header: 'Contrato'
    },
    {
        accessorKey: 'liquidacion',
        header: 'Liquidación'
    },
    {
        accessorKey: 'renovacion',
        header: 'Renovación',
        cell: ({ row }) => row.original.renovacion || '-'
    },
    {
        accessorKey: 'fechaAlta',
        header: 'Fecha Alta'
    },
    {
        accessorKey: 'fechaFin',
        header: 'Fecha Fin'
    },
    {
        accessorKey: 'montoInicial',
        header: 'Monto Inicial',
        cell: ({ row }) => `$${row.original.montoInicial.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
    },
    {
        accessorKey: 'rendimientoNeto',
        header: 'Rendimiento Neto',
        cell: ({ row }) => `${row.original.rendimientoNeto}%`
    },
    {
        accessorKey: 'plazoMeses',
        header: 'Plazo en meses'
    },
    {
        accessorKey: 'plazoDias',
        header: 'Plazo en días'
    },
    {
        accessorKey: 'planPagos',
        header: 'Plan de pagos'
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => `$${row.original.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
    },
    {
        accessorKey: 'interes',
        header: 'Interés',
        cell: ({ row }) => `$${row.original.interes.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => ActionButtons(row.original)
    }
]
</script>

<template>
    <div>
        <BaseTitle 
            title="Operación de contratos" 
            subtitle="Gestión de contratos de inversión"
        />
        
        <BaseTable
            :headers="columns"
            :fetchCallback="fetchContracts"
        />

        <!-- Modal de Detalle -->
        <ContractDetailModal
            ref="detailModalRef"
        />

        <!-- Modal de Eliminación -->
        <DeleteContractModal
            ref="deleteModalRef"
            @confirm="handleDeleteConfirm"
        />
    </div>
</template>
