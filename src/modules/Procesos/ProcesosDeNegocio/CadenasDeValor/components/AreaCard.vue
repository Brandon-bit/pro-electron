<script setup lang="ts">
import { Edit, Trash2, Plus, Box } from 'lucide-vue-next'
import type { AreaType } from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'
import ProcessLevel1Card from './ProcessLevel1Card.vue'

defineProps<{
    area: AreaType
}>()

const emit = defineEmits<{
    edit: [area: AreaType]
    delete: [area: AreaType]
    addLevel1: [area: AreaType]
    editLevel1: [area: AreaType, level1: any]
    deleteLevel1: [area: AreaType, level1: any]
    addLevel2: [area: AreaType, level1: any]
    editLevel2: [area: AreaType, level1: any, level2: any]
    deleteLevel2: [area: AreaType, level1: any, level2: any]
    addLevel3: [area: AreaType, level1: any, level2: any]
    editLevel3: [area: AreaType, level1: any, level2: any, level3: any]
    deleteLevel3: [area: AreaType, level1: any, level2: any, level3: any]
}>()
</script>

<template>
    <div class="card bg-base-100 shadow-xl border-t-4 border-primary hover:shadow-2xl transition-all duration-300">
        <div class="card-body p-5">
            <!-- Header del área -->
            <div class="flex items-start justify-between mb-4 pb-3 border-b-2 border-base-300">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-primary/10 rounded-lg">
                        <Box :size="20" class="text-primary" />
                    </div>
                    <div>
                        <h3 class="card-title text-lg">{{ area.title }}</h3>
                        <div class="flex gap-2 mt-1">
                            <div class="badge badge-outline badge-sm">{{ area.type }}</div>
                            <div class="badge badge-ghost badge-sm">Espacio {{ area.space }}</div>
                        </div>
                    </div>
                </div>

                <div class="flex gap-2">
                    <button
                        class="btn btn-sm btn-primary gap-2"
                        @click="emit('addLevel1', area)"
                        title="Agregar proceso"
                    >
                        <Plus :size="16" />
                        Proceso
                    </button>
                    <button
                        class="btn btn-sm btn-ghost btn-circle text-info hover:bg-info/10"
                        @click="emit('edit', area)"
                        title="Editar área"
                    >
                        <Edit :size="16" />
                    </button>
                    <button
                        class="btn btn-sm btn-ghost btn-circle text-error hover:bg-error/10"
                        @click="emit('delete', area)"
                        title="Eliminar área"
                    >
                        <Trash2 :size="16" />
                    </button>
                </div>
            </div>

            <!-- Procesos Nivel 1 -->
            <div v-if="area.level1Processes.length > 0" class="space-y-3">
                <ProcessLevel1Card
                    v-for="level1 in area.level1Processes"
                    :key="level1.id"
                    :process="level1"
                    @edit="emit('editLevel1', area, level1)"
                    @delete="emit('deleteLevel1', area, level1)"
                    @add-level2="emit('addLevel2', area, level1)"
                    @edit-level2="(l1, l2) => emit('editLevel2', area, l1, l2)"
                    @delete-level2="(l1, l2) => emit('deleteLevel2', area, l1, l2)"
                    @add-level3="(l1, l2) => emit('addLevel3', area, l1, l2)"
                    @edit-level3="(l1, l2, l3) => emit('editLevel3', area, l1, l2, l3)"
                    @delete-level3="(l1, l2, l3) => emit('deleteLevel3', area, l1, l2, l3)"
                />
            </div>

            <!-- Empty state -->
            <div
                v-else
                class="flex flex-col items-center justify-center py-8 text-center text-base-content/50"
            >
                <Box :size="48" class="mb-3 opacity-30" />
                <p class="text-sm">No hay procesos en esta área</p>
                <button class="btn btn-sm btn-primary mt-3 gap-2" @click="emit('addLevel1', area)">
                    <Plus :size="14" />
                    Agregar primer proceso
                </button>
            </div>
        </div>
    </div>
</template>
