<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import useInitiativeStore from '@/modules/GestionDeProyectos/AnalisisDeIniciativas/store/initiativeStore'
import { showNotification } from '@/utils/toastNotifications'

const initiativeStore = useInitiativeStore()

const criteria = ref({
    effort: {
        investment: initiativeStore.matrixCriteria.effort.investment,
        scope: initiativeStore.matrixCriteria.effort.scope,
        timeHorizon: initiativeStore.matrixCriteria.effort.timeHorizon
    },
    impact: {
        savings: initiativeStore.matrixCriteria.impact.savings,
        benefits: initiativeStore.matrixCriteria.impact.benefits,
        satisfaction: initiativeStore.matrixCriteria.impact.satisfaction
    }
})

const saveConfiguration = () => {
    initiativeStore.updateCriteria(criteria.value)
    showNotification('Configuración guardada exitosamente', 'success')
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Criterios de Evaluación</h2>
            <p class="text-sm opacity-70">Configura los pesos y valores para cada criterio</p>
            
            <div class="space-y-6 mt-6">
                <!-- Esfuerzo -->
                <div>
                    <h3 class="text-lg font-semibold mb-3">Esfuerzo</h3>
                    <div class="grid gap-4 md:grid-cols-3">
                        <div class="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p class="font-medium mb-2">Inversión</p>
                            <p class="text-sm opacity-70">Peso: {{ criteria.effort.investment }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model="criteria.effort.investment"
                                class="range range-primary range-sm mt-2" 
                            />
                        </div>
                        <div class="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p class="font-medium mb-2">Alcance</p>
                            <p class="text-sm opacity-70">Peso: {{ criteria.effort.scope }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model="criteria.effort.scope"
                                class="range range-primary range-sm mt-2" 
                            />
                        </div>
                        <div class="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p class="font-medium mb-2">Horizonte de Tiempo</p>
                            <p class="text-sm opacity-70">Peso: {{ criteria.effort.timeHorizon }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model="criteria.effort.timeHorizon"
                                class="range range-primary range-sm mt-2" 
                            />
                        </div>
                    </div>
                </div>

                <!-- Impacto -->
                <div>
                    <h3 class="text-lg font-semibold mb-3">Impacto</h3>
                    <div class="grid gap-4 md:grid-cols-3">
                        <div class="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p class="font-medium mb-2">Ahorro/Ingresos</p>
                            <p class="text-sm opacity-70">Peso: {{ criteria.impact.savings }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model="criteria.impact.savings"
                                class="range range-primary range-sm mt-2" 
                            />
                        </div>
                        <div class="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p class="font-medium mb-2">Beneficios</p>
                            <p class="text-sm opacity-70">Peso: {{ criteria.impact.benefits }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model="criteria.impact.benefits"
                                class="range range-primary range-sm mt-2" 
                            />
                        </div>
                        <div class="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p class="font-medium mb-2">Satisfacción al Cliente</p>
                            <p class="text-sm opacity-70">Peso: {{ criteria.impact.satisfaction }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model="criteria.impact.satisfaction"
                                class="range range-primary range-sm mt-2" 
                            />
                        </div>
                    </div>
                </div>

                <BaseButton 
                    text="Guardar Configuración" 
                    @click="saveConfiguration" 
                    icon="settings" 
                />
            </div>
        </div>
    </div>
</template>
