import { ColumnTableType } from '@/shared/types/columnTableType'
import { h, withDirectives } from 'vue'
import useProcessDiagramStore from '../store/processDiagramStore'
import { useModalStore } from '@/shared/stores/modal.store'

const useProcessDiagram = () => {
    const processDiagramStore = useProcessDiagramStore()
    const modalStore = useModalStore()

    const getProcessDiagramsTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Código',
                accessorKey: 'code',
                cell: ({ row }: any) => {
                    return h('span', { class: 'font-mono font-semibold' }, row.original.code)
                }
            },
            {
                header: 'Nombre',
                accessorKey: 'name',
                cell: ({ row }: any) => {
                    return h('div', {}, [
                        h('div', { class: 'font-bold' }, row.original.name),
                        row.original.description &&
                            h(
                                'div',
                                { class: 'text-sm text-base-content/60 truncate max-w-xs' },
                                row.original.description
                            )
                    ])
                }
            },
            {
                header: 'Versión',
                accessorKey: 'version',
                cell: ({ row }: any) => {
                    return h('span', { class: 'badge badge-outline badge-sm' }, `v${row.original.version}`)
                }
            },
            {
                header: 'Última Modificación',
                accessorKey: 'lastModified',
                cell: ({ row }: any) => {
                    const lastModified = new Date(row.original.lastModified)
                    return h('p', {}, lastModified.toISOString().split('T')[0])
                }
            },
            {
                header: 'Estado',
                accessorKey: 'active',
                cell: ({ row }: any) => {
                    const isActive = row.original.active
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

                    return h('div', { class: 'flex gap-4 justify-center' }, [
                        withDirectives(
                            h(
                                'div',
                                {
                                    class: 'tooltip',
                                    'data-tip': 'Editar'
                                },
                                [
                                    h(
                                        'button',
                                        {
                                            class: 'btn btn-outline btn-primary action-btn-table',
                                            onClick: () => {
                                                processDiagramStore.setData(data)
                                                modalStore.open(processDiagramStore.modalId, {
                                                    type: 'EDIT',
                                                    title: 'Editar Diagrama de Proceso'
                                                })
                                            }
                                        },
                                        [
                                            h(
                                                'span',
                                                { class: 'material-symbols-outlined' },
                                                'edit_square'
                                            )
                                        ]
                                    )
                                ]
                            ),
                            []
                        ),
                        withDirectives(
                            h(
                                'div',
                                {
                                    class: 'tooltip',
                                    'data-tip': 'Eliminar'
                                },
                                [
                                    h(
                                        'button',
                                        {
                                            class: 'btn btn-outline btn-error action-btn-table',
                                            onClick: () => {
                                                processDiagramStore.setData(data)
                                                modalStore.open(processDiagramStore.modalId, {
                                                    type: 'DELETE',
                                                    title: 'Eliminar Diagrama de Proceso'
                                                })
                                            }
                                        },
                                        [
                                            h(
                                                'span',
                                                { class: 'material-symbols-outlined' },
                                                'delete'
                                            )
                                        ]
                                    )
                                ]
                            ),
                            []
                        )
                    ])
                }
            }
        ]

        return columns
    }

    return { getProcessDiagramsTableColumns }
}

export default useProcessDiagram
