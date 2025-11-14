<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import type { ValueChainSectionType, AreaType } from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'
import AreaCard from './AreaCard.vue'

const props = defineProps<{
    section: ValueChainSectionType
    sectionType: 'Planeación' | 'Cadena de valor' | 'Soporte'
    spaceLabels?: [string, string, string]
}>()

const emit = defineEmits<{
    addArea: [space: 1 | 2 | 3]
    editArea: [area: AreaType]
    deleteArea: [area: AreaType]
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

const defaultLabels: [string, string, string] = ['Espacio 1', 'Espacio 2', 'Espacio 3']

const getSpaceLabel = (space: 1 | 2 | 3): string => {
    return props.spaceLabels ? props.spaceLabels[space - 1] : defaultLabels[space - 1]
}
</script>

<template>
    <!-- Layout en columnas (3 espacios horizontales) -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <!-- Espacio 1 -->
        <div class="flex flex-col space-y-4">
            <!-- Header del espacio -->
            <div class="sticky top-0 z-10 bg-base-100 pb-3 border-b-2 border-primary/20">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-base flex items-center gap-2">
                        <span class="badge badge-primary badge-lg">1</span>
                        {{ getSpaceLabel(1) }}
                    </h4>
                </div>
                <button class="btn btn-sm btn-primary gap-2 w-full" @click="emit('addArea', 1)">
                    <Plus :size="16" />
                    Agregar Área
                </button>
            </div>

            <!-- Áreas del espacio 1 -->
            <div class="space-y-4">
                <AreaCard
                    v-for="area in section.space1.areas"
                    :key="area.id"
                    :area="area"
                    @edit="emit('editArea', area)"
                    @delete="emit('deleteArea', area)"
                    @add-level1="emit('addLevel1', area)"
                    @edit-level1="(a, l1) => emit('editLevel1', a, l1)"
                    @delete-level1="(a, l1) => emit('deleteLevel1', a, l1)"
                    @add-level2="(a, l1) => emit('addLevel2', a, l1)"
                    @edit-level2="(a, l1, l2) => emit('editLevel2', a, l1, l2)"
                    @delete-level2="(a, l1, l2) => emit('deleteLevel2', a, l1, l2)"
                    @add-level3="(a, l1, l2) => emit('addLevel3', a, l1, l2)"
                    @edit-level3="(a, l1, l2, l3) => emit('editLevel3', a, l1, l2, l3)"
                    @delete-level3="(a, l1, l2, l3) => emit('deleteLevel3', a, l1, l2, l3)"
                />

                <!-- Empty state -->
                <div
                    v-if="section.space1.areas.length === 0"
                    class="flex flex-col items-center justify-center py-12 border-2 border-dashed border-base-300 rounded-lg"
                >
                    <p class="text-sm text-base-content/50 mb-3 text-center">No hay áreas en este espacio</p>
                    <button class="btn btn-sm btn-primary gap-2" @click="emit('addArea', 1)">
                        <Plus :size="14" />
                        Crear primera área
                    </button>
                </div>
            </div>
        </div>

        <!-- Espacio 2 -->
        <div class="flex flex-col space-y-4">
            <!-- Header del espacio -->
            <div class="sticky top-0 z-10 bg-base-100 pb-3 border-b-2 border-primary/20">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-base flex items-center gap-2">
                        <span class="badge badge-primary badge-lg">2</span>
                        {{ getSpaceLabel(2) }}
                    </h4>
                </div>
                <button class="btn btn-sm btn-primary gap-2 w-full" @click="emit('addArea', 2)">
                    <Plus :size="16" />
                    Agregar Área
                </button>
            </div>

            <!-- Áreas del espacio 2 -->
            <div class="space-y-4">
                <AreaCard
                    v-for="area in section.space2.areas"
                    :key="area.id"
                    :area="area"
                    @edit="emit('editArea', area)"
                    @delete="emit('deleteArea', area)"
                    @add-level1="emit('addLevel1', area)"
                    @edit-level1="(a, l1) => emit('editLevel1', a, l1)"
                    @delete-level1="(a, l1) => emit('deleteLevel1', a, l1)"
                    @add-level2="(a, l1) => emit('addLevel2', a, l1)"
                    @edit-level2="(a, l1, l2) => emit('editLevel2', a, l1, l2)"
                    @delete-level2="(a, l1, l2) => emit('deleteLevel2', a, l1, l2)"
                    @add-level3="(a, l1, l2) => emit('addLevel3', a, l1, l2)"
                    @edit-level3="(a, l1, l2, l3) => emit('editLevel3', a, l1, l2, l3)"
                    @delete-level3="(a, l1, l2, l3) => emit('deleteLevel3', a, l1, l2, l3)"
                />

                <!-- Empty state -->
                <div
                    v-if="section.space2.areas.length === 0"
                    class="flex flex-col items-center justify-center py-12 border-2 border-dashed border-base-300 rounded-lg"
                >
                    <p class="text-sm text-base-content/50 mb-3 text-center">No hay áreas en este espacio</p>
                    <button class="btn btn-sm btn-primary gap-2" @click="emit('addArea', 2)">
                        <Plus :size="14" />
                        Crear primera área
                    </button>
                </div>
            </div>
        </div>

        <!-- Espacio 3 -->
        <div class="flex flex-col space-y-4">
            <!-- Header del espacio -->
            <div class="sticky top-0 z-10 bg-base-100 pb-3 border-b-2 border-primary/20">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-base flex items-center gap-2">
                        <span class="badge badge-primary badge-lg">3</span>
                        {{ getSpaceLabel(3) }}
                    </h4>
                </div>
                <button class="btn btn-sm btn-primary gap-2 w-full" @click="emit('addArea', 3)">
                    <Plus :size="16" />
                    Agregar Área
                </button>
            </div>

            <!-- Áreas del espacio 3 -->
            <div class="space-y-4">
                <AreaCard
                    v-for="area in section.space3.areas"
                    :key="area.id"
                    :area="area"
                    @edit="emit('editArea', area)"
                    @delete="emit('deleteArea', area)"
                    @add-level1="emit('addLevel1', area)"
                    @edit-level1="(a, l1) => emit('editLevel1', a, l1)"
                    @delete-level1="(a, l1) => emit('deleteLevel1', a, l1)"
                    @add-level2="(a, l1) => emit('addLevel2', a, l1)"
                    @edit-level2="(a, l1, l2) => emit('editLevel2', a, l1, l2)"
                    @delete-level2="(a, l1, l2) => emit('deleteLevel2', a, l1, l2)"
                    @add-level3="(a, l1, l2) => emit('addLevel3', a, l1, l2)"
                    @edit-level3="(a, l1, l2, l3) => emit('editLevel3', a, l1, l2, l3)"
                    @delete-level3="(a, l1, l2, l3) => emit('deleteLevel3', a, l1, l2, l3)"
                />

                <!-- Empty state -->
                <div
                    v-if="section.space3.areas.length === 0"
                    class="flex flex-col items-center justify-center py-12 border-2 border-dashed border-base-300 rounded-lg"
                >
                    <p class="text-sm text-base-content/50 mb-3 text-center">No hay áreas en este espacio</p>
                    <button class="btn btn-sm btn-primary gap-2" @click="emit('addArea', 3)">
                        <Plus :size="14" />
                        Crear primera área
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>
