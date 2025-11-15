import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ProjectEvidenceType } from '@/modules/GestionDeProyectos/Operacion/MatrizDeEvidencias/types/evidenceTypes'
import EvidenceCounter from '@/modules/GestionDeProyectos/MatrizDeEvidencias/components/EvidenceCounter.vue'
import StatusBadge from '@/modules/GestionDeProyectos/MatrizDeEvidencias/components/StatusBadge.vue'
import useEvidenceStore from '@/modules/GestionDeProyectos/Operacion/MatrizDeEvidencias/store/evidenceStore'
import { useRouter } from 'vue-router'

export const useEvidenceTable = () => {
    
    const evidenceStore = useEvidenceStore()
    const router = useRouter()

    const handleEvidenceClick = (project: ProjectEvidenceType) => {
        evidenceStore.setSelectedProject(project)
    }

    const handleGanttClick = (projectId: string) => {
        router.push(`/gestion-de-proyectos/gantt/${projectId}`)
    }

    const getTableColumns = (): ColumnDef<ProjectEvidenceType>[] => {
        return [
            {
                header: 'Proyecto',
                accessorKey: 'name',
                cell: ({ row }) => {
                    return h('div', {}, [
                        h('p', { class: 'font-semibold' }, row.original.name),
                        h('p', { class: 'text-xs opacity-70' }, row.original.folio)
                    ])
                }
            },
            {
                header: 'Etapa',
                accessorKey: 'stage',
                cell: ({ row }) => {
                    return h('span', {
                        class: 'badge badge-primary badge-outline'
                    }, row.original.stage)
                }
            },
            {
                header: 'Fecha Inicio',
                accessorKey: 'startDate',
                cell: ({ row }) => {
                    return h('span', { class: 'text-sm' }, row.original.startDate)
                }
            },
            {
                header: 'Fecha Fin',
                accessorKey: 'endDate',
                cell: ({ row }) => {
                    return h('span', { class: 'text-sm' }, row.original.endDate)
                }
            },
            {
                header: 'Evidencias',
                accessorKey: 'evidenceCount',
                cell: ({ row }) => {
                    return h(EvidenceCounter, {
                        count: row.original.evidenceCount,
                        onClick: () => handleEvidenceClick(row.original)
                    })
                }
            },
            {
                header: 'Estatus',
                accessorKey: 'status',
                cell: ({ row }) => {
                    return h(StatusBadge, {
                        status: row.original.status
                    })
                }
            },
            {
                header: 'Gantt',
                accessorKey: 'id',
                cell: ({ row }) => {
                    return h('button', {
                        class: 'btn btn-ghost btn-sm',
                        onClick: () => handleGanttClick(row.original.id)
                    }, [
                        h('span', { class: 'material-symbols-outlined' }, 'account_tree')
                    ])
                }
            }
        ]
    }

    return {
        getTableColumns
    }
}
