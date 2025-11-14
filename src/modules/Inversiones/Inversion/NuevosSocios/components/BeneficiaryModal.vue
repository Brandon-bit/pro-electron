<script setup lang="ts">
import { useForm } from 'vee-validate'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { beneficiaryValidationSchema } from '../validations/partnerValidation'
import type { Beneficiary } from '../types/partnerTypes'

const emit = defineEmits<{
    'save': [beneficiary: Beneficiary]
}>()

const modalStore = useModalStore()
const modalId = 'beneficiary-modal'

// Formulario con validación
const { values: formData, errors, handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: beneficiaryValidationSchema,
    initialValues: {
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        curp: '',
        rfc: '',
        parentesco: '',
        porcentaje: 0
    }
})

const onSubmit = handleSubmit(async (values) => {
    emit('save', values as Beneficiary)
    modalStore.close(modalId)
})

const onClose = () => {
    resetForm()
}

const openModal = () => {
    resetForm()
    modalStore.open(modalId, 'Nuevo beneficiario')
}

defineExpose({
    openModal
})
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <div class="space-y-4">
                <!-- Fila 1: Nombre, Apellidos -->
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

                <!-- Fila 2: Fecha de nacimiento, CURP, RFC -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <BaseFormInput
                        v-model="formData.fechaNacimiento"
                        name="fechaNacimiento"
                        type="date"
                        label="Fecha de nacimiento"
                        :required="true"
                        :error="errors.fechaNacimiento"
                    />
                    <BaseFormInput
                        v-model="formData.curp"
                        name="curp"
                        label="CURP"
                        placeholder="Ingrese el CURP"
                        :error="errors.curp"
                        maxlength="18"
                        @input="formData.curp = formData.curp?.toUpperCase()"
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

                <!-- Fila 3: Parentesco, Porcentaje -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BaseFormInput
                        v-model="formData.parentesco"
                        name="parentesco"
                        label="Parentesco"
                        placeholder="Ingrese el parentesco"
                        :error="errors.parentesco"
                    />
                    <BaseFormInput
                        v-model.number="formData.porcentaje"
                        name="porcentaje"
                        type="number"
                        label="Porcentaje"
                        placeholder="0"
                        :required="true"
                        :error="errors.porcentaje"
                        min="0"
                        max="100"
                    />
                </div>

                <div class="text-right text-sm text-error">
                    * Campos obligatorios
                </div>
            </div>
        </template>
    </BaseModal>
</template>
