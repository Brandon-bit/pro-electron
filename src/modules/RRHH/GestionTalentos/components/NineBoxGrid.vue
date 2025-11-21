<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NineBoxCell from '@/modules/RRHH/GestionTalentos/components/NineBoxCell.vue'
import { useTalentActions } from '@/modules/RRHH/GestionTalentos/composables/useTalentActions'
import type { NineBoxGrid } from '@/modules/RRHH/GestionTalentos/types/talentTypes'

const { getNineBoxData } = useTalentActions()

const loading = ref(true)
const nineBoxData = ref<NineBoxGrid>({
    highPotential: { low: [], medium: [], high: [] },
    mediumPotential: { low: [], medium: [], high: [] },
    lowPotential: { low: [], medium: [], high: [] }
})

const loadData = async () => {
    loading.value = true
    try {
        nineBoxData.value = await getNineBoxData()
    } catch (error) {
        console.error('Error loading nine box data:', error)
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
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h2 class="card-title">Matriz de 9 Cajas (9-Box Grid)</h2>
                    <p class="text-sm text-base-content/60">
                        Vista interactiva drag-and-drop • Eje X: Desempeño • Eje Y: Potencial
                    </p>
                </div>
            </div>

            <div v-if="loading" class="flex justify-center items-center h-96">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else class="overflow-auto max-h-[700px]">
                <div class="grid grid-cols-3 gap-3 min-h-[600px]">
                    <!-- Row 1: Alto Potencial -->
                    <NineBoxCell
                        v-model="nineBoxData.highPotential.low"
                        title="Potencial Alto"
                        subtitle="Bajo Desempeño"
                        bg-color="bg-warning/10"
                        border-color="border-warning/30"
                        avatar-color="bg-warning text-warning-content"
                    />

                    <NineBoxCell
                        v-model="nineBoxData.highPotential.medium"
                        title="Potencial Alto"
                        subtitle="Medio Desempeño"
                        bg-color="bg-primary/10"
                        border-color="border-primary/30"
                        avatar-color="bg-primary text-primary-content"
                    />

                    <NineBoxCell
                        v-model="nineBoxData.highPotential.high"
                        title="High Potential ⭐"
                        subtitle="Alto Desempeño"
                        bg-color="bg-success/10"
                        border-color="border-success/30"
                        avatar-color="bg-success text-success-content"
                    />

                    <!-- Row 2: Medio Potencial -->
                    <NineBoxCell
                        v-model="nineBoxData.mediumPotential.low"
                        title="Potencial Medio"
                        subtitle="Bajo Desempeño"
                        bg-color="bg-base-200"
                        border-color="border-base-300"
                        avatar-color="bg-base-300 text-base-content"
                    />

                    <NineBoxCell
                        v-model="nineBoxData.mediumPotential.medium"
                        title="Core Contributors"
                        subtitle="Medio-Medio"
                        bg-color="bg-base-200"
                        border-color="border-base-300"
                        avatar-color="bg-base-300 text-base-content"
                    />

                    <NineBoxCell
                        v-model="nineBoxData.mediumPotential.high"
                        title="High Performers"
                        subtitle="Alto Desempeño"
                        bg-color="bg-primary/10"
                        border-color="border-primary/30"
                        avatar-color="bg-primary text-primary-content"
                    />

                    <!-- Row 3: Bajo Potencial -->
                    <NineBoxCell
                        v-model="nineBoxData.lowPotential.low"
                        title="Bajo Potencial"
                        subtitle="Bajo Desempeño"
                        bg-color="bg-error/10"
                        border-color="border-error/30"
                        avatar-color="bg-error text-error-content"
                        text-color="text-error"
                    />

                    <NineBoxCell
                        v-model="nineBoxData.lowPotential.medium"
                        title="Bajo Potencial"
                        subtitle="Medio Desempeño"
                        bg-color="bg-base-200"
                        border-color="border-base-300"
                        avatar-color="bg-base-300 text-base-content"
                    />

                    <NineBoxCell
                        v-model="nineBoxData.lowPotential.high"
                        title="Solid Contributors"
                        subtitle="Alto Desempeño"
                        bg-color="bg-base-200"
                        border-color="border-base-300"
                        avatar-color="bg-base-300 text-base-content"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
