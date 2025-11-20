<script setup lang="ts">
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import BaseTable from '@/shared/components/BaseTable.vue'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import type { AgreedActionWithMinuteType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

const minuteStore = useMinuteStore()

// Define table columns
const columns: ColumnDef<AgreedActionWithMinuteType>[] = [
    {
        accessorKey: 'description',
        header: 'Acción',
        cell: (info) => h('span', { class: 'max-w-xs' }, info.getValue() as string)
    },
    {
        accessorKey: 'minuteName',
        header: 'Minuta Origen',
        cell: (info) => h('span', { class: 'text-sm opacity-70' }, info.getValue() as string)
    },
    {
        accessorKey: 'responsible',
        header: 'Responsable',
        cell: (info) => {
            const responsible = info.getValue() as { name: string; email: string }
            return h('div', { class: 'flex flex-col' }, [
                h('span', { class: 'font-medium' }, responsible.name),
                h('span', { class: 'text-xs opacity-60' }, responsible.email)
            ])
        }
    },
    {
        accessorKey: 'dueDate',
        header: 'Fecha Límite',
        cell: (info) => {
            const date = new Date(info.getValue() as string)
            return h('span', {}, date.toLocaleDateString())
        }
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: (info) => {
            const status = info.getValue() as { name: string; color: string }
            return h('span', { 
                class: 'badge badge-sm',
                style: { backgroundColor: status.color, color: '#fff' }
            }, status.name)
        }
    }
]

// Callback function to get data (no pagination)
const fetchActions = async () => {
    return {
        items: minuteStore.pendingAgreedActions,
        total: minuteStore.pendingAgreedActions.length
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
                {{ minuteStore.pendingAgreedActions.length }} acciones
            </div>
        </div>
        
        <BaseTable
            :headers="columns"
            :fetch-callback="fetchActions"
            :paged-table="false"
        />
    </div>
</template>
