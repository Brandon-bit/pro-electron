<script setup lang="ts">
import { onMounted, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import EDTTree from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/components/EDTTree.vue'
import EtapaModal from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/components/EtapaModal.vue'
import ActividadModal from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/components/ActividadModal.vue'
import SubActividadModal from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/components/SubActividadModal.vue'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { useEDTActions } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/useEDTActions'

const edtStore = useEDTStore()
const { cargarIniciativas, cargarEDT } = useEDTActions()

// Opciones para el selector de iniciativas
const iniciativasOptions = computed(() => 
    edtStore.iniciativasOpciones.map(i => ({
        value: i.dni,
        label: i.label
    }))
)

const selectedIniciativaId = computed({
    get: () => edtStore.selectedIniciativa?.dni || null,
    set: async (value: number | null) => {
        if (value) {
            await cargarEDT(value)
        }
    }
})

onMounted(async () => {
    await cargarIniciativas()
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
                        v-model="selectedIniciativaId" 
                        class="select select-bordered w-full"
                        :disabled="edtStore.isLoading"
                    >
                        <option :value="null">Selecciona una iniciativa...</option>
                        <option 
                            v-for="option in iniciativasOptions" 
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
        <EDTTree v-else />

        <!-- Modales -->
        <EtapaModal />
        <ActividadModal />
        <SubActividadModal />
    </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
