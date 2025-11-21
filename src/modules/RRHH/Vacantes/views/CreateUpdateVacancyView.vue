<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field } from 'vee-validate'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseFormPageTitle from '@/shared/components/BaseFormPageTitle.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormActionButtons from '@/shared/components/BaseFormActionButtons.vue'
import { vacancySchema } from '@/modules/RRHH/Vacantes/validations/vacancyValidation'
import { useVacancyActions } from '@/modules/RRHH/Vacantes/composables/useVacancyActions'
import { showNotification } from '@/utils/toastNotifications'

const route = useRoute()
const router = useRouter()
const isEditMode = computed(() => route.name === 'Actualizar vacante')
const pageTitle = computed(() => (isEditMode.value ? 'Actualizar vacante' : 'Crear nueva vacante'))

const { createVacancy, updateVacancy, getVacancyById } = useVacancyActions()

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(vacancySchema),
    validateOnMount: false,
    initialValues: {
        title: '',
        description: '',
        requirements: '',
        offeredSalary: undefined,
        status: 'abierta',
        publicationDate: '',
        closingDate: ''
    }
})

onMounted(async () => {
    // Load vacancy data if editing
    if (isEditMode.value) {
        const vacancyId = parseInt(route.params.id as string)
        if (vacancyId) {
            const vacancyData = await getVacancyById(vacancyId)
            resetForm({ values: vacancyData })
        }
    }
})

const onSubmit = handleSubmit(async (values) => {
    try {
        let result
        if (isEditMode.value) {
            const vacancyId = parseInt(route.params.id as string)
            result = await updateVacancy(vacancyId, values)
        } else {
            result = await createVacancy(values)
        }

        showNotification(result.message, result.status)

        if (result.status === 'success') {
            router.push({ name: 'Vacantes' })
        }
    } catch (error) {
        console.error('Error submitting form:', error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})
</script>

<template>
    <BaseFormPageTitle
        :title="pageTitle"
        :breadcrumbs="[
            { label: 'RRHH', to: '/' },
            { label: 'Vacantes', to: '/rrhh/vacantes' },
            { label: isEditMode ? 'Actualizar vacante' : 'Crear vacante' }
        ]"
    />
    <div class="lg:max-w-[70%] lg:mx-auto">
        <form @submit="onSubmit" class="space-y-6">
            <div class="grid grid-cols-12 gap-5">
                <!-- Title -->
                <BaseFormInput
                    class="col-span-12 md:col-span-6"
                    name="title"
                    label="Título de la Vacante"
                    placeholder="Ej: Desarrollador Senior"
                    :required="true"
                />

                <!-- Offered Salary -->
                <BaseFormInput
                    class="col-span-12 md:col-span-6"
                    name="offeredSalary"
                    label="Salario Ofrecido"
                    type="number"
                    placeholder="0.00"
                    :required="true"
                />

                <!-- Status -->
                <div class="col-span-12 md:col-span-6">
                    <label class="label">
                        <span class="label-text font-semibold">
                            Estado
                            <span class="text-error">*</span>
                        </span>
                    </label>
                    <Field name="status" v-slot="{ field, errorMessage }">
                        <select
                            v-bind="field"
                            class="select select-bordered w-full"
                            :class="{ 'select-error': errorMessage }"
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="abierta">Abierta</option>
                            <option value="en_proceso">En Proceso</option>
                            <option value="cerrada">Cerrada</option>
                        </select>
                        <label class="label" v-if="errorMessage">
                            <span class="label-text-alt text-error">{{ errorMessage }}</span>
                        </label>
                    </Field>
                </div>

                <!-- Publication Date -->
                <BaseFormInput
                    class="col-span-12 md:col-span-3"
                    name="publicationDate"
                    label="Fecha de Publicación"
                    type="date"
                    :required="true"
                />

                <!-- Closing Date -->
                <BaseFormInput
                    class="col-span-12 md:col-span-3"
                    name="closingDate"
                    label="Fecha de Cierre"
                    type="date"
                    :required="true"
                />

                <!-- Description -->
                <div class="col-span-12">
                    <BaseTextArea
                        name="description"
                        label="Descripción"
                        placeholder="Describe la vacante..."
                        :required="true"
                    />
                </div>

                <!-- Requirements -->
                <div class="col-span-12">
                    <BaseTextArea
                        name="requirements"
                        label="Requisitos"
                        placeholder="Lista los requisitos..."
                        :required="true"
                    />
                </div>
            </div>

            <!-- Action Buttons -->
            <BaseFormActionButtons
                :is-submitting="isSubmitting"
                :is-edit-mode="isEditMode"
                submit-text="vacante"
            />
        </form>
    </div>
</template>
