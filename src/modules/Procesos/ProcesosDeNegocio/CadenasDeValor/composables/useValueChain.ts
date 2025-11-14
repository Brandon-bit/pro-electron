import { ColumnTableType } from '@/shared/types/columnTableType'
import { h, withDirectives } from 'vue'
import router from '@/router'

const useValueChain = () => {

    const getValueChainsTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Título',
                accessorKey: 'title',
                cell: ({ row }: any) => {
                    return h('span', {}, row.original.title)
                }
            },
            {
                header: 'Tipo',
                accessorKey: 'isPrimary',
                cell: ({ row }: any) => {
                    const isPrimary = row.original.isPrimary
                    return isPrimary
                        ? h('span', { class: 'badge badge-sm badge-primary' }, 'Principal')
                        : h('span', {}, '-')
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original

                    return h(
                        'div',
                        { class: 'flex gap-4 justify-center' },
                        [
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
                                                    router.push(`/procesos/procesos-de-negocio/cadenas-de-valor/${data.id}`)
                                                }
                                            },
                                            [h('span', { class: 'material-symbols-outlined' }, 'edit_square')]
                                        )
                                    ]
                                ),
                                []
                            )
                        ]
                    )
                }
            }
        ]

        return columns
    }

    return { getValueChainsTableColumns }
}

export default useValueChain
