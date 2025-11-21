<script setup lang="ts">
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { useBenefitsActions } from '@/modules/RRHH/GestionBeneficios/composables/useBenefitsActions'

const { getEmployeesBySearch } = useBenefitsActions()

const timeout = ref<ReturnType<typeof setTimeout> | null>(null)
const currentPage = ref(1)
const results = ref<any[]>([])
const loading = ref(false)
const currentQuery = ref<string>('')
const suppressSearch = ref(false)
const noResults = ref(false)

const { value: employeeValue } = useField<string>('employeeName')
const { value: employeeIdValue, errorMessage: employeeIdError } = useField<number | undefined>('employeeId')

const searchEmployees = async (page: number, limit: number = 10) => {
    if (!currentQuery.value) {
        results.value = []
        noResults.value = false
        return
    }

    loading.value = true
    noResults.value = false

    const result = await getEmployeesBySearch(currentQuery.value, limit, page)
    const employees = result.employees

    if (page === 1) {
        results.value = employees
    } else {
        results.value = [...results.value, ...employees]
    }

    if (results.value.length === 0) {
        noResults.value = true
    }

    loading.value = false
}

const selectEmployee = (employee: any) => {
    suppressSearch.value = true
    employeeValue.value = employee.label
    employeeIdValue.value = employee.id
    results.value = []
    currentQuery.value = ''
}

watch(employeeValue, (newValue) => {
    if (suppressSearch.value) {
        suppressSearch.value = false
        return
    }

    if (timeout.value) {
        clearTimeout(timeout.value)
    }

    currentQuery.value = (newValue ?? '').trim()
    employeeIdValue.value = undefined
    noResults.value = false

    if (!currentQuery.value) {
        results.value = []
        return
    }

    timeout.value = setTimeout(() => {
        currentPage.value = 1
        searchEmployees(1)
    }, 300)
})
</script>

<template>
    <div class="space-y-4">
        <!-- Buscar Empleado -->
        <div class="relative">
            <BaseFormInput
                name="employeeName"
                label="Empleado"
                placeholder="Buscar empleado por nombre..."
                :required="true"
                inputClass="input-bordered"
                class="!mb-0"
            />
            <input type="hidden" name="employeeId" :value="employeeIdValue" />
            <p v-if="employeeIdError" class="text-error text-sm mt-1">{{ employeeIdError }}</p>

            <!-- Resultados de búsqueda -->
            <div
                v-if="results.length > 0 || loading || noResults"
                class="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
                <div v-if="loading" class="p-4 text-center">
                    <span class="loading loading-spinner loading-sm"></span>
                    <p class="text-sm text-base-content/60 mt-2">Buscando...</p>
                </div>

                <div v-else-if="noResults" class="p-4 text-center text-sm text-base-content/60">
                    No se encontraron empleados
                </div>

                <div v-else>
                    <button
                        v-for="employee in results"
                        :key="employee.id"
                        type="button"
                        class="w-full px-4 py-3 text-left hover:bg-base-200 transition-colors flex items-center gap-3"
                        @click="selectEmployee(employee)"
                    >
                        <div class="avatar placeholder">
                            <div class="bg-primary text-primary-content rounded-full w-10">
                                <span class="text-sm">{{ employee.label.charAt(0) }}</span>
                            </div>
                        </div>
                        <span class="font-medium">{{ employee.label }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
