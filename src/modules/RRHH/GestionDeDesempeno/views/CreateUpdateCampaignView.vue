<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm, useFieldValue } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseFormPageTitle from '@/shared/components/BaseFormPageTitle.vue'
import BaseFormActionButtons from '@/shared/components/BaseFormActionButtons.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormSelectMultiple from '@/shared/components/BaseFormSelectMultiple.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import { campaignSchema } from '@/modules/RRHH/GestionDeDesempeno/validations/campaignValidation'
import { useCampaignActions } from '@/modules/RRHH/GestionDeDesempeno/composables/useCampaignActions'
import { useDepartmentActions } from '@/modules/RRHH/Departamentos/composables/useDepartmentActions'
import { useEmployeeActions } from '@/modules/RRHH/Empleados/composables/useEmployeeActions'
import { showNotification } from '@/utils/toastNotifications'
import type { SelectOptionDTO } from '@/modules/RRHH/GestionDeDesempeno/types/campaignTypes'

const route = useRoute()
const router = useRouter()

const isEditMode = computed(() => route.name === 'Actualizar Campaña')
const pageTitle = computed(() =>
    isEditMode.value ? 'Actualizar Campaña de Evaluación' : 'Crear Nueva Campaña de Evaluación'
)

const {
    getCampaignById,
    createCampaign,
    updateCampaign,
    getEvaluationTypes,
    getCompetenciesForSelect
} = useCampaignActions()

const { getDepartmentsForSelect } = useDepartmentActions()
const { getEmployees } = useEmployeeActions()

const evaluationTypes = ref<Array<{ id: string; label: string }>>([])
const departments = ref<SelectOptionDTO[]>([])
const employees = ref<SelectOptionDTO[]>([])
const competencies = ref<SelectOptionDTO[]>([])

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(campaignSchema),
    validateOnMount: false,
    initialValues: {
        name: '',
        description: '',
        evaluationType: '360' as const,
        startDate: '',
        endDate: '',
        departments: [],
        employees: [],
        competencies: [],
        includeAllEmployees: true,
        active: true
    }
})

onMounted(async () => {
    // Load select options
    evaluationTypes.value = getEvaluationTypes()
    departments.value = await getDepartmentsForSelect()
    competencies.value = await getCompetenciesForSelect()

    // Load employees
    const employeesData = await getEmployees(1, 1000)
    employees.value = employeesData.items.map((emp) => ({
        id: emp.id!,
        label: `${emp.firstName} ${emp.lastName}`
    }))

    // Load campaign data if editing
    if (isEditMode.value) {
        const campaignId = parseInt(route.params.id as string)
        if (campaignId) {
            const campaignData = await getCampaignById(campaignId)
            if (campaignData) {
                resetForm({ values: campaignData })
            }
        }
    }
})

const onSubmit = handleSubmit(async (formValues) => {
    try {
        if (isEditMode.value) {
            const campaignId = parseInt(route.params.id as string)
            const { message, status } = await updateCampaign(campaignId, formValues)
            showNotification(message, status)
        } else {
            const { message, status } = await createCampaign(formValues)
            showNotification(message, status)
        }
        router.push('/rrhh/gestion-desempeno')
    } catch (error) {
        showNotification('Error al guardar la campaña', 'error')
    }
})

const includeAllEmployees = useFieldValue<boolean>('includeAllEmployees')
</script>

<template>
    <BaseFormPageTitle :title="pageTitle" />
    <div class="lg:max-w-[70%] lg:mx-auto">
        <form @submit="onSubmit" class="space-y-6">
            <div class="grid grid-cols-12 gap-5">
                <!-- Nombre -->
                <BaseFormInput
                    class="col-span-12 md:col-span-6"
                    name="name"
                    label="Nombre de la Campaña"
                    placeholder="Ej: Evaluación Anual 2024"
                    :required="true"
                />

                <!-- Tipo de Evaluación -->
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="evaluationType"
                    label="Tipo de Evaluación"
                    :options="evaluationTypes"
                    placeholder="Selecciona el tipo"
                    :required="true"
                />

                <!-- Fecha Inicio -->
                <BaseFormInput
                    class="col-span-12 md:col-span-6"
                    name="startDate"
                    label="Fecha de Inicio"
                    type="date"
                />

                <!-- Fecha Fin -->
                <BaseFormInput
                    class="col-span-12 md:col-span-6"
                    name="endDate"
                    label="Fecha de Fin"
                    type="date"
                />

                <!-- Descripción -->
                <div class="col-span-12">
                    <BaseTextArea
                        name="description"
                        label="Descripción"
                        placeholder="Describe el propósito y alcance de esta campaña..."
                        :rows="3"
                        :required="true"
                    />
                </div>

                <!-- Competencias -->
                <BaseFormSelectMultiple
                    class="col-span-12"
                    name="competencies"
                    label="Competencias a Evaluar"
                    placeholder="Seleccionar competencias"
                    :options="competencies"
                    :required="true"
                />

                <!-- Incluir todos los empleados -->
                <div class="col-span-12">
                    <BaseFormCheckbox
                        name="includeAllEmployees"
                        label="Incluir todos los empleados de la organización"
                    />
                </div>

                <!-- Departamentos -->
                <BaseFormSelectMultiple
                    v-if="!includeAllEmployees"
                    class="col-span-12 md:col-span-6"
                    name="departments"
                    label="Departamentos"
                    placeholder="Seleccionar departamentos"
                    :options="departments"
                />

                <!-- Empleados Específicos -->
                <BaseFormSelectMultiple
                    v-if="!includeAllEmployees"
                    class="col-span-12 md:col-span-6"
                    name="employees"
                    label="Empleados Específicos"
                    placeholder="Seleccionar empleados"
                    :options="employees"
                />

                <!-- Estado -->
                <div class="col-span-12">
                    <BaseFormCheckbox
                        name="active"
                        label="Campaña activa (iniciar inmediatamente)"
                    />
                </div>
            </div>

            <!-- Action Buttons -->
            <BaseFormActionButtons
                :is-submitting="isSubmitting"
                :is-edit-mode="isEditMode"
                submit-text="campaña"
            />
        </form>
    </div>
</template>
