<script setup lang="ts">
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import BaseTable from '@/shared/components/BaseTable.vue'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import { useMinuteActions } from '@/modules/GestionDeProyectos/Operacion/Minutas/composables/useMinuteActions'
import type { ActionItemWithMinute } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

const minuteStore = useMinuteStore()
const { getActionStatusColor } = useMinuteActions()

// Definir las columnas de la tabla
const columns: ColumnDef<ActionItemWithMinute>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => h('span', { class: 'font-medium' }, info.getValue() as string)
    },
    {
        accessorKey: 'description',
        header: 'Acción',
        cell: (info) => h('span', { class: 'max-w-xs' }, info.getValue() as string)
    },
    {
        accessorKey: 'minuteTitle',
        header: 'Minuta Origen',
        cell: (info) => h('span', { class: 'text-sm opacity-70' }, info.getValue() as string)
    },
    {
        accessorKey: 'responsible',
        header: 'Responsable'
    },
    {
        accessorKey: 'dueDate',
        header: 'Fecha Límite'
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: (info) => {
            const status = info.getValue() as string
            return h('span', { 
                class: ['badge', getActionStatusColor(status)].join(' ')
            }, status)
        }
    }
]

// Función de callback para obtener los datos (sin paginación)
const fetchActions = async () => {
    return {
        items: minuteStore.allActionItems,
        total: minuteStore.allActionItems.length
    }
}
</script>

<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold flex items-center gap-2">
                <span class="material-symbols-outlined">check_box</span>
                Acciones Pendientes
            </h2>
            <div class="badge badge-ghost gap-2">
                <span class="material-symbols-outlined text-sm">list</span>
                {{ minuteStore.allActionItems.length }} acciones
            </div>
        </div>
        
        <BaseTable
            :headers="columns"
            :fetch-callback="fetchActions"
            :paged-table="false"
        />
    </div>
</template>
