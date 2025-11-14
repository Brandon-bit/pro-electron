import { h } from 'vue'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'
import { useModalStore } from '@/shared/stores/modal.store'
import useAccountTypesStore from '@contabilidad/Configuracion/AccountTypes/store/accountTypesStore'

const useAccountTypes = () => {
    const getTableColumns = (): ColumnTableType[] => {
        const accountTypesStore = useAccountTypesStore()
        const modalStore = useModalStore()

        return [
            {
                header: 'Nombre',
                accessorKey: 'name',
                cell: ({ row }: any) => {
                    return h(
                        'span',
                        {
                            class: 'font-semibold'
                        },
                        row.original.name
                    )
                }
            },
            {
                header: 'Descripción',
                accessorKey: 'description',
                cell: ({ row }: any) => {
                    return h(
                        'span',
                        {
                            class: 'text-sm text-gray-700'
                        },
                        row.original.description || 'N/A'
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

                    const handleEdit = () => {
                        accountTypesStore.setAccountType(data)
                        modalStore.open(accountTypesStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar Tipo de Cuenta'
                        })
                    }

                    const handleDelete = () => {
                        accountTypesStore.setAccountType(data)
                        modalStore.open(accountTypesStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar Tipo de Cuenta'
                        })
                    }

                    const editButton = editTableButton(handleEdit)
                    const deleteButton = deleteTableButton(handleDelete)

                    return h('div', { class: 'flex gap-2 justify-center' }, [
                        editButton,
                        deleteButton
                    ])
                }
            }
        ]
    }

    return {
        getTableColumns
    }
}

export default useAccountTypes
