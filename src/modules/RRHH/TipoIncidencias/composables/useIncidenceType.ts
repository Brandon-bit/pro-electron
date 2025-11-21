import useIncidenceTypeStore from '@/modules/RRHH/TipoIncidencias/store/incidenceTypeStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

export const useIncidenceType = () => {
    const incidenceTypeStore = useIncidenceTypeStore()
    const modalStore = useModalStore()

    const getIncidenceTypeTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Tipo de Incidencia',
                accessorKey: 'name',
                cell: ({ row }: any) => {
                    const typeName = row.original.name
                    return h('div', { class: 'flex items-center gap-3 ps-10' }, [
                        h('div', {}, [h('div', { class: 'font-bold' }, typeName)])
                    ])
                }
            },
            {
                header: 'Categoría Padre',
                accessorKey: 'parentCategoryName',
                cell: ({ row }: any) => {
                    const categoryName = row.original.parentCategoryName
                    return h('span', { class: 'badge badge-outline' }, categoryName)
                }
            },
            {
                header: 'Configuración',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const { requiresDateRange, requiresHours, requiresJustification } = row.original
                    const badges = []

                    if (requiresDateRange) {
                        badges.push(h('span', { class: 'badge badge-sm badge-info' }, 'Rango'))
                    }
                    if (requiresHours) {
                        badges.push(h('span', { class: 'badge badge-sm badge-warning' }, 'Horas'))
                    }
                    if (requiresJustification) {
                        badges.push(
                            h('span', { class: 'badge badge-sm badge-secondary' }, 'Justificación')
                        )
                    }

                    return badges.length > 0
                        ? h('div', { class: 'flex gap-1 flex-wrap' }, badges)
                        : h('span', { class: 'text-gray-400' }, '-')
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
                        incidenceTypeStore.setData(data)
                        modalStore.open(incidenceTypeStore.modalId, {
                            type: 'UPDATE',
                            title: 'Editar tipo de incidencia'
                        })
                    }
                    const deleteModal = () => {
                        incidenceTypeStore.setData(data)
                        modalStore.open(incidenceTypeStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar tipo de incidencia'
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

    return { getIncidenceTypeTableColumns }
}
