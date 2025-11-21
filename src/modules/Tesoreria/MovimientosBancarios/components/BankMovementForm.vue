<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import { useBankAccountActions } from '@/modules/Tesoreria/CuentasBancarias/composables/useBankAccountActions'
import { MOVEMENT_TYPES } from '@/modules/Tesoreria/MovimientosBancarios/types/bankMovementTypes'

const { getBankAccountsForSelect } = useBankAccountActions()

interface selectOptions {
    id: number
    label: string
}

const bankAccountOptions = ref<selectOptions[]>([])
const movementTypeOptions = ref<selectOptions[]>(MOVEMENT_TYPES.map(t => ({ id: t.id, label: t.label })))

onMounted(async () => {
    bankAccountOptions.value = await getBankAccountsForSelect()
})
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-6">
            <BaseFormInput
                name="date"
                type="date"
                label="Fecha"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormSelect
                name="bankAccountId"
                label="Cuenta bancaria"
                :options="bankAccountOptions"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormSelect
                name="movementTypeId"
                label="Tipo de movimiento"
                :options="movementTypeOptions"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="amount"
                type="number"
                label="Monto"
                placeholder="0.00"
                :required="true"
                step="0.01"
            />
        </div>

        <div class="col-span-12">
            <BaseFormInput
                name="concept"
                type="text"
                label="Concepto"
                placeholder="Ej: Pago de cliente - Factura #001"
                :required="true"
            />
        </div>

        <div class="col-span-12">
            <BaseFormInput
                name="reference"
                type="text"
                label="Referencia"
                placeholder="Ej: REF-2024-001"
            />
        </div>

        <div class="col-span-12">
            <BaseFormCheckbox name="active" label="Estado" :default="true" />
        </div>
    </div>
</template>
