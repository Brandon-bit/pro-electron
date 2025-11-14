<template>
    <div class="space-y-6">
        <!-- Header -->
        <div>
            <h2 class="text-2xl font-bold text-primary">Paso 1</h2>
            <p class="text-base-content/70 mt-1">Datos personales</p>
        </div>

        <!-- Formulario con borde punteado azul -->
        <div class="border-2 border-dashed border-primary/30 rounded-lg p-6 space-y-4">
            <!-- Fila 1: Nombre y Apellidos -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput
                    v-model="formData.nombre"
                    name="nombre"
                    label="Nombre"
                    placeholder="Ingrese el nombre"
                    :required="true"
                    :error="errors.nombre"
                />
                <BaseFormInput
                    v-model="formData.apellidos"
                    name="apellidos"
                    label="Apellidos"
                    placeholder="Ingrese los apellidos"
                    :required="true"
                    :error="errors.apellidos"
                />
            </div>

            <!-- Fila 2: Fecha de nacimiento, Edad, Sexo, Estado civil -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <BaseFormInput
                    v-model="formData.fechaNacimiento"
                    name="fechaNacimiento"
                    type="date"
                    label="Fecha de nacimiento"
                    :required="true"
                    :error="errors.fechaNacimiento"
                    @change="calculateAge"
                />
                <BaseFormInput
                    v-model.number="formData.edad"
                    name="edad"
                    type="number"
                    label="Edad"
                    :required="true"
                    :error="errors.edad"
                    :disabled="true"
                />
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Sexo</span>
                    </label>
                    <div class="flex gap-4 items-center h-12">
                        <label class="cursor-pointer flex items-center gap-2">
                            <input
                                v-model="formData.sexo"
                                type="radio"
                                name="sexo"
                                value="M"
                                class="radio radio-primary"
                            />
                            <span>M</span>
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input
                                v-model="formData.sexo"
                                type="radio"
                                name="sexo"
                                value="F"
                                class="radio radio-primary"
                            />
                            <span>F</span>
                        </label>
                    </div>
                    <span v-if="errors.sexo" class="text-error text-sm mt-1">{{ errors.sexo }}</span>
                </div>
                <BaseFormSelect
                    v-model="formData.estadoCivil"
                    name="estadoCivil"
                    label="Estado civil"
                    :required="true"
                    :options="estadoCivilOptions"
                    :error="errors.estadoCivil"
                />
            </div>

            <!-- Fila 3: CURP, Lugar de nacimiento, Nacionalidad -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BaseFormInput
                    v-model="formData.curp"
                    name="curp"
                    label="CURP"
                    placeholder="Ingrese el CURP"
                    :required="true"
                    :error="errors.curp"
                    maxlength="18"
                    @input="formData.curp = formData.curp?.toUpperCase()"
                />
                <BaseFormInput
                    v-model="formData.lugarNacimiento"
                    name="lugarNacimiento"
                    label="Lugar de nacimiento"
                    placeholder="Ingrese el lugar de nacimiento"
                    :error="errors.lugarNacimiento"
                />
                <BaseFormSelect
                    v-model="formData.nacionalidad"
                    name="nacionalidad"
                    label="Nacionalidad"
                    :required="true"
                    :options="nacionalidadOptions"
                    :error="errors.nacionalidad"
                />
            </div>

            <!-- Fila 4: INE -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BaseFormInput
                    v-model="formData.ine"
                    name="ine"
                    label="INE"
                    placeholder="Ingrese el INE"
                    :required="true"
                    :error="errors.ine"
                    maxlength="13"
                />
            </div>

            <div class="text-right text-sm text-error">
                * Campos obligatorios
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import { step1ValidationSchema } from '../../validations/partnerValidation'
import type { PersonalDataStep } from '../../types/partnerTypes'

interface Props {
    modelValue?: PersonalDataStep
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [value: PersonalDataStep]
    'validation-change': [isValid: boolean]
}>()

// Opciones de selects
const estadoCivilOptions = [
    { id: '', value: '-- Opción --' },
    { id: 'soltero', value: 'Soltero(a)' },
    { id: 'casado', value: 'Casado(a)' },
    { id: 'divorciado', value: 'Divorciado(a)' },
    { id: 'viudo', value: 'Viudo(a)' },
    { id: 'union_libre', value: 'Unión libre' }
]

const nacionalidadOptions = [
    { id: '', value: '-- Opción --' },
    { id: 'Mexicana', value: 'Mexicana' },
    { id: 'Estadounidense', value: 'Estadounidense' },
    { id: 'Canadiense', value: 'Canadiense' },
    { id: 'Española', value: 'Española' },
    { id: 'Otra', value: 'Otra' }
]

// Formulario con validación
const { values: formData, errors, validate, meta } = useForm({
    validationSchema: step1ValidationSchema,
    initialValues: props.modelValue || {
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        edad: 0,
        sexo: 'M',
        estadoCivil: '',
        curp: '',
        lugarNacimiento: '',
        nacionalidad: '',
        ine: ''
    }
})

// Calcular edad automáticamente
const calculateAge = () => {
    if (formData.fechaNacimiento) {
        const birthDate = new Date(formData.fechaNacimiento)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        
        formData.edad = age
    }
}

// Emitir cambios al padre
watch(() => formData, (newValue) => {
    emit('update:modelValue', newValue as PersonalDataStep)
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
