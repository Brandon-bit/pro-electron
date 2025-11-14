<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { createProcessLevel2Schema } from '@procesos/ProcesosDeNegocio/CadenasDeValor/validations/valueChainValidation'
import type { Level2ProcessType } from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'

const props = defineProps<{
    isOpen: boolean
    process?: Level2ProcessType | null
    mode: 'create' | 'edit'
}>()

const emit = defineEmits<{
    close: []
    submit: [data: { title: string }]
}>()

const modalRef = ref<HTMLDialogElement | null>(null)

const { handleSubmit, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(createProcessLevel2Schema),
    initialValues: {
        title: ''
    }
})

watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        if (props.mode === 'edit' && props.process) {
            setValues({ title: props.process.title })
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
                {{ mode === 'create' ? 'Agregar Grupo de Procesos' : 'Editar Grupo de Procesos' }}
            </h3>

            <form @submit.prevent="onSubmit">
                <div class="space-y-4">
                    <BaseFormInput
                        name="title"
                        type="textarea"
                        label="Título del grupo de procesos"
                        placeholder="Ej: Prototipado"
                        :required="true"
                        :rows="3"
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
