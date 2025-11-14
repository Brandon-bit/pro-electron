<script setup lang="ts">
import { watch, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useHolidayStore from '@/modules/DefaultModule/Configuracion/DiasInhabiles/store/holidayStore'
import { useHolidayActions } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/composables/useHolidayActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { holidaySchema } from '@defaultModule/Configuracion/DiasInhabiles/validations/holidayValidations'
import AddHolidayForm from './AddHolidayForm.vue'
import DeleteHoliday from './DeleteHoliday.vue'

const modalStore = useModalStore()
const holidayStore = useHolidayStore()
const { createHoliday, deleteHoliday } = useHolidayActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(holidaySchema),
    validateOnMount: false,
    initialValues: {
        date: '',
        description: ''
    }
})

watch(
    () => holidayStore.selectedHoliday,
    (holiday) => {
        if (holiday) {
            setValues({
                date: holiday?.date,
                description: holiday?.description,
                active: holiday?.active,
            })
        }
    },
    { immediate: true }
)

watch(
    () => holidayStore.selectedYear,
    (year) => {
        const modalType = modalStore.modals[holidayStore.holidayModalId]?.type

        // Solo para CREATE y cuando no hay holiday seleccionado (nuevo registro)
        if (modalType === 'CREATE' && year && !holidayStore.selectedHoliday) {
            setValues({
                date: `${year}-01-01`,
                description: '',
                active: true,
            })
        }
    }
)

const modalMap = {
    CREATE: {
        component: AddHolidayForm,
        action: createHoliday
    },
    DELETE: {
        component: DeleteHoliday,
        action: deleteHoliday
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[holidayStore.holidayModalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = async () => {
    const modalType = modalStore.modals[holidayStore.holidayModalId]?.type

    // Para creación, usamos handleSubmit con validación del esquema
    if (modalType === 'CREATE') {
        await handleSubmit(async (formValues) => {
            await createHoliday(formValues)
            holidayStore.clearYear()
            modalStore.close(holidayStore.holidayModalId)
        })()
        return
    }

    // Para eliminación, no necesitamos validar el formulario
    if (modalType === 'DELETE') {
        await deleteHoliday()
        holidayStore.clearYear()
        modalStore.close(holidayStore.holidayModalId)
    }
}

const onClose = () => {
    resetForm()
    holidayStore.clearData()
    holidayStore.clearYear()
}

</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="holidayStore.holidayModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
