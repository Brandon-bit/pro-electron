// Tipos para la Matriz de Socios

export interface Partner {
    id: string | number
    nombre: string
    codigo: string
    cuenta: string
    telefono: string
    celular: string
    correo: string
    estatusCarga: number // 0-1 (porcentaje de documentos completados)
    envioAutomatico: boolean
    documentosCompletados: number
    documentosTotales: number
}

// Sección de documentos
export interface DocumentSection {
    id: string | number
    nombre: string
    archivos: DocumentFile[]
}

export interface DocumentFile {
    id: string | number
    nombre: string
    url?: string
    fechaCarga?: string
}

// Datos del modal de documentos
export interface PartnerDocuments {
    socioId: string | number
    socioNombre: string
    secciones: DocumentSection[]
}
