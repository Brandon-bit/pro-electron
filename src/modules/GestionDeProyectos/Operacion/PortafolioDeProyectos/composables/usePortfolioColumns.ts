import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'

export type PortfolioProjectRow = {
  id: number
  status: string
  progress: number
  externalId: string
  implementationType: string
  classification: string
  folio: string
  name: string
  type: string
  startDate: string
  endDate: string
  currentStage: string
  leader: string
  category: string
  plannedBudget: number
  realBudget: number
}

const usePortfolioColumns = () => {
  const getTableColumns = (): ColumnTableType[] => {
    const columns: ColumnTableType[] = [
      {
        header: 'Estatus',
        accessorKey: 'status',
        cell: ({ row }: any) => {
          const status = row.original.status as string
          const statusClass =
            status === 'En ejecución'
              ? 'badge badge-sm badge-warning'
              : status === 'Finalizado'
              ? 'badge badge-sm badge-success'
              : status === 'Eliminado'
              ? 'badge badge-sm badge-error'
              : 'badge badge-sm'

          return h('span', { class: statusClass }, status)
        },
      },
      {
        header: 'Avance',
        accessorKey: 'progress',
        cell: ({ row }: any) => {
          const progress = row.original.progress as number
          return h('div', { class: 'flex items-center gap-2' }, [
            h('div', { class: 'flex-1 h-2 rounded-full bg-base-200 overflow-hidden' }, [
              h('div', {
                class: 'h-2 rounded-full bg-primary',
                style: { width: `${progress}%` },
              }),
            ]),
            h('span', { class: 'text-xs font-medium text-base-content/70 w-12 text-right' }, `${progress}%`),
          ])
        },
      },
      {
        header: 'Acciones',
        accessorKey: 'actions',
        cell: ({ row }: any) => {
          const goToGantt = () => {
            // TODO: Navegar al Gantt del proyecto (usar router en la vista)
            console.log('Ir a Gantt del proyecto', row.original.id)
          }

          const viewDetails = () => {
            console.log('Ver detalles del proyecto', row.original.id)
          }

          return h('div', { class: 'flex gap-2 justify-center' }, [
            h(
              'button',
              {
                class: 'btn btn-xs btn-primary gap-1',
                onClick: viewDetails,
                title: 'Ver detalle',
              },
              [
                h('span', { class: 'material-symbols-outlined text-sm' }, 'search'),
              ],
            ),
            h(
              'button',
              {
                class: 'btn btn-xs btn-accent gap-1',
                onClick: goToGantt,
                title: 'Ver Gantt',
              },
              [
                h('span', { class: 'material-symbols-outlined text-sm' }, 'timeline'),
              ],
            ),
          ])
        },
      },
      { header: 'Id Externo', accessorKey: 'externalId' },
      { header: 'Tipo de Implementación', accessorKey: 'implementationType' },
      { header: 'Clasificación', accessorKey: 'classification' },
      { header: 'Folio', accessorKey: 'folio' },
      { header: 'Nombre', accessorKey: 'name' },
      { header: 'Tipo', accessorKey: 'type' },
      { header: 'Fecha Inicio', accessorKey: 'startDate' },
      { header: 'Fecha Fin', accessorKey: 'endDate' },
      { header: 'Etapa Actual', accessorKey: 'currentStage' },
      { header: 'Líder/Responsable', accessorKey: 'leader' },
      { header: 'Categoría', accessorKey: 'category' },
      {
        header: 'Presupuesto Planeado',
        accessorKey: 'plannedBudget',
        cell: ({ row }: any) => {
          const value = row.original.plannedBudget as number
          return h('span', {}, value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }))
        },
      },
      {
        header: 'Presupuesto Real',
        accessorKey: 'realBudget',
        cell: ({ row }: any) => {
          const value = row.original.realBudget as number
          return h('span', {}, value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }))
        },
      },
    ]

    return columns
  }

  return { getTableColumns }
}

export default usePortfolioColumns
