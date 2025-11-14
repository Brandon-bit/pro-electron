<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import useParetoStore from '@/modules/DiagramasDeDecision/AnalisisDePareto/store/paretoStore'
import { useParetoActions } from '@/modules/DiagramasDeDecision/AnalisisDePareto/composables/useParetoActions'
import type { NewParetoEntryType, ParetoDataType } from '@/modules/DiagramasDeDecision/AnalisisDePareto/types/paretoTypes'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

const paretoStore = useParetoStore()
const { handleAddData, handleDeleteData } = useParetoActions()

const newEntry = ref<NewParetoEntryType>({
    category: '',
    frequency: '',
    cost: ''
})

const addData = () => {
    const success = handleAddData(newEntry.value.category, newEntry.value.frequency, newEntry.value.cost)
    if (success) {
        newEntry.value = {
            category: '',
            frequency: '',
            cost: ''
        }
    }
}

// Definir columnas para BaseTable
const columns = computed<ColumnDef<ParetoDataType>[]>(() => [
    {
        accessorKey: 'category',
        header: 'Categoría',
        cell: (info) => h('span', { class: 'font-medium' }, info.getValue() as string)
    },
    {
        accessorKey: 'frequency',
        header: 'Frecuencia',
        cell: (info) => h('span', { class: 'text-right block' }, info.getValue() as number)
    },
    {
        accessorKey: 'cost',
        header: 'Costo',
        cell: (info) => h('span', { class: 'text-right block' }, `$${(info.getValue() as number).toLocaleString()}`)
    },
    {
        accessorKey: 'percentage',
        header: '% Contribución',
        cell: (info) => h('span', { class: 'text-right block' }, `${info.getValue()}%`)
    },
    {
        accessorKey: 'cumulativePercentage',
        header: '% Acumulado',
        cell: (info) => h('span', { class: 'text-right block font-bold' }, `${info.getValue()}%`)
    },
    {
        id: 'actions',
        header: 'Acciones',
        cell: (info) => {
            return h('div', { class: 'text-right' }, [
                h('button', {
                    class: 'btn btn-ghost btn-sm',
                    onClick: () => handleDeleteData(info.row.original.category)
                }, [
                    h('span', { class: 'material-symbols-outlined' }, 'delete')
                ])
            ])
        }
    }
])

// Función para cargar datos (requerida por BaseTable)
const fetchData = async () => {
    return {
        items: paretoStore.data,
        total: paretoStore.data.length
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Tabla de Datos</h2>
            <p class="text-sm opacity-70">Datos ordenados por frecuencia descendente</p>

            <div class="space-y-4 mt-4">
                <!-- Add New Data Form -->
                <div class="grid grid-cols-4 gap-4 p-4 bg-base-200 rounded-lg">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Categoría</span>
                        </label>
                        <input
                            v-model="newEntry.category"
                            type="text"
                            class="input input-bordered"
                            placeholder="Ej: Defecto de Material"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Frecuencia</span>
                        </label>
                        <input
                            v-model="newEntry.frequency"
                            type="number"
                            class="input input-bordered"
                            placeholder="45"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Costo ($)</span>
                        </label>
                        <input
                            v-model="newEntry.cost"
                            type="number"
                            class="input input-bordered"
                            placeholder="125000"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text opacity-0">.</span>
                        </label>
                        <button @click="addData" class="btn btn-primary w-full gap-2">
                            <span class="material-symbols-outlined">add</span>
                            Agregar
                        </button>
                    </div>
                </div>

                <!-- Data Table -->
                <BaseTable
                    :headers="columns"
                    :fetch-callback="fetchData"
                    :paged-table="false"
                />
            </div>
        </div>
    </div>
</template>
