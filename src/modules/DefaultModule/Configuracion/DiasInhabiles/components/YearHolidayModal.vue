<script setup lang="ts">
import { watch, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useHolidayStore from '@/modules/DefaultModule/Configuracion/DiasInhabiles/store/holidayStore'
import { useHolidayActions } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/composables/useHolidayActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { yearSchema } from '@defaultModule/Configuracion/DiasInhabiles/validations/holidayValidations'
import AddYearHolidayForm from './AddYearForm.vue'
import DeleteYearHoliday from './DeleteYear.vue'

const modalStore = useModalStore()
const holidayStore = useHolidayStore()
const { createYearHoliday, deleteYearHoliday } = useHolidayActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(yearSchema),
    validateOnMount: false,
    initialValues: {
        year: 0
    }
})

watch(
    () => holidayStore.selectedYear,
    (year) => {
        if (year) {
            setValues({ year })
        } else {
            // Cuando se limpia selectedYear (0), reseteamos el formulario
            resetForm({ values: { year: 0 } })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddYearHolidayForm,
        action: createYearHoliday
    },
    DELETE: {
        component: DeleteYearHoliday,
        action: deleteYearHoliday
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[holidayStore.yearModalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[holidayStore.yearModalId]?.type
    const action = modalMap[modalType]?.action
    await action(formValues.year)
    holidayStore.clearYear()
    modalStore.close(holidayStore.yearModalId)
})

const onClose = () => {
    resetForm()
    holidayStore.clearYear()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="holidayStore.yearModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
