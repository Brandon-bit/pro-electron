<template>
    <div class="space-y-6">
        <!-- Header -->
        <div>
            <h2 class="text-2xl font-bold text-primary">Paso 2</h2>
            <p class="text-base-content/70 mt-1">Contacto</p>
        </div>

        <!-- Formulario con borde punteado azul -->
        <div class="border-2 border-dashed border-primary/30 rounded-lg p-6 space-y-4">
            <!-- Fila 1: Teléfonos -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Teléfono Casa -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Teléfono Casa</span>
                    </label>
                    <div class="flex gap-2">
                        <select
                            v-model="formData.telefonoCasaPais"
                            class="select select-bordered w-24"
                        >
                            <option value="+52">🇲🇽 +52</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+34">🇪🇸 +34</option>
                        </select>
                        <input
                            v-model="formData.telefonoCasa"
                            type="tel"
                            placeholder="222 123 4567"
                            class="input input-bordered flex-1"
                            maxlength="10"
                            @input="formatPhone('telefonoCasa')"
                        />
                    </div>
                    <span v-if="errors.telefonoCasa" class="text-error text-sm mt-1">{{ errors.telefonoCasa }}</span>
                </div>

                <!-- Teléfono Celular -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Teléfono Celular<span class="text-error">*</span></span>
                    </label>
                    <div class="flex gap-2">
                        <select
                            v-model="formData.telefonoCelularPais"
                            class="select select-bordered w-24"
                        >
                            <option value="+52">🇲🇽 +52</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+34">🇪🇸 +34</option>
                        </select>
                        <input
                            v-model="formData.telefonoCelular"
                            type="tel"
                            placeholder="222 123 4567"
                            class="input input-bordered flex-1"
                            :class="{ 'input-error': errors.telefonoCelular }"
                            maxlength="10"
                            @input="formatPhone('telefonoCelular')"
                        />
                    </div>
                    <span v-if="errors.telefonoCelular" class="text-error text-sm mt-1">{{ errors.telefonoCelular }}</span>
                </div>
            </div>

            <!-- Fila 2: Correo electrónico -->
            <div class="grid grid-cols-1 gap-4">
                <BaseFormInput
                    v-model="formData.correoElectronico"
                    name="correoElectronico"
                    type="email"
                    label="Correo electronico"
                    placeholder="ejemplo@correo.com"
                    :required="true"
                    :error="errors.correoElectronico"
                />
            </div>

            <div class="text-right text-sm text-error">
                * Campos obligatorios
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useForm } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { step2ValidationSchema } from '../../validations/partnerValidation'
import type { ContactStep } from '../../types/partnerTypes'

interface Props {
    modelValue?: ContactStep
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [value: ContactStep]
    'validation-change': [isValid: boolean]
}>()

// Formulario con validación
const { values: formData, errors, validate, meta } = useForm({
    validationSchema: step2ValidationSchema,
    initialValues: props.modelValue || {
        telefonoCasa: '',
        telefonoCasaPais: '+52',
        telefonoCelular: '',
        telefonoCelularPais: '+52',
        correoElectronico: ''
    }
})

// Formatear teléfono (solo números)
const formatPhone = (field: 'telefonoCasa' | 'telefonoCelular') => {
    const value = formData[field]
    if (value) {
        formData[field] = value.replace(/\D/g, '')
    }
}

// Emitir cambios al padre
watch(() => formData, (newValue) => {
    emit('update:modelValue', newValue as ContactStep)
}, { deep: true })

// Emitir estado de validación
watch(() => meta.value.valid, (isValid) => {
    emit('validation-change', isValid)
})

// Método de validación para uso externo
const validateStep = async () => {
    return await validate()
}

// Exponer método de validación
defineExpose({
    validate: validateStep
})
</script>
