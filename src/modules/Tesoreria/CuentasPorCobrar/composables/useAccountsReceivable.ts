import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'
import router from '@/router'

export const useAccountsReceivable = () => {

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

    const getStatusBadge = (status: string) => {
        const statusMap = {
            PENDIENTE: { class: 'badge-warning', text: 'Pendiente' },
            PARCIAL: { class: 'badge-info', text: 'Parcial' },
            PAGADO: { class: 'badge-success', text: 'Pagado' },
            VENCIDO: { class: 'badge-error', text: 'Vencido' }
        }
        return statusMap[status as keyof typeof statusMap] || statusMap.PENDIENTE
    }

    const columns: ColumnTableType[] = [
        {
            header: 'Documento',
            accessorKey: 'documentNumber'
        },
        {
            header: 'Cliente',
            accessorKey: 'clientName'
        },
        {
            header: 'Tipo',
            accessorKey: 'documentType',
            cell: ({ row }: any) => {
                const type = row.original.documentType
                const typeMap: any = {
                    FACTURA: 'Factura',
                    NOTA_VENTA: 'Nota de Venta',
                    RECIBO: 'Recibo',
                    OTRO: 'Otro'
                }
                return h('span', { class: 'badge badge-ghost badge-sm' }, typeMap[type] || type)
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
            header: 'Monto',
            accessorKey: 'amount',
            cell: ({ row }: any) => {
                return h(
                    'span',
                    { class: 'font-semibold text-primary' },
                    formatCurrency(row.original.amount)
                )
            }
        },
        {
            header: 'Saldo Pendiente',
            accessorKey: 'pendingBalance',
            cell: ({ row }: any) => {
                const balance = row.original.pendingBalance
                return h(
                    'span',
                    { class: balance > 0 ? 'font-semibold text-error' : 'font-semibold text-success' },
                    formatCurrency(balance)
                )
            }
        },
        {
            header: 'Estado',
            accessorKey: 'status',
            cell: ({ row }: any) => {
                const status = getStatusBadge(row.original.status)
                return h(
                    'span',
                    { class: `badge ${status.class}` },
                    status.text
                )
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original

                const changeEditView = () => {
                    router.push(`/tesoreria/actualizar-cuenta-por-cobrar/${data.id}`)
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
