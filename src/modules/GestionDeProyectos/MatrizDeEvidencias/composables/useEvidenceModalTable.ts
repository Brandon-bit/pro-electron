import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { EvidenceType } from '@/modules/GestionDeProyectos/MatrizDeEvidencias/types/evidenceTypes'

export const useEvidenceModalTable = () => {
    
    const downloadEvidence = (fileUrl: string, fileName: string) => {
        const link = document.createElement('a')
        link.href = fileUrl
        link.download = fileName
        link.click()
    }

    const getEvidenceColumns = (): ColumnDef<EvidenceType>[] => {
        return [
            {
                header: 'Etapa',
                accessorKey: 'stageName',
                cell: ({ row }) => row.original.stageName
            },
            {
                header: 'Actividad',
                accessorKey: 'activityName',
                cell: ({ row }) => row.original.activityName
            },
            {
                header: 'Archivo',
                accessorKey: 'fileName',
                cell: ({ row }) => {
                    return h('div', { class: 'flex items-center gap-2' }, [
                        h('span', { class: 'material-symbols-outlined text-sm' }, 'description'),
                        h('span', { class: 'text-sm' }, row.original.fileName)
                    ])
                }
            },
            {
                header: 'Responsable',
                accessorKey: 'responsible',
                cell: ({ row }) => row.original.responsible
            },
            {
                header: 'Fecha',
                accessorKey: 'uploadDate',
                cell: ({ row }) => {
                    const date = new Date(row.original.uploadDate)
                    return date.toLocaleDateString('es-MX')
                }
            },
            {
                header: 'Acción',
                accessorKey: 'id',
                cell: ({ row }) => {
                    return h('button', {
                        class: 'btn btn-ghost btn-sm',
                        onClick: () => downloadEvidence(row.original.fileUrl, row.original.fileName)
                    }, [
                        h('span', { class: 'material-symbols-outlined' }, 'download')
                    ])
                }
            }
        ]
    }

    return {
        getEvidenceColumns
    }
}
