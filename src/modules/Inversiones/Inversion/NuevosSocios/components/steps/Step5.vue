<template>
    <div class="space-y-6">
        <!-- Header -->
        <div>
            <h2 class="text-2xl font-bold text-primary">Paso 5</h2>
            <p class="text-base-content/70 mt-1">Beneficiarios</p>
        </div>

        <!-- Contenedor con borde punteado azul -->
        <div class="border-2 border-dashed border-primary/30 rounded-lg p-6 space-y-4">
            <!-- Botón Agregar Beneficiario -->
            <div>
                <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="openBeneficiaryModal"
                >
                    <span class="material-icons text-sm">add</span>
                    Agregar beneficiario
                </button>
            </div>

            <!-- Tabla de Beneficiarios -->
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead class="bg-base-300">
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Fecha de nacimiento</th>
                            <th>CURP</th>
                            <th>RFC</th>
                            <th>Parentesco</th>
                            <th>Porcentaje</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="beneficiarios.length === 0">
                            <td colspan="8" class="text-center text-base-content/50">
                                No hay beneficiarios agregados
                            </td>
                        </tr>
                        <tr v-for="(beneficiario, index) in beneficiarios" :key="index">
                            <td>{{ beneficiario.nombre }}</td>
                            <td>{{ beneficiario.apellidos }}</td>
                            <td>{{ formatDate(beneficiario.fechaNacimiento) }}</td>
                            <td>{{ beneficiario.curp || '-' }}</td>
                            <td>{{ beneficiario.rfc }}</td>
                            <td>{{ beneficiario.parentesco || '-' }}</td>
                            <td>{{ beneficiario.porcentaje }}%</td>
                            <td>
                                <button
                                    type="button"
                                    class="btn btn-error btn-xs"
                                    @click="removeBeneficiary(index)"
                                >
                                    <span class="material-icons text-sm">delete</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Resumen de porcentajes -->
            <div v-if="beneficiarios.length > 0" class="text-right">
                <span class="font-semibold">Total de porcentajes: </span>
                <span :class="totalPercentage === 100 ? 'text-success' : 'text-warning'">
                    {{ totalPercentage }}%
                </span>
                <span v-if="totalPercentage !== 100" class="text-warning text-sm ml-2">
                    (Debe sumar 100%)
                </span>
            </div>
        </div>

        <!-- Modal de Beneficiario -->
        <BeneficiaryModal
            ref="beneficiaryModalRef"
            @save="addBeneficiary"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import BeneficiaryModal from '../BeneficiaryModal.vue'
import { step5ValidationSchema } from '../../validations/partnerValidation'
import type { BeneficiariesStep, Beneficiary } from '../../types/partnerTypes'

interface Props {
    modelValue?: BeneficiariesStep
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [value: BeneficiariesStep]
    'validation-change': [isValid: boolean]
}>()

const beneficiaryModalRef = ref<InstanceType<typeof BeneficiaryModal> | null>(null)
const beneficiarios = ref<Beneficiary[]>(props.modelValue?.beneficiarios || [])

// Formulario con validación
const { validate, meta } = useForm({
    validationSchema: step5ValidationSchema,
    initialValues: {
        beneficiarios: beneficiarios.value
    }
})

// Calcular total de porcentajes
const totalPercentage = computed(() => {
    return beneficiarios.value.reduce((sum, b) => sum + b.porcentaje, 0)
})

// Formatear fecha
const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX')
}

// Abrir modal
const openBeneficiaryModal = () => {
    beneficiaryModalRef.value?.openModal()
}

// Agregar beneficiario
const addBeneficiary = (beneficiary: Beneficiary) => {
    beneficiarios.value.push(beneficiary)
    emitChanges()
}

// Eliminar beneficiario
const removeBeneficiary = (index: number) => {
    beneficiarios.value.splice(index, 1)
    emitChanges()
}

// Emitir cambios
const emitChanges = () => {
    emit('update:modelValue', { beneficiarios: beneficiarios.value })
}

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
