<script setup lang="ts">
import { computed } from 'vue'
import type { DiagramType } from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'

const props = defineProps<{
    diagrams: DiagramType[]
    isLoading?: boolean
}>()

const emit = defineEmits<{
    markFinal: [diagramId: number]
    delete: [diagramId: number]
    exportWord: [diagramId: number]
    exportPdf: [diagramId: number]
    sendVoBo: [diagramId: number]
    viewVoBo: [diagramId: number]
    edit: [diagramId: number]
}>()

const sortedDiagrams = computed(() => {
    return [...props.diagrams].sort((a, b) => b.version - a.version)
})
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table table-zebra table-sm w-full">
            <thead>
                <tr>
                    <th class="bg-base-200">Versión</th>
                    <th class="bg-base-200">Estado</th>
                    <th class="bg-base-200">VoBo</th>
                    <th class="bg-base-200 text-center">Acciones</th>
                </tr>
            </thead>
            <tbody v-if="!isLoading && sortedDiagrams.length > 0">
                <tr v-for="diagram in sortedDiagrams" :key="diagram.dni">
                    <!-- Versión -->
                    <td class="font-semibold">
                        <div class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-lg">
                                description
                            </span>
                            <span>Versión {{ diagram.version }}</span>
                        </div>
                    </td>

                    <!-- Estado -->
                    <td>
                        <span
                            v-if="diagram.final"
                            class="badge badge-success badge-sm gap-1"
                        >
                            <span class="material-symbols-outlined text-xs">check_circle</span>
                            Final
                        </span>
                        <span v-else class="badge badge-ghost badge-sm">En desarrollo</span>
                    </td>

                    <!-- VoBo -->
                    <td>
                        <span
                            v-if="diagram.hasVoBo"
                            class="badge badge-info badge-sm gap-1 cursor-pointer"
                            @click.stop="emit('viewVoBo', diagram.dni)"
                        >
                            <span class="material-symbols-outlined text-xs">visibility</span>
                            Ver VoBo
                        </span>
                        <span v-else class="text-base-content/50 text-xs">Sin VoBo</span>
                    </td>

                    <!-- Acciones -->
                    <td>
                        <div class="flex items-center justify-center gap-2">
                            <!-- Editar diagrama -->
                            <button
                                @click.stop="emit('edit', diagram.dni)"
                                class="btn btn-sm btn-ghost btn-square tooltip tooltip-top"
                                data-tip="Editar diagrama"
                            >
                                <span class="material-symbols-outlined text-warning">
                                    edit
                                </span>
                            </button>

                            <!-- Marcar como final -->
                            <button
                                v-if="!diagram.final"
                                @click.stop="emit('markFinal', diagram.dni)"
                                class="btn btn-sm btn-ghost btn-square tooltip tooltip-top"
                                data-tip="Marcar como final"
                            >
                                <span class="material-symbols-outlined text-success">
                                    check_circle
                                </span>
                            </button>

                            <!-- Enviar a VoBo -->
                            <button
                                v-if="diagram.final && !diagram.hasVoBo"
                                @click.stop="emit('sendVoBo', diagram.dni)"
                                class="btn btn-sm btn-ghost btn-square tooltip tooltip-top"
                                data-tip="Enviar a VoBo"
                            >
                                <span class="material-symbols-outlined text-info">send</span>
                            </button>

                            <!-- Exportar Word -->
                            <button
                                @click.stop="emit('exportWord', diagram.dni)"
                                class="btn btn-sm btn-ghost btn-square tooltip tooltip-top"
                                data-tip="Exportar a Word (Simulación)"
                            >
                                <span class="material-symbols-outlined text-primary">
                                    description
                                </span>
                            </button>

                            <!-- Exportar PDF -->
                            <button
                                @click.stop="emit('exportPdf', diagram.dni)"
                                class="btn btn-sm btn-ghost btn-square tooltip tooltip-top"
                                data-tip="Exportar a PDF (Simulación)"
                            >
                                <span class="material-symbols-outlined text-error">
                                    picture_as_pdf
                                </span>
                            </button>

                            <!-- Eliminar -->
                            <button
                                v-if="!diagram.final"
                                @click.stop="emit('delete', diagram.dni)"
                                class="btn btn-sm btn-ghost btn-square tooltip tooltip-top"
                                data-tip="Eliminar versión"
                            >
                                <span class="material-symbols-outlined text-error">delete</span>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody v-else-if="isLoading">
                <tr>
                    <td colspan="4" class="text-center py-8">
                        <span class="loading loading-spinner loading-md"></span>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="4" class="text-center py-8 text-base-content/50">
                        No hay versiones disponibles
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
