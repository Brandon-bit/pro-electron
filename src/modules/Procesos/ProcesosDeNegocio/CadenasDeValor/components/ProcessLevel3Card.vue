<script setup lang="ts">
import { Edit, Trash2 } from 'lucide-vue-next'
import type { Level3ProcessType } from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'

defineProps<{
    process: Level3ProcessType
}>()

const emit = defineEmits<{
    edit: [process: Level3ProcessType]
    delete: [process: Level3ProcessType]
}>()
</script>

<template>
    <div class="card bg-base-100 border-2 border-primary/20 hover:border-primary/50 transition-all duration-200">
        <div class="card-body p-4">
            <!-- Título con flechas decorativas -->
            <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-primary rotate-45"></div>
                <h4 class="font-bold text-sm flex-1">{{ process.title }}</h4>
                <div class="w-2 h-2 bg-primary rotate-45"></div>
            </div>

            <!-- Descripción -->
            <div class="bg-base-200 rounded-lg p-3 mb-3 min-h-[80px]">
                <p class="text-xs text-base-content/70 whitespace-pre-wrap">
                    {{ process.description || 'Sin descripción' }}
                </p>
            </div>

            <!-- Acciones -->
            <div class="flex gap-2 justify-end">
                <button
                    class="btn btn-sm btn-ghost btn-circle text-info hover:bg-info/10"
                    @click="emit('edit', process)"
                    title="Editar proceso"
                >
                    <Edit :size="16" />
                </button>
                <button
                    class="btn btn-sm btn-ghost btn-circle text-error hover:bg-error/10"
                    @click="emit('delete', process)"
                    title="Eliminar proceso"
                >
                    <Trash2 :size="16" />
                </button>
            </div>
        </div>
    </div>
</template>
