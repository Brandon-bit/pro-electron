// ============================================
// ENUMS Y TIPOS
// ============================================

// Estatus de VoBo (1-5)
export type VoBoEstatusType = 1 | 2 | 3 | 4 | 5

export const VoBoEstatus = {
    PENDIENTE: 1,
    APROBADO: 2,
    RECHAZADO: 3,
    EN_REVISION: 4,
    CANCELADO: 5
} as const

// Nombre de estatus
export type VoBoEstatusNombre = 'Pendiente' | 'Aprobado' | 'Rechazado' | 'En Revisión' | 'Cancelado'

// ============================================
// INTERFACES
// ============================================

// Archivo adjunto
export interface IArchivo {
    nombre: string
    ext: string
    url: string
    size?: number
}

// Proceso
export interface IProceso {
    id: number
    nombre: string
    codigo?: string
    asis: boolean // true = AsIs, false = ToBe
    dniEspacio: number
}

// Diagrama
export interface IDiagrama {
    dni: number
    version: number
    final: boolean
    hasVoBo: boolean
}

// Ola
export interface IOla {
    dni: number
    ola_numero: number
    tipoImplementacion: string
    concepto: string
}

// Usuario
export interface IUsuario {
    dni: number
    nombre: string
    apellidos: string
    correo: string
}

// VoBo Base
export interface IVoBoBase {
    dni: number
    dniEstatus: VoBoEstatusType
    estatus: VoBoEstatusNombre
    solicitante: string
    autoriza: string
    dniAutoriza: number | null
    strFechaEnvio: string
    strFechaRespuesta: string
    comentarios: string
}

// VoBo de Proceso
export interface IVoBoProceso extends IVoBoBase {
    Diagrama: IDiagrama
    Proceso: IProceso
}

// VoBo de Ola
export interface IVoBoOla extends IVoBoBase {
    Ola: IOla
    Proceso: IProceso
}

// VoBo de Manual
export interface IVoBoManual extends IVoBoBase {
    Diagrama: IDiagrama
    Proceso: IProceso
    Archivos: IArchivo[]
}

// Espacio (Área organizacional)
export interface IEspacio {
    id: number
    nombre: string
    Procesos: IProceso[]
}

// Cadena de Valor
export interface ICadenaValor {
    dni: number
    name: string
}

// Espacio de Cadena de Valor
export interface ICVEspacio {
    dni: number
    titulo: string
    CVProcesos: IProceso[]
}

// ============================================
// PAYLOADS
// ============================================

// Crear nuevo VoBo de Manual
export interface ICreateVoBoPayload {
    dniProc: number
}

// Actualizar VoBo
export interface IUpdateVoBoPayload {
    dni: number
    dniAutoriza: number
}

// Enviar correo VoBo
export interface ISendVoBoEmailPayload {
    dni: number
    dniProc: number
}

// Eliminar VoBo
export interface IDeleteVoBoPayload {
    dni: number
}

// Adjuntar archivo (simulado)
export interface IAttachFilePayload {
    dni: number
    dniProc: number
    file: File
}

// ============================================
// FILTROS
// ============================================

export interface IVoBoFiltro {
    dniCV: number
    dniEsp: number
    dniProc: number
}

// ============================================
// RESPONSE
// ============================================

export interface IVoBoResponse {
    status: 'success' | 'error'
    message: string
    data?: any
}

// Datos iniciales
export interface IVoBoData {
    cvs: ICadenaValor[]
    usuarios: IUsuario[]
    procesos: IVoBoProceso[]
    olas: IVoBoOla[]
    manuales: IVoBoManual[]
}
