<script setup lang="ts">
import { ref } from 'vue'
import { useManualesStore } from '../store/manualesStore'
import { useManualesActions } from '../composables/useManualesActions'
import { useManualesUtils } from '../composables/useManualesUtils'
import type { IArchivo } from '../types/manuales.types'

const props = defineProps<{
    dniManual: number
    archivos: IArchivo[]
    tipo: 'version' | 'soporte'
    tiposPermitidos?: string
    canDelete?: boolean
}>()

const manualesStore = useManualesStore()
const { subirArchivo, eliminarArchivo } = useManualesActions()
const { formatFileSize, getIconoPorExtension, getColorPorExtension, validarExtension, validarTamañoArchivo } = useManualesUtils()

const isDragging = ref(false)
const isUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// Tipos permitidos
const tiposArray = props.tiposPermitidos?.split(',').map(t => t.trim()) || ['.docx']

const handleFileSelect = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        await processFiles(Array.from(target.files))
        target.value = ''
    }
}

const handleDrop = async (event: DragEvent) => {
    isDragging.value = false
    event.preventDefault()
    
    if (event.dataTransfer?.files) {
        await processFiles(Array.from(event.dataTransfer.files))
    }
}

const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    isDragging.value = true
}

const handleDragLeave = () => {
    isDragging.value = false
}

const processFiles = async (files: File[]) => {
    for (const file of files) {
        // Validar extensión
        if (!validarExtension(file.name, tiposArray)) {
            alert(`Tipo de archivo no permitido: ${file.name}\nPermitidos: ${tiposArray.join(', ')}`)
            continue
        }

        // Validar tamaño
        if (!validarTamañoArchivo(file.size, 10)) {
            alert(`Archivo muy grande: ${file.name}\nMáximo: 10 MB`)
            continue
        }

        // Subir archivo
        isUploading.value = true
        await subirArchivo(props.dniManual, props.tipo, file)
        isUploading.value = false
    }
}

const handleEliminar = async (archivo: IArchivo) => {
    if (confirm(`¿Eliminar archivo "${archivo.nombre}${archivo.ext}"?`)) {
        await eliminarArchivo(props.dniManual, archivo.dni, props.tipo)
    }
}

const triggerFileInput = () => {
    fileInput.value?.click()
}
</script>

<template>
    <div class="gestor-archivos">
        <!-- Zona de drop -->
        <div 
            v-if="!manualesStore.isLoading && manualesStore.currentUser.canEdit"
            class="drop-zone mb-3"
            :class="{ 'drop-zone-active': isDragging, 'drop-zone-disabled': isUploading }"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @click="triggerFileInput"
        >
            <div class="text-center">
                <span v-if="isUploading" class="loading loading-spinner loading-md"></span>
                <span v-else class="material-symbols-outlined text-4xl opacity-50">cloud_upload</span>
                <p class="text-sm mt-2">
                    <span v-if="isUploading">Subiendo archivo...</span>
                    <span v-else>Click o arrastra archivos aquí</span>
                </p>
                <p class="text-xs opacity-60">{{ tiposPermitidos || '.docx' }}</p>
            </div>
            <input 
                ref="fileInput"
                type="file" 
                class="hidden"
                :accept="tiposPermitidos || '.docx'"
                multiple
                @change="handleFileSelect"
            />
        </div>

        <!-- Lista de archivos -->
        <div v-if="archivos.length > 0" class="space-y-2">
            <div 
                v-for="archivo in archivos" 
                :key="archivo.dni"
                class="archivo-item"
            >
                <div class="flex items-center gap-3 flex-1">
                    <span 
                        class="material-symbols-outlined text-2xl"
                        :class="getColorPorExtension(archivo.ext)"
                    >
                        {{ getIconoPorExtension(archivo.ext) }}
                    </span>
                    <div class="flex-1 min-w-0">
                        <p class="font-semibold truncate">{{ archivo.nombre }}{{ archivo.ext }}</p>
                        <p class="text-xs opacity-60">
                            {{ archivo.fechaSubida }}
                            <span v-if="archivo.size"> • {{ formatFileSize(archivo.size) }}</span>
                        </p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <a 
                        :href="`#download-${archivo.dni}`"
                        class="btn btn-xs btn-ghost btn-circle"
                        title="Descargar"
                        @click.prevent
                    >
                        <span class="material-symbols-outlined text-sm">download</span>
                    </a>
                    <button 
                        v-if="canDelete && manualesStore.currentUser.canEdit"
                        class="btn btn-xs btn-error btn-circle"
                        title="Eliminar"
                        @click="handleEliminar(archivo)"
                    >
                        <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-4 opacity-50">
            <span class="material-symbols-outlined text-3xl">folder_open</span>
            <p class="text-sm mt-2">No hay archivos</p>
        </div>
    </div>
</template>

<style scoped>
.drop-zone {
    border: 2px dashed oklch(var(--bc) / 0.2);
    border-radius: 0.5rem;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.drop-zone:hover {
    border-color: oklch(var(--p));
    background-color: oklch(var(--p) / 0.05);
}

.drop-zone-active {
    border-color: oklch(var(--p));
    background-color: oklch(var(--p) / 0.1);
}

.drop-zone-disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.archivo-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border: 1px solid oklch(var(--bc) / 0.2);
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}

.archivo-item:hover {
    background-color: oklch(var(--b2));
    border-color: oklch(var(--bc) / 0.3);
}
</style>
