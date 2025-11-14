<script setup lang="ts">
import { ref } from 'vue'
import { Edit, Trash2, Plus, ChevronDown, ChevronRight, Layers } from 'lucide-vue-next'
import type { Level1ProcessType } from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'
import ProcessLevel2Card from './ProcessLevel2Card.vue'

const props = defineProps<{
    process: Level1ProcessType
}>()

const emit = defineEmits<{
    edit: [process: Level1ProcessType]
    delete: [process: Level1ProcessType]
    addLevel2: [level1: Level1ProcessType]
    editLevel2: [level1: Level1ProcessType, level2: any]
    deleteLevel2: [level1: Level1ProcessType, level2: any]
    addLevel3: [level1: Level1ProcessType, level2: any]
    editLevel3: [level1: Level1ProcessType, level2: any, level3: any]
    deleteLevel3: [level1: Level1ProcessType, level2: any, level3: any]
}>()

const isExpanded = ref(false)

const toggleExpand = () => {
    if (props.process.level2Processes.length > 0) {
        isExpanded.value = !isExpanded.value
    }
}
</script>

<template>
    <div
        class="card bg-gradient-to-br from-base-100 to-base-200 border-2 border-base-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
        :class="{ 'ring-2 ring-primary ring-offset-2': isExpanded }"
        @dblclick="toggleExpand"
    >
        <div class="card-body p-4">
            <!-- Header -->
            <div class="flex items-center gap-2">
                <!-- Expand indicator -->
                <div class="flex items-center">
                    <button
                        v-if="process.level2Processes.length > 0"
                        class="btn btn-sm btn-ghost btn-circle"
                        @click.stop="toggleExpand"
                    >
                        <ChevronDown v-if="isExpanded" :size="18" class="text-primary" />
                        <ChevronRight v-else :size="18" />
                    </button>
                    <Layers v-else :size="18" class="text-base-content/30 ml-2" />
                </div>

                <!-- Título -->
                <div class="flex-1">
                    <h4 class="font-bold text-base">{{ process.title }}</h4>
                    <p v-if="process.level2Processes.length > 0" class="text-xs text-base-content/60">
                        Doble clic para expandir
                    </p>
                </div>

                <!-- Badge de grupos de procesos -->
                <div
                    v-if="process.level2Processes.length > 0"
                    class="badge badge-primary gap-1"
                >
                    <Layers :size="12" />
                    {{ process.level2Processes.length }}
                </div>

                <!-- Acciones -->
                <div class="flex gap-1">
                    <button
                        class="btn btn-sm btn-ghost btn-circle text-success hover:bg-success/10"
                        @click.stop="emit('addLevel2', process)"
                        title="Agregar grupo de procesos"
                    >
                        <Plus :size="16" />
                    </button>
                    <button
                        class="btn btn-sm btn-ghost btn-circle text-info hover:bg-info/10"
                        @click.stop="emit('edit', process)"
                        title="Editar"
                    >
                        <Edit :size="16" />
                    </button>
                    <button
                        class="btn btn-sm btn-ghost btn-circle text-error hover:bg-error/10"
                        @click.stop="emit('delete', process)"
                        title="Eliminar"
                    >
                        <Trash2 :size="16" />
                    </button>
                </div>
            </div>

            <!-- Nivel 2 expandido -->
            <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-[3000px]"
                leave-active-class="transition-all duration-300"
                leave-from-class="opacity-100 max-h-[3000px]"
                leave-to-class="opacity-0 max-h-0"
            >
                <div v-if="isExpanded" class="mt-4 space-y-3 pl-4 border-l-4 border-primary/50">
                    <div class="flex items-center gap-2 mb-3">
                        <div class="badge badge-outline badge-sm">Grupos de Procesos (Nivel 2)</div>
                    </div>
                    <ProcessLevel2Card
                        v-for="level2 in process.level2Processes"
                        :key="level2.id"
                        :process="level2"
                        @edit="emit('editLevel2', process, level2)"
                        @delete="emit('deleteLevel2', process, level2)"
                        @add-level3="emit('addLevel3', process, level2)"
                        @edit-level3="(l2, l3) => emit('editLevel3', process, l2, l3)"
                        @delete-level3="(l2, l3) => emit('deleteLevel3', process, l2, l3)"
                    />
                </div>
            </Transition>
        </div>
    </div>
</template>
