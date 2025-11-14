<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { createAreaSchema } from '@procesos/ProcesosDeNegocio/CadenasDeValor/validations/valueChainValidation'
import type { AreaType } from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'

const props = defineProps<{
    isOpen: boolean
    area?: AreaType | null
    mode: 'create' | 'edit'
}>()

const emit = defineEmits<{
    close: []
    submit: [data: { title: string }]
}>()

const modalRef = ref<HTMLDialogElement | null>(null)

const { handleSubmit, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(createAreaSchema),
    initialValues: {
        title: ''
    }
})

// Observar cambios en isOpen para abrir/cerrar el modal
watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        if (props.mode === 'edit' && props.area) {
            setValues({ title: props.area.title })
        } else {
            resetForm()
        }
        modalRef.value?.showModal()
    } else {
        modalRef.value?.close()
    }
})

const onSubmit = handleSubmit((values) => {
    emit('submit', values)
    resetForm()
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
                {{ mode === 'create' ? 'Agregar Área' : 'Editar Área' }}
            </h3>

            <form @submit.prevent="onSubmit">
                <div class="space-y-4">
                    <BaseFormInput
                        name="title"
                        type="text"
                        label="Título del área"
                        placeholder="Ej: Recursos Humanos"
                        :required="true"
                    />
                </div>

                <div class="modal-action">
                    <button type="button" class="btn btn-ghost" @click="handleClose">
                        Cancelar
                    </button>
                    <BaseButton
                        :text="mode === 'create' ? 'Crear' : 'Guardar'"
                        type="submit"
                        color="btn-primary"
                    />
                </div>
            </form>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button type="button" @click="handleClose">close</button>
        </form>
    </dialog>
</template>
