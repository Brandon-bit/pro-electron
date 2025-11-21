import { h } from 'vue'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { useModalStore } from '@/shared/stores/modal.store'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'
import useBenefitCatalogStore from '@/modules/RRHH/GestionBeneficios/store/benefitCatalogStore'

export const useBenefitCatalog = () => {
    const modalStore = useModalStore()
    const benefitStore = useBenefitCatalogStore()

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Nombre',
                accessorKey: 'name'
            },
            {
                header: 'Descripción',
                accessorKey: 'description',
                cell: ({ row }: any) => {
                    const description = row.original.description
                    return h('span', { class: 'text-sm text-base-content/70' }, 
                        description.length > 60 ? description.substring(0, 60) + '...' : description
                    )
                }
            },
            {
                header: 'Score Requerido',
                accessorKey: 'requiredScore',
                cell: ({ row }: any) => {
                    const score = row.original.requiredScore
                    return h('div', { class: 'flex items-center gap-2' }, [
                        h('span', { class: 'material-symbols-outlined text-warning text-sm' }, 'grade'),
                        h('span', { class: 'font-semibold' }, score.toFixed(1))
                    ])
                }
            },
            {
                header: 'Stock Disponible',
                accessorKey: 'availableStock',
                cell: ({ row }: any) => {
                    const stock = row.original.availableStock
                    const badgeClass = stock > 10 ? 'badge-success' : stock > 5 ? 'badge-warning' : 'badge-error'
                    return h('span', { class: `badge ${badgeClass}` }, stock)
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
                    const editModal = () => {
                        benefitStore.setData(data)
                        modalStore.open(benefitStore.modalId, {
                            type: 'UPDATE',
                            title: 'Editar Beneficio'
                        })
                    }
                    const deleteModal = () => {
                        benefitStore.setData(data)
                        modalStore.open(benefitStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar Beneficio'
                        })
                    }
                    const editButton = editTableButton(editModal)
                    const delButton = deleteTableButton(deleteModal)
                    return h('div', { class: 'flex gap-4 justify-center' }, [editButton, delButton])
                }
            }
        ]

        return columns
    }

    return { getTableColumns }
}
