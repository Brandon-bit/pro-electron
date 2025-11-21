<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseFormPageTitle from '@/shared/components/BaseFormPageTitle.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormActionButtons from '@/shared/components/BaseFormActionButtons.vue'
import { fixedAssetSchema } from '@/modules/Contabilidad/Contabilidad/ActivosFijos/validations/fixedAssetValidation'
import { useFixedAssetsActions } from '@/modules/Contabilidad/Contabilidad/ActivosFijos/composables/useFixedAssetsActions'
import type { SelectOptionDTO } from '@/modules/Contabilidad/Contabilidad/ActivosFijos/types/fixedAssetsTypes'

const route = useRoute()
const router = useRouter()

const { 
    getAccountingAccountOptions, 
    getAreaOptions, 
    getStatusOptions,
    createFixedAsset,
    updateFixedAsset,
    getFixedAssetById
} = useFixedAssetsActions()

// Reactive data for options
const accountingAccountOptions = ref<SelectOptionDTO[]>([])
const areaOptions = ref<SelectOptionDTO[]>([])
const statusOptions = ref<SelectOptionDTO[]>([])

// Detectar modo de la vista
const isEditMode = computed(() => route.path.includes('/edit'))
const isViewMode = computed(() => route.path.includes('/view'))
const pageTitle = computed(() => {
    if (isViewMode.value) return 'Consultar Activo Fijo'
    if (isEditMode.value) return 'Editar Activo Fijo'
    return 'Crear Nuevo Activo Fijo'
})

// Configurar formulario con vee-validate
const { handleSubmit, isSubmitting, resetForm, values } = useForm({
    validationSchema: toTypedSchema(fixedAssetSchema),
    validateOnMount: false,
    initialValues: {
        description: '',
        brand: '',
        model: '',
        serialNumber: '',
        acquisitionDate: '',
        supplier: '',
        invoice: '',
        originalValue: 0,
        usefulLife: 60,
        accountingAccount: '',
        physicalLocation: '',
        area: '',
        responsible: '',
        notes: '',
        status: 'Activo' as 'Activo' | 'Dado de baja'
    }
})

// Load options on component mount
onMounted(async () => {
    try {
        // Cargar opciones de los selects
        const [accountingAccounts, areas, statuses] = await Promise.all([
            getAccountingAccountOptions(),
            getAreaOptions(),
            getStatusOptions()
        ])
        
        accountingAccountOptions.value = accountingAccounts
        areaOptions.value = areas
        statusOptions.value = statuses

        // Cargar datos del activo si estamos en modo edición o consulta
        const assetId = route.params.id as string
        if (assetId && (isEditMode.value || isViewMode.value)) {
            const assetData = await getFixedAssetById(assetId)
            resetForm({ values: assetData })
        }
    } catch (error) {
        console.error('Error loading form data:', error)
    }
})

// Manejar envío del formulario
const onSubmit = handleSubmit(
    async (formValues) => {
        let result
        if (isEditMode.value) {
            result = await updateFixedAsset(formValues as any)
        } else {
            result = await createFixedAsset(formValues as any)
        }

        // Redirigir a la lista después de guardar exitosamente
        if (result.status === 'success') {
            router.push('/contabilidad/activos')
        }
    },
    async () => {
        await nextTick()
        const firstErrorElement = document.querySelector('.select-error,.input-error,.textarea-error')
        if (firstErrorElement) {
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            const focusableElement = firstErrorElement as HTMLElement
            focusableElement.focus?.()
        }
    }
)
</script>

<template>
    <div>
        <BaseFormPageTitle :title="pageTitle" />
        <div class="lg:max-w-[70%] lg:mx-auto">
            <form @submit="onSubmit">
                <!-- COLLAPSE: Información General -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="general-info" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Información General
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <BaseFormInput
                                class="col-span-12"
                                name="description"
                                type="text"
                                label="Descripción del activo"
                                :required="true"
                                :readonly="isViewMode"
                                placeholder="Ej: Servidor Dell PowerEdge R740"
                            />
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="brand"
                                type="text"
                                label="Marca"
                                :required="true"
                                :readonly="isViewMode"
                                placeholder="Ej: Dell"
                            />
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="model"
                                type="text"
                                label="Modelo"
                                :required="true"
                                :readonly="isViewMode"
                                placeholder="Ej: PowerEdge R740"
                            />
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="serialNumber"
                                type="text"
                                label="Número de serie"
                                :required="true"
                                :readonly="isViewMode"
                                placeholder="Ej: SN123456789"
                            />
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="acquisitionDate"
                                type="date"
                                label="Fecha de adquisición"
                                :required="true"
                                :readonly="isViewMode"
                            />
                        </div>
                    </div>
                </div>

                <!-- COLLAPSE: Información Financiera -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="financial-info" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Información Financiera
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="supplier"
                                type="text"
                                label="Proveedor"
                                :required="true"
                                :readonly="isViewMode"
                                placeholder="Ej: Dell Technologies"
                            />
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="invoice"
                                type="text"
                                label="Factura asociada"
                                :required="true"
                                :readonly="isViewMode"
                                placeholder="Ej: FACT-2023-001"
                            />
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="originalValue"
                                type="number"
                                label="Valor original (sin IVA)"
                                :required="true"
                                :readonly="isViewMode"
                                placeholder="0.00"
                            />
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="usefulLife"
                                type="number"
                                label="Vida útil (meses)"
                                :required="true"
                                :readonly="isViewMode"
                                placeholder="60"
                            />
                            <BaseFormSelect
                                class="col-span-12"
                                name="accountingAccount"
                                label="Cuenta contable de activo"
                                :options="accountingAccountOptions"
                                :required="true"
                                :disabled="isViewMode"
                            />
                        </div>
                    </div>
                </div>

                <!-- COLLAPSE: Ubicación y Asignación -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="location-info" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Ubicación y Asignación
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="physicalLocation"
                                type="text"
                                label="Ubicación física"
                                :required="true"
                                :readonly="isViewMode"
                                placeholder="Ej: Centro de Datos - Piso 3"
                            />
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="area"
                                label="Área"
                                :options="areaOptions"
                                :required="true"
                                :disabled="isViewMode"
                            />
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="responsible"
                                type="text"
                                label="Responsable"
                                :required="true"
                                :readonly="isViewMode"
                                placeholder="Ej: Juan Pérez"
                            />
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="status"
                                label="Estatus"
                                :options="statusOptions"
                                :required="true"
                                :disabled="isViewMode"
                            />
                            <BaseTextArea
                                class="col-span-12"
                                name="notes"
                                label="Notas adicionales"
                                :readonly="isViewMode"
                                placeholder="Información adicional sobre el activo..."
                            />
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <BaseFormActionButtons
                    :is-submitting="isSubmitting"
                    :is-edit-mode="isEditMode"
                    :is-view-mode="isViewMode"
                    submit-text="activo fijo"
                />
            </form>
        </div>
    </div>
</template>
