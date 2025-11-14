<script setup lang="ts">
import { ref } from 'vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'
import useSupportStore from '@/navbar/Soporte/store/supportStore'
import { useSupportActions } from '@/navbar/Soporte/composables/useSupportActions'

const supportStore = useSupportStore()
const { handleSubmitTicket } = useSupportActions()

const name = ref('')
const email = ref('')
const description = ref('')
const attachments = ref<File[]>([])

const handleFileChange = (files: File[]) => {
    attachments.value = files
}

const handleSubmit = async () => {
    const success = await handleSubmitTicket(
        name.value,
        email.value,
        description.value,
        attachments.value
    )

    if (success) {
        // Limpiar formulario
        name.value = ''
        email.value = ''
        description.value = ''
        attachments.value = []
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl max-w-4xl mx-auto">
        <div class="card-body">
            <!-- Header -->
            <div class="text-center mb-6">
                <h2 class="text-3xl font-bold mb-2">Escríbenos</h2>
                <p class="text-base-content/70">
                    ¡Explícanos tus dudas, déjanos tus datos y nos contactaremos a la brevedad posible! Nos encantaría ayudar.
                </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Name -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Nombre <span class="text-error">*</span></span>
                    </label>
                    <input
                        v-model="name"
                        type="text"
                        class="input input-bordered w-full"
                        placeholder="Ingresa tu nombre completo"
                        required
                    />
                </div>

                <!-- Email -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Email <span class="text-error">*</span></span>
                    </label>
                    <input
                        v-model="email"
                        type="email"
                        class="input input-bordered w-full"
                        placeholder="tu@email.com"
                        required
                    />
                </div>

                <!-- Description -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Descripción detallada del problema <span class="text-error">*</span></span>
                    </label>
                    <textarea
                        v-model="description"
                        class="textarea textarea-bordered w-full h-32"
                        placeholder="Describe tu problema o consulta con el mayor detalle posible..."
                        required
                    ></textarea>
                </div>

                <!-- File Upload -->
                <BaseFormInputFile
                    name="attachments"
                    label="Subir archivos"
                    :multiple="true"
                    @update:modelValue="handleFileChange"
                />

                <!-- Submit Button -->
                <div class="flex justify-center mt-8">
                    <button
                        type="submit"
                        :disabled="supportStore.isSubmitting"
                        class="btn btn-primary btn-lg px-12"
                    >
                        <span v-if="supportStore.isSubmitting" class="loading loading-spinner"></span>
                        {{ supportStore.isSubmitting ? 'Enviando...' : 'Enviar' }}
                    </button>
                </div>
            </form>

            <!-- Footer -->
            <div class="text-center mt-8 text-sm text-base-content/60">
                © 2025, Proyectopolis S de RL®
            </div>
        </div>
    </div>
</template>
