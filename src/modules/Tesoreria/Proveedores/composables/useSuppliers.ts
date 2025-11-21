import useSupplierStore from '@/modules/Tesoreria/Proveedores/store/supplierStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'

export const useSuppliers = () => {
    const supplierStore = useSupplierStore()
    const modalStore = useModalStore()

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
                    supplierStore.setData(data)
                    modalStore.open(supplierStore.modalId, {
                        type: 'UPDATE',
                        title: 'Editar proveedor'
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
