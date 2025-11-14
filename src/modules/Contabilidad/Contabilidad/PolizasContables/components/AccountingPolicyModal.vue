<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useAccountingPoliciesStore from '@/modules/Contabilidad/Contabilidad/PolizasContables/store/accountingPoliciesStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteAccountingPolicy from '@/modules/Contabilidad/Contabilidad/PolizasContables/components/DeleteAccountingPolicy.vue'
import AccountingPolicyForm from '@/modules/Contabilidad/Contabilidad/PolizasContables/components/AccountingPolicyForm.vue'
import AccountingPolicyDetail from '@/modules/Contabilidad/Contabilidad/PolizasContables/components/AccountingPolicyDetail.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { accountingPolicySchema } from '@/modules/Contabilidad/Contabilidad/PolizasContables/validations/accountingPoliciesValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useAccountingPoliciesActions } from '@/modules/Contabilidad/Contabilidad/PolizasContables/composables/useAccountingPoliciesActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const accountingPoliciesStore = useAccountingPoliciesStore()
const modalStore = useModalStore()
const { createAccountingPolicy, updateAccountingPolicy, deleteAccountingPolicy } = useAccountingPoliciesActions()

const initialValues = {
    folio: accountingPoliciesStore.selectedPolicy?.folio || '',
    date: accountingPoliciesStore.selectedPolicy?.date || new Date().toISOString().split('T')[0],
    typeId: accountingPoliciesStore.selectedPolicy?.typeId || 0,
    concept: accountingPoliciesStore.selectedPolicy?.concept || '',
    entries: accountingPoliciesStore.selectedPolicy?.entries || []
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(accountingPolicySchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => accountingPoliciesStore.selectedPolicy,
    (policy) => {
        if (policy) {
            setValues({
                folio: policy?.folio || '',
                date: policy?.date || new Date().toISOString().split('T')[0],
                typeId: policy?.typeId || 0,
                concept: policy?.concept || '',
                entries: policy?.entries || []
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AccountingPolicyForm,
        action: createAccountingPolicy
    },
    EDIT: {
        component: AccountingPolicyForm,
        action: updateAccountingPolicy
    },
    DELETE: {
        component: DeleteAccountingPolicy,
        action: deleteAccountingPolicy
    },
    DETAIL: {
        component: AccountingPolicyDetail,
        action: null
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[accountingPoliciesStore.modalId]?.type
    return modalType ? modalMap[modalType as keyof typeof modalMap]?.component : null
})

const currentModalType = computed(() => {
    return modalStore.modals[accountingPoliciesStore.modalId]?.type
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[accountingPoliciesStore.modalId]?.type
    const action = modalType ? modalMap[modalType as keyof typeof modalMap]?.action : null
    
    // Si es DETAIL, no hacer nada (solo cerrar)
    if (modalType === 'DETAIL') {
        modalStore.close(accountingPoliciesStore.modalId)
        return
    }
    
    if (!action) return
    
    try {
        let result
        
        // Calcular total y status para el form data
        const totalDebit = formValues.entries?.reduce((sum: number, entry: any) => sum + (entry.debit || 0), 0) || 0
        const totalCredit = formValues.entries?.reduce((sum: number, entry: any) => sum + (entry.credit || 0), 0) || 0
        const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01 && totalDebit > 0
        
        // Asegurar que entries tengan reference como string
        const entriesWithReference = formValues.entries?.map((entry: any) => ({
            ...entry,
            reference: entry.reference || ''
        })) || []
        
        const completeFormData = {
            ...formValues,
            id: accountingPoliciesStore.selectedPolicy?.id,
            total: totalDebit,
            status: isBalanced ? 'Cuadrada' as const : 'Descuadrada' as const,
            entries: entriesWithReference
        }
        
        if (modalType === 'EDIT' || modalType === 'CREATE') {
            result = await action(completeFormData)
        } else if (modalType === 'DELETE') {
            result = await deleteAccountingPolicy()
        } else {
            result = await action(completeFormData)
        }
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(accountingPoliciesStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    accountingPoliciesStore.setData()
    accountingPoliciesStore.setEditMode(false)
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="accountingPoliciesStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
        :hideFooter="currentModalType === 'DETAIL'"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
