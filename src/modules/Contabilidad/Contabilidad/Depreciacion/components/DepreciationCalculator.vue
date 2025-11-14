<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import useDepreciationStore from '@/modules/Contabilidad/Contabilidad/Depreciacion/store/depreciationStore'
import { useDepreciationActions } from '@/modules/Contabilidad/Contabilidad/Depreciacion/composables/useDepreciationActions'
import { showNotification } from '@/utils/toastNotifications'

const depreciationStore = useDepreciationStore()
const { calculateDepreciation, getMonthOptions, getYearOptions, getMethodOptions } = useDepreciationActions()

// Options
const monthOptions = ref<Array<{ id: string; label: string }>>([])
const yearOptions = ref<Array<{ id: string; label: string }>>([])
const methodOptions = ref<Array<{ id: string; label: string }>>([])

// Computed properties con getter/setter para v-model
const selectedMonth = computed({
    get: () => depreciationStore.selectedMonth,
    set: (value: string) => depreciationStore.setMonth(value)
})

const selectedYear = computed({
    get: () => depreciationStore.selectedYear,
    set: (value: string) => depreciationStore.setYear(value)
})

const selectedMethod = computed({
    get: () => depreciationStore.depreciationMethod,
    set: (value: any) => depreciationStore.setMethod(value)
})

onMounted(() => {
    monthOptions.value = getMonthOptions() as Array<{ id: string; label: string }>
    yearOptions.value = getYearOptions() as Array<{ id: string; label: string }>
    methodOptions.value = getMethodOptions() as Array<{ id: string; label: string }>
})

const handleCalculateDepreciation = async () => {
    try {
        const assets = await calculateDepreciation(
            depreciationStore.selectedMonth,
            depreciationStore.selectedYear,
            depreciationStore.depreciationMethod
        )
        depreciationStore.setDepreciableAssets(assets)
        depreciationStore.setCalculationPerformed(true)
        depreciationStore.setPolicyGenerated(false)
        showNotification('Cálculo de depreciación completado', 'success')
    } catch (error) {
        console.error(error)
        showNotification('Error al calcular la depreciación', 'error')
    }
}
</script>

<template>
    <div class="card bg-base-100 border border-base-content/10">
        <div class="card-body">
            <h3 class="card-title text-lg">Motor de Cálculo de Depreciación</h3>
            <p class="text-sm text-gray-500 mb-4">
                Configure los parámetros para calcular la depreciación del periodo
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BaseFormSelect
                    v-model="selectedMonth"
                    name="selectedMonth"
                    label="Mes a depreciar"
                    :options="monthOptions"
                />
                <BaseFormSelect
                    v-model="selectedYear"
                    name="selectedYear"
                    label="Año"
                    :options="yearOptions"
                />
                <BaseFormSelect
                    v-model="selectedMethod"
                    name="selectedMethod"
                    label="Método de depreciación"
                    :options="methodOptions"
                />
            </div>

            <div class="flex gap-3 mt-6">
                <BaseButton 
                    text="Calcular depreciación del periodo"
                    icon="settings"
                    @click="handleCalculateDepreciation"
                />
            </div>
        </div>
    </div>
</template>
