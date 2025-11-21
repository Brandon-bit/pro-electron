import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'
import router from '@/router'

export const useAccountsPayable = () => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    const columns: ColumnTableType[] = [
        {
            header: 'Proveedor',
            accessorKey: 'supplierName'
        },
        {
            header: 'No. Documento',
            accessorKey: 'documentNumber'
        },
        {
            header: 'Tipo',
            accessorKey: 'documentType',
            cell: ({ row }: any) => {
                const types: Record<string, string> = {
                    FACTURA: 'Factura',
                    NOTA_VENTA: 'Nota de Venta',
                    RECIBO: 'Recibo',
                    OTRO: 'Otro'
                }
                return h(
                    'span',
                    { class: 'badge badge-neutral-content badge-sm' },
                    types[row.original.documentType] || row.original.documentType
                )
            }
        },
        {
            header: 'Fecha Emisión',
            accessorKey: 'issueDate',
            cell: ({ row }: any) => formatDate(row.original.issueDate)
        },
        {
            header: 'Fecha Vencimiento',
            accessorKey: 'dueDate',
            cell: ({ row }: any) => formatDate(row.original.dueDate)
        },
        {
            header: 'Monto Total',
            accessorKey: 'amount',
            cell: ({ row }: any) => {
                return h('span', { class: 'font-semibold' }, formatCurrency(row.original.amount))
            }
        },
        {
            header: 'Saldo Pendiente',
            accessorKey: 'pendingBalance',
            cell: ({ row }: any) => {
                const balance = row.original.pendingBalance
                const colorClass = balance > 0 ? 'text-error' : 'text-success'
                return h('span', { class: `font-semibold ${colorClass}` }, formatCurrency(balance))
            }
        },
        {
            header: 'Estado',
            accessorKey: 'status',
            cell: ({ row }: any) => {
                const statusMap: Record<string, { text: string; class: string }> = {
                    PENDIENTE: { text: 'Pendiente', class: 'badge-warning' },
                    PARCIAL: { text: 'Parcial', class: 'badge-info' },
                    PAGADO: { text: 'Pagado', class: 'badge-success' },
                    VENCIDO: { text: 'Vencido', class: 'badge-error' }
                }
                const status = statusMap[row.original.status] || {
                    text: row.original.status,
                    class: 'badge-neutral'
                }
                return h('span', { class: `badge ${status.class}` }, status.text)
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original

                const changeEditView = () => {
                    router.push(`/tesoreria/actualizar-cuenta-por-pagar/${data.id}`)
                }
                const editButton = editTableButton(changeEditView)

                return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
            }
        }
    ]

    return {
        columns
    }
}
