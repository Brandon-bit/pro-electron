<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useAccountsCatalogStore from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/store/accountsCatalogStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteAccount from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/components/DeleteAccount.vue'
import AccountForm from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/components/AccountForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { accountSchema } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/validations/accountsCatalogValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useAccountCatalogActions } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalogActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const accountsCatalogStore = useAccountsCatalogStore()
const modalStore = useModalStore()
const { createAccount, updateAccount, deleteAccount } = useAccountCatalogActions()

const initialValues = {
    code: accountsCatalogStore.selectedAccount?.code || '',
    name: accountsCatalogStore.selectedAccount?.name || '',
    parentId: accountsCatalogStore.selectedAccount?.parentId || 0,
    typeId: accountsCatalogStore.selectedAccount?.typeId || 0,
    natureId: accountsCatalogStore.selectedAccount?.natureId || 0,
    levelId: accountsCatalogStore.selectedAccount?.levelId || 0,
    currencyId: accountsCatalogStore.selectedAccount?.currencyId || 0,
    clasificationId: accountsCatalogStore.selectedAccount?.clasificationId || 0,
    SATCode: accountsCatalogStore.selectedAccount?.SATCode || '',
    acceptsMovements: accountsCatalogStore.selectedAccount?.acceptsMovements ?? true,
    requiresAuxiliary: accountsCatalogStore.selectedAccount?.requiresAuxiliary ?? false,
    active: accountsCatalogStore.selectedAccount?.active ?? true
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(accountSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => accountsCatalogStore.selectedAccount,
    (account) => {
        if (account) {
            setValues({
                code: account?.code || '',
                name: account?.name || '',
                parentId: account?.parentId || 0,
                typeId: account?.typeId || 0,
                natureId: account?.natureId || 0,
                levelId: account?.levelId || 0,
                currencyId: account?.currencyId || 0,
                clasificationId: account?.clasificationId || 0,
                SATCode: account?.SATCode || '',
                acceptsMovements: account?.acceptsMovements ?? false,
                requiresAuxiliary: account?.requiresAuxiliary ?? false,
                active: account?.active ?? false
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AccountForm,
        action: createAccount
    },
    EDIT: {
        component: AccountForm,
        action: updateAccount
    },
    DELETE: {
        component: DeleteAccount,
        action: deleteAccount
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[accountsCatalogStore.modalId]?.type as keyof typeof modalMap
    return modalType ? modalMap[modalType]?.component : undefined
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[accountsCatalogStore.modalId]?.type as keyof typeof modalMap
    const action = modalType ? modalMap[modalType]?.action : undefined
    
    if (!action || !modalType) {
        showNotification('Error: Tipo de modal no válido', 'error')
        return
    }
    
    try {
        let result
        if (modalType === 'EDIT') {
            const id = accountsCatalogStore.selectedAccount?.id || 0
            result = await updateAccount(id, formValues)
        } else if (modalType === 'DELETE') {
            result = await deleteAccount()
        } else {
            result = await createAccount(formValues)
        }
        
        showNotification(result.message, result.status as 'success' | 'error')
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(accountsCatalogStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    accountsCatalogStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="accountsCatalogStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
