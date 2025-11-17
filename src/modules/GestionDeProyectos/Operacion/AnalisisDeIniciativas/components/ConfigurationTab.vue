<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import useInitiativeStore from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/store/initiativeStore'
import { useInitiativeActions } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/composables/useInitiativeActions'
import { showNotification } from '@/utils/toastNotifications'
import type { CriteriaRequestType } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'

const initiativeStore = useInitiativeStore()
const { createCriteria, updateCriteria } = useInitiativeActions()

const criteria = ref<CriteriaRequestType>({
    alcance: initiativeStore.matrixCriteria.alcance,
    inversion: initiativeStore.matrixCriteria.inversion,
    horizonteDeTiempo: initiativeStore.matrixCriteria.horizonteDeTiempo,
    ahorroIngresos: initiativeStore.matrixCriteria.ahorroIngresos,
    beneficios: initiativeStore.matrixCriteria.beneficios,
    satisfaccionAlCliente: initiativeStore.matrixCriteria.satisfaccionAlCliente
})

const loading = ref(false)

const handleCreateCriteria = async () => {
    loading.value = true
    try {
        const response = await createCriteria()
        showNotification(response.message, response.status as 'success' | 'error')
        criteria.value = {
            alcance: 50,
            inversion: 50,
            horizonteDeTiempo: 50,
            ahorroIngresos: 50,
            beneficios: 50,
            satisfaccionAlCliente: 50
        }
    } catch (error) {
        showNotification('Error al crear criterios', 'error')
    } finally {
        loading.value = false
    }
}

// Actualizar criterios automáticamente cuando cambian los valores
watch(criteria, async (newCriteria) => {
    if (initiativeStore.criteriaExist) {
        try {
            await updateCriteria(newCriteria)
        } catch (error) {
            console.error('Error al actualizar criterios:', error)
        }
    }
}, { deep: true })
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Criterios de Evaluación</h2>
            <p class="text-sm opacity-70">Configura los pesos y valores para cada criterio</p>
            
            <!-- Botón para crear criterios si no existen -->
            <div v-if="!initiativeStore.criteriaExist" class="alert alert-info mt-4">
                <span class="material-symbols-outlined">info</span>
                <div>
                    <h3 class="font-bold">No hay criterios configurados</h3>
                    <div class="text-sm">Crea los criterios de evaluación para comenzar a analizar iniciativas</div>
                </div>
                <BaseButton 
                    text="Crear Criterios" 
                    @click="handleCreateCriteria" 
                    icon="add"
                    :disabled="loading"
                />
            </div>
            
            <div v-else class="space-y-6 mt-6">
                <!-- Esfuerzo -->
                <div>
                    <h3 class="text-lg font-semibold mb-3">Esfuerzo</h3>
                    <div class="grid gap-4 md:grid-cols-3">
                        <div class="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p class="font-medium mb-2">Inversión</p>
                            <p class="text-sm opacity-70">Peso: {{ criteria.inversion }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model.number="criteria.inversion"
                                class="range range-primary range-sm mt-2" 
                            />
                        </div>
                        <div class="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p class="font-medium mb-2">Alcance</p>
                            <p class="text-sm opacity-70">Peso: {{ criteria.alcance }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model.number="criteria.alcance"
                                class="range range-primary range-sm mt-2" 
                            />
                        </div>
                        <div class="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p class="font-medium mb-2">Horizonte de Tiempo</p>
                            <p class="text-sm opacity-70">Peso: {{ criteria.horizonteDeTiempo }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model.number="criteria.horizonteDeTiempo"
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
                            <p class="text-sm opacity-70">Peso: {{ criteria.ahorroIngresos }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model.number="criteria.ahorroIngresos"
                                class="range range-primary range-sm mt-2" 
                            />
                        </div>
                        <div class="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p class="font-medium mb-2">Beneficios</p>
                            <p class="text-sm opacity-70">Peso: {{ criteria.beneficios }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model.number="criteria.beneficios"
                                class="range range-primary range-sm mt-2" 
                            />
                        </div>
                        <div class="p-4 rounded-lg bg-base-200 border border-base-300">
                            <p class="font-medium mb-2">Satisfacción al Cliente</p>
                            <p class="text-sm opacity-70">Peso: {{ criteria.satisfaccionAlCliente }}%</p>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model.number="criteria.satisfaccionAlCliente"
                                class="range range-primary range-sm mt-2" 
                            />
                        </div>
                    </div>
                </div>

                <div class="alert alert-success mt-4">
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Los cambios se guardan automáticamente</span>
                </div>
            </div>
        </div>
    </div>
</template>
