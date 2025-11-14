import useProvisionalPaymentStore from '@/modules/Fiscal/Provisionales/store/provisionalPaymentStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { deleteTableButton } from '@/utils/tableButtons'

const useProvisionalPayment = () => {
    
    const provisionalPaymentStore = useProvisionalPaymentStore()
    const modalStore = useModalStore()

    const getStatusColor = (status: string): string => {
        switch (status) {
            case "Pagado": return "badge-success"
            case "Pendiente": return "badge-warning"
            case "Vencido": return "badge-error"
            default: return "badge-ghost"
        }
    }

    const getStatusIcon = (status: string): string => {
        switch (status) {
            case "Pagado": return "check_circle"
            case "Pendiente": return "pending"
            case "Vencido": return "error"
            default: return "help"
        }
    }

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount)
    }

    const formatDate = (date: Date): string => {
        return new Date(date).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getISRTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Periodo',
                accessorKey: 'period',
                cell: ({ row }: any) => {
                    return h('p', { class: 'font-medium' }, row.original.period)
                }
            },
            {
                header: 'Ingresos',
                accessorKey: 'income',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right' }, formatCurrency(row.original.income))
                }
            },
            {
                header: 'Deducciones',
                accessorKey: 'deductions',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right text-error' }, 
                        `-${formatCurrency(row.original.deductions)}`
                    )
                }
            },
            {
                header: 'Utilidad Fiscal',
                accessorKey: 'taxableProfit',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right font-semibold' }, 
                        formatCurrency(row.original.taxableProfit)
                    )
                }
            },
            {
                header: 'ISR',
                accessorKey: 'isr',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right' }, formatCurrency(row.original.isr))
                }
            },
            {
                header: 'IVA',
                accessorKey: 'vat',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right' }, formatCurrency(row.original.vat))
                }
            },
            {
                header: 'Total a Pagar',
                accessorKey: 'total',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right font-bold text-primary' }, 
                        formatCurrency(row.original.total)
                    )
                }
            },
            {
                header: 'Fecha Límite',
                accessorKey: 'dueDate',
                cell: ({ row }: any) => {
                    return h('p', {}, formatDate(row.original.dueDate))
                }
            },
            {
                header: 'Estatus',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const status = row.original.status
                    return h('div', { class: 'flex items-center gap-1' }, [
                        h('span', { 
                            class: `badge badge-sm ${getStatusColor(status)}` 
                        }, [
                            h('span', { class: 'material-symbols-outlined text-xs mr-1' }, getStatusIcon(status)),
                            status
                        ])
                    ])
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    
                    const downloadButton = h('button', {
                        class: 'btn btn-ghost btn-xs',
                        onClick: () => {
                            provisionalPaymentStore.setSelectedProvisionalPayment(data)
                            // Trigger download
                        }
                    }, [
                        h('span', { class: 'material-symbols-outlined text-base' }, 'download')
                    ])

                    const deleteButton = data.status === 'Pendiente' ? deleteTableButton(() => {
                        provisionalPaymentStore.setSelectedProvisionalPayment(data)
                        modalStore.open(provisionalPaymentStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar Registro'
                        })
                    }) : null

                    const buttons = [downloadButton, deleteButton].filter(Boolean)
                    
                    return h('div', { class: 'flex gap-1 justify-end' }, buttons)
                }
            }
        ]

        return columns
    }

    const getVATTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Periodo',
                accessorKey: 'period',
                cell: ({ row }: any) => {
                    return h('p', { class: 'font-medium' }, row.original.period)
                }
            },
            {
                header: 'IVA Cobrado',
                accessorKey: 'collectedVAT',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right text-success' }, 
                        formatCurrency(row.original.collectedVAT)
                    )
                }
            },
            {
                header: 'IVA Acreditable',
                accessorKey: 'creditableVAT',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right text-info' }, 
                        `-${formatCurrency(row.original.creditableVAT)}`
                    )
                }
            },
            {
                header: 'Saldo a Favor',
                accessorKey: 'favorBalance',
                cell: ({ row }: any) => {
                    const balance = row.original.favorBalance
                    if (balance > 0) {
                        return h('div', { class: 'text-right text-success' }, formatCurrency(balance))
                    }
                    return h('div', { class: 'text-right text-base-content/40' }, '$0')
                }
            },
            {
                header: 'IVA a Pagar',
                accessorKey: 'vatToPay',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right font-bold text-primary' }, 
                        formatCurrency(row.original.vatToPay)
                    )
                }
            },
            {
                header: 'Fecha Límite',
                accessorKey: 'dueDate',
                cell: ({ row }: any) => {
                    return h('p', {}, formatDate(row.original.dueDate))
                }
            },
            {
                header: 'Estatus',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const status = row.original.status
                    return h('div', { class: 'flex items-center gap-1' }, [
                        h('span', { 
                            class: `badge badge-sm ${getStatusColor(status)}` 
                        }, [
                            h('span', { class: 'material-symbols-outlined text-xs mr-1' }, getStatusIcon(status)),
                            status
                        ])
                    ])
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    
                    const downloadButton = h('button', {
                        class: 'btn btn-ghost btn-xs',
                        onClick: () => {
                            provisionalPaymentStore.setSelectedVATDeclaration(data)
                            // Trigger download
                        }
                    }, [
                        h('span', { class: 'material-symbols-outlined text-base' }, 'download')
                    ])

                    const deleteButton = data.status === 'Pendiente' ? deleteTableButton(() => {
                        provisionalPaymentStore.setSelectedVATDeclaration(data)
                        modalStore.open(provisionalPaymentStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar Registro'
                        })
                    }) : null

                    const buttons = [downloadButton, deleteButton].filter(Boolean)
                    
                    return h('div', { class: 'flex gap-1 justify-end' }, buttons)
                }
            }
        ]

        return columns
    }

    return { 
        getISRTableColumns,
        getVATTableColumns,
        getStatusColor,
        getStatusIcon,
        formatCurrency,
        formatDate
    }
}

export default useProvisionalPayment
