<script setup lang="ts">
import { ref } from 'vue'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    show: boolean
}>()

const emit = defineEmits<{
    close: []
    import: [data: any]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const isProcessing = ref(false)

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0]
    }
}

const handleImport = async () => {
    if (!selectedFile.value) {
        showNotification('Selecciona un archivo', 'warning')
        return
    }
    
    isProcessing.value = true
    
    try {
        // Simular procesamiento del archivo
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Datos de ejemplo importados
        const importedData = {
            name: 'Proyecto Importado',
            budget: '100000',
            objective: 'Objetivo importado desde archivo',
            scope: 'Alcance importado desde archivo',
            classification: 'Estratégico'
        }
        
        emit('import', importedData)
        showNotification('Datos importados correctamente', 'success')
        handleClose()
    } catch (error: any) {
        showNotification(error.message || 'Error al importar archivo', 'error')
    } finally {
        isProcessing.value = false
    }
}

const handleClose = () => {
    selectedFile.value = null
    if (fileInput.value) {
        fileInput.value.value = ''
    }
    emit('close')
}

</script>

<template>
    <dialog :class="['modal', { 'modal-open': props.show }]">
        <div class="modal-box max-w-2xl">
            <h3 class="font-bold text-lg mb-4">Importar Layout</h3>
            
            <div class="space-y-4">
                <p class="text-sm opacity-70">
                    Importa datos desde un archivo Excel o CSV
                </p>
                
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Archivo</span>
                    </label>
                    <input 
                        ref="fileInput"
                        type="file" 
                        class="file-input file-input-bordered w-full"
                        accept=".xlsx,.xls,.csv"
                        @change="handleFileSelect"
                    />
                    <label class="label">
                        <span class="label-text-alt">Formatos soportados: Excel (.xlsx, .xls) y CSV (.csv)</span>
                    </label>
                </div>
                
                <div v-if="selectedFile" class="alert alert-info">
                    <span class="material-symbols-outlined">info</span>
                    <div>
                        <h3 class="font-bold">Archivo seleccionado</h3>
                        <div class="text-xs">{{ selectedFile.name }}</div>
                    </div>
                </div>
                
                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">warning</span>
                    <div class="text-sm">
                        <strong>Nota:</strong> El archivo debe seguir el formato estándar de layout de proyectos.
                    </div>
                </div>
            </div>
            
            <div class="modal-action">
                <button class="btn btn-ghost" @click="handleClose" :disabled="isProcessing">
                    Cancelar
                </button>
                <button 
                    class="btn btn-primary" 
                    @click="handleImport"
                    :disabled="!selectedFile || isProcessing"
                >
                    <span v-if="isProcessing" class="loading loading-spinner loading-sm"></span>
                    <span v-else class="material-symbols-outlined text-sm">upload</span>
                    Importar
                </button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop" @click="handleClose">
            <button>close</button>
        </form>
    </dialog>
</template>
