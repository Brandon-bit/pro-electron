<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import { useClientActions } from '@/modules/Tesoreria/Clientes/composables/useClientActions'

const { getClientsForSelect } = useClientActions()

interface selectOptions {
    id: number
    label: string
}

const clientOptions = ref<selectOptions[]>([])

const documentTypeOptions = [
    { id: 'FACTURA', label: 'Factura' },
    { id: 'NOTA_VENTA', label: 'Nota de Venta' },
    { id: 'RECIBO', label: 'Recibo' },
    { id: 'OTRO', label: 'Otro' }
]

const statusOptions = [
    { id: 'PENDIENTE', label: 'Pendiente' },
    { id: 'PARCIAL', label: 'Parcial' },
    { id: 'PAGADO', label: 'Pagado' },
    { id: 'VENCIDO', label: 'Vencido' }
]

onMounted(async () => {
    clientOptions.value = await getClientsForSelect()
})
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-6">
            <BaseFormSelect name="clientId" label="Cliente" :options="clientOptions" :required="true" />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="documentNumber"
                type="text"
                label="Número de Documento"
                placeholder="Ej: FAC-2024-001"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormSelect
                name="documentType"
                label="Tipo de Documento"
                :options="documentTypeOptions"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormSelect name="status" label="Estado" :options="statusOptions" :required="true" />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="issueDate"
                type="date"
                label="Fecha de Emisión"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="dueDate"
                type="date"
                label="Fecha de Vencimiento"
                :required="true"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="amount"
                type="number"
                label="Monto Total"
                placeholder="0.00"
                :required="true"
                step="0.01"
            />
        </div>

        <div class="col-span-6">
            <BaseFormInput
                name="pendingBalance"
                type="number"
                label="Saldo Pendiente"
                placeholder="0.00"
                :required="true"
                step="0.01"
            />
        </div>

        <div class="col-span-12">
            <BaseTextArea name="notes" label="Notas" placeholder="Observaciones sobre la cuenta por cobrar" />
        </div>
    </div>
</template>
