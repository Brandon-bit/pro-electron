<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ConfigurationTab from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/components/ConfigurationTab.vue'
import EvaluationTab from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/components/EvaluationTab.vue'
import InitiativeModal from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/components/InitiativeModal.vue'
import { useInitiativeActions } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/composables/useInitiativeActions'

const { getCriteria } = useInitiativeActions()

const activeTab = ref('evaluation')
const loading = ref(false)
const refreshKey = ref(0)

const loadCriteria = async () => {
    loading.value = true
    try {
        await getCriteria()
    } catch (error) {
        console.error('Error loading criteria:', error)
    } finally {
        loading.value = false
    }
}

const handleRefresh = () => {
    refreshKey.value++
}

onMounted(() => {
    loadCriteria()
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
                :key="refreshKey"
                :onRefresh="handleRefresh"
            />
        </div>

        <InitiativeModal :onRefresh="handleRefresh" />
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
