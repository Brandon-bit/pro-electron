<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const paymentMethodOptions = [
    { id: 'EFECTIVO', label: 'Efectivo' },
    { id: 'TRANSFERENCIA', label: 'Transferencia' },
    { id: 'CHEQUE', label: 'Cheque' },
    { id: 'TARJETA', label: 'Tarjeta' },
    { id: 'OTRO', label: 'Otro' }
]
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-6">
            <BaseFormInput
                name="paymentDate"
                type="date"
                label="Fecha de Pago"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="amount"
                type="number"
                label="Monto del Pago"
                placeholder="0.00"
                :required="true"
                step="0.01"
            />
        </div>

        <div class="col-span-12">
            <BaseFormSelect
                name="paymentMethod"
                label="Método de Pago"
                :options="paymentMethodOptions"
                :required="true"
            />
        </div>

        <div class="col-span-12">
            <BaseFormInput
                name="reference"
                type="text"
                label="Referencia"
                placeholder="Número de referencia o folio"
            />
        </div>

        <div class="col-span-12">
            <BaseTextArea name="notes" label="Notas" placeholder="Observaciones sobre el pago" />
        </div>
    </div>
</template>
