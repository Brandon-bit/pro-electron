import useClientStore from '@/modules/Tesoreria/Clientes/store/clientStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'

export const useClients = () => {
    const clientStore = useClientStore()
    const modalStore = useModalStore()

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount)
    }

    const columns: ColumnTableType[] = [
        {
            header: 'Nombre',
            accessorKey: 'name'
        },
        {
            header: 'RFC',
            accessorKey: 'rfc'
        },
        {
            header: 'Email',
            accessorKey: 'email'
        },
        {
            header: 'Teléfono',
            accessorKey: 'phone'
        },
        {
            header: 'Ciudad',
            accessorKey: 'city'
        },
        {
            header: 'Límite de Crédito',
            accessorKey: 'creditLimit',
            cell: ({ row }: any) => {
                const value = row.original.creditLimit
                return h(
                    'span',
                    { class: 'font-semibold text-primary' },
                    formatCurrency(value)
                )
            }
        },
        {
            header: 'Días de Crédito',
            accessorKey: 'creditDays',
            cell: ({ row }: any) => {
                const value = row.original.creditDays
                return h(
                    'span',
                    { class: 'badge badge-info badge-sm' },
                    `${value} días`
                )
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
                    clientStore.setData(data)
                    modalStore.open(clientStore.modalId, {
                        type: 'UPDATE',
                        title: 'Editar cliente'
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
