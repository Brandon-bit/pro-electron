<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    isOpen: boolean
    dniCV: number
}>()

const emit = defineEmits<{
    close: []
    submit: [nombre: string]
}>()

const modalRef = ref<HTMLDialogElement | null>(null)

const schema = z.object({
    nombre: z
        .string({ required_error: 'El nombre es requerido' })
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres')
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
            modalRef.value?.showModal()
        } else {
            modalRef.value?.close()
        }
    }
)

const onSubmit = handleSubmit(async (values) => {
    emit('submit', values.nombre)
})

const handleClose = () => {
    resetForm()
    emit('close')
}
</script>

<template>
    <dialog ref="modalRef" class="modal" @close="handleClose">
        <div class="modal-box max-w-md">
            <h3 class="font-bold text-lg mb-4">Crear Espacio</h3>

            <form @submit.prevent="onSubmit">
                <div class="space-y-4">
                    <BaseFormInput
                        name="nombre"
                        type="text"
                        label="Nombre del espacio"
                        placeholder="Ej: Recursos Humanos"
                        :required="true"
                    />
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
