<template>
    <div class="space-y-6">
        <!-- Header -->
        <div>
            <h2 class="text-2xl font-bold text-primary">Paso 3</h2>
            <p class="text-base-content/70 mt-1">Domicilio</p>
        </div>

        <!-- Formulario con borde punteado azul -->
        <div class="border-2 border-dashed border-primary/30 rounded-lg p-6 space-y-4">
            <!-- Fila 1: Calle, No. Exterior, No. Interior -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BaseFormInput
                    v-model="formData.calle"
                    name="calle"
                    label="Calle"
                    placeholder="Ingrese la calle"
                    :required="true"
                    :error="errors.calle"
                />
                <BaseFormInput
                    v-model="formData.numeroExterior"
                    name="numeroExterior"
                    label="No. Exterior"
                    placeholder="Número exterior"
                    :required="true"
                    :error="errors.numeroExterior"
                />
                <BaseFormInput
                    v-model="formData.numeroInterior"
                    name="numeroInterior"
                    label="No. Interior"
                    placeholder="Número interior"
                    :error="errors.numeroInterior"
                />
            </div>

            <!-- Fila 2: Colonia, C.P. -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput
                    v-model="formData.colonia"
                    name="colonia"
                    label="Colonia"
                    placeholder="Ingrese la colonia"
                    :required="true"
                    :error="errors.colonia"
                />
                <BaseFormInput
                    v-model="formData.codigoPostal"
                    name="codigoPostal"
                    label="C.P."
                    placeholder="Código postal"
                    :required="true"
                    :error="errors.codigoPostal"
                    maxlength="5"
                    @input="formatCP"
                />
            </div>

            <!-- Fila 3: Ciudad, Estado -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput
                    v-model="formData.ciudad"
                    name="ciudad"
                    label="Ciudad"
                    placeholder="Ingrese la ciudad"
                    :required="true"
                    :error="errors.ciudad"
                />
                <BaseFormInput
                    v-model="formData.estado"
                    name="estado"
                    label="Estado"
                    placeholder="Ingrese el estado"
                    :required="true"
                    :error="errors.estado"
                />
            </div>

            <!-- Fila 4: País -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput
                    v-model="formData.pais"
                    name="pais"
                    label="País"
                    placeholder="Ingrese el país"
                    :required="true"
                    :error="errors.pais"
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
import { step3ValidationSchema } from '../../validations/partnerValidation'
import type { AddressStep } from '../../types/partnerTypes'

interface Props {
    modelValue?: AddressStep
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [value: AddressStep]
    'validation-change': [isValid: boolean]
}>()

// Formulario con validación
const { values: formData, errors, validate, meta } = useForm({
    validationSchema: step3ValidationSchema,
    initialValues: props.modelValue || {
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        colonia: '',
        codigoPostal: '',
        ciudad: '',
        estado: '',
        pais: ''
    }
})

// Formatear código postal (solo números)
const formatCP = () => {
    if (formData.codigoPostal) {
        formData.codigoPostal = formData.codigoPostal.replace(/\D/g, '')
    }
}

// Emitir cambios al padre
watch(() => formData, (newValue) => {
    emit('update:modelValue', newValue as AddressStep)
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
