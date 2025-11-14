<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import type { SpaceType } from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'

const props = defineProps<{
    isOpen: boolean
    space: SpaceType | null
}>()

const emit = defineEmits<{
    close: []
    submit: [data: { nombre: string; asis: boolean }]
}>()

const modalRef = ref<HTMLDialogElement | null>(null)
const selectedType = ref<'asis' | 'tobe'>('asis')

const schema = z.object({
    nombre: z
        .string({ required_error: 'El nombre es requerido' })
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(150, 'El nombre no puede exceder 150 caracteres')
})

const { handleSubmit, resetForm, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: {
        nombre: ''
    }
})

watch(
    () => props.isOpen,
    (newValue) => {
        if (newValue) {
            resetForm()
            selectedType.value = 'asis'
            modalRef.value?.showModal()
        } else {
            modalRef.value?.close()
        }
    }
)

const onSubmit = handleSubmit(async (values) => {
    emit('submit', {
        nombre: values.nombre,
        asis: selectedType.value === 'asis'
    })
})

const handleClose = () => {
    resetForm()
    emit('close')
}
</script>

<template>
    <dialog ref="modalRef" class="modal" @close="handleClose">
        <div class="modal-box max-w-md">
            <h3 class="font-bold text-lg mb-4">
                Crear Proceso en: <span class="text-primary">{{ space?.nombre }}</span>
            </h3>

            <form @submit.prevent="onSubmit">
                <div class="space-y-4">
                    <BaseFormInput
                        name="nombre"
                        type="text"
                        label="Nombre del proceso"
                        placeholder="Ej: Reclutamiento"
                        :required="true"
                    />

                    <!-- Radio buttons para tipo de proceso -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Tipo de proceso</span>
                        </label>
                        <div class="flex gap-4">
                            <label class="label cursor-pointer gap-2 border rounded-lg p-3 flex-1" :class="selectedType === 'asis' ? 'border-warning bg-warning/10' : 'border-base-300'">
                                <input
                                    type="radio"
                                    name="tipo"
                                    value="asis"
                                    v-model="selectedType"
                                    class="radio radio-warning"
                                />
                                <span class="label-text font-medium">AS-IS (Como está)</span>
                            </label>
                            <label class="label cursor-pointer gap-2 border rounded-lg p-3 flex-1" :class="selectedType === 'tobe' ? 'border-info bg-info/10' : 'border-base-300'">
                                <input
                                    type="radio"
                                    name="tipo"
                                    value="tobe"
                                    v-model="selectedType"
                                    class="radio radio-info"
                                />
                                <span class="label-text font-medium">TO-BE (Como debe ser)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="modal-action">
                    <button type="button" class="btn btn-ghost" @click="handleClose">
                        Cancelar
                    </button>
                    <BaseButton
                        text="Agregar"
                        type="submit"
                        color="btn-primary"
                        :loading="isSubmitting"
                    />
                </div>
            </form>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button type="button" @click="handleClose">close</button>
        </form>
    </dialog>
</template>
