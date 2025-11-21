<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseFormPageTitle from '@/shared/components/BaseFormPageTitle.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseFormActionButtons from '@/shared/components/BaseFormActionButtons.vue'
import AccountCodeInput from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/components/AccountCodeInput.vue'
import { accountSchema } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/validations/accountsCatalogValidation'
import { useAccountCatalogActions } from '@contabilidad/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalogActions'
import { showNotification } from '@/utils/toastNotifications'
import type { SelectOptionDTO, AccountMaskConfig } from '@contabilidad/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'

const route = useRoute()
const router = useRouter()

const { 
    getTypeOptions,
    getNatureOptions,
    getLevelOptions,
    getCurrencyOptions,
    getClasificationOptions,
    getAccountMaskConfig,
    getAllAccountsForSelect,
    createAccount,
    updateAccount,
    getAccountById
} = useAccountCatalogActions()

// Reactive data for options
const typeOptions = ref<SelectOptionDTO[]>([])
const natureOptions = ref<SelectOptionDTO[]>([])
const levelOptions = ref<SelectOptionDTO[]>([])
const currencyOptions = ref<SelectOptionDTO[]>([])
const clasificationOptions = ref<SelectOptionDTO[]>([])
const parentAccountOptions = ref<SelectOptionDTO[]>([])
const maskConfig = ref<AccountMaskConfig>({
    id: 'default',
    format: '0000-00-00-00-00-00',
    segments: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
})

// Detectar modo de la vista
const isEditMode = computed(() => route.path.includes('/edit'))
const isViewMode = computed(() => route.path.includes('/view'))
const pageTitle = computed(() => {
    if (isViewMode.value) return 'Consultar Cuenta'
    if (isEditMode.value) return 'Editar Cuenta'
    return 'Crear Nueva Cuenta'
})

// Configurar formulario con vee-validate
const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(accountSchema),
    validateOnMount: false,
    initialValues: {
        code: '',
        name: '',
        parentId: 0,
        typeId: 0,
        natureId: 0,
        levelId: 0,
        currencyId: 0,
        clasificationId: 0,
        SATCode: '',
        acceptsMovements: true,
        requiresAuxiliary: false,
        active: true
    }
})

// Load options on component mount
onMounted(async () => {
    try {
        // Cargar opciones de los selects
        const [types, natures, levels, currencies, clasifications, accounts] = await Promise.all([
            getTypeOptions(),
            getNatureOptions(),
            getLevelOptions(),
            getCurrencyOptions(),
            getClasificationOptions(),
            getAllAccountsForSelect()
        ])
        
        typeOptions.value = types
        natureOptions.value = natures
        levelOptions.value = levels
        currencyOptions.value = currencies
        clasificationOptions.value = clasifications
        
        // Cargar cuentas padre con opción inicial "Sin cuenta padre"
        parentAccountOptions.value = [
            { id: 0, label: 'Sin cuenta padre', code: '', name: '', level: 0, acceptsMovements: false },
            ...accounts
        ]

        // Obtener configuración de máscara
        try {
            maskConfig.value = await getAccountMaskConfig()
        } catch (error) {
            console.warn('No se pudo cargar la configuración de máscara, usando formato por defecto')
        }

        // Cargar datos de la cuenta si estamos en modo edición o consulta
        const accountId = route.params.id as string
        if (accountId && (isEditMode.value || isViewMode.value)) {
            const accountData = await getAccountById(Number(accountId))
            if (accountData) {
                resetForm({ values: accountData })
            }
        }
    } catch (error) {
        console.error('Error loading form data:', error)
        showNotification('Error al cargar los datos del formulario', 'error')
    }
})

// Manejar envío del formulario
const onSubmit = handleSubmit(
    async (formValues) => {
        try {
            let result
            if (isEditMode.value) {
                result = await updateAccount(Number(route.params.id), formValues as any)
            } else {
                result = await createAccount(formValues as any)
            }

            showNotification(result.message, result.status as 'success' | 'error')
            
            // Redirigir a la lista después de guardar exitosamente
            if (result.status === 'success') {
                router.push('/contabilidad/catalogo-de-cuentas')
            }
        } catch (error) {
            console.error('Error saving account:', error)
            showNotification('Error al guardar la cuenta', 'error')
        }
    },
    async () => {
        await nextTick()
        const firstErrorElement = document.querySelector('.select-error,.input-error,.checkbox-error')
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
                <!-- COLLAPSE: Información Básica -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="basic-info" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Información Básica
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <AccountCodeInput
                                class="col-span-12"
                                name="code"
                                label="Código de cuenta"
                                :required="true"
                                :readonly="isViewMode"
                                :mask-format="maskConfig.format"
                            />
                            <BaseFormInput
                                class="col-span-12"
                                name="name"
                                type="text"
                                label="Nombre de la cuenta"
                                :required="true"
                                :readonly="isViewMode"
                                placeholder="Ej: Caja y Bancos"
                            />
                            <BaseFormSelect
                                class="col-span-12"
                                name="parentId"
                                label="Cuenta Padre"
                                :options="parentAccountOptions"
                                :disabled="isViewMode"
                                placeholder="Seleccione una cuenta padre (opcional)"
                            />
                        </div>
                    </div>
                </div>

                <!-- COLLAPSE: Clasificación Contable -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="classification-info" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Clasificación Contable
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="typeId"
                                label="Tipo"
                                :options="typeOptions"
                                :required="true"
                                :disabled="isViewMode"
                            />
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="natureId"
                                label="Naturaleza"
                                :options="natureOptions"
                                :required="true"
                                :disabled="isViewMode"
                            />
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="levelId"
                                label="Nivel"
                                :options="levelOptions"
                                :required="true"
                                :disabled="isViewMode"
                            />
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="currencyId"
                                label="Moneda"
                                :options="currencyOptions"
                                :required="true"
                                :disabled="isViewMode"
                            />
                            <BaseFormSelect
                                class="col-span-12"
                                name="clasificationId"
                                label="Clasificación"
                                :options="clasificationOptions"
                                :required="true"
                                :disabled="isViewMode"
                            />
                        </div>
                    </div>
                </div>

                <!-- COLLAPSE: Información Fiscal -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="fiscal-info" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Información Fiscal
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <BaseFormInput
                                class="col-span-12"
                                name="SATCode"
                                type="text"
                                label="Código SAT (opcional)"
                                :required="false"
                                :readonly="isViewMode"
                                placeholder="Ej: 101 o 101.01"
                            />
                        </div>
                    </div>
                </div>

                <!-- COLLAPSE: Configuración de Operaciones -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="operations-info" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Configuración de Operaciones
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <div class="col-span-12 space-y-4">
                                <div class="flex flex-col space-y-2">
                                    <BaseFormCheckbox 
                                        name="acceptsMovements" 
                                        label="Acepta movimientos"
                                        :disabled="isViewMode"
                                    />
                                    <p class="text-sm text-gray-500">Permite registrar transacciones directas en esta cuenta</p>
                                </div>

                                <div class="flex flex-col space-y-2">
                                    <BaseFormCheckbox 
                                        name="requiresAuxiliary" 
                                        label="Requiere auxiliar"
                                        :disabled="isViewMode"
                                    />
                                    <p class="text-sm text-gray-500">Necesita un desglose adicional para el registro de movimientos</p>
                                </div>

                                <div class="flex flex-col space-y-2">
                                    <BaseFormCheckbox 
                                        name="active" 
                                        label="Cuenta activa"
                                        :disabled="isViewMode"
                                    />
                                    <p class="text-sm text-gray-500">Disponible para operaciones contables</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <BaseFormActionButtons
                    :is-submitting="isSubmitting"
                    :is-edit-mode="isEditMode"
                    :is-view-mode="isViewMode"
                    submit-text="cuenta"
                />
            </form>
        </div>
    </div>
</template>
