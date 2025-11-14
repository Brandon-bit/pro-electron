<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import useProvisionalPaymentStore from '@/modules/Fiscal/Provisionales/store/provisionalPaymentStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useProvisionalPaymentActions } from '@/modules/Fiscal/Provisionales/composables/useProvisionalPaymentActions'
import { showNotification } from '@/utils/toastNotifications'
import { generateDeclarationSchema } from '@/modules/Fiscal/Provisionales/validations/provisionalPaymentValidation'

const props = defineProps<{
    onRefresh?: () => void
}>()

const provisionalPaymentStore = useProvisionalPaymentStore()
const modalStore = useModalStore()
const { generateDeclaration } = useProvisionalPaymentActions()

const isSubmitting = ref(false)
const declarationType = ref<'isr' | 'iva'>('isr')

// Opciones para los selects
const declarationTypeOptions = [
    { id: 'isr', label: 'ISR - Impuesto Sobre la Renta' },
    { id: 'iva', label: 'IVA - Impuesto al Valor Agregado' }
]

const monthOptions = [
    { id: '01', label: 'Enero' },
    { id: '02', label: 'Febrero' },
    { id: '03', label: 'Marzo' },
    { id: '04', label: 'Abril' },
    { id: '05', label: 'Mayo' },
    { id: '06', label: 'Junio' },
    { id: '07', label: 'Julio' },
    { id: '08', label: 'Agosto' },
    { id: '09', label: 'Septiembre' },
    { id: '10', label: 'Octubre' },
    { id: '11', label: 'Noviembre' },
    { id: '12', label: 'Diciembre' }
]

const currentYear = new Date().getFullYear()
const yearOptions = [
    { id: String(currentYear), label: String(currentYear) },
    { id: String(currentYear - 1), label: String(currentYear - 1) },
    { id: String(currentYear - 2), label: String(currentYear - 2) }
]

// Form setup
const { handleSubmit, resetForm, values } = useForm({
    validationSchema: toTypedSchema(generateDeclarationSchema),
    initialValues: {
        declarationType: 'isr',
        period: '',
        year: String(currentYear),
        income: 0,
        deductions: 0,
        collectedVAT: 0,
        creditableVAT: 0,
        previousBalance: 0,
        notes: ''
    }
})

// Computed values
const showISRFields = computed(() => declarationType.value === 'isr')
const showVATFields = computed(() => declarationType.value === 'iva')

const taxableProfit = computed(() => {
    if (!showISRFields.value) return 0
    return (values.income || 0) - (values.deductions || 0)
})

const estimatedISR = computed(() => {
    if (!showISRFields.value) return 0
    const profit = taxableProfit.value
    const coefficient = 0.3425 // Coeficiente de utilidad
    return profit * coefficient * 0.30 // 30% de ISR
})

const estimatedVAT = computed(() => {
    if (!showISRFields.value) return 0
    const vatBase = (values.collectedVAT || 0) - (values.creditableVAT || 0)
    return vatBase > 0 ? vatBase : 0
})

const totalISR = computed(() => {
    if (!showISRFields.value) return 0
    return estimatedISR.value + estimatedVAT.value
})

const vatToPay = computed(() => {
    if (!showVATFields.value) return 0
    const base = (values.collectedVAT || 0) - (values.creditableVAT || 0)
    const withBalance = base - (values.previousBalance || 0)
    return withBalance > 0 ? withBalance : 0
})

const favorBalance = computed(() => {
    if (!showVATFields.value) return 0
    const base = (values.collectedVAT || 0) - (values.creditableVAT || 0)
    const withBalance = base - (values.previousBalance || 0)
    return withBalance < 0 ? Math.abs(withBalance) : 0
})

// Watch declaration type changes
watch(() => values.declarationType, (newType) => {
    declarationType.value = newType as 'isr' | 'iva'
})

const onSubmit = handleSubmit(async (values) => {
    isSubmitting.value = true
    try {
        const period = `${getMonthName(values.period)} ${values.year}`
        const { message, status } = await generateDeclaration(period, values.declarationType as 'isr' | 'iva')
        showNotification(message, status)
        
        if (status === 'success') {
            props.onRefresh?.()
            modalStore.close(provisionalPaymentStore.generateModalId)
            resetForm()
        }
    } catch (error) {
        showNotification('Error al generar la declaración', 'error')
    } finally {
        isSubmitting.value = false
    }
})

const getMonthName = (month: string): string => {
    const monthObj = monthOptions.find(m => m.id === month)
    return monthObj?.label || month
}

const onClose = () => {
    resetForm()
    declarationType.value = 'isr'
}

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount)
}
</script>

<template>
    <BaseModal
        :modalId="provisionalPaymentStore.generateModalId"
        :onClose="onClose"
        :onSubmit="onSubmit"
        :isSubmitting="isSubmitting"
        size="large"
    >
        <template v-slot:modalBody>
            <form @submit.prevent="onSubmit" class="space-y-4">
                <!-- Tipo de Declaración -->
                <div class="alert alert-info">
                    <span class="material-symbols-outlined">info</span>
                    <span class="text-sm">
                        Complete los datos para generar la declaración provisional. 
                        Los cálculos se realizarán automáticamente.
                    </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Tipo -->
                    <BaseFormSelect
                        name="declarationType"
                        label="Tipo de Declaración"
                        :options="declarationTypeOptions"
                        required
                    />

                    <!-- Periodo -->
                    <div class="grid grid-cols-2 gap-2">
                        <BaseFormSelect
                            name="period"
                            label="Mes"
                            :options="monthOptions"
                            required
                        />
                        <BaseFormSelect
                            name="year"
                            label="Año"
                            :options="yearOptions"
                            required
                        />
                    </div>
                </div>

                <!-- Campos ISR -->
                <div v-if="showISRFields" class="space-y-4">
                    <div class="divider">Datos para ISR</div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BaseFormInput
                            name="income"
                            label="Ingresos del Periodo"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            required
                        />

                        <BaseFormInput
                            name="deductions"
                            label="Deducciones del Periodo"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <!-- Cálculo ISR -->
                    <div class="card bg-base-200">
                        <div class="card-body p-4">
                            <h4 class="font-semibold mb-3 flex items-center gap-2">
                                <span class="material-symbols-outlined text-primary">calculate</span>
                                Cálculo Automático
                            </h4>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-base-content/70">Utilidad Fiscal:</span>
                                    <span class="font-semibold">{{ formatCurrency(taxableProfit) }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-base-content/70">ISR Provisional (30%):</span>
                                    <span class="font-semibold text-error">{{ formatCurrency(estimatedISR) }}</span>
                                </div>
                                <div class="divider my-1"></div>
                                <div class="flex justify-between text-base">
                                    <span class="font-bold">Total Estimado:</span>
                                    <span class="font-bold text-primary">{{ formatCurrency(totalISR) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="divider">Datos para IVA (Opcional)</div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BaseFormInput
                            name="collectedVAT"
                            label="IVA Cobrado"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                        />

                        <BaseFormInput
                            name="creditableVAT"
                            label="IVA Acreditable"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <!-- Campos IVA -->
                <div v-if="showVATFields" class="space-y-4">
                    <div class="divider">Datos para IVA</div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BaseFormInput
                            name="collectedVAT"
                            label="IVA Cobrado (Facturas Emitidas)"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            required
                        />

                        <BaseFormInput
                            name="creditableVAT"
                            label="IVA Acreditable (Facturas Recibidas)"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            required
                        />

                        <BaseFormInput
                            name="previousBalance"
                            label="Saldo a Favor del Mes Anterior"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                        />
                    </div>

                    <!-- Cálculo IVA -->
                    <div class="card bg-base-200">
                        <div class="card-body p-4">
                            <h4 class="font-semibold mb-3 flex items-center gap-2">
                                <span class="material-symbols-outlined text-primary">calculate</span>
                                Cálculo Automático
                            </h4>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-base-content/70">IVA Cobrado:</span>
                                    <span class="font-semibold text-success">{{ formatCurrency(values.collectedVAT || 0) }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-base-content/70">IVA Acreditable:</span>
                                    <span class="font-semibold text-info">-{{ formatCurrency(values.creditableVAT || 0) }}</span>
                                </div>
                                <div class="flex justify-between" v-if="values.previousBalance && values.previousBalance > 0">
                                    <span class="text-base-content/70">Saldo a Favor Anterior:</span>
                                    <span class="font-semibold">-{{ formatCurrency(values.previousBalance) }}</span>
                                </div>
                                <div class="divider my-1"></div>
                                <div class="flex justify-between text-base" v-if="vatToPay > 0">
                                    <span class="font-bold">IVA a Pagar:</span>
                                    <span class="font-bold text-primary">{{ formatCurrency(vatToPay) }}</span>
                                </div>
                                <div class="flex justify-between text-base" v-if="favorBalance > 0">
                                    <span class="font-bold">Saldo a Favor:</span>
                                    <span class="font-bold text-success">{{ formatCurrency(favorBalance) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Notas -->
                <div>
                    <label class="label">
                        <span class="label-text">Notas Adicionales (Opcional)</span>
                    </label>
                    <textarea
                        v-model="values.notes"
                        class="textarea textarea-bordered w-full"
                        rows="3"
                        placeholder="Agregue cualquier nota o comentario sobre esta declaración..."
                        maxlength="500"
                    ></textarea>
                    <label class="label">
                        <span class="label-text-alt text-base-content/60">
                            {{ (values.notes || '').length }} / 500 caracteres
                        </span>
                    </label>
                </div>

                <!-- Información importante -->
                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">warning</span>
                    <div class="text-sm">
                        <p class="font-semibold">Importante:</p>
                        <p>Los cálculos son estimados. Verifique los montos antes de presentar la declaración ante el SAT.</p>
                    </div>
                </div>
            </form>
        </template>
    </BaseModal>
</template>
