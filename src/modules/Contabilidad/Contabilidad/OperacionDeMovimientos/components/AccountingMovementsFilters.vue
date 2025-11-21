<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import useAccountingMovementsStore from '@/modules/Contabilidad/Contabilidad/OperacionDeMovimientos/store/accountingMovementsStore'
import { useAccountingMovementsActions } from '@/modules/Contabilidad/Contabilidad/OperacionDeMovimientos/composables/useAccountingMovementsActions'
import { showNotification } from '@/utils/toastNotifications'

const accountingMovementsStore = useAccountingMovementsStore()
const { searchMovements, getAccountAuxiliaries, getCostCenterOptions } = useAccountingMovementsActions()

// Options
const costCenterOptions = ref<Array<{ id: string; label: string }>>([])

// Computed properties con getter/setter para v-model
const searchFilters = computed({
    get: () => accountingMovementsStore.searchFilters,
    set: (value: any) => accountingMovementsStore.setSearchFilters(value)
})

onMounted(() => {
    costCenterOptions.value = getCostCenterOptions() as Array<{ id: string; label: string }>
})

const handleSearch = async () => {
    try {
        const movements = await searchMovements(accountingMovementsStore.searchFilters)
        accountingMovementsStore.setMovements(movements)
        accountingMovementsStore.setShowResults(true)
        showNotification(`${movements.length} movimientos encontrados`, 'success')
    } catch (error) {
        console.error(error)
        showNotification('Error al buscar movimientos', 'error')
    }
}

const handleViewAuxiliaries = async () => {
    try {
        const account = accountingMovementsStore.searchFilters.account
        if (!account) {
            showNotification('Por favor ingrese una cuenta para ver auxiliares', 'warning')
            return
        }
        const movements = await getAccountAuxiliaries(account)
        accountingMovementsStore.setMovements(movements)
        accountingMovementsStore.setShowResults(true)
        showNotification(`Auxiliares de cuenta ${account}`, 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al obtener auxiliares', 'error')
    }
}
</script>

<template>
    <div class="card bg-base-100 border border-base-content/10">
        <div class="card-body">
            <h3 class="card-title text-lg">Motor de Búsqueda y Filtrado</h3>
            <p class="text-sm text-gray-500 mb-4">
                Localice movimientos específicos usando los filtros disponibles
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <BaseFormInput
                    v-model="searchFilters.startDate"
                    name="startDate"
                    label="Fecha inicio"
                    type="date"
                />
                <BaseFormInput
                    v-model="searchFilters.endDate"
                    name="endDate"
                    label="Fecha fin"
                    type="date"
                />
                <BaseFormInput
                    v-model="searchFilters.account"
                    name="account"
                    label="Cuenta contable"
                    placeholder="Buscar cuenta..."
                    icon="search"
                />
                <BaseFormInput
                    v-model="searchFilters.policyFolio"
                    name="policyFolio"
                    label="Folio de póliza"
                    placeholder="Ej: D-001, I-045..."
                />
                <BaseFormSelect
                    v-model="searchFilters.costCenter"
                    name="costCenter"
                    label="Centro de costo"
                    :options="costCenterOptions"
                />
                <BaseFormInput
                    v-model="searchFilters.sourceDocument"
                    name="sourceDocument"
                    label="Documento origen"
                    placeholder="Ej: FAC-1234..."
                />
            </div>

            <div class="flex gap-3 mt-6">
                <BaseButton 
                    text="Buscar movimientos"
                    icon="search"
                    @click="handleSearch"
                />
                <BaseButton 
                    text="Ver auxiliares por cuenta"
                    icon="trending_up"
                    variant="outline"
                    @click="handleViewAuxiliaries"
                />
            </div>
        </div>
    </div>
</template>
