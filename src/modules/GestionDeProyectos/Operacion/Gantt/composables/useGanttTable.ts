import { h } from 'vue'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { STATUS_CONFIG } from '@/modules/GestionDeProyectos/Operacion/Gantt/types/ganttTypes'
import type { StatusType } from '@/modules/GestionDeProyectos/Operacion/Gantt/types/ganttTypes'
import { useGanttActions } from '@/modules/GestionDeProyectos/Operacion/Gantt/composables/useGanttActions'
import { showNotification } from '@/utils/toastNotifications'

const useGanttTable = () => {
    
    const { handleEditGantt, handleExportToExcel } = useGanttActions()

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'ID Proyecto',
                accessorKey: 'id',
                cell: ({ row }: any) => {
                    return h('span', { class: 'font-medium' }, row.original.id)
                }
            },
            {
                header: 'Folio',
                accessorKey: 'folio'
            },
            {
                header: 'Nombre del Proyecto',
                accessorKey: 'name'
            },
            {
                header: 'Fecha Inicio',
                accessorKey: 'startDate'
            },
            {
                header: 'Fecha Fin',
                accessorKey: 'endDate'
            },
            {
                header: 'Estatus',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const status = row.original.status as StatusType
                    const config = STATUS_CONFIG[status]
                    return h(
                        'span',
                        {
                            class: `badge badge-sm ${config.bgColor} ${config.color}`
                        },
                        config.label
                    )
                }
            },
            {
                header: 'Etapas',
                accessorKey: 'stages',
                cell: ({ row }: any) => {
                    return h('span', { class: 'text-center block' }, row.original.stages)
                }
            },
            {
                header: 'Actividades',
                accessorKey: 'activities',
                cell: ({ row }: any) => {
                    return h('span', { class: 'text-center block' }, row.original.activities)
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const project = row.original
                    
                    const editButton = h(
                        'button',
                        {
                            class: 'btn btn-sm btn-outline',
                            onClick: () => handleEditGantt(project.id)
                        },
                        [
                            h('span', { class: 'material-symbols-outlined text-sm' }, 'edit'),
                            'Editar Gantt'
                        ]
                    )
                    
                    const exportButton = h(
                        'button',
                        {
                            class: 'btn btn-sm btn-outline',
                            onClick: () => {
                                try {
                                    handleExportToExcel(project)
                                    showNotification('Gantt exportado exitosamente', 'success')
                                } catch (error) {
                                    showNotification('Error al exportar Gantt', 'error')
                                }
                            }
                        },
                        [
                            h('span', { class: 'material-symbols-outlined text-sm' }, 'download'),
                            'Exportar'
                        ]
                    )
                    
                    return h('div', { class: 'flex gap-2 justify-center' }, [
                        editButton,
                        exportButton
                    ])
                }
            }
        ]

        return columns
    }

    return { getTableColumns }
}

export default useGanttTable
