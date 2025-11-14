<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import NewYearModal from '../components/NewYearModal.vue'
import NewMonthModal from '../components/NewMonthModal.vue'
import { useGoals } from '../composables/useGoals'
import type { YearGoal, MonthGoal } from '../types/goalTypes'

const { yearGoals, loading, fetchGoals, createYear, createMonth, deleteMonth } = useGoals()
const newYearModalRef = ref<InstanceType<typeof NewYearModal> | null>(null)
const newMonthModalRef = ref<InstanceType<typeof NewMonthModal> | null>(null)

onMounted(() => {
    fetchGoals()
})

// Abrir modal de nuevo año
const openNewYearModal = () => {
    newYearModalRef.value?.openModal()
}

// Abrir modal de nuevo mes
const openNewMonthModal = (añoId: string | number) => {
    newMonthModalRef.value?.openModal(añoId)
}

// Confirmar creación de año
const handleCreateYear = async (año: number) => {
    await createYear(año)
}

// Confirmar creación de mes
const handleCreateMonth = async (data: { añoId: string | number, mes: string, clientes: number, inversion: number }) => {
    await createMonth(data.añoId, data.mes, data.clientes, data.inversion)
}

// Eliminar mes
const handleDeleteMonth = async (añoId: string | number, mesId: string | number) => {
    if (confirm('¿Está seguro de eliminar esta meta?')) {
        await deleteMonth(añoId, mesId)
    }
}

// Formatear moneda
const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString('es-MX')}`
}
</script>

<template>
    <div>
        <BaseTitle 
            title="Metas" 
            subtitle="Gestión de metas por año y mes"
        />
        
        <div class="container mx-auto p-6">
            <!-- Botón Nueva fecha meta -->
            <div class="mb-6">
                <button 
                    class="btn btn-primary"
                    @click="openNewYearModal"
                >
                    <span class="material-symbols-outlined">add</span>
                    Nueva fecha meta
                </button>
            </div>

            <!-- Loading -->
            <div v-if="loading" class="flex justify-center py-12">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <!-- Lista de años -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                    v-for="year in yearGoals" 
                    :key="year.id"
                    class="card bg-base-100 shadow-xl"
                >
                    <div class="card-body">
                        <!-- Título del año -->
                        <h2 class="card-title text-2xl justify-center mb-4">
                            Año {{ year.año }}
                        </h2>

                        <!-- Botón Agregar mes -->
                        <button 
                            class="btn btn-primary btn-sm mb-4"
                            @click="openNewMonthModal(year.id)"
                        >
                            <span class="material-symbols-outlined text-sm">add</span>
                            Agregar mes
                        </button>

                        <!-- Tabla de meses -->
                        <div v-if="year.meses.length > 0" class="overflow-x-auto">
                            <table class="table table-sm table-zebra w-full">
                                <thead class="bg-neutral text-neutral-content">
                                    <tr>
                                        <th>Mes</th>
                                        <th>Clientes</th>
                                        <th>Inversión</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="month in year.meses" :key="month.id">
                                        <td>{{ month.mes }}</td>
                                        <td>{{ month.clientes }}</td>
                                        <td>{{ formatCurrency(month.inversion) }}</td>
                                        <td class="text-right">
                                            <button
                                                class="btn btn-error btn-xs"
                                                @click="handleDeleteMonth(year.id, month.id)"
                                            >
                                                <span class="material-symbols-outlined text-xs">close</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Mensaje cuando no hay meses -->
                        <div v-else class="text-center py-4 text-base-content/50">
                            <p>No hay metas registradas</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mensaje cuando no hay años -->
            <div v-if="!loading && yearGoals.length === 0" class="text-center py-12">
                <span class="material-symbols-outlined text-6xl text-base-content/30 mb-4">
                    calendar_today
                </span>
                <p class="text-lg text-base-content/50">
                    No hay años registrados. Crea uno nuevo para comenzar.
                </p>
            </div>
        </div>

        <!-- Modales -->
        <NewYearModal
            ref="newYearModalRef"
            @confirm="handleCreateYear"
        />

        <NewMonthModal
            ref="newMonthModalRef"
            @confirm="handleCreateMonth"
        />
    </div>
</template>
