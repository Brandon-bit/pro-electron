<script setup lang="ts">
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import { useBenefitsActions } from '@/modules/RRHH/GestionBeneficios/composables/useBenefitsActions'

const { getEmployeesBySearch, getRecognitionCategories } = useBenefitsActions()

const categories = getRecognitionCategories()
const timeout = ref<ReturnType<typeof setTimeout> | null>(null)
const currentPage = ref(1)
const results = ref<any[]>([])
const loading = ref(false)
const currentQuery = ref<string>('')
const suppressSearch = ref(false)
const noResults = ref(false)

const { value: employeeValue } = useField<string>('toEmployeeName')
const { value: employeeIdValue } = useField<number | undefined>('toEmployeeId')

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

const handleSearch = (event: Event) => {
    const target = event.target as HTMLInputElement
    currentQuery.value = target.value

    if (timeout.value) {
        clearTimeout(timeout.value)
    }

    if (!currentQuery.value) {
        results.value = []
        noResults.value = false
        return
    }

    timeout.value = setTimeout(() => {
        currentPage.value = 1
        searchEmployees(1)
    }, 300)
}

const selectEmployee = (employee: any) => {
    suppressSearch.value = true
    employeeValue.value = employee.label
    employeeIdValue.value = employee.id
    results.value = []
    currentQuery.value = ''
}

watch(employeeValue, (newValue) => {
    if (!suppressSearch.value && !newValue) {
        employeeIdValue.value = undefined
        results.value = []
    }
    suppressSearch.value = false
})
</script>

<template>
    <div class="grid grid-cols-12 gap-4">
        <!-- Buscar Empleado -->
        <div class="col-span-12 relative">
            <label class="label">
                <span class="label-text">Empleado <span class="text-error">*</span></span>
            </label>
            <input
                type="text"
                name="toEmployeeName"
                class="input input-bordered w-full"
                placeholder="Buscar empleado..."
                :value="employeeValue"
                @input="handleSearch"
                autocomplete="off"
            />
            
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

        <!-- Categoría -->
        <BaseFormSelect
            class="col-span-12"
            name="category"
            label="Categoría"
            :options="categories"
            :required="true"
        />

        <!-- Mensaje -->
        <BaseTextArea
            class="col-span-12"
            name="message"
            label="Mensaje"
            placeholder="Escribe un mensaje de reconocimiento..."
            :required="true"
            rows="4"
        />

        <!-- Puntos -->
        <BaseFormInput
            class="col-span-12"
            name="points"
            label="Puntos a otorgar"
            type="number"
            placeholder="50"
            min="10"
            :required="true"
        />

        <!-- Información -->
        <div class="col-span-12 bg-warning/10 p-4 rounded-lg">
            <div class="flex gap-2">
                <span class="material-symbols-outlined text-warning text-sm">stars</span>
                <div class="text-xs text-base-content/70">
                    <p class="font-semibold mb-1">Reconocimiento Peer-to-Peer:</p>
                    <p>Los puntos otorgados se sumarán al balance del empleado reconocido.</p>
                </div>
            </div>
        </div>
    </div>
</template>
