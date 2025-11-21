<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EligibilityCard from '@/modules/RRHH/GestionBeneficios/components/EligibilityCard.vue'
import type { EmployeeEligibility } from '@/modules/RRHH/GestionBeneficios/types/benefitsTypes'

const props = defineProps<{
    onViewDetails: (employeeId: number) => void
    loadEligibleEmployees: () => Promise<void>
}>()

const eligibleEmployees = ref<EmployeeEligibility[]>([])
const loading = ref(false)

onMounted(() => {
    props.loadEligibleEmployees()
})

defineExpose({ eligibleEmployees, loading })
</script>

<template>
    <div class="card bg-base-100 shadow-md">
        <div class="card-body">
            <h2 class="card-title flex items-center gap-2">
                <span class="material-symbols-outlined">verified</span>
                Elegibilidad de Empleados
            </h2>
            <p class="text-base-content/70 mb-4">
                Empleados elegibles para beneficios según su desempeño
            </p>

            <div v-if="loading" class="text-center py-8">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <EligibilityCard
                    v-for="employee in eligibleEmployees"
                    :key="employee.employeeId"
                    :employee="employee"
                    @view-details="onViewDetails"
                />
            </div>
        </div>
    </div>
</template>
