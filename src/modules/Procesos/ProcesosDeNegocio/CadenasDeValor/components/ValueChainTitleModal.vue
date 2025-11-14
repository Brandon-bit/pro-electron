<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { createValueChainSchema } from '@procesos/ProcesosDeNegocio/CadenasDeValor/validations/valueChainValidation'

const props = defineProps<{
    isOpen: boolean
    currentTitle: string
}>()

const emit = defineEmits<{
    close: []
    submit: [data: { title: string }]
}>()

const modalRef = ref<HTMLDialogElement | null>(null)

const { handleSubmit, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(createValueChainSchema),
    initialValues: {
        title: ''
    }
})

watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        setValues({ title: props.currentTitle })
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
                Editar Título de Cadena de Valor
            </h3>

            <form @submit.prevent="onSubmit">
                <div class="space-y-4">
                    <BaseFormInput
                        name="title"
                        type="text"
                        label="Nuevo título"
                        placeholder="Ej: Cadena de Valor Principal"
                        :required="true"
                    />
                </div>

                <div class="modal-action">
                    <button type="button" class="btn btn-ghost" @click="handleClose">
                        Cancelar
                    </button>
                    <BaseButton
                        text="Guardar"
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
