import useCompetencyStore from '@/modules/RRHH/Competencias/store/competencyStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

export const useCompetencies = (): ColumnTableType[] => {
    const competencyStore = useCompetencyStore()
    const modalStore = useModalStore()

    const categoryLabels = {
        technical: 'Técnica',
        behavioral: 'Conductual',
        leadership: 'Liderazgo'
    }

    const categoryBadges = {
        technical: 'badge-primary',
        behavioral: 'badge-secondary',
        leadership: 'badge-accent'
    }

    return [
        {
            header: 'Nombre',
            accessorKey: 'name',
            cell: ({ row }: any) => {
                const name = row.original.name
                const description = row.original.description
                return h('div', { class: 'flex flex-col' }, [
                    h('span', { class: 'font-medium' }, name),
                    description
                        ? h('span', { class: 'text-xs text-gray-500' }, description)
                        : null
                ])
            }
        },
        {
            header: 'Categoría',
            accessorKey: 'category',
            cell: ({ row }: any) => {
                const category = row.original.category
                return h(
                    'span',
                    {
                        class: `badge ${categoryBadges[category as keyof typeof categoryBadges]}`
                    },
                    categoryLabels[category as keyof typeof categoryLabels]
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
                    isActive ? 'Activa' : 'Inactiva'
                )
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                const editModal = () => {
                    competencyStore.setData(data)
                    modalStore.open(competencyStore.modalId, {
                        type: 'UPDATE',
                        title: 'Editar competencia'
                    })
                }
                const deleteModal = () => {
                    competencyStore.setData(data)
                    modalStore.open(competencyStore.modalId, {
                        type: 'DELETE',
                        title: 'Eliminar competencia'
                    })
                }
                const editButton = editTableButton(editModal)
                const delButton = deleteTableButton(deleteModal)
                return h('div', { class: 'flex gap-4 justify-center' }, [editButton, delButton])
            }
        }
    ]
}
