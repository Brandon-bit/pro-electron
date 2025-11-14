<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'

interface Props {
    name: string
    label?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    maskFormat?: string // Formato de máscara, ej: "0000-00-00-00-00-00"
}

const props = withDefaults(defineProps<Props>(), {
    label: 'Código',
    placeholder: '0000-00-00-00-00-00',
    required: false,
    disabled: false,
    maskFormat: '0000-00-00-00-00-00'
})

// Función para obtener la vista previa del formato
const getMaskPreview = (mask: string): string => {
    return mask.replace(/0/g, 'X')
}
</script>

<template>
    <div class="space-y-2">
        <BaseFormInput
            :name="name"
            :label="label"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            maxlength="25"
            type="text"
        />
        <div class="text-xs text-gray-500">
            Formato esperado: <span class="font-mono">{{ getMaskPreview(maskFormat) }}</span>
        </div>
    </div>
</template>
