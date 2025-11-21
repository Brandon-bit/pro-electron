<script setup lang="ts">
import { watch } from 'vue'
import { useForm } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import useAccountTypesStore from '@contabilidad/Configuracion/AccountTypes/store/accountTypesStore'
import type { AccountTypeFormDTO } from '@contabilidad/Configuracion/AccountTypes/types/accountTypesTypes'

const emit = defineEmits(['submit', 'cancel'])

const accountTypesStore = useAccountTypesStore()

// Use vee-validate form
const { handleSubmit, setValues, values } = useForm<AccountTypeFormDTO>({
    initialValues: {
        id: undefined,
        name: '',
        description: '',
        active: true
    }
})

// Watch store changes and update form values
watch(
    () => accountTypesStore.currentAccountType,
    (newValue) => {
        setValues(newValue)
    },
    { immediate: true, deep: true }
)

const onSubmit = handleSubmit((formData) => {
    console.log('📝 Form data being submitted:', formData)
    emit('submit', formData)
})

const handleCancel = () => {
    emit('cancel')
}

const isEditMode = () => !!(values.id)
</script>

<template>
    <form @submit.prevent="onSubmit" class="space-y-6">
        <!-- Nombre -->
        <BaseFormInput
            name="name"
            label="Nombre"
            type="text"
            placeholder="Ej: Mayor, Detalle, Título..."
            :required="true"
        />

        <!-- Descripción -->
        <BaseTextArea
            name="description"
            label="Descripción"
        />

        <!-- Estado Activo -->
        <BaseFormCheckbox
            name="active"
            label="Activo"
        />

        <!-- Botones -->
        <div class="flex justify-end gap-3 pt-4">
            <BaseButton
                type="button"
                text="Cancelar"
                variant="secondary"
                @click="handleCancel"
            />
            <BaseButton
                type="submit"
                :text="isEditMode() ? 'Actualizar' : 'Crear'"
                variant="primary"
            />
        </div>
    </form>
</template>
