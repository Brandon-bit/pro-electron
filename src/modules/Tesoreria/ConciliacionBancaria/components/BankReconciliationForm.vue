<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import { useBankAccountActions } from '@/modules/Tesoreria/CuentasBancarias/composables/useBankAccountActions'

const { getBankAccountsForSelect } = useBankAccountActions()

interface selectOptions {
    id: number
    label: string
}

const bankAccountOptions = ref<selectOptions[]>([])

onMounted(async () => {
    bankAccountOptions.value = await getBankAccountsForSelect()
})
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12">
            <BaseFormSelect
                name="bankAccountId"
                label="Cuenta bancaria"
                :options="bankAccountOptions"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="startDate"
                type="date"
                label="Fecha de inicio"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="endDate"
                type="date"
                label="Fecha de fin"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="initialBankBalance"
                type="number"
                label="Saldo inicial del banco"
                placeholder="0.00"
                :required="true"
                step="0.01"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="finalBankBalance"
                type="number"
                label="Saldo final del banco"
                placeholder="0.00"
                :required="true"
                step="0.01"
            />
        </div>

        <div class="col-span-12">
            <BaseTextArea
                name="notes"
                label="Notas"
                placeholder="Observaciones sobre la conciliación"
            />
        </div>

        <div class="col-span-12">
            <BaseFormCheckbox name="active" label="Estado" :default="true" />
        </div>
    </div>
</template>
