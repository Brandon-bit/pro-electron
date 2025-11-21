import { h } from 'vue'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { useModalStore } from '@/shared/stores/modal.store'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'
import useIncidencesStore from '@/modules/RRHH/Incidencias/store/incidencesStore'
import { formatDate } from '@/modules/RRHH/Incidencias/composables/mappingIncidences'
import { getStatusBadgeClass } from '@/modules/RRHH/Incidencias/utils/incidenceHelpers'

export const useIncidences = () => {
    const incidencesStore = useIncidencesStore()
    const modalStore = useModalStore()
    const MODAL_ID = incidencesStore.modalId

    const getTableColumns = (): ColumnTableType[] => {
        return [
            {
                header: 'ID',
                accessorKey: 'id',
                cell: ({ row }: any) => {
                    return h('span', { class: 'font-medium' }, `#${row.original.id}`)
                }
            },
            {
                header: 'Empleado',
                accessorKey: 'employeeName'
            },
            {
                header: 'Categoría',
                accessorKey: 'categoryLabel'
            },
            {
                header: 'Tipo',
                accessorKey: 'typeLabel',
                cell: ({ row }: any) => {
                    return h('span', { class: 'text-sm' }, row.original.typeLabel)
                }
            },
            {
                header: 'Fecha',
                accessorKey: 'startDate',
                cell: ({ row }: any) => {
                    const { startDate, endDate } = row.original
                    if (endDate) {
                        return h('div', { class: 'text-sm' }, [
                            h('div', {}, formatDate(startDate)),
                            h(
                                'div',
                                { class: 'text-xs text-gray-500' },
                                `al ${formatDate(endDate)}`
                            )
                        ])
                    }
                    return formatDate(startDate)
                }
            },
            {
                header: 'Horas',
                accessorKey: 'hours',
                cell: ({ row }: any) => {
                    const hours = row.original.hours
                    return hours
                        ? h('span', {}, `${hours}h`)
                        : h('span', { class: 'text-gray-400' }, '-')
                }
            },
            {
                header: 'Estado',
                accessorKey: 'statusLabel',
                cell: ({ row }: any) => {
                    const { status, statusLabel } = row.original
                    const badgeClass = getStatusBadgeClass(status)
                    return h('span', { class: `badge ${badgeClass}` }, statusLabel)
                }
            },
            {
                header: 'Creado por',
                accessorKey: 'createdBy',
                cell: ({ row }: any) => {
                    return h('div', { class: 'text-sm' }, [
                        h('div', {}, row.original.createdBy),
                        h(
                            'div',
                            { class: 'text-xs text-gray-500' },
                            formatDate(row.original.createdAt)
                        )
                    ])
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editModal = () => {
                        incidencesStore.setData(data)
                        modalStore.open(MODAL_ID, {
                            type: 'UPDATE',
                            title: 'Editar incidencia'
                        })
                    }
                    const deleteModal = () => {
                        incidencesStore.setData(data)
                        modalStore.open(MODAL_ID, {
                            type: 'DELETE',
                            title: 'Eliminar incidencia'
                        })
                    }
                    const editButton = editTableButton(editModal)
                    const deleteBtn = deleteTableButton(deleteModal)
                    return h('div', { class: 'flex gap-4 justify-center' }, [editButton, deleteBtn])
                }
            }
        ]
    }

    return { getTableColumns, MODAL_ID }
}
