<script setup lang="ts">
import useSPCStore from '@/modules/DiagramasDeDecision/SPC/store/spcStore'

const spcStore = useSPCStore()
</script>

<template>
    <div 
        v-if="spcStore.outOfControlPoints.length > 0"
        class="card bg-base-100 shadow-xl border-2 border-error"
    >
        <div class="card-body">
            <h2 class="card-title text-error gap-2">
                <span class="material-symbols-outlined">error</span>
                Alertas Detectadas
            </h2>
            
            <div class="space-y-2 mt-4">
                <div
                    v-for="point in spcStore.outOfControlPoints"
                    :key="point.id"
                    class="flex items-center gap-3 p-3 bg-error/10 rounded-lg"
                >
                    <span class="badge badge-error">Muestra {{ point.sample }}</span>
                    <span class="text-sm">
                        Valor: <strong>{{ point.value }}</strong> - {{ point.violationType }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
