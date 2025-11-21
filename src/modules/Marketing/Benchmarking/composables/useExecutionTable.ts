import { h } from 'vue';
import { RouterLink } from 'vue-router';
import type { ColumnDef } from '@tanstack/vue-table';
import type { Execution } from '../types/benchmarkingTypes';

const getExecutionStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "badge-warning";
    case "in_progress": return "badge-info";
    case "completed": return "badge-success";
    default: return "badge-ghost";
  }
};

const getExecutionStatusLabel = (status: string) => {
  switch (status) {
    case "pending": return "Pendiente";
    case "in_progress": return "En Progreso";
    case "completed": return "Finalizada";
    default: return status;
  }
};

export const useExecutionTable = () => {
  const getTableColumns = (): ColumnDef<Execution>[] => {
    return [
      {
        header: 'ID Ejecución',
        accessorKey: 'id',
        cell: info => h('span', { class: 'font-mono text-xs' }, info.getValue() as string)
      },
      {
        header: 'Asignado a',
        accessorKey: 'assignedTo',
        cell: info => info.getValue() || 'No asignado'
      },
      {
        header: 'Fecha Asignación',
        accessorKey: 'assignedDate',
        cell: info => new Date(info.getValue() as string).toLocaleDateString('es-MX')
      },
      {
        header: 'Fecha Límite',
        accessorKey: 'dueDate',
        cell: info => info.getValue() ? new Date(info.getValue() as string).toLocaleDateString('es-MX') : 'N/A'
      },
      {
        header: 'Estado',
        accessorKey: 'status',
        cell: info => h('span', {
          class: ['badge badge-sm', getExecutionStatusColor(info.getValue() as string)]
        }, getExecutionStatusLabel(info.getValue() as string))
      },
      {
        header: 'Acciones',
        id: 'actions',
        cell: ({ row }) => {
          const execution = row.original;
          
          // Si está completada, mostrar badge
          if (execution.status === 'completed') {
            return h('div', { class: 'flex justify-center gap-2' }, [
              h('span', { class: 'badge badge-success gap-1' }, [
                h('span', { class: 'material-symbols-outlined text-sm' }, 'check_circle'),
                'Finalizada'
              ])
            ]);
          }
          
          // Si está pendiente, mostrar botón de ejecutar con RouterLink
          const executeButton = h(RouterLink, {
            to: { name: 'ExecutionView', params: { id: execution.id } },
            class: 'btn btn-xs btn-primary gap-1'
          }, () => [
            h('span', { class: 'material-symbols-outlined text-sm' }, 'play_circle'),
            'Ejecutar'
          ]);
          
          return h('div', { class: 'flex justify-center gap-2' }, [executeButton]);
        }
      }
    ];
  };

  return { getTableColumns };
};