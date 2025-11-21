import useBankReconciliationStore from '@/modules/Tesoreria/ConciliacionBancaria/store/bankReconciliationStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'
import { RECONCILIATION_STATUS } from '@/modules/Tesoreria/ConciliacionBancaria/types/bankReconciliationTypes'

export const useBankReconciliations = () => {
    const bankReconciliationStore = useBankReconciliationStore()
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
            month: 'short',
            day: 'numeric'
        })
    }

    const getStatusInfo = (statusId: number) => {
        return RECONCILIATION_STATUS.find((s) => s.id === statusId)
    }

    const columns: ColumnTableType[] = [
        {
            header: 'Cuenta Bancaria',
            accessorKey: 'bankAccountName'
        },
        {
            header: 'Período',
            accessorKey: 'startDate',
            cell: ({ row }: any) => {
                return h('div', { class: 'text-sm' }, [
                    h('div', formatDate(row.original.startDate)),
                    h('div', { class: 'text-gray-500' }, `al ${formatDate(row.original.endDate)}`)
                ])
            }
        },
        {
            header: 'Saldo Libros',
            accessorKey: 'finalBookBalance',
            cell: ({ row }: any) => {
                return h('div', { class: 'text-right' }, [
                    h('div', { class: 'text-xs text-gray-500' }, 
                        `Inicial: ${formatCurrency(row.original.initialBookBalance)}`
                    ),
                    h('div', { class: 'font-semibold' }, 
                        formatCurrency(row.original.finalBookBalance)
                    )
                ])
            }
        },
        {
            header: 'Saldo Banco',
            accessorKey: 'finalBankBalance',
            cell: ({ row }: any) => {
                return h('div', { class: 'text-right' }, [
                    h('div', { class: 'text-xs text-gray-500' }, 
                        `Inicial: ${formatCurrency(row.original.initialBankBalance)}`
                    ),
                    h('div', { class: 'font-semibold' }, 
                        formatCurrency(row.original.finalBankBalance)
                    )
                ])
            }
        },
        {
            header: 'Diferencia',
            accessorKey: 'difference',
            cell: ({ row }: any) => {
                const difference = row.original.difference
                const colorClass = difference === 0 ? 'text-success' : 'text-error'

                return h('span', {
                    class: `font-semibold ${colorClass}`
                }, formatCurrency(Math.abs(difference)))
            }
        },
        {
            header: 'Estado',
            accessorKey: 'status',
            cell: ({ row }: any) => {
                const statusInfo = getStatusInfo(row.original.status)
                if (!statusInfo) return h('span', '-')

                return h('span', {
                    class: `badge badge-${statusInfo.color}`
                }, statusInfo.label)
            }
        },
        {
            header: 'Fecha Conciliación',
            accessorKey: 'reconciliationDate',
            cell: ({ row }: any) => {
                return h('span', { class: 'text-sm' }, 
                    row.original.reconciliationDate 
                        ? formatDate(row.original.reconciliationDate)
                        : '-'
                )
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                const editModal = () => {
                    bankReconciliationStore.setData(data)
                    modalStore.open(bankReconciliationStore.modalId, {
                        type: 'UPDATE',
                        title: 'Editar conciliación bancaria'
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
