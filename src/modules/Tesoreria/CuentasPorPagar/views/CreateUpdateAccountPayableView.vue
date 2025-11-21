<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed, watch } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormActionButtons from '@/shared/components/BaseFormActionButtons.vue'
import useAccountPayableStore from '@/modules/Tesoreria/CuentasPorPagar/store/accountPayableStore'
import { useAccountPayableActions } from '@/modules/Tesoreria/CuentasPorPagar/composables/useAccountPayableActions'
import { createUpdateAccountPayableSchema } from '@/modules/Tesoreria/CuentasPorPagar/validations/accountPayableValidation'
import PaymentModal from '@/modules/Tesoreria/CuentasPorPagar/components/PaymentModal.vue'
import PaymentList from '@/modules/Tesoreria/CuentasPorPagar/components/PaymentList.vue'
import RegisterPaymentButton from '@/modules/Tesoreria/CuentasPorPagar/components/RegisterPaymentButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useSupplierActions } from '@/modules/Tesoreria/Proveedores/composables/useSupplierActions'

const route = useRoute()
const router = useRouter()
const isEditMode = computed(() => route.name === 'Actualizar cuenta por pagar')
const pageTitle = computed(() =>
    isEditMode.value ? 'Actualizar cuenta por pagar' : 'Crear cuenta por pagar'
)

interface SelectOptionsType {
    id: number
    label: string
}

const accountPayableStore = useAccountPayableStore()

const {
    createAccountPayable,
    updateAccountPayable,
    getAccountPayableById
} = useAccountPayableActions()

const { getSuppliersForSelect } = useSupplierActions()

const supplierOptions = ref<SelectOptionsType[]>([])

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
    if (!supplierOptions.value.length) {
        const data = await getSuppliersForSelect()
        supplierOptions.value = data.map(({ id, label }) => {
            return { id, label }
        })
    }

    const accountPayableId = parseInt(route.params.id as string)
    if (accountPayableId) {
        await getAccountPayableById(accountPayableId)
    }
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(createUpdateAccountPayableSchema),
    initialValues: {
        supplierId: accountPayableStore.selectedAccountPayable?.supplierId,
        documentNumber: accountPayableStore.selectedAccountPayable?.documentNumber,
        documentType: accountPayableStore.selectedAccountPayable?.documentType,
        issueDate: accountPayableStore.selectedAccountPayable?.issueDate,
        dueDate: accountPayableStore.selectedAccountPayable?.dueDate,
        amount: accountPayableStore.selectedAccountPayable?.amount,
        pendingBalance: accountPayableStore.selectedAccountPayable?.pendingBalance,
        status: accountPayableStore.selectedAccountPayable?.status,
        notes: accountPayableStore.selectedAccountPayable?.notes
    },
    validateOnMount: false
})

watch(
    () => accountPayableStore.selectedAccountPayable,
    (newValues) => {
        if (newValues) {
            resetForm({ values: { ...newValues } })
        }
    }
)

const onSubmit = handleSubmit(async (formValues) => {
    let result
    if (isEditMode.value) {
        result = await updateAccountPayable(formValues)
    } else {
        result = await createAccountPayable(formValues)
    }
    console.log(result)
})

const handleCancel = () => {
    accountPayableStore.clearPayments()
    router.push('/tesoreria/cuentas-por-pagar')
}
</script>

<template>
    <div class="xl:max-w-[70%] mx-auto">
        <BaseTitle 
            :title="pageTitle" 
            subtitle="Gestión de documentos y pagos por pagar"
        />
        <div class="mb-10 pt-10 text-right">
            <RegisterPaymentButton />
        </div>
        <form @submit="onSubmit">
            <div class="grid grid-cols-12 gap-4">
                <BaseFormSelect
                    name="supplierId"
                    label="Proveedor"
                    :options="supplierOptions"
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
                    placeholder="Observaciones sobre la cuenta por pagar"
                    class="col-span-12"
                />
                <div class="col-span-12">
                    <PaymentList />
                </div>
                <div class="col-span-12">
                    <BaseFormActionButtons
                        :is-submitting="isSubmitting"
                        :is-edit-mode="isEditMode"
                        submit-text="cuenta por pagar"
                        cancel-text="Regresar"
                        :on-cancel="handleCancel"
                    />
                </div>
            </div>
        </form>
        <PaymentModal />
    </div>
</template>
