import useInitiativeStore from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/store/initiativeStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

const useInitiative = () => {
    
    const initiativeStore = useInitiativeStore()
    const modalStore = useModalStore()

    const getTableColumns = (onToggleSelection: (dni: number) => void): ColumnTableType[] => {
        const columns = [
            {
                header: 'Seleccionar',
                accessorKey: 'inPrioritization',
                cell: ({ row }: any) => {
                    const initiative = row.original
                    const checkbox = h('input', {
                        type: 'checkbox',
                        class: 'checkbox checkbox-primary',
                        checked: initiative.inPrioritization,
                        onChange: () => onToggleSelection(initiative.dni)
                    })
                    return h('div', { class: 'flex justify-center' }, [checkbox])
                }
            },
            {
                header: 'DNI',
                accessorKey: 'dni'
            },
            {
                header: 'Clasificación',
                accessorKey: 'classification',
                cell: ({ row }: any) => {
                    return h('span', { class: 'badge badge-primary badge-sm' }, row.original.classification)
                }
            },
            {
                header: 'Iniciativa',
                accessorKey: 'name',
                cell: ({ row }: any) => {
                    return h('p', { class: 'font-medium' }, row.original.name)
                }
            },
            {
                header: 'Inversión',
                accessorKey: 'investment',
                cell: ({ row }: any) => {
                    return h('span', { class: 'badge badge-ghost badge-sm' }, row.original.investment)
                }
            },
            {
                header: 'Alcance',
                accessorKey: 'scope',
                cell: ({ row }: any) => {
                    return h('span', { class: 'badge badge-ghost badge-sm' }, row.original.scope)
                }
            },
            {
                header: 'Horizonte',
                accessorKey: 'timeHorizon',
                cell: ({ row }: any) => {
                    return h('span', { class: 'badge badge-ghost badge-sm' }, row.original.timeHorizon)
                }
            },
            {
                header: 'Ahorro',
                accessorKey: 'savings',
                cell: ({ row }: any) => {
                    return h('span', { class: 'badge badge-ghost badge-sm' }, row.original.savings)
                }
            },
            {
                header: 'Beneficios',
                accessorKey: 'benefits',
                cell: ({ row }: any) => {
                    return h('span', { class: 'badge badge-ghost badge-sm' }, row.original.benefits)
                }
            },
            {
                header: 'Satisfacción',
                accessorKey: 'satisfaction',
                cell: ({ row }: any) => {
                    return h('span', { class: 'badge badge-ghost badge-sm' }, row.original.satisfaction)
                }
            },
            {
                header: 'Alineación',
                accessorKey: 'strategicAlignment',
                cell: ({ row }: any) => {
                    const alignment = row.original.strategicAlignment || 0
                    return h('span', { class: 'badge badge-accent badge-sm font-medium' }, `${alignment.toFixed(0)}%`)
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
                        initiativeStore.setData(data)
                        modalStore.open(initiativeStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar Iniciativa'
                        })
                    }
                    const deleteModal = () => {
                        initiativeStore.setData(data)
                        modalStore.open(initiativeStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar Iniciativa'
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

export default useInitiative
