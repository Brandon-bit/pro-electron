<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import { useBankActions } from '@/modules/Tesoreria/Bancos/composables/useBankActions'
import { useAccountTypeActions } from '@/modules/Tesoreria/TiposCuenta/composables/useAccountTypeActions'

const { getBanksForSelect } = useBankActions()
const { getAccountTypesForSelect } = useAccountTypeActions()

interface selectOptions {
    id: number
    label: string
}

const bankOptions = ref<selectOptions[]>([])
const accountTypeOptions = ref<selectOptions[]>([])

onMounted(async () => {
    bankOptions.value = await getBanksForSelect()
    accountTypeOptions.value = await getAccountTypesForSelect()
})
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12">
            <BaseFormInput
                name="name"
                type="text"
                label="Nombre de la cuenta"
                placeholder="Ej: Cuenta Principal BBVA"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormSelect name="bankId" label="Banco" :options="bankOptions" :required="true" />
        </div>

        <div class="col-span-6">
            <BaseFormSelect
                name="accountTypeId"
                label="Tipo de cuenta"
                :options="accountTypeOptions"
                :required="true"
            />
        </div>

        <div class="col-span-12">
            <BaseFormInput
                name="accountNumber"
                type="text"
                label="Número de cuenta (CLABE)"
                placeholder="18 dígitos"
                :required="true"
                maxlength="18"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="initialBalance"
                type="number"
                label="Saldo inicial"
                placeholder="0.00"
                :required="true"
                step="0.01"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="currentBalance"
                type="number"
                label="Saldo actual"
                placeholder="0.00"
                :required="true"
                step="0.01"
            />
        </div>

        <div class="col-span-12">
            <BaseTextArea
                name="notes"
                label="Notas"
                placeholder="Notas adicionales sobre la cuenta"
            />
        </div>

        <div class="col-span-12">
            <BaseFormCheckbox name="active" label="Estado" :default="true" />
        </div>
    </div>
</template>
