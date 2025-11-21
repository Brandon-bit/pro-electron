import useAccountTypeStore from '@/modules/Tesoreria/TiposCuenta/store/accountTypeStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'

export const useAccountTypes = (): ColumnTableType[] => {
    const accountTypeStore = useAccountTypeStore()
    const modalStore = useModalStore()

    return [
        {
            header: 'Nombre',
            accessorKey: 'name'
        },
        {
            header: 'Descripción',
            accessorKey: 'description'
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
                    accountTypeStore.setData(data)
                    modalStore.open(accountTypeStore.modalId, {
                        type: 'UPDATE',
                        title: 'Editar tipo de cuenta'
                    })
                }
                const editButton = editTableButton(editModal)
                return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
            }
        }
    ]
}
