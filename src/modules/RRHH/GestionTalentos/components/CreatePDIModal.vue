<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { ref, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useTalentStore } from '@/modules/RRHH/GestionTalentos/store/talentStore'
import { useTalentActions } from '@/modules/RRHH/GestionTalentos/composables/useTalentActions'
import { pdiSchema } from '@/modules/RRHH/GestionTalentos/validations/pdiValidation'
import { showNotification } from '@/utils/toastNotifications'

const modalStore = useModalStore()
const talentStore = useTalentStore()
const { createPDI, getEmployeesBySearch } = useTalentActions()

const timeout = ref<ReturnType<typeof setTimeout> | null>(null)
const currentPage = ref(1)
const results = ref<any[]>([])
const loading = ref(false)
const currentQuery = ref<string>('')
const suppressSearch = ref(false)
const noResults = ref(false)

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(pdiSchema),
    validateOnMount: false,
    initialValues: {
        employeeId: undefined,
        competency: '',
        action: '',
        startDate: '',
        endDate: ''
    }
})

const { value: employeeValue } = useField<string>('employeeName')
const { value: employeeIdValue } = useField<number | undefined>('employeeId')

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
        employeeIdValue.value = undefined
    }

    loading.value = false
}

watch(employeeValue, (query) => {
    if (timeout.value) clearTimeout(timeout.value)
    if (suppressSearch.value) {
        suppressSearch.value = false
        return
    }

    currentQuery.value = query
    timeout.value = setTimeout(async () => {
        currentPage.value = 1
        results.value = []
        noResults.value = false

        if (employeeIdValue.value) {
            employeeIdValue.value = undefined
        }

        if (query.trim()) {
            await searchEmployees(currentPage.value)
        } else {
            results.value = []
            noResults.value = false
            employeeIdValue.value = undefined
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

const onSubmit = handleSubmit(async (formValues) => {
    try {
        const { message, status } = await createPDI(formValues)
        showNotification(message, status)
        modalStore.close(talentStore.modalId)
        resetForm()
        talentStore.clearData()
    } catch (error) {
        showNotification('Error al crear el Plan de Desarrollo', 'error')
    }
})

const handleClose = () => {
    resetForm()
    talentStore.clearData()
}
</script>

<template>
    <BaseModal
        :modal-id="talentStore.modalId"
        :on-submit="onSubmit"
        :on-close="handleClose"
        :is-submitting="isSubmitting"
    >
        <template v-slot:modalBody>
            <div class="grid grid-cols-12 gap-4">
                <!-- Empleado -->
                <div class="relative col-span-12">
                    <BaseFormInput
                        name="employeeName"
                        type="text"
                        label="Empleado"
                        inputClass="ps-10"
                        :required="true"
                    />
                    <span class="material-symbols-outlined absolute top-10 text-gray-500 left-2 z-10">
                        search
                    </span>
                    <ul
                        v-if="results.length"
                        @scroll="onScroll"
                        class="mx-auto overflow-y-auto z-10 max-h-80 rounded-bl-lg rounded-br-lg border-b-1 border-s-1 border-e-1 border-gray-300 px-2 pb-2 pt-4"
                    >
                        <li
                            v-for="employee in results"
                            :key="employee.id"
                            @click="selectEmployee(employee.id, employee.title)"
                            class="p-1 hover:bg-gray-100 cursor-pointer"
                        >
                            {{ employee.title }}
                        </li>
                    </ul>
                    <div
                        v-else-if="noResults && !loading"
                        class="mx-auto z-10 max-h-80 rounded-bl-lg rounded-br-lg border-b-1 border-s-1 border-e-1 border-gray-300 px-4 py-2 text-gray-500"
                    >
                        No hay coincidencias
                    </div>
                </div>

                <!-- Competencia -->
                <BaseFormInput
                    class="col-span-12"
                    name="competency"
                    label="Competencia a Desarrollar"
                    placeholder="Ej: Liderazgo Estratégico"
                    :required="true"
                />

                <!-- Acción de Desarrollo -->
                <BaseTextArea
                    class="col-span-12"
                    name="action"
                    label="Acción de Desarrollo"
                    placeholder="Ej: MBA Ejecutivo en ITESM"
                    :required="true"
                    rows="3"
                />

                <!-- Fecha Inicio -->
                <BaseFormInput
                    class="col-span-12 md:col-span-6"
                    name="startDate"
                    label="Fecha de Inicio"
                    type="date"
                    :required="true"
                />

                <!-- Fecha Fin -->
                <BaseFormInput
                    class="col-span-12 md:col-span-6"
                    name="endDate"
                    label="Fecha de Fin"
                    type="date"
                    :required="true"
                />
            </div>
        </template>
    </BaseModal>
</template>
