import { useRouter } from 'vue-router'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, detailTableButton } from '@/utils/tableButtons'

export const useCampaigns = (): ColumnTableType[] => {
    const router = useRouter()

    const evaluationTypeLabels = {
        '360': 'Evaluación 360°',
        'performance': 'Desempeño',
        'competencies': 'Competencias'
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
            header: 'Tipo',
            accessorKey: 'evaluationType',
            cell: ({ row }: any) => {
                const type = row.original.evaluationType
                return h(
                    'span',
                    { class: 'badge badge-primary' },
                    evaluationTypeLabels[type as keyof typeof evaluationTypeLabels] || type
                )
            }
        },
        {
            header: 'Fechas',
            accessorKey: 'startDate',
            cell: ({ row }: any) => {
                const startDate = row.original.startDate
                const endDate = row.original.endDate
                return h('div', { class: 'flex flex-col text-sm' }, [
                    h('span', {}, `Inicio: ${startDate}`),
                    h('span', {}, `Fin: ${endDate}`)
                ])
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
                const editAction = () => {
                    router.push(`/rrhh/gestion-desempeno/editar/${data.id}`)
                }
                const viewAction = () => {
                    // Implementar vista de detalles si es necesario
                    console.log('Ver campaña:', data)
                }
                const editButton = editTableButton(editAction)
                const viewButton = detailTableButton(viewAction)
                return h('div', { class: 'flex gap-4 justify-center' }, [viewButton, editButton])
            }
        }
    ]
}
