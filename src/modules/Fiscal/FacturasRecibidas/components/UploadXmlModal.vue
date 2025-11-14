<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import useReceivedInvoiceStore from '@/modules/Fiscal/FacturasRecibidas/store/receivedInvoiceStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useReceivedInvoiceActions } from '@/modules/Fiscal/FacturasRecibidas/composables/useReceivedInvoiceActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const receivedInvoiceStore = useReceivedInvoiceStore()
const modalStore = useModalStore()
const { uploadXml } = useReceivedInvoiceActions()

const selectedFile = ref<File | null>(null)
const isSubmitting = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0]
    }
}

const handleUpload = async () => {
    if (!selectedFile.value) {
        showNotification('Debe seleccionar un archivo XML', 'error')
        return
    }

    if (!selectedFile.value.name.endsWith('.xml')) {
        showNotification('El archivo debe ser un XML', 'error')
        return
    }

    if (selectedFile.value.size > 5 * 1024 * 1024) {
        showNotification('El archivo no debe exceder 5MB', 'error')
        return
    }

    isSubmitting.value = true
    try {
        const { message, status } = await uploadXml(selectedFile.value)
        showNotification(message, status)
        
        if (status === 'success') {
            props.onRefresh?.()
            modalStore.close(receivedInvoiceStore.uploadModalId)
            selectedFile.value = null
        }
    } catch (error) {
        showNotification('Error al cargar el XML', 'error')
    } finally {
        isSubmitting.value = false
    }
}

const onClose = () => {
    selectedFile.value = null
    if (fileInputRef.value) {
        fileInputRef.value.value = ''
    }
}

const triggerFileInput = () => {
    fileInputRef.value?.click()
}
</script>

<template>
    <BaseModal
        :modalId="receivedInvoiceStore.uploadModalId"
        :onClose="onClose"
        :onSubmit="handleUpload"
        :isSubmitting="isSubmitting"
        :showFooter="false"
    >
        <template v-slot:modalBody>
            <div class="space-y-4">
                <div class="alert alert-info">
                    <span class="material-symbols-outlined">info</span>
                    <span class="text-sm">
                        Seleccione el archivo XML de la factura recibida. El sistema extraerá automáticamente la información.
                    </span>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Archivo XML *</span>
                    </label>
                    <input 
                        ref="fileInputRef"
                        type="file"
                        accept=".xml"
                        class="hidden"
                        @change="handleFileSelect"
                    />
                    <div 
                        class="border-2 border-dashed border-base-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                        @click="triggerFileInput"
                    >
                        <span class="material-symbols-outlined text-4xl text-base-content/40">
                            upload_file
                        </span>
                        <p class="mt-2 text-sm text-base-content/60">
                            {{ selectedFile ? selectedFile.name : 'Haz clic para seleccionar un archivo XML' }}
                        </p>
                        <p class="text-xs text-base-content/40 mt-1">
                            Tamaño máximo: 5MB
                        </p>
                    </div>
                </div>

                <div v-if="selectedFile" class="card bg-base-200">
                    <div class="card-body p-4">
                        <div class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-2xl text-success">
                                check_circle
                            </span>
                            <div class="flex-1">
                                <p class="font-medium">{{ selectedFile.name }}</p>
                                <p class="text-xs text-base-content/60">
                                    {{ (selectedFile.size / 1024).toFixed(2) }} KB
                                </p>
                            </div>
                            <button 
                                class="btn btn-ghost btn-sm btn-circle"
                                @click="selectedFile = null"
                            >
                                <span class="material-symbols-outlined text-base">close</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="flex gap-2">
                    <button 
                        class="btn btn-outline flex-1"
                        @click="modalStore.close(receivedInvoiceStore.uploadModalId)"
                        :disabled="isSubmitting"
                    >
                        Cancelar
                    </button>
                    <button 
                        class="btn btn-primary flex-1"
                        @click="handleUpload"
                        :disabled="!selectedFile || isSubmitting"
                    >
                        <span class="material-symbols-outlined text-base">upload</span>
                        {{ isSubmitting ? 'Cargando...' : 'Cargar XML' }}
                    </button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
