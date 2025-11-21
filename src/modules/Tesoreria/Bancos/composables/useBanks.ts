import useBankStore from '@/modules/Tesoreria/Bancos/store/bankStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'

export const useBanks = (): ColumnTableType[] => {
    const bankStore = useBankStore()
    const modalStore = useModalStore()

    return [
        {
            header: 'Nombre',
            accessorKey: 'name'
        },
        {
            header: 'Código',
            accessorKey: 'code'
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
                    bankStore.setData(data)
                    modalStore.open(bankStore.modalId, {
                        type: 'UPDATE',
                        title: 'Editar banco'
                    })
                }
                const editButton = editTableButton(editModal)
                return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
            }
        }
    ]
}
