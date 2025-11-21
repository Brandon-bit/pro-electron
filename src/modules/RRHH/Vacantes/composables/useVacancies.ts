import { h } from 'vue'
import router from '@/router'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { useModalStore } from '@/shared/stores/modal.store'
import { editTableButton, deleteTableButton, detailTableButton } from '@/utils/tableButtons'

export const useVacancies = () => {
    const modalStore = useModalStore()
    const MODAL_ID = 'vacancy-modal'

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Título',
                accessorKey: 'title'
            },
            {
                header: 'Salario Ofrecido',
                accessorKey: 'offeredSalary',
                cell: ({ row }: any) => {
                    const salary = row.original.offeredSalary
                    return h('span', {}, `$${salary.toLocaleString('es-MX')}`)
                }
            },
            {
                header: 'Estado',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const status = row.original.status
                    let badgeClass = 'badge badge-sm '

                    switch (status) {
                        case 'abierta':
                            badgeClass += 'badge-success'
                            break
                        case 'en_proceso':
                            badgeClass += 'badge-warning'
                            break
                        case 'cerrada':
                            badgeClass += 'badge-error'
                            break
                        default:
                            badgeClass += 'badge-ghost'
                    }

                    const statusLabel =
                        status === 'abierta'
                            ? 'Abierta'
                            : status === 'en_proceso'
                              ? 'En Proceso'
                              : 'Cerrada'
                    return h('span', { class: badgeClass }, statusLabel)
                }
            },
            {
                header: 'Candidatos',
                accessorKey: 'candidatesCount',
                cell: ({ row }: any) => {
                    const count = row.original.candidatesCount
                    return h('span', { class: 'badge badge-primary badge-outline' }, count.toString())
                }
            },
            {
                header: 'Fecha',
                accessorKey: 'publicationDate',
                cell: ({ row }: any) => {
                    const startDate = new Date(row.original.publicationDate)
                    const endDate = new Date(row.original.closingDate)
                    
                    const formatDate = (date: Date) => {
                        return date.toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })
                    }
                    
                    return h('span', {}, `${formatDate(startDate)} - ${formatDate(endDate)}`)
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original

                    const detailAction = () => {
                        modalStore.open(MODAL_ID, {
                            type: 'DETAIL',
                            title: 'Candidatos postulados',
                            data: data
                        })
                    }

                    const editAction = () => {
                        router.push(`/rrhh/vacantes/editar/${data.id}`)
                    }

                    const deleteAction = () => {
                        modalStore.open(MODAL_ID, {
                            type: 'DELETE',
                            title: 'Eliminar vacante',
                            data: data
                        })
                    }

                    const editButton = editTableButton(editAction)
                    const deleteButton = deleteTableButton(deleteAction)
                    const detailButton = detailTableButton(detailAction)
                    
                    return h('div', { class: 'flex gap-4 justify-center' }, [
                        detailButton,
                        editButton,
                        deleteButton
                    ])
                }
            }
        ]

        return columns
    }

    return { getTableColumns, MODAL_ID }
}
