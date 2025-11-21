import useIncidenceCategoryStore from '@/modules/RRHH/CategoriaIncidencias/store/incidenceCategoryStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

const useIncidenceCategory = () => {
    const incidenceCategoryStore = useIncidenceCategoryStore()
    const modalStore = useModalStore()

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Categoría',
                accessorKey: 'name',
                cell: ({ row }: any) => {
                    const categoryName = row.original.name
                    return h('div', { class: 'flex items-center gap-3 ps-10' }, [
                        h('div', {}, [h('div', { class: 'font-bold' }, categoryName)])
                    ])
                }
            },
            {
                header: 'Descripción',
                accessorKey: 'description',
                cell: ({ row }: any) => {
                    const description = row.original.description
                    return description
                        ? h('p', { class: 'text-sm truncate max-w-xs' }, description)
                        : h('span', { class: 'text-gray-400' }, '-')
                }
            },
            {
                header: 'Fecha de Creación',
                accessorKey: 'creationDate',
                cell: ({ row }: any) => {
                    const creationDate = new Date(row.original.creationDate)
                    return h('p', {}, creationDate.toISOString().split('T')[0])
                }
            },
            {
                header: 'Estado',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const isActive = row.original.status
                    return isActive
                        ? h('span', { class: 'badge badge-sm badge-success' }, 'Activo')
                        : h('span', { class: 'badge badge-sm badge-error' }, 'Inactivo')
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editModal = () => {
                        incidenceCategoryStore.setData(data)
                        modalStore.open(incidenceCategoryStore.modalId, {
                            type: 'UPDATE',
                            title: 'Editar categoría de incidencia'
                        })
                    }
                    const deleteModal = () => {
                        incidenceCategoryStore.setData(data)
                        modalStore.open(incidenceCategoryStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar categoría de incidencia'
                        })
                    }
                    const editButton = editTableButton(editModal)
                    const deleteButton = deleteTableButton(deleteModal)
                    return h('div', { class: 'flex gap-4 justify-center' }, [
                        editButton,
                        deleteButton
                    ])
                }
            }
        ]

        return columns
    }

    return { getTableColumns }
}

export default useIncidenceCategory
