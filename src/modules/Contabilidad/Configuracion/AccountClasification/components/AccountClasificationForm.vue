<script setup lang="ts">
import { computed } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import useAccountClasificationStore from '@contabilidad/Configuracion/AccountClasification/store/accountClasificationStore'

const emit = defineEmits(['submit', 'cancel'])

const accountClasificationStore = useAccountClasificationStore()

const formData = computed(() => accountClasificationStore.currentAccountClasification)

const handleSubmit = () => {
    emit('submit', formData.value)
}

const handleCancel = () => {
    emit('cancel')
}

const isEditMode = computed(() => !!formData.value.id)
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Nombre -->
        <BaseFormInput
            v-model="formData.name"
            name="name"
            label="Nombre *"
            type="text"
            placeholder="Ej: Balance, Orden, Resultados..."
            :required="true"
        />

        <!-- Descripción -->
        <BaseTextArea
            v-model="formData.description"
            name="description"
            label="Descripción"
            placeholder="Descripción de la clasificación de cuenta"
            :rows="3"
        />

        <!-- Estado Activo -->
        <BaseFormCheckbox
            v-model="formData.active"
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
                :text="isEditMode ? 'Actualizar' : 'Crear'"
                variant="primary"
            />
        </div>
    </form>
</template>
