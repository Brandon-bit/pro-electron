<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCompetencyActions } from '@/modules/RRHH/Competencias/composables/useCompetencyActions'
import CompetencyCard from '@/modules/RRHH/GestionDeDesempeno/components/CompetencyCard.vue'

const { getCompetencies } = useCompetencyActions()

const competencies = ref<any[]>([])
const loading = ref(false)

const loadCompetencies = async () => {
    loading.value = true
    try {
        const result = await getCompetencies(1, 100)
        competencies.value = result.items.filter((c: any) => c.active)
    } catch (error) {
        console.error('Error loading competencies:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadCompetencies()
})
</script>

<template>
    <div class="card shadow-base bg-base-100">
        <div class="card-body">
            <h2 class="card-title">Biblioteca de Competencias</h2>
            <p class="text-base-content/60 mb-4">
                Catálogo de competencias organizacionales y técnicas activas
            </p>

            <div v-if="loading" class="flex justify-center py-8">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else-if="competencies.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CompetencyCard
                    v-for="comp in competencies"
                    :key="comp.id"
                    :competency="comp"
                />
            </div>

            <div v-else class="text-center py-8">
                <p class="text-base-content/60">No hay competencias activas disponibles</p>
            </div>
        </div>
    </div>
</template>
