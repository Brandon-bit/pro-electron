import { computed } from 'vue'
import type { AccountingMovementType } from '@/modules/Contabilidad/Contabilidad/OperacionDeMovimientos/types/accountingMovementsTypes'
import { tableButtons } from '@/shared/utils/tableButtons'

export const useAccountingMovements = () => {
    /**
     * Define las columnas de la tabla de movimientos contables
     */
    const columns = [
        {
            key: 'date',
            label: 'Fecha',
            render: (movement: AccountingMovementType) => {
                return new Date(movement.date).toLocaleDateString('es-MX')
            }
        },
        {
            key: 'policy',
            label: 'Póliza',
            render: (movement: AccountingMovementType) => {
                return `<span class="badge badge-outline">${movement.policy}</span>`
            }
        },
        {
            key: 'account',
            label: 'Cuenta',
            render: (movement: AccountingMovementType) => {
                return `<span class="font-medium">${movement.account}</span>`
            }
        },
        {
            key: 'description',
            label: 'Descripción',
            render: (movement: AccountingMovementType) => {
                return movement.description
            }
        },
        {
            key: 'debit',
            label: 'Debe',
            render: (movement: AccountingMovementType) => {
                return movement.debit > 0 
                    ? `<span class="text-right">$${movement.debit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>`
                    : '<span class="text-gray-400">-</span>'
            },
            class: 'text-right'
        },
        {
            key: 'credit',
            label: 'Haber',
            render: (movement: AccountingMovementType) => {
                return movement.credit > 0 
                    ? `<span class="text-right">$${movement.credit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>`
                    : '<span class="text-gray-400">-</span>'
            },
            class: 'text-right'
        },
        {
            key: 'balance',
            label: 'Saldo',
            render: (movement: AccountingMovementType) => {
                return `<span class="font-semibold text-right">$${movement.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>`
            },
            class: 'text-right font-semibold'
        },
        {
            key: 'document',
            label: 'Documento',
            render: (movement: AccountingMovementType) => {
                return movement.document 
                    ? `<span class="badge badge-secondary">${movement.document}</span>`
                    : '-'
            }
        },
        {
            key: 'actions',
            label: 'Acciones',
            render: (movement: AccountingMovementType, index: number) => {
                return tableButtons([
                    {
                        icon: 'visibility',
                        label: 'Ver detalles',
                        onClick: () => handleViewDetails(movement, index)
                    },
                    {
                        icon: 'edit',
                        label: 'Editar',
                        onClick: () => handleEdit(movement, index)
                    },
                    {
                        icon: 'delete',
                        label: 'Eliminar',
                        onClick: () => handleDelete(movement, index)
                    }
                ])
            }
        }
    ]

    /**
     * Maneja la visualización de detalles
     */
    const handleViewDetails = (movement: AccountingMovementType, index: number) => {
        console.log('Ver detalles del movimiento:', movement, 'index:', index)
        // TODO: Implementar modal o navegación a vista de detalles
    }

    /**
     * Maneja la edición de movimiento
     */
    const handleEdit = (movement: AccountingMovementType, index: number) => {
        console.log('Editar movimiento:', movement, 'index:', index)
        // TODO: Implementar modal o navegación a vista de edición
    }

    /**
     * Maneja la eliminación de movimiento
     */
    const handleDelete = (movement: AccountingMovementType, index: number) => {
        console.log('Eliminar movimiento:', movement, 'index:', index)
        // TODO: Implementar confirmación y eliminación
    }

    return {
        columns,
        handleViewDetails,
        handleEdit,
        handleDelete
    }
}
