<script setup lang="ts">
import { computed, h } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import useFMEAStore from '@/modules/DiagramasDeDecision/FMEA/store/fmeaStore'
import { useFMEAActions } from '@/modules/DiagramasDeDecision/FMEA/composables/useFMEAActions'
import type { FMEARowType } from '@/modules/DiagramasDeDecision/FMEA/types/fmeaTypes'
import type { ColumnDef } from '@tanstack/vue-table'

const fmeaStore = useFMEAStore()
const { getRPNColor, getRPNLabel } = useFMEAActions()

const columns = computed<ColumnDef<FMEARowType>[]>(() => [
    {
        accessorKey: 'failureMode',
        header: 'Modo de Falla',
        cell: (info) => h('span', { class: 'font-medium' }, info.getValue() as string)
    },
    {
        accessorKey: 'effect',
        header: 'Efecto',
        cell: (info) => h('span', {}, info.getValue() as string)
    },
    {
        accessorKey: 'severity',
        header: 'S',
        cell: (info) => {
            const row = info.row.original
            return h('select', {
                class: 'select select-bordered select-sm w-16',
                value: info.getValue(),
                onChange: (e: Event) => {
                    const value = parseInt((e.target as HTMLSelectElement).value)
                    fmeaStore.updateValue(row.id, 'severity', value)
                }
            }, Array.from({ length: 10 }, (_, i) => i + 1).map(n =>
                h('option', { value: n }, n.toString())
            ))
        }
    },
    {
        accessorKey: 'occurrence',
        header: 'O',
        cell: (info) => {
            const row = info.row.original
            return h('select', {
                class: 'select select-bordered select-sm w-16',
                value: info.getValue(),
                onChange: (e: Event) => {
                    const value = parseInt((e.target as HTMLSelectElement).value)
                    fmeaStore.updateValue(row.id, 'occurrence', value)
                }
            }, Array.from({ length: 10 }, (_, i) => i + 1).map(n =>
                h('option', { value: n }, n.toString())
            ))
        }
    },
    {
        accessorKey: 'detection',
        header: 'D',
        cell: (info) => {
            const row = info.row.original
            return h('select', {
                class: 'select select-bordered select-sm w-16',
                value: info.getValue(),
                onChange: (e: Event) => {
                    const value = parseInt((e.target as HTMLSelectElement).value)
                    fmeaStore.updateValue(row.id, 'detection', value)
                }
            }, Array.from({ length: 10 }, (_, i) => i + 1).map(n =>
                h('option', { value: n }, n.toString())
            ))
        }
    },
    {
        accessorKey: 'rpn',
        header: 'RPN',
        cell: (info) => {
            const rpn = info.getValue() as number
            return h('div', { class: 'text-center' }, [
                h('span', { class: `badge ${getRPNColor(rpn)}` }, rpn.toString()),
                h('p', { class: 'text-xs mt-1' }, getRPNLabel(rpn))
            ])
        }
    },
    {
        accessorKey: 'recommendedAction',
        header: 'Acción Recomendada',
        cell: (info) => {
            const row = info.row.original
            return h('input', {
                type: 'text',
                class: 'input input-bordered input-sm w-full min-w-[200px]',
                placeholder: 'Acción preventiva...',
                value: info.getValue(),
                onInput: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value
                    fmeaStore.updateValue(row.id, 'recommendedAction', value)
                }
            })
        }
    },
    {
        accessorKey: 'severityPost',
        header: 'S₂',
        cell: (info) => {
            const row = info.row.original
            return h('select', {
                class: 'select select-bordered select-sm w-16',
                value: info.getValue(),
                onChange: (e: Event) => {
                    const value = parseInt((e.target as HTMLSelectElement).value)
                    fmeaStore.updateValue(row.id, 'severityPost', value)
                }
            }, Array.from({ length: 10 }, (_, i) => i + 1).map(n =>
                h('option', { value: n }, n.toString())
            ))
        }
    },
    {
        accessorKey: 'occurrencePost',
        header: 'O₂',
        cell: (info) => {
            const row = info.row.original
            return h('select', {
                class: 'select select-bordered select-sm w-16',
                value: info.getValue(),
                onChange: (e: Event) => {
                    const value = parseInt((e.target as HTMLSelectElement).value)
                    fmeaStore.updateValue(row.id, 'occurrencePost', value)
                }
            }, Array.from({ length: 10 }, (_, i) => i + 1).map(n =>
                h('option', { value: n }, n.toString())
            ))
        }
    },
    {
        accessorKey: 'detectionPost',
        header: 'D₂',
        cell: (info) => {
            const row = info.row.original
            return h('select', {
                class: 'select select-bordered select-sm w-16',
                value: info.getValue(),
                onChange: (e: Event) => {
                    const value = parseInt((e.target as HTMLSelectElement).value)
                    fmeaStore.updateValue(row.id, 'detectionPost', value)
                }
            }, Array.from({ length: 10 }, (_, i) => i + 1).map(n =>
                h('option', { value: n }, n.toString())
            ))
        }
    },
    {
        accessorKey: 'rpnPost',
        header: 'RPN₂',
        cell: (info) => {
            const rpn = info.getValue() as number
            return h('div', { class: 'text-center' }, [
                h('span', { class: `badge badge-outline ${getRPNColor(rpn)}` }, rpn.toString()),
                h('p', { class: 'text-xs mt-1' }, getRPNLabel(rpn))
            ])
        }
    }
])

const fetchData = async () => {
    return {
        items: fmeaStore.fmeaData,
        total: fmeaStore.fmeaData.length
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Tabla FMEA Inteligente</h2>
            <p class="text-sm opacity-70">
                Los valores RPN se recalculan automáticamente. Ordenado por RPN descendente.
            </p>

            <div class="mt-4">
                <BaseTable
                    :headers="columns"
                    :fetch-callback="fetchData"
                    :paged-table="false"
                />
            </div>
        </div>
    </div>
</template>
