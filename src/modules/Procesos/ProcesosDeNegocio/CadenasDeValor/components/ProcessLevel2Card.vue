<script setup lang="ts">
import { ref } from 'vue'
import { Edit, Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-vue-next'
import type { Level2ProcessType } from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'
import ProcessLevel3Card from './ProcessLevel3Card.vue'

const props = defineProps<{
    process: Level2ProcessType
}>()

const emit = defineEmits<{
    edit: [process: Level2ProcessType]
    delete: [process: Level2ProcessType]
    addLevel3: [level2: Level2ProcessType]
    editLevel3: [level2: Level2ProcessType, level3: any]
    deleteLevel3: [level2: Level2ProcessType, level3: any]
}>()

const isExpanded = ref(false)

const toggleExpand = () => {
    if (props.process.level3Processes.length > 0) {
        isExpanded.value = !isExpanded.value
    }
}
</script>

<template>
    <div class="card bg-base-100 border border-base-300 hover:shadow-md transition-all duration-200">
        <div class="card-body p-4">
            <!-- Header -->
            <div class="flex items-center gap-2">
                <!-- Expand button -->
                <button
                    v-if="process.level3Processes.length > 0"
                    class="btn btn-xs btn-ghost btn-circle"
                    @click="toggleExpand"
                >
                    <ChevronDown v-if="isExpanded" :size="16" />
                    <ChevronRight v-else :size="16" />
                </button>
                <div v-else class="w-8"></div>

                <!-- Título -->
                <h4 class="font-semibold text-sm flex-1">{{ process.title }}</h4>

                <!-- Badge de nivel 3 -->
                <div
                    v-if="process.level3Processes.length > 0"
                    class="badge badge-primary badge-sm"
                >
                    {{ process.level3Processes.length }} procesos
                </div>

                <!-- Acciones -->
                <div class="flex gap-1">
                    <button
                        class="btn btn-xs btn-ghost btn-circle text-success hover:bg-success/10"
                        @click="emit('addLevel3', process)"
                        title="Agregar proceso nivel 3"
                    >
                        <Plus :size="14" />
                    </button>
                    <button
                        class="btn btn-xs btn-ghost btn-circle text-info hover:bg-info/10"
                        @click="emit('edit', process)"
                        title="Editar"
                    >
                        <Edit :size="14" />
                    </button>
                    <button
                        class="btn btn-xs btn-ghost btn-circle text-error hover:bg-error/10"
                        @click="emit('delete', process)"
                        title="Eliminar"
                    >
                        <Trash2 :size="14" />
                    </button>
                </div>
            </div>

            <!-- Nivel 3 expandido -->
            <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-[2000px]"
                leave-active-class="transition-all duration-300"
                leave-from-class="opacity-100 max-h-[2000px]"
                leave-to-class="opacity-0 max-h-0"
            >
                <div v-if="isExpanded" class="mt-4 space-y-3 pl-6 border-l-2 border-primary/30">
                    <ProcessLevel3Card
                        v-for="level3 in process.level3Processes"
                        :key="level3.id"
                        :process="level3"
                        @edit="emit('editLevel3', process, level3)"
                        @delete="emit('deleteLevel3', process, level3)"
                    />
                </div>
            </Transition>
        </div>
    </div>
</template>
