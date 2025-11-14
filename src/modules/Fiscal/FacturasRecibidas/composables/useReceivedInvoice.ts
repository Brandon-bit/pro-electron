import useReceivedInvoiceStore from '@/modules/Fiscal/FacturasRecibidas/store/receivedInvoiceStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

const useReceivedInvoice = () => {
    
    const receivedInvoiceStore = useReceivedInvoiceStore()
    const modalStore = useModalStore()

    const getStatusColor = (status: string): string => {
        switch (status) {
            case "Validada": return "badge-success"
            case "Pendiente": return "badge-warning"
            case "Rechazada": return "badge-error"
            case "Cancelada": return "badge-neutral"
            default: return "badge-ghost"
        }
    }

    const getStatusIcon = (status: string): string => {
        switch (status) {
            case "Validada": return "check_circle"
            case "Pendiente": return "pending"
            case "Rechazada": return "cancel"
            case "Cancelada": return "block"
            default: return "help"
        }
    }

    const formatCurrency = (amount: number, currency: string = 'MXN'): string => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: currency
        }).format(amount)
    }

    const formatDate = (date: Date): string => {
        return new Date(date).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Folio',
                accessorKey: 'folio',
                cell: ({ row }: any) => {
                    const folio = row.original.folio
                    const uuid = row.original.uuid
                    return h('div', {}, [
                        h('div', { class: 'font-bold' }, folio),
                        h('div', { class: 'text-xs text-base-content/60 font-mono' }, uuid?.substring(0, 20) || 'Sin UUID')
                    ])
                }
            },
            {
                header: 'Fecha',
                accessorKey: 'issueDate',
                cell: ({ row }: any) => {
                    return h('p', {}, formatDate(row.original.issueDate))
                }
            },
            {
                header: 'Proveedor',
                accessorKey: 'supplierName',
                cell: ({ row }: any) => {
                    return h('div', {}, [
                        h('div', { class: 'font-medium' }, row.original.supplierName),
                        h('div', { class: 'text-xs text-base-content/60 font-mono' }, row.original.supplierRfc)
                    ])
                }
            },
            {
                header: 'Subtotal',
                accessorKey: 'subtotal',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right' }, 
                        formatCurrency(row.original.subtotal, row.original.currency)
                    )
                }
            },
            {
                header: 'IVA',
                accessorKey: 'tax',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right' }, 
                        formatCurrency(row.original.tax, row.original.currency)
                    )
                }
            },
            {
                header: 'Total',
                accessorKey: 'total',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-right font-semibold' }, 
                        formatCurrency(row.original.total, row.original.currency)
                    )
                }
            },
            {
                header: 'Estatus',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const status = row.original.status
                    return h('span', { 
                        class: `badge badge-sm ${getStatusColor(status)}` 
                    }, status)
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    
                    const viewButton = h('button', {
                        class: 'btn btn-ghost btn-xs',
                        onClick: () => {
                            receivedInvoiceStore.setData(data)
                            modalStore.open(receivedInvoiceStore.detailModalId, {
                                type: 'VIEW',
                                title: 'Detalle de Factura Recibida'
                            })
                        }
                    }, [
                        h('span', { class: 'material-symbols-outlined text-base' }, 'visibility')
                    ])

                    const downloadButton = h('button', {
                        class: 'btn btn-ghost btn-xs',
                        onClick: () => {
                            receivedInvoiceStore.setData(data)
                            // Trigger download
                        }
                    }, [
                        h('span', { class: 'material-symbols-outlined text-base' }, 'download')
                    ])

                    const deleteButton = data.status === 'Pendiente' ? deleteTableButton(() => {
                        receivedInvoiceStore.setData(data)
                        modalStore.open(receivedInvoiceStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar Factura'
                        })
                    }) : null

                    const buttons = [viewButton, downloadButton, deleteButton].filter(Boolean)
                    
                    return h('div', { class: 'flex gap-1 justify-end' }, buttons)
                }
            }
        ]

        return columns
    }

    return { 
        getTableColumns,
        getStatusColor,
        getStatusIcon,
        formatCurrency,
        formatDate
    }
}

export default useReceivedInvoice
