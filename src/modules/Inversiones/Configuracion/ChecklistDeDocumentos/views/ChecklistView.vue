<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import AddDocumentoModal from '../components/AddDocumentoModal.vue'
import { useChecklist } from '../composables/useChecklist'

const {
    documentos,
    loading,
    fetchDocumentos,
    addDocumento,
    updateDocumento,
    toggleEstado,
    deleteDocumento
} = useChecklist()

const addDocumentoModalRef = ref<InstanceType<typeof AddDocumentoModal> | null>(null)

onMounted(() => {
    fetchDocumentos()
})

// Abrir modal
const openAddDocumentoModal = () => {
    addDocumentoModalRef.value?.openModal()
}

// Confirmar creación
const handleAddDocumento = (nombreDelDocumento: string) => {
    addDocumento(nombreDelDocumento)
}

// Habilitar edición
const enableEdit = (doc: any) => {
    doc.isEditing = true
}

// Guardar edición
const saveEdit = (id: string | number) => {
    const doc = documentos.value.find(d => d.id === id)
    if (doc) {
        updateDocumento(id, doc.nombreDelDocumento)
    }
}

// Eliminar
const handleDelete = (id: string | number) => {
    if (confirm('¿Está seguro de eliminar este documento?')) {
        deleteDocumento(id)
    }
}
</script>

<template>
    <div>
        <BaseTitle 
            title="Checklist de Documentos Requeridos" 
            subtitle="Gestión de documentos requeridos para prospectos"
        />
        
        <div class="">
            <!-- Botón Agregar -->
            <div class="mb-6">
                <button 
                    class="btn btn-primary"
                    @click="openAddDocumentoModal"
                >
                    <span class="material-symbols-outlined">add</span>
                    Agregar
                </button>
            </div>

            <!-- Título de la lista -->
            <h3 class="text-xl font-semibold mb-4">Lista de Documentos Requeridos</h3>

            <!-- Loading -->
            <div v-if="loading" class="flex justify-center py-12">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <!-- Tabla -->
            <div v-else class="card bg-base-100 shadow-xl">
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead class="bg-neutral text-neutral-content">
                            <tr>
                                <th>#</th>
                                <th>Nombre del Documento</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(doc, index) in documentos" :key="doc.id">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <input
                                        v-model="doc.nombreDelDocumento"
                                        type="text"
                                        class="input input-bordered input-sm w-full"
                                        :readonly="!doc.isEditing"
                                        :class="{ 'input-ghost': !doc.isEditing }"
                                    />
                                </td>
                                <td>
                                    <span 
                                        class="badge"
                                        :class="{
                                            'badge-success': doc.estado === 'activo',
                                            'badge-error': doc.estado === 'inactivo'
                                        }"
                                    >
                                        {{ doc.estado === 'activo' ? 'Activo' : 'Inactivo' }}
                                    </span>
                                </td>
                                <td>
                                    <div class="flex gap-1">
                                        <!-- Botón Editar/Guardar -->
                                        <button
                                            v-if="!doc.isEditing"
                                            class="btn btn-primary btn-xs"
                                            @click="enableEdit(doc)"
                                        >
                                            <span class="material-symbols-outlined text-xs">edit</span>
                                        </button>
                                        <button
                                            v-else
                                            class="btn btn-success btn-xs"
                                            @click="saveEdit(doc.id)"
                                        >
                                            <span class="material-symbols-outlined text-xs">check</span>
                                        </button>

                                        <!-- Botón Toggle Estado -->
                                        <button
                                            class="btn btn-warning btn-xs"
                                            @click="toggleEstado(doc.id)"
                                            :title="doc.estado === 'activo' ? 'Desactivar' : 'Activar'"
                                        >
                                            <span class="material-symbols-outlined text-xs">
                                                {{ doc.estado === 'activo' ? 'toggle_on' : 'toggle_off' }}
                                            </span>
                                        </button>

                                        <!-- Botón Eliminar -->
                                        <button
                                            class="btn btn-error btn-xs"
                                            @click="handleDelete(doc.id)"
                                        >
                                            <span class="material-symbols-outlined text-xs">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Mensaje cuando no hay documentos -->
                    <div v-if="documentos.length === 0" class="text-center py-12 text-base-content/50">
                        <span class="material-symbols-outlined text-6xl mb-4">description</span>
                        <p class="text-lg">No hay documentos registrados</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <AddDocumentoModal
            ref="addDocumentoModalRef"
            @confirm="handleAddDocumento"
        />
    </div>
</template>
