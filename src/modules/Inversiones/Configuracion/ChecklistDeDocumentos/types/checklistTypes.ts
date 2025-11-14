// Tipos para Checklist de Documentos Requeridos

export interface DocumentoRequerido {
    id: string | number
    nombreDelDocumento: string
    estado: 'activo' | 'inactivo'
    isEditing?: boolean
}

export interface NewDocumentoData {
    nombreDelDocumento: string
}
