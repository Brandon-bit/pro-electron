<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useInitiativeStore from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/store/initiativeStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteInitiative from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/components/DeleteInitiative.vue'
import AddEditForm from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/components/AddEditForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { initiativeSchema } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/validations/initiativeValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useInitiativeActions } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/composables/useInitiativeActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const initiativeStore = useInitiativeStore()
const modalStore = useModalStore()
const { createInitiative, editInitiative, deleteInitiative } = useInitiativeActions()

const initialValues = {
    classification: initiativeStore.selectedInitiative?.classification,
    name: initiativeStore.selectedInitiative?.name,
    investment: initiativeStore.selectedInitiative?.investment,
    scope: initiativeStore.selectedInitiative?.scope,
    timeHorizon: initiativeStore.selectedInitiative?.timeHorizon,
    savings: initiativeStore.selectedInitiative?.savings,
    benefits: initiativeStore.selectedInitiative?.benefits,
    satisfaction: initiativeStore.selectedInitiative?.satisfaction,
    active: initiativeStore.selectedInitiative?.active
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(initiativeSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => initiativeStore.selectedInitiative,
    (initiative) => {
        if (initiative) {
            setValues({
                classification: initiative?.classification,
                name: initiative?.name,
                investment: initiative?.investment,
                scope: initiative?.scope,
                timeHorizon: initiative?.timeHorizon,
                savings: initiative?.savings,
                benefits: initiative?.benefits,
                satisfaction: initiative?.satisfaction,
                active: initiative?.active
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddEditForm,
        action: createInitiative
    },
    EDIT: {
        component: AddEditForm,
        action: editInitiative
    },
    DELETE: {
        component: DeleteInitiative,
        action: deleteInitiative
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[initiativeStore.modalId]?.type as keyof typeof modalMap | undefined
    return modalType ? modalMap[modalType]?.component : undefined
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[initiativeStore.modalId]?.type as keyof typeof modalMap | undefined
    if (!modalType) return
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == "success") {
            props.onRefresh?.()
            // Limpiar formulario después de crear
            if (modalType === 'CREATE') {
                resetForm({
                    values: {
                        classification: '',
                        name: '',
                        investment: 'Medio',
                        scope: 'Medio',
                        timeHorizon: 'Medio',
                        savings: 'Medio',
                        benefits: 'Medio',
                        satisfaction: 'Medio',
                        active: true
                    }
                })
            }
        }
        modalStore.close(initiativeStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm({
        values: {
            classification: '',
            name: '',
            investment: 'Medio',
            scope: 'Medio',
            timeHorizon: 'Medio',
            savings: 'Medio',
            benefits: 'Medio',
            satisfaction: 'Medio',
            active: true
        }
    })
    initiativeStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="initiativeStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
