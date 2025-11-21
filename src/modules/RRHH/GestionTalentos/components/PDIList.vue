<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTalentActions } from '@/modules/RRHH/GestionTalentos/composables/useTalentActions'
import PDICard from '@/modules/RRHH/GestionTalentos/components/PDICard.vue'
import type { PDI } from '@/modules/RRHH/GestionTalentos/types/talentTypes'

const { getPDIs } = useTalentActions()

const loading = ref(true)
const pdis = ref<PDI[]>([])

const loadData = async () => {
    loading.value = true
    try {
        pdis.value = await getPDIs()
    } catch (error) {
        console.error('Error loading PDIs:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadData()
})
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="card-title flex items-center gap-2">
                        <span class="material-symbols-outlined">book</span>
                        Plan de Desarrollo Individual (PDI)
                    </h2>
                    <p class="text-sm text-base-content/60">
                        Planes personalizados basados en brechas detectadas
                    </p>
                </div>
            </div>

            <div v-if="loading" class="flex justify-center items-center h-64">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else class="overflow-auto max-h-[700px]">
                <div class="space-y-4">
                    <PDICard
                        v-for="pdi in pdis"
                        :key="pdi.id"
                        :pdi="pdi"
                    />

                    <div
                        v-if="!loading && pdis.length === 0"
                        class="text-center py-8"
                    >
                        <p class="text-base-content/60">No hay PDIs activos</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
