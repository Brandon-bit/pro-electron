<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ConfigurationTab from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/components/ConfigurationTab.vue'
import EvaluationTab from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/components/EvaluationTab.vue'
import InitiativeModal from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/components/InitiativeModal.vue'
import { useInitiativeActions } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/composables/useInitiativeActions'
import type { InitiativeType } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'

const { getInitiatives, toggleSelection, calculateEffortScore, calculateImpactScore, calculateStrategicAlignment } = useInitiativeActions()

const activeTab = ref('evaluation')
const initiatives = ref<InitiativeType[]>([])
const loading = ref(false)

const fetchInitiatives = async () => {
    loading.value = true
    try {
        const response = await getInitiatives(1, 100)
        // Calcular scores para cada iniciativa
        initiatives.value = response.items.map(init => {
            const effortScore = calculateEffortScore(init)
            const impactScore = calculateImpactScore(init)
            const strategicAlignment = calculateStrategicAlignment(effortScore, impactScore)
            
            return {
                ...init,
                effortScore,
                impactScore,
                strategicAlignment
            }
        })
    } catch (error) {
        console.error('Error fetching initiatives:', error)
        // Datos de ejemplo para desarrollo
        initiatives.value = [
            {
                id: 1,
                classification: 'Estratégico',
                name: 'Sistema CRM',
                investment: 'Alto',
                scope: 'Medio',
                timeHorizon: 'Largo',
                savings: 'Alto',
                benefits: 'Alto',
                satisfaction: 'Alto',
                selected: false,
                effortScore: 6.5,
                impactScore: 8.2,
                strategicAlignment: 85,
                active: true
            }
        ]
    } finally {
        loading.value = false
    }
}

const handleToggleSelection = async (id: number) => {
    const initiative = initiatives.value.find(init => init.id === id)
    if (initiative) {
        initiative.selected = !initiative.selected
        try {
            await toggleSelection(id, initiative.selected)
        } catch (error) {
            console.error('Error toggling selection:', error)
            // Revertir en caso de error
            initiative.selected = !initiative.selected
        }
    }
}

onMounted(() => {
    fetchInitiatives()
})
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Análisis de Iniciativas" 
            subtitle="Evalúa y prioriza iniciativas mediante la matriz Esfuerzo vs Impacto"
        />

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-boxed bg-base-200">
            <a 
                role="tab" 
                class="tab"
                :class="{ 'tab-active': activeTab === 'configuration' }"
                @click="activeTab = 'configuration'"
            >
                <span class="material-symbols-outlined text-sm mr-2">settings</span>
                Configuración de Matriz
            </a>
            <a 
                role="tab" 
                class="tab"
                :class="{ 'tab-active': activeTab === 'evaluation' }"
                @click="activeTab = 'evaluation'"
            >
                <span class="material-symbols-outlined text-sm mr-2">assessment</span>
                Evaluación de Iniciativas
            </a>
        </div>

        <!-- Tab Content -->
        <div v-if="loading" class="flex justify-center py-12">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <div v-else>
            <ConfigurationTab v-if="activeTab === 'configuration'" />
            <EvaluationTab 
                v-if="activeTab === 'evaluation'"
                :initiatives="initiatives"
                :onToggleSelection="handleToggleSelection"
                :onRefresh="fetchInitiatives"
            />
        </div>

        <InitiativeModal :onRefresh="fetchInitiatives" />
    </div>
</template>

<style scoped>
.tab {
    transition: all 0.2s ease;
}

.tab:hover {
    background-color: oklch(var(--b3));
}

.tab-active {
    background-color: oklch(var(--p));
    color: oklch(var(--pc));
}
</style>
