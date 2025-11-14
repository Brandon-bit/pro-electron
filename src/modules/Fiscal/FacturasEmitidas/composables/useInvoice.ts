import useInvoiceStore from '@/modules/Fiscal/FacturasEmitidas/store/invoiceStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

const useInvoice = () => {
    
    const invoiceStore = useInvoiceStore()
    const modalStore = useModalStore()

    const getStatusColor = (status: string): string => {
        switch (status) {
            case "Timbrada": return "badge-success"
            case "Pagada": return "badge-info"
            case "Cancelada": return "badge-error"
            case "Vencida": return "badge-warning"
            case "Borrador": return "badge-neutral"
            default: return "badge-ghost"
        }
    }

    const getStatusIcon = (status: string): string => {
        switch (status) {
            case "Timbrada": return "check_circle"
            case "Pagada": return "paid"
            case "Cancelada": return "cancel"
            case "Vencida": return "schedule"
            case "Borrador": return "draft"
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
                header: 'Cliente',
                accessorKey: 'clientName',
                cell: ({ row }: any) => {
                    return h('div', {}, [
                        h('div', { class: 'font-medium' }, row.original.clientName),
                        h('div', { class: 'text-xs text-base-content/60 font-mono' }, row.original.clientRfc)
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
                            invoiceStore.setData(data)
                            modalStore.open(invoiceStore.detailModalId, {
                                type: 'VIEW',
                                title: 'Detalle de Factura'
                            })
                        }
                    }, [
                        h('span', { class: 'material-symbols-outlined text-base' }, 'visibility')
                    ])

                    const downloadButton = h('button', {
                        class: 'btn btn-ghost btn-xs',
                        onClick: () => {
                            invoiceStore.setData(data)
                            // Trigger download
                        }
                    }, [
                        h('span', { class: 'material-symbols-outlined text-base' }, 'download')
                    ])

                    const editButton = data.status === 'Borrador' ? editTableButton(() => {
                        invoiceStore.setData(data)
                        modalStore.open(invoiceStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar Factura'
                        })
                    }) : null

                    const deleteButton = data.status === 'Borrador' ? deleteTableButton(() => {
                        invoiceStore.setData(data)
                        modalStore.open(invoiceStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar Factura'
                        })
                    }) : null

                    const buttons = [viewButton, downloadButton, editButton, deleteButton].filter(Boolean)
                    
                    return h('div', { class: 'flex gap-1 justify-end' }, buttons)
                }
            }
        ]

        return columns
    }

    const paymentMethods = [
        { id: 'PUE', label: 'Pago en una sola exhibición' },
        { id: 'PPD', label: 'Pago en parcialidades o diferido' }
    ]

    const paymentForms = [
        { id: '01', label: '01 - Efectivo' },
        { id: '02', label: '02 - Cheque nominativo' },
        { id: '03', label: '03 - Transferencia electrónica' },
        { id: '04', label: '04 - Tarjeta de crédito' },
        { id: '28', label: '28 - Tarjeta de débito' },
        { id: '99', label: '99 - Por definir' }
    ]

    const cfdiUses = [
        { id: 'G01', label: 'G01 - Adquisición de mercancías' },
        { id: 'G02', label: 'G02 - Devoluciones, descuentos o bonificaciones' },
        { id: 'G03', label: 'G03 - Gastos en general' },
        { id: 'I01', label: 'I01 - Construcciones' },
        { id: 'I02', label: 'I02 - Mobiliario y equipo de oficina' },
        { id: 'I03', label: 'I03 - Equipo de transporte' },
        { id: 'I04', label: 'I04 - Equipo de cómputo' },
        { id: 'P01', label: 'P01 - Por definir' }
    ]

    const currencies = [
        { id: 'MXN', label: 'MXN - Peso Mexicano' },
        { id: 'USD', label: 'USD - Dólar Americano' },
        { id: 'EUR', label: 'EUR - Euro' }
    ]

    return { 
        getTableColumns,
        getStatusColor,
        getStatusIcon,
        formatCurrency,
        formatDate,
        paymentMethods,
        paymentForms,
        cfdiUses,
        currencies
    }
}

export default useInvoice
