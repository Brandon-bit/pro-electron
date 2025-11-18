<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import EDTTree from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/components/EDTTree.vue'
import StageModal from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/components/StageModal.vue'
import ActivityModal from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/components/ActivityModal.vue'
import SubActivityModal from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/components/SubActivityModal.vue'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { useEDTActions } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/useEDTActions'
import { showNotification } from '@/utils/toastNotifications'

const router = useRouter()
const edtStore = useEDTStore()
const { loadInitiatives, loadEDT } = useEDTActions()

// Opciones para el selector de iniciativas
const initiativesOptions = computed(() => 
    edtStore.initiativesOptions.map(i => ({
        value: i.dni,
        label: i.label
    }))
)

const selectedInitiativeId = computed({
    get: () => edtStore.selectedInitiative?.dni || null,
    set: async (value: number | null) => {
        if (value) {
            await loadEDT(value)
        }
    }
})

// Validar que el EDT tenga al menos una etapa
const hasStages = computed(() => {
    return edtStore.edtRawData?.etapas && edtStore.edtRawData.etapas.length > 0
})

// Validar que tenga al menos una actividad
const hasActivities = computed(() => {
    if (!edtStore.edtRawData?.etapas) return false
    return edtStore.edtRawData.etapas.some(etapa => 
        etapa.actividades && etapa.actividades.length > 0
    )
})

// Handler para convertir iniciativa a proyecto
const handleConvertToProject = () => {
    if (!edtStore.selectedInitiative) {
        showNotification('No hay iniciativa seleccionada', 'error')
        return
    }

    // Validación: Debe tener al menos una etapa
    if (!hasStages.value) {
        showNotification('Debes agregar al menos una etapa antes de convertir a proyecto', 'warning')
        return
    }

    // Validación: Debe tener al menos una actividad
    if (!hasActivities.value) {
        showNotification('Debes agregar al menos una actividad antes de convertir a proyecto', 'warning')
        return
    }

    // Navegar a Alta de Proyectos con query params
    router.push({
        name: 'AltaDeProyectos',
        query: {
            fromInitiative: edtStore.selectedInitiative.dni.toString(),
            initiativeName: edtStore.selectedInitiative.label
        }
    })

    showNotification('Redirigiendo a creación de proyecto...', 'info')
}

onMounted(async () => {
    await loadInitiatives()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="EDT - Estructura de Desglose del Trabajo" 
            subtitle="Construye la estructura jerárquica de la iniciativa"
        />

        <!-- Selector de iniciativa -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title text-lg mb-4">Seleccionar Iniciativa</h3>
                <div class="form-control w-full max-w-md">
                    <label class="label">
                        <span class="label-text">Iniciativa</span>
                    </label>
                    <select 
                        v-model="selectedInitiativeId" 
                        class="select select-bordered w-full"
                        :disabled="edtStore.isLoading"
                    >
                        <option :value="null">Selecciona una iniciativa...</option>
                        <option 
                            v-for="option in initiativesOptions" 
                            :key="option.value" 
                            :value="option.value"
                        >
                            {{ option.label }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Loading state -->
        <div v-if="edtStore.isLoading" class="flex items-center justify-center py-12">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <!-- Árbol EDT o estado vacío -->
        <div v-else-if="!edtStore.edtRoot" class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <span class="material-symbols-outlined text-6xl opacity-30 mb-4">account_tree</span>
                    <h3 class="text-xl font-semibold mb-2">No hay EDT disponible</h3>
                    <p class="text-sm opacity-70">
                        Selecciona una iniciativa para visualizar su estructura EDT
                    </p>
                </div>
            </div>
        </div>
        
        <!-- Árbol EDT -->
        <template v-else>
            <EDTTree />
            
            <!-- Botón de conversión a proyecto -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold mb-1">¿Estructura EDT completa?</h3>
                            <p class="text-sm opacity-70">
                                Convierte esta iniciativa en un proyecto para continuar con la planificación
                            </p>
                            <div class="mt-2 flex gap-2 text-xs">
                                <span class="badge badge-sm" :class="hasStages ? 'badge-success' : 'badge-error'">
                                    {{ hasStages ? '✓' : '✗' }} Etapas
                                </span>
                                <span class="badge badge-sm" :class="hasActivities ? 'badge-success' : 'badge-error'">
                                    {{ hasActivities ? '✓' : '✗' }} Actividades
                                </span>
                            </div>
                        </div>
                        <BaseButton
                            text="Convertir a Proyecto"
                            icon="rocket_launch"
                            class-name="btn-primary btn-lg"
                            :disabled="!hasStages || !hasActivities"
                            @click="handleConvertToProject"
                        />
                    </div>
                </div>
            </div>
        </template>

        <!-- Modales -->
        <StageModal />
        <ActivityModal />
        <SubActivityModal />
    </div>
</template>
