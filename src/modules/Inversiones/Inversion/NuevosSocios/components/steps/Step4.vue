<template>
    <div class="space-y-6">
        <!-- Header -->
        <div>
            <h2 class="text-2xl font-bold text-primary">Paso 4</h2>
            <p class="text-base-content/70 mt-1">Datos financieros</p>
        </div>

        <!-- Formulario con borde punteado azul -->
        <div class="border-2 border-dashed border-primary/30 rounded-lg p-6 space-y-4">
            <!-- Tipo de Persona -->
            <div class="form-control">
                <div class="flex gap-6 items-center">
                    <label class="cursor-pointer flex items-center gap-2">
                        <input
                            v-model="formData.tipoPersona"
                            type="radio"
                            name="tipoPersona"
                            value="fisica"
                            class="radio radio-primary"
                        />
                        <span class="font-medium">Persona Física</span>
                    </label>
                    <label class="cursor-pointer flex items-center gap-2">
                        <input
                            v-model="formData.tipoPersona"
                            type="radio"
                            name="tipoPersona"
                            value="moral"
                            class="radio radio-primary"
                        />
                        <span class="font-medium">Persona Moral</span>
                    </label>
                </div>
                <span v-if="errors.tipoPersona" class="text-error text-sm mt-1">{{ errors.tipoPersona }}</span>
            </div>

            <!-- Fila 1: Régimen Fiscal, Razón Social -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput
                    v-model="formData.regimenFiscal"
                    name="regimenFiscal"
                    label="Régimen Fiscal"
                    placeholder="Ingrese el régimen fiscal"
                    :error="errors.regimenFiscal"
                />
                <BaseFormInput
                    v-model="formData.razonSocial"
                    name="razonSocial"
                    label="Razón social"
                    placeholder="Ingrese la razón social"
                    :required="formData.tipoPersona === 'moral'"
                    :error="errors.razonSocial"
                />
            </div>

            <!-- Fila 2: Banco, RFC -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput
                    v-model="formData.banco"
                    name="banco"
                    label="Banco"
                    placeholder="Ingrese el banco"
                    :error="errors.banco"
                />
                <BaseFormInput
                    v-model="formData.rfc"
                    name="rfc"
                    label="RFC"
                    placeholder="Ingrese el RFC"
                    :required="true"
                    :error="errors.rfc"
                    maxlength="13"
                    @input="formData.rfc = formData.rfc?.toUpperCase()"
                />
            </div>

            <!-- Fila 3: Clabe, Cuenta -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput
                    v-model="formData.clabe"
                    name="clabe"
                    label="Clabe"
                    placeholder="Ingrese la CLABE"
                    :error="errors.clabe"
                    maxlength="18"
                    @input="formatClabe"
                />
                <BaseFormInput
                    v-model="formData.cuenta"
                    name="cuenta"
                    label="Cuenta"
                    placeholder="Ingrese la cuenta"
                    :error="errors.cuenta"
                />
            </div>

            <!-- Fila 4: Código SWIFT -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput
                    v-model="formData.codigoSwift"
                    name="codigoSwift"
                    label="Codigo SWIFT"
                    placeholder="Ingrese el código SWIFT"
                    :error="errors.codigoSwift"
                    maxlength="11"
                    @input="formData.codigoSwift = formData.codigoSwift?.toUpperCase()"
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
import { step4ValidationSchema } from '../../validations/partnerValidation'
import type { FinancialDataStep } from '../../types/partnerTypes'

interface Props {
    modelValue?: FinancialDataStep
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [value: FinancialDataStep]
    'validation-change': [isValid: boolean]
}>()

// Formulario con validación
const { values: formData, errors, validate, meta } = useForm({
    validationSchema: step4ValidationSchema,
    initialValues: props.modelValue || {
        tipoPersona: 'fisica',
        regimenFiscal: '',
        razonSocial: '',
        banco: '',
        rfc: '',
        clabe: '',
        cuenta: '',
        codigoSwift: ''
    }
})

// Formatear CLABE (solo números)
const formatClabe = () => {
    if (formData.clabe) {
        formData.clabe = formData.clabe.replace(/\D/g, '')
    }
}

// Emitir cambios al padre
watch(() => formData, (newValue) => {
    emit('update:modelValue', newValue as FinancialDataStep)
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
