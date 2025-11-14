<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useInvoiceStore from '@/modules/Fiscal/FacturasEmitidas/store/invoiceStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteInvoice from './DeleteInvoice.vue'
import AddEditForm from './AddEditForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { invoiceSchema } from '@/modules/Fiscal/FacturasEmitidas/validations/invoiceValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useInvoiceActions } from '@/modules/Fiscal/FacturasEmitidas/composables/useInvoiceActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
  onRefresh?: () => void
}>()

const invoiceStore = useInvoiceStore()
const modalStore = useModalStore()
const { createInvoice, editInvoice, deleteInvoice } = useInvoiceActions()

const getInitialValues = () => ({
    serie: 'A',
    clientName: '',
    clientRfc: '',
    issueDate: new Date().toISOString().split('T')[0],
    paymentDate: '',
    currency: 'MXN',
    paymentMethod: 'PUE',
    paymentForm: '01',
    cfdiUse: 'G03',
    items: []
})

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(invoiceSchema),
    validateOnMount: false,
    initialValues: getInitialValues()
})

watch(
    () => invoiceStore.selectedInvoice,
    (invoice) => {
        if (invoice && invoice.id) {
            setValues({
                serie: invoice.serie || 'A',
                clientName: invoice.clientName || '',
                clientRfc: invoice.clientRfc || '',
                issueDate: invoice.issueDate 
                    ? new Date(invoice.issueDate).toISOString().split('T')[0] 
                    : new Date().toISOString().split('T')[0],
                paymentDate: invoice.paymentDate 
                    ? new Date(invoice.paymentDate).toISOString().split('T')[0] 
                    : '',
                currency: invoice.currency || 'MXN',
                paymentMethod: invoice.paymentMethod || 'PUE',
                paymentForm: invoice.paymentForm || '01',
                cfdiUse: invoice.cfdiUse || 'G03',
                items: invoice.items || []
            })
        } else {
            // Reset to initial values for CREATE mode
            setValues(getInitialValues())
        }
    },
    { immediate: true }
)

const modalType = computed(() => {
    return modalStore.modals[invoiceStore.modalId]?.type || 'CREATE'
})

const isDeleteMode = computed(() => modalType.value === 'DELETE')

const onSubmit = handleSubmit(async (formValues) => {
    try {
        let result
        if (modalType.value === 'CREATE') {
            result = await createInvoice(formValues)
        } else if (modalType.value === 'EDIT') {
            result = await editInvoice(formValues)
        } else if (modalType.value === 'DELETE') {
            result = await deleteInvoice()
        }
        
        if (result) {
            const { message, status } = result
            showNotification(message, status)
            if(status == "success") props.onRefresh?.()
            modalStore.close(invoiceStore.modalId)
        }
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la factura', 'error')
    }
})

const onClose = () => {
    resetForm({
        values: getInitialValues()
    })
    invoiceStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="invoiceStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
        size="large"
    >
        <template v-slot:modalBody>
            <DeleteInvoice v-if="isDeleteMode" />
            <AddEditForm v-else />
        </template>
    </BaseModal>
</template>
