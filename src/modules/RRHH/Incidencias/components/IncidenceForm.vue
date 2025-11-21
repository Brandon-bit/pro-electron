<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useField } from 'vee-validate'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'
import useIncidencesStore from '@/modules/RRHH/Incidencias/store/incidencesStore'
import {
    getEmployeesBySearch,
    getIncidenceStatuses
} from '@/modules/RRHH/Incidencias/utils/incidenceHelpers'
import {
    getCategoriasIncidenciasService,
    getTiposIncidenciasService
} from '@/modules/RRHH/Incidencias/services/incidencesService'

const modalStore = useModalStore()
const incidencesStore = useIncidencesStore()

// Form fields
const { value: employeeValue } = useField<string>('employeeName')
const { value: employeeIdValue } = useField<number>('employeeId')
const { value: categoryValue } = useField<string>('category')
const { value: typeValue } = useField<string>('type')

// Employee search
const timeout = ref<ReturnType<typeof setTimeout> | null>(null)
const currentPage = ref(1)
const results = ref<any[]>([])
const loading = ref(false)
const currentQuery = ref<string>('')
const suppressSearch = ref(false)
const noResults = ref(false)

// Computed
const mode = computed(() => modalStore.modals[incidencesStore.modalId]?.type)
const isEditing = computed(() => mode.value === 'UPDATE')
const isPending = computed(() => incidencesStore.selectedIncidence?.status === 'PENDIENTE')
const canEdit = computed(() => !isEditing.value || isPending.value)

// Categories and types
const categoryOptions = ref<any[]>([])
const typeOptions = ref<any[]>([])
const allTypes = ref<any[]>([])
const statusOptions = ref(getIncidenceStatuses())

// Type info for dynamic form fields
const selectedTypeInfo = computed(() => {
    if (!typeValue.value) return null
    return allTypes.value.find((t) => t.id === typeValue.value)
})

const requiresDateRange = computed(() => selectedTypeInfo.value?.requiereRangoFechas || false)
const requiresHours = computed(() => selectedTypeInfo.value?.requiereHoras || false)
const requiresJustification = computed(() => selectedTypeInfo.value?.requiereJustificacion || false)

// Watch category to update type options
watch(categoryValue, (newCategory) => {
    console.log('Category changed:', newCategory, 'Type:', typeof newCategory)
    console.log('All types:', allTypes.value)

    if (newCategory) {
        // Convertir a número si es string
        const categoryId = typeof newCategory === 'string' ? parseInt(newCategory) : newCategory
        console.log('Filtering by categoryId:', categoryId)

        const types = allTypes.value.filter((t) => {
            console.log(
                'Comparing:',
                t.idCategoriaPadre,
                '===',
                categoryId,
                '?',
                t.idCategoriaPadre === categoryId
            )
            return t.idCategoriaPadre === categoryId
        })

        console.log('Filtered types:', types)
        typeOptions.value = types.map((t) => ({ id: t.id, label: t.nombre }))

        // Reset type if not compatible with new category
        if (typeValue.value) {
            const isCompatible = types.some((t) => t.id === typeValue.value)
            if (!isCompatible) {
                typeValue.value = '' as any
            }
        }
    } else {
        typeOptions.value = []
    }
})

// Employee search logic
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
        employeeIdValue.value = 0
    }

    loading.value = false
}

watch(employeeValue, (query) => {
    if (timeout.value) clearTimeout(timeout.value)
    if (suppressSearch.value) {
        suppressSearch.value = false
        return
    }

    if (!canEdit.value) return

    currentQuery.value = query
    timeout.value = setTimeout(async () => {
        currentPage.value = 1
        results.value = []
        noResults.value = false

        if (employeeIdValue.value) {
            employeeIdValue.value = 0
        }

        if (query.trim()) {
            await searchEmployees(currentPage.value)
        } else {
            results.value = []
            noResults.value = false
            employeeIdValue.value = 0
        }
    }, 300)
})

const selectEmployee = (id: number, name: string) => {
    if (id) {
        suppressSearch.value = true
        employeeIdValue.value = id
        employeeValue.value = name
        currentPage.value = 1
        results.value = []
        noResults.value = false
    }
}

const onScroll = async (event: Event) => {
    const target = event.target as HTMLElement
    const bottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 5
    if (bottom && !loading.value && currentQuery.value) {
        currentPage.value++
        await searchEmployees(currentPage.value)
    }
}

// Load categories and types on mount
onMounted(async () => {
    console.log('=== Loading categories and types ===')

    // Load categories
    const categoriesResponse = await getCategoriasIncidenciasService()
    console.log('Categories response:', categoriesResponse)

    if (categoriesResponse.success) {
        categoryOptions.value = categoriesResponse.data.map((cat) => ({
            id: cat.id,
            label: cat.nombre
        }))
        console.log('Category options:', categoryOptions.value)
    }

    // Load all types
    const typesResponse = await getTiposIncidenciasService()
    console.log('Types response:', typesResponse)

    if (typesResponse.success) {
        allTypes.value = typesResponse.data
        console.log('All types loaded:', allTypes.value)

        // Initialize type options if editing
        if (isEditing.value && incidencesStore.selectedIncidence?.category) {
            const types = allTypes.value.filter(
                (t) => t.idCategoriaPadre === incidencesStore.selectedIncidence?.category
            )
            typeOptions.value = types.map((t) => ({ id: t.id, label: t.nombre }))
        }
    }
})
</script>

<template>
    <div class="space-y-4">
        <!-- Sección: Información del Empleado -->

        <div class="relative mt-3">
            <BaseFormInput
                name="employeeName"
                type="text"
                label="Empleado"
                inputClass="ps-10"
                :required="true"
                :readonly="!canEdit"
            />
            <span class="material-symbols-outlined absolute top-10 text-gray-500 left-2 z-10">
                search
            </span>
            <ul
                v-if="results.length && canEdit"
                @scroll="onScroll"
                class="mx-auto overflow-y-auto z-10 max-h-80 rounded-bl-lg rounded-br-lg border-b-1 border-s-1 border-e-1 border-gray-300 px-2 pb-2 pt-4"
            >
                <li
                    v-for="employee in results"
                    :key="employee.id"
                    @click="selectEmployee(employee.id, employee.label)"
                    class="p-1 hover:bg-gray-100 cursor-pointer"
                >
                    {{ employee.label }}
                </li>
            </ul>
            <div
                v-else-if="noResults && !loading && canEdit"
                class="mx-auto z-10 max-h-80 rounded-bl-lg rounded-br-lg border-b-1 border-s-1 border-e-1 border-gray-300 px-4 py-2 text-gray-500"
            >
                No hay coincidencias
            </div>
        </div>
        <div class="grid grid-cols-12 gap-3 mt-3">
            <div class="col-span-12 md:col-span-6">
                <BaseFormSelect
                    name="category"
                    label="Categoría"
                    :options="categoryOptions"
                    :required="true"
                    :readonly="!canEdit"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <BaseFormSelect
                    name="type"
                    label="Tipo"
                    :options="typeOptions"
                    :required="true"
                    :readonly="!canEdit"
                />
            </div>
        </div>
        <div class="grid grid-cols-12 gap-3 mt-3">
            <div :class="requiresDateRange ? 'col-span-6' : 'col-span-12'">
                <BaseFormInput
                    name="startDate"
                    type="date"
                    :label="requiresDateRange ? 'Fecha de inicio' : 'Fecha'"
                    :required="true"
                    :readonly="!canEdit"
                />
            </div>
            <div v-if="requiresDateRange" class="col-span-6">
                <BaseFormInput
                    name="endDate"
                    type="date"
                    label="Fecha de fin"
                    :required="true"
                    :readonly="!canEdit"
                />
            </div>
            <div v-if="requiresHours" class="col-span-12">
                <BaseFormInput
                    name="hours"
                    type="number"
                    label="Horas"
                    :required="true"
                    :readonly="!canEdit"
                    step="0.5"
                    min="0"
                    max="24"
                />
            </div>
        </div>

        <div class="space-y-3 mt-3">
            <div v-if="requiresJustification">
                <BaseFormCheckbox
                    name="justified"
                    label="¿Está justificada?"
                    :default="false"
                    :disabled="!canEdit"
                />
            </div>

            <BaseTextArea name="comments" label="Comentarios (opcional)" :readonly="!canEdit" />

            <BaseFormInputFile
                v-if="canEdit"
                name="evidence"
                label="Evidencia (opcional)"
                accept=".pdf,.jpg,.jpeg,.png"
                :multiple="false"
            />
        </div>
        <div v-if="isEditing">
            <BaseFormSelect
                name="status"
                label="Estado"
                :options="statusOptions"
                :required="true"
            />
        </div>
    </div>
</template>
