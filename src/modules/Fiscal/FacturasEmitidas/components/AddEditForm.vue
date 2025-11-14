<script setup lang="ts">
import { useField } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import useInvoice from '@/modules/Fiscal/FacturasEmitidas/composables/useInvoice'
import InvoiceItemsForm from './InvoiceItemsForm.vue'

const { paymentMethods, paymentForms, cfdiUses, currencies } = useInvoice()

const { value: serie } = useField<string>('serie')
const { value: clientName } = useField<string>('clientName')
const { value: clientRfc } = useField<string>('clientRfc')
const { value: issueDate } = useField<string>('issueDate')
const { value: paymentDate } = useField<string>('paymentDate')
const { value: currency } = useField<string>('currency')
const { value: paymentMethod } = useField<string>('paymentMethod')
const { value: paymentForm } = useField<string>('paymentForm')
const { value: cfdiUse } = useField<string>('cfdiUse')
</script>

<template>
    <div class="space-y-4">
        <!-- Client Information -->
        <div class="card bg-base-200">
            <div class="card-body p-4">
                <h3 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">person</span>
                    Información del Cliente
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BaseFormInput
                        v-model="clientName"
                        name="clientName"
                        label="Nombre del Cliente"
                        placeholder="Ingrese el nombre del cliente"
                        required
                    />
                    <BaseFormInput
                        v-model="clientRfc"
                        name="clientRfc"
                        label="RFC del Cliente"
                        placeholder="XAXX010101000"
                        required
                    />
                </div>
            </div>
        </div>

        <!-- Invoice Information -->
        <div class="card bg-base-200">
            <div class="card-body p-4">
                <h3 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">receipt_long</span>
                    Información de la Factura
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BaseFormInput
                        v-model="serie"
                        name="serie"
                        label="Serie"
                        placeholder="A"
                        required
                    />
                    <BaseFormInput
                        v-model="issueDate"
                        name="issueDate"
                        label="Fecha de Emisión"
                        type="date"
                        required
                    />
                    <BaseFormInput
                        v-model="paymentDate"
                        name="paymentDate"
                        label="Fecha de Pago"
                        type="date"
                    />
                    <BaseFormSelect
                        v-model="currency"
                        name="currency"
                        label="Moneda"
                        :options="currencies"
                        required
                    />
                </div>
            </div>
        </div>

        <!-- Payment Information -->
        <div class="card bg-base-200">
            <div class="card-body p-4">
                <h3 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">payments</span>
                    Información de Pago
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BaseFormSelect
                        v-model="paymentMethod"
                        name="paymentMethod"
                        label="Método de Pago"
                        :options="paymentMethods"
                        required
                    />
                    <BaseFormSelect
                        v-model="paymentForm"
                        name="paymentForm"
                        label="Forma de Pago"
                        :options="paymentForms"
                        required
                    />
                    <BaseFormSelect
                        v-model="cfdiUse"
                        name="cfdiUse"
                        label="Uso de CFDI"
                        :options="cfdiUses"
                        required
                    />
                </div>
            </div>
        </div>

        <!-- Invoice Items -->
        <InvoiceItemsForm />
    </div>
</template>
