import useBankMovementStore from '@/modules/Tesoreria/MovimientosBancarios/store/bankMovementStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'
import { MOVEMENT_TYPES } from '@/modules/Tesoreria/MovimientosBancarios/types/bankMovementTypes'

export const useBankMovements = () => {
    const bankMovementStore = useBankMovementStore()
    const modalStore = useModalStore()

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getMovementTypeInfo = (typeId: number) => {
        return MOVEMENT_TYPES.find((t) => t.id === typeId)
    }

    const columns: ColumnTableType[] = [
        {
            header: 'Fecha',
            accessorKey: 'date',
            cell: ({ row }: any) => {
                return h('span', formatDate(row.original.date))
            }
        },
        {
            header: 'Cuenta Bancaria',
            accessorKey: 'bankAccountName'
        },
        {
            header: 'Tipo',
            accessorKey: 'movementTypeId',
            cell: ({ row }: any) => {
                const typeInfo = getMovementTypeInfo(row.original.movementTypeId)
                if (!typeInfo) return h('span', '-')

                return h('div', { class: 'flex items-center justify-center gap-2' }, [
                    h('span', {
                        class: `material-symbols-outlined text-${typeInfo.color}`
                    }, typeInfo.icon),
                    h('span', {
                        class: `badge badge-${typeInfo.color}`
                    }, typeInfo.label)
                ])
            }
        },
        {
            header: 'Concepto',
            accessorKey: 'concept'
        },
        {
            header: 'Referencia',
            accessorKey: 'reference',
            cell: ({ row }: any) => {
                return h('span', { class: 'text-sm text-gray-500' }, row.original.reference || '-')
            }
        },
        {
            header: 'Monto',
            accessorKey: 'amount',
            cell: ({ row }: any) => {
                const typeInfo = getMovementTypeInfo(row.original.movementTypeId)
                const amount = row.original.amount
                const colorClass = typeInfo?.id === 1 ? 'text-success' : typeInfo?.id === 2 ? 'text-error' : 'text-info'

                return h('span', {
                    class: `font-semibold ${colorClass}`
                }, formatCurrency(amount))
            }
        },
        {
            header: 'Saldo Nuevo',
            accessorKey: 'newBalance',
            cell: ({ row }: any) => {
                return h('span', { class: 'font-semibold' }, formatCurrency(row.original.newBalance))
            }
        },
        {
            header: 'Estado',
            accessorKey: 'active',
            cell: ({ row }: any) => {
                const isActive = row.original.active
                return h(
                    'span',
                    {
                        class: `badge ${isActive ? 'badge-success' : 'badge-error'}`
                    },
                    isActive ? 'Activo' : 'Inactivo'
                )
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                const editModal = () => {
                    bankMovementStore.setData(data)
                    modalStore.open(bankMovementStore.modalId, {
                        type: 'UPDATE',
                        title: 'Editar movimiento bancario'
                    })
                }
                const editButton = editTableButton(editModal)
                return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
            }
        }
    ]

    return {
        columns
    }
}
