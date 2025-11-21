<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed, watch } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormActionButtons from '@/shared/components/BaseFormActionButtons.vue'
import useAccountReceivableStore from '@/modules/Tesoreria/CuentasPorCobrar/store/accountReceivableStore'
import { useAccountReceivableActions } from '@/modules/Tesoreria/CuentasPorCobrar/composables/useAccountReceivableActions'
import { createUpdateAccountReceivableSchema } from '@/modules/Tesoreria/CuentasPorCobrar/validations/accountReceivableValidation'
import PaymentModal from '@/modules/Tesoreria/CuentasPorCobrar/components/PaymentModal.vue'
import PaymentList from '@/modules/Tesoreria/CuentasPorCobrar/components/PaymentList.vue'
import RegisterPaymentButton from '@/modules/Tesoreria/CuentasPorCobrar/components/RegisterPaymentButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useClientActions } from '@/modules/Tesoreria/Clientes/composables/useClientActions'

const route = useRoute()
const router = useRouter()
const isEditMode = computed(() => route.name === 'Actualizar cuenta por cobrar')
const pageTitle = computed(() =>
    isEditMode.value ? 'Actualizar cuenta por cobrar' : 'Crear cuenta por cobrar'
)

interface SelectOptionsType {
    id: number
    label: string
}

const accountReceivableStore = useAccountReceivableStore()

const {
    createAccountReceivable,
    updateAccountReceivable
} = useAccountReceivableActions()

const { getClientsForSelect } = useClientActions()

const clientOptions = ref<SelectOptionsType[]>([])

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
    if (!clientOptions.value.length) {
        const data = await getClientsForSelect()
        clientOptions.value = data.map(({ id, label }) => {
            return { id, label }
        })
    }

    const accountReceivableId = parseInt(route.params.id as string)
    if (accountReceivableId) {
        // TODO: Cargar cuenta por cobrar por ID
        // await getAccountReceivableById(accountReceivableId)
    }
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(createUpdateAccountReceivableSchema),
    initialValues: {
        clientId: accountReceivableStore.selectedAccountReceivable?.clientId,
        documentNumber: accountReceivableStore.selectedAccountReceivable?.documentNumber,
        documentType: accountReceivableStore.selectedAccountReceivable?.documentType,
        issueDate: accountReceivableStore.selectedAccountReceivable?.issueDate,
        dueDate: accountReceivableStore.selectedAccountReceivable?.dueDate,
        amount: accountReceivableStore.selectedAccountReceivable?.amount,
        pendingBalance: accountReceivableStore.selectedAccountReceivable?.pendingBalance,
        status: accountReceivableStore.selectedAccountReceivable?.status,
        notes: accountReceivableStore.selectedAccountReceivable?.notes
    },
    validateOnMount: false
})

watch(
    () => accountReceivableStore.selectedAccountReceivable,
    (newValues) => {
        if (newValues) {
            resetForm({ values: { ...newValues } })
        }
    }
)

const onSubmit = handleSubmit(async (formValues) => {
    let result
    if (isEditMode.value) {
        result = await updateAccountReceivable(formValues)
    } else {
        result = await createAccountReceivable(formValues)
    }
    console.log(result)
})

const handleCancel = () => {
    accountReceivableStore.clearPayments()
    router.push('/tesoreria/cuentas-por-cobrar')
}
</script>

<template>
    <div class="xl:max-w-[70%] mx-auto">
        <BaseTitle 
            :title="pageTitle" 
            subtitle="Gestión de documentos y pagos por cobrar"
        />
        <div class="mb-10 pt-10 text-right">
            <RegisterPaymentButton />
        </div>
        <form @submit="onSubmit">
            <div class="grid grid-cols-12 gap-4">
                <BaseFormSelect
                    name="clientId"
                    label="Cliente"
                    :options="clientOptions"
                    :required="true"
                    class="col-span-12 md:col-span-6"
                />
                <BaseFormInput
                    name="documentNumber"
                    type="text"
                    label="Número de Documento"
                    placeholder="Ej: FAC-2024-001"
                    :required="true"
                    class="col-span-12 md:col-span-6"
                />
                <BaseFormSelect
                    name="documentType"
                    label="Tipo de Documento"
                    :options="documentTypeOptions"
                    :required="true"
                    class="col-span-12 md:col-span-6"
                />
                <BaseFormSelect
                    name="status"
                    label="Estado"
                    :options="statusOptions"
                    :required="true"
                    class="col-span-12 md:col-span-6"
                />
                <BaseFormInput
                    name="issueDate"
                    type="date"
                    label="Fecha de Emisión"
                    :required="true"
                    class="col-span-12 md:col-span-6"
                />
                <BaseFormInput
                    name="dueDate"
                    type="date"
                    label="Fecha de Vencimiento"
                    :required="true"
                    class="col-span-12 md:col-span-6"
                />
                <BaseFormInput
                    name="amount"
                    type="number"
                    label="Monto Total"
                    placeholder="0.00"
                    :required="true"
                    step="0.01"
                    class="col-span-12 md:col-span-6"
                />
                <BaseFormInput
                    name="pendingBalance"
                    type="number"
                    label="Saldo Pendiente"
                    placeholder="0.00"
                    :required="true"
                    step="0.01"
                    class="col-span-12 md:col-span-6"
                />
                <BaseTextArea
                    name="notes"
                    label="Notas"
                    placeholder="Observaciones sobre la cuenta por cobrar"
                    class="col-span-12"
                />
                <div class="col-span-12">
                    <PaymentList />
                </div>
                <div class="col-span-12">
                    <BaseFormActionButtons
                        :is-submitting="isSubmitting"
                        :is-edit-mode="isEditMode"
                        submit-text="cuenta por cobrar"
                        cancel-text="Regresar"
                        :on-cancel="handleCancel"
                    />
                </div>
            </div>
        </form>
        <PaymentModal />
    </div>
</template>
