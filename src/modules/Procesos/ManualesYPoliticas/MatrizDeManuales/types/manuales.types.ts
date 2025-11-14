// ============================================
// TYPES - MANUALES Y POLÍTICAS
// ============================================

// Cadena de Valor
export interface ICadenaValor {
    dni: number
    name: string
}

// Archivo
export interface IArchivo {
    dni: number
    nombre: string
    ext: string
    size?: number
    fechaSubida?: string
    b64?: string
}

// Historial de Versiones (Diagramas)
export interface IHistorialVersion {
    dni: number
    idProceso: number
    version: number
    final: boolean
    fecha?: string
}

// Historial de Auditorías
export interface IHistorialAuditoria {
    dni: number
    dniProc: number
    dniForm: number
    fecha?: string
    calificacion?: number
}

// Proceso Nivel 3 (para modo automático)
export interface IProceso3 {
    lvl3: string
}

// Manual/Política
export interface IManual {
    id: number
    dni: number
    lvl1: string // Macroprocesos (Nivel 1)
    lvl2: string // Grupo de Procesos (Nivel 2)
    lvls3: string // Procesos (Nivel 3) - texto simple
    isAuto: boolean // Si es true, usa Lvls3[] en lugar de lvls3
    Lvls3: IProceso3[] // Lista de procesos nivel 3 (si isAuto)
    diagrama: string // Diagrama de Flujo (Nivel 4)
    Manuales: IArchivo[] // Archivos de manuales (.docx)
    Historial: IHistorialVersion[] // Historial de versiones de diagramas
    Soporte: IArchivo[] // Documentos de soporte (múltiples tipos)
    HistorialAu: IHistorialAuditoria[] // Historial de auditorías
    promedioAuditorias: number
    habilitado?: boolean // Solo para manuales manuales
    dniCV?: number // Referencia a cadena de valor
}

// Nivel 1 (para modal automático)
export interface INivel1 {
    dni: number
    titulo: string
    lvls2: INivel2[]
}

// Nivel 2 (para modal automático)
export interface INivel2 {
    dni: number
    titulo: string
    lvls3: INivel3[]
}

// Nivel 3 (para modal automático)
export interface INivel3 {
    dni: number
    titulo: string
    selected: boolean
    inuse: boolean // Ya usado en otro manual
}

// Espacio (para modal manual - nivel 1)
export interface IEspacio {
    id: number
    nombre: string
    Procesos: IProceso4[]
}

// Proceso Nivel 4 (para modal manual)
export interface IProceso4 {
    id: number
    nombre: string
}

// Payload para agregar manual
export interface IAgregarManualPayload {
    lvl1?: number // ID de espacio (modo manual)
    lvl2?: string // Texto nivel 2
    lvls3?: string // Texto nivel 3
    lvl4?: number // ID de proceso nivel 4
    idlvl1?: number // ID nivel 1 (modo automático)
    idlvl2?: number // ID nivel 2 (modo automático)
    lvls3Selected?: number[] // IDs seleccionados nivel 3 (modo automático)
}

// Payload para habilitar/deshabilitar manual
export interface IHabilitarManualPayload {
    dniManual: number
    habilitado: boolean
}

// Payload para eliminar manual
export interface IEliminarManualPayload {
    dniProc: number
}

// Payload para subir archivo
export interface ISubirArchivoPayload {
    dni: number
    tipo: 'version' | 'soporte'
    archivo: File
}

// Payload para eliminar archivo
export interface IEliminarArchivoPayload {
    dni: number
    tipo: 'version' | 'soporte'
    dniArchivo: number
}

// Response genérico
export interface IResponse<T = any> {
    tipo: 'success' | 'error' | 'warning'
    titulo: string
    mensaje?: string
    m?: T
    data?: T
}

// State del Store
export interface IManualesState {
    cadenasValor: ICadenaValor[]
    cvSeleccionada: ICadenaValor | null
    manualesCV: IManual[]
    manuales: IManual[]
    niveles1: INivel1[]
    espacios: IEspacio[]
    isLoading: boolean
    currentUser: {
        isOwner: boolean
        canEdit: boolean
    }
}

// Tipo de tab
export type TipoTab = 'cv' | 'manual'

// Modo de modal
export type ModoModal = 'automatico' | 'manual'

// Estado de archivo
export interface IEstadoArchivo {
    uploading: boolean
    progress: number
    error: string | null
}
