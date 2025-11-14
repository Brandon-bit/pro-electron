<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ProcessType, CVProcessType } from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'

const props = defineProps<{
    isOpen: boolean
    process: ProcessType | CVProcessType | null
}>()

const emit = defineEmits<{
    close: []
    submit: [file: File | null]
}>()

const selectedFile = ref<File | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

watch(() => props.isOpen, (isOpen) => {
    if (!isOpen) {
        // Limpiar cuando se cierra
        selectedFile.value = null
    }
})

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        const file = target.files[0]
        if (file.name.endsWith('.bpmn') || file.name.endsWith('.xml')) {
            selectedFile.value = file
        } else {
            alert('Por favor seleccione un archivo BPMN (.bpmn o .xml)')
            target.value = ''
        }
    }
}

const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    event.preventDefault()
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0]
        if (file.name.endsWith('.bpmn') || file.name.endsWith('.xml')) {
            selectedFile.value = file
        } else {
            alert('Por favor seleccione un archivo BPMN (.bpmn o .xml)')
        }
    }
}

const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    isDragging.value = true
}

const handleDragLeave = () => {
    isDragging.value = false
}

const removeFile = () => {
    selectedFile.value = null
    if (fileInputRef.value) {
        fileInputRef.value.value = ''
    }
}

const handleSubmit = () => {
    emit('submit', selectedFile.value)
    selectedFile.value = null
}

const handleClose = () => {
    emit('close')
}
</script>

<template>
    <div v-if="isOpen" class="modal modal-open">
        <!-- Backdrop para cerrar al hacer click fuera -->
        <div class="modal-backdrop" @click="handleClose"></div>
        
        <div class="modal-box max-w-2xl relative" style="z-index: 10000 !important;">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="font-bold text-lg flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">add_circle</span>
                        Agregar Nueva Versión
                    </h3>
                    <p class="text-sm text-base-content/70 mt-1">
                        {{ process?.nombre }}
                    </p>
                </div>
                <button @click="handleClose" class="btn btn-sm btn-circle btn-ghost">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>

            <div class="divider my-2"></div>

            <!-- Descripción -->
            <div class="alert alert-info mb-6">
                <span class="material-symbols-outlined">info</span>
                <div>
                    <p class="text-sm">
                        Se creará una nueva versión del diagrama. Opcionalmente puede adjuntar un archivo BPMN.
                    </p>
                </div>
            </div>

            <!-- Área de carga de archivo -->
            <div class="mb-6">
                <label class="label">
                    <span class="label-text font-semibold">Archivo BPMN (Opcional)</span>
                </label>

                <!-- Zona de drop -->
                <div
                    @drop="handleDrop"
                    @dragover="handleDragOver"
                    @dragleave="handleDragLeave"
                    :class="[
                        'border-2 border-dashed rounded-lg p-8 text-center transition-all',
                        isDragging ? 'border-primary bg-primary/10' : 'border-base-300 hover:border-primary/50'
                    ]"
                >
                    <div v-if="!selectedFile" class="flex flex-col items-center gap-4">
                        <span class="material-symbols-outlined text-6xl text-base-content/40">
                            upload_file
                        </span>
                        <div>
                            <p class="font-medium mb-1">
                                Arrastra un archivo BPMN aquí
                            </p>
                            <p class="text-sm text-base-content/60">
                                o haz click para seleccionar
                            </p>
                        </div>
                        <input
                            ref="fileInputRef"
                            type="file"
                            accept=".bpmn,.xml"
                            @change="handleFileSelect"
                            class="file-input file-input-bordered file-input-primary w-full max-w-xs"
                        />
                        <p class="text-xs text-base-content/50">
                            Formatos aceptados: .bpmn, .xml
                        </p>
                    </div>

                    <!-- Archivo seleccionado -->
                    <div v-else class="flex items-center justify-between bg-base-200 p-4 rounded-lg">
                        <div class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-2xl text-success">
                                check_circle
                            </span>
                            <div class="text-left">
                                <p class="font-medium">{{ selectedFile.name }}</p>
                                <p class="text-sm text-base-content/60">
                                    {{ (selectedFile.size / 1024).toFixed(2) }} KB
                                </p>
                            </div>
                        </div>
                        <button @click="removeFile" class="btn btn-sm btn-ghost btn-circle">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Nota -->
            <div class="bg-base-200 p-4 rounded-lg mb-6">
                <p class="text-sm text-base-content/70">
                    <span class="material-symbols-outlined text-sm align-middle mr-1">lightbulb</span>
                    <strong>Nota:</strong> Si no adjunta un archivo ahora, podrá hacerlo más tarde. 
                    La versión se creará automáticamente con el siguiente número consecutivo.
                </p>
            </div>

            <!-- Footer -->
            <div class="modal-action">
                <button @click.stop="handleClose" class="btn btn-ghost">Cancelar</button>
                <button @click.stop="handleSubmit" class="btn btn-primary gap-2">
                    <span class="material-symbols-outlined">add</span>
                    Crear Versión
                </button>
            </div>
        </div>
    </div>
</template>
