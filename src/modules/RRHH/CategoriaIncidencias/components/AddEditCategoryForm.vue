<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
</script>

<template>
    <div class="space-y-4">
        <BaseFormInput
            label="Nombre"
            name="name"
            required
        />
        <BaseTextArea
            label="Descripción"
            name="description"
            placeholder="Descripción de la categoría"
            rows="3"
        />

        <BaseFormCheckbox label="Activo" name="status" />
    </div>
</template>
