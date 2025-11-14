<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import SelectProceso from '../components/SelectProceso.vue'
import CodigoColores from '../components/CodigoColores.vue'
import OlaCard from '../components/OlaCard.vue'
import AddOlaModal from '../components/AddOlaModal.vue'
import VoBoModal from '../components/VoBoModal.vue'
import { useOlaStore } from '../store/olaStore'
import { useOlaUtils } from '../composables/useOlaUtils'

const olaStore = useOlaStore()
const { titulosColumnas } = useOlaUtils()

const isAddOlaModalOpen = ref(false)
const isVoBoModalOpen = ref(false)

const procesoNombre = computed(() => {
    return olaStore.procesoSeleccionado?.nombre || ''
})

const openAddOlaModal = () => {
    isAddOlaModalOpen.value = true
}

const closeAddOlaModal = () => {
    isAddOlaModalOpen.value = false
}

const openVoBoModal = () => {
    isVoBoModalOpen.value = true
}

const closeVoBoModal = () => {
    isVoBoModalOpen.value = false
}
</script>

<template>
    <div class="container mx-auto">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div class="flex-1">
                <BaseTitle title="Implementación de Olas" :subtitle="procesoNombre" />
            </div>
            <div class="w-full md:w-auto md:min-w-[300px]">
                <SelectProceso />
            </div>
        </div>

        <div class="divider"></div>

        <!-- Contenido cuando hay proceso seleccionado -->
        <div v-if="olaStore.hasProcesoSeleccionado">
            <!-- Botones y Código de Colores -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <!-- Botones de acción -->
                <div class="lg:col-span-2 flex flex-wrap gap-3 items-start">
                    <button
                        @click="openAddOlaModal"
                        class="btn btn-neutral"
                    >
                        <span class="material-symbols-outlined">add</span>
                        Agregar
                    </button>
                    <button
                        @click="openVoBoModal"
                        class="btn btn-info"
                        :disabled="olaStore.enRevision"
                    >
                        <span class="material-symbols-outlined">send</span>
                        Mandar a VoBo
                    </button>
                </div>

                <!-- Código de colores -->
                <div class="lg:col-span-1">
                    <CodigoColores />
                </div>
            </div>

            <!-- Tabla de Olas -->
            <div class="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                <table class="table table-sm w-full">
                    <!-- Headers -->
                    <thead class="bg-neutral text-neutral-content">
                        <tr>
                            <th
                                v-for="(titulo, index) in titulosColumnas"
                                :key="index"
                                class="text-center text-lg font-bold"
                            >
                                {{ titulo }}
                            </th>
                        </tr>
                    </thead>
                    <!-- Body -->
                    <tbody>
                        <tr>
                            <!-- Columna 0 - Inmediato -->
                            <td class="align-top p-4">
                                <div class="flex flex-col gap-3">
                                    <OlaCard
                                        v-for="ola in olaStore.olasAgrupadas.o1"
                                        :key="ola.id"
                                        :ola="ola"
                                    />
                                    <div
                                        v-if="olaStore.olasAgrupadas.o1.length === 0"
                                        class="text-center text-base-content/50 py-8"
                                    >
                                        Sin olas
                                    </div>
                                </div>
                            </td>

                            <!-- Columna 1 - Corto Plazo -->
                            <td class="align-top p-4">
                                <div class="flex flex-col gap-3">
                                    <OlaCard
                                        v-for="ola in olaStore.olasAgrupadas.o2"
                                        :key="ola.id"
                                        :ola="ola"
                                    />
                                    <div
                                        v-if="olaStore.olasAgrupadas.o2.length === 0"
                                        class="text-center text-base-content/50 py-8"
                                    >
                                        Sin olas
                                    </div>
                                </div>
                            </td>

                            <!-- Columna 2 - Mediano Plazo -->
                            <td class="align-top p-4">
                                <div class="flex flex-col gap-3">
                                    <OlaCard
                                        v-for="ola in olaStore.olasAgrupadas.o3"
                                        :key="ola.id"
                                        :ola="ola"
                                    />
                                    <div
                                        v-if="olaStore.olasAgrupadas.o3.length === 0"
                                        class="text-center text-base-content/50 py-8"
                                    >
                                        Sin olas
                                    </div>
                                </div>
                            </td>

                            <!-- Columna 3 - Largo Plazo -->
                            <td class="align-top p-4">
                                <div class="flex flex-col gap-3">
                                    <OlaCard
                                        v-for="ola in olaStore.olasAgrupadas.o4"
                                        :key="ola.id"
                                        :ola="ola"
                                    />
                                    <div
                                        v-if="olaStore.olasAgrupadas.o4.length === 0"
                                        class="text-center text-base-content/50 py-8"
                                    >
                                        Sin olas
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Estado vacío - Sin proceso seleccionado -->
        <div v-else class="text-center py-16">
            <span class="material-symbols-outlined text-6xl text-base-content/30">task_alt</span>
            <p class="mt-4 text-xl text-base-content/70">
                Selecciona un proceso para ver las olas de implementación
            </p>
        </div>

        <!-- Modales -->
        <AddOlaModal :is-open="isAddOlaModalOpen" @close="closeAddOlaModal" />
        <VoBoModal :is-open="isVoBoModalOpen" @close="closeVoBoModal" />
    </div>
</template>
