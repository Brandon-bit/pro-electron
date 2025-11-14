import { ref } from 'vue'
import type { DocumentoRequerido } from '../types/checklistTypes'

export const useChecklist = () => {
    const documentos = ref<DocumentoRequerido[]>([])
    const loading = ref(false)

    // Cargar documentos (mock)
    const fetchDocumentos = async () => {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 500))
        
        documentos.value = [
            { id: 1, nombreDelDocumento: 'zx', estado: 'activo' }
        ]
        
        loading.value = false
    }

    // Agregar documento
    const addDocumento = (nombreDelDocumento: string) => {
        documentos.value.push({
            id: Date.now(),
            nombreDelDocumento,
            estado: 'activo'
        })
    }

    // Actualizar documento
    const updateDocumento = (id: string | number, nombreDelDocumento: string) => {
        const doc = documentos.value.find(d => d.id === id)
        if (doc) {
            doc.nombreDelDocumento = nombreDelDocumento
            doc.isEditing = false
        }
    }

    // Toggle estado
    const toggleEstado = (id: string | number) => {
        const doc = documentos.value.find(d => d.id === id)
        if (doc) {
            doc.estado = doc.estado === 'activo' ? 'inactivo' : 'activo'
        }
    }

    // Eliminar documento
    const deleteDocumento = (id: string | number) => {
        documentos.value = documentos.value.filter(d => d.id !== id)
    }

    return {
        documentos,
        loading,
        fetchDocumentos,
        addDocumento,
        updateDocumento,
        toggleEstado,
        deleteDocumento
    }
}
