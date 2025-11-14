import useProspectStore from '@/modules/Inversiones/Inversion/Prospectos/store/prospectStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton, detailTableButton } from '@/utils/tableButtons'

const useProspect = () => {
    
    const prospectStore = useProspectStore()
    const modalStore = useModalStore()

    const getStatusColor = (status: string): string => {
        switch (status) {
            case "Nuevo": return "badge-info"
            case "Contactado": return "badge-primary"
            case "Calificado": return "badge-accent"
            case "Propuesta": return "badge-warning"
            case "Negociación": return "badge-warning"
            case "Ganado": return "badge-success"
            case "Perdido": return "badge-error"
            default: return "badge-ghost"
        }
    }


    const formatDate = (date: Date): string => {
        return new Date(date).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Nombre Completo',
                accessorKey: 'fullName',
                cell: ({ row }: any) => {
                    const fullName = `${row.original.firstName} ${row.original.lastName}`
                    return h('div', { class: 'flex flex-col' }, [
                        h('p', { class: 'font-medium' }, fullName),
                        row.original.company && h('p', { class: 'text-xs text-base-content/60' }, row.original.company)
                    ])
                }
            },
            {
                header: 'Correo',
                accessorKey: 'email',
                cell: ({ row }: any) => {
                    return h('p', { class: 'text-sm' }, row.original.email)
                }
            },
            {
                header: 'Teléfono',
                accessorKey: 'phone',
                cell: ({ row }: any) => {
                    return h('div', { class: 'flex flex-col text-sm' }, [
                        row.original.phone && h('p', {}, row.original.phone),
                        row.original.cellphone && h('p', { class: 'text-base-content/60' }, row.original.cellphone)
                    ])
                }
            },
            {
                header: 'Sector',
                accessorKey: 'sector',
                cell: ({ row }: any) => {
                    return row.original.sector 
                        ? h('span', { class: 'badge badge-outline badge-sm' }, row.original.sector)
                        : h('p', { class: 'text-base-content/40' }, '-')
                }
            },
            {
                header: 'Estatus',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const status = row.original.status
                    return h('span', { 
                        class: `badge badge-sm ${getStatusColor(status)}` 
                    }, status)
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    
                    const viewButton = detailTableButton(() => {
                        prospectStore.setSelectedProspect(data)
                        modalStore.open(prospectStore.detailModalId, {
                            type: 'VIEW',
                            title: 'Detalle del Prospecto'
                        })
                    })

                    const editButton = editTableButton(() => {
                        prospectStore.setSelectedProspect(data)
                        modalStore.open(prospectStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar Prospecto'
                        })
                    })

                    const deleteButton = deleteTableButton(() => {
                        prospectStore.setSelectedProspect(data)
                        modalStore.open(prospectStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar Prospecto'
                        })
                    })

                    return h('div', { class: 'flex gap-1 justify-end' }, [
                        viewButton,
                        editButton,
                        deleteButton
                    ])
                }
            }
        ]

        return columns
    }

    return { 
        getTableColumns,
        getStatusColor,
        formatDate
    }
}

export default useProspect
