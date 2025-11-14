import type {
    ICadenaValor,
    IEspacio,
    ICVEspacio,
    IUsuario,
    IVoBoProceso,
    IVoBoOla,
    IVoBoManual,
    ICreateVoBoPayload,
    IUpdateVoBoPayload,
    ISendVoBoEmailPayload,
    IDeleteVoBoPayload,
    IAttachFilePayload,
    IVoBoResponse,
    IVoBoData,
    IArchivo
} from '../types/vobo.types'

// ============================================
// DATA MOCK
// ============================================

// Cadenas de Valor
export const mockCadenasValor: ICadenaValor[] = [
    { dni: 1, name: 'Procesos Estratégicos' },
    { dni: 2, name: 'Procesos Operativos' },
    { dni: 3, name: 'Procesos de Soporte' }
]

// Usuarios
export const mockUsuarios: IUsuario[] = [
    { dni: 1, nombre: 'Juan', apellidos: 'Pérez García', correo: 'juan.perez@empresa.com' },
    { dni: 2, nombre: 'María', apellidos: 'López Martínez', correo: 'maria.lopez@empresa.com' },
    { dni: 3, nombre: 'Carlos', apellidos: 'González Rodríguez', correo: 'carlos.gonzalez@empresa.com' },
    { dni: 4, nombre: 'Ana', apellidos: 'Sánchez Hernández', correo: 'ana.sanchez@empresa.com' },
    { dni: 5, nombre: 'Luis', apellidos: 'Ramírez Torres', correo: 'luis.ramirez@empresa.com' }
]

// Espacios (Áreas)
const mockEspacios: IEspacio[] = [
    {
        id: 1,
        nombre: 'Recursos Humanos',
        Procesos: [
            { id: 101, nombre: 'Reclutamiento', codigo: 'RH-01', asis: false, dniEspacio: 1 },
            { id: 102, nombre: 'Capacitación', codigo: 'RH-02', asis: false, dniEspacio: 1 }
        ]
    },
    {
        id: 2,
        nombre: 'Finanzas',
        Procesos: [
            { id: 201, nombre: 'Presupuestos', codigo: 'FIN-01', asis: true, dniEspacio: 2 },
            { id: 202, nombre: 'Tesorería', codigo: 'FIN-02', asis: false, dniEspacio: 2 }
        ]
    },
    {
        id: 3,
        nombre: 'Operaciones',
        Procesos: [
            { id: 301, nombre: 'Producción', codigo: 'OP-01', asis: true, dniEspacio: 3 },
            { id: 302, nombre: 'Logística', codigo: 'OP-02', asis: false, dniEspacio: 3 }
        ]
    }
]

// Espacios de Cadena de Valor
const mockCVEspacios: ICVEspacio[] = [
    {
        dni: 10,
        titulo: 'Planeación Estratégica',
        CVProcesos: [
            { id: 401, nombre: 'Planeación Anual', codigo: 'PE-01', asis: false, dniEspacio: 0 },
            { id: 402, nombre: 'Control de Gestión', codigo: 'PE-02', asis: false, dniEspacio: 0 }
        ]
    }
]

// VoBos de Procesos (Diagramas)
let mockVoBosProcesos: IVoBoProceso[] = [
    {
        dni: 1001,
        dniEstatus: 2,
        estatus: 'Aprobado',
        Diagrama: { dni: 5001, version: 1, final: true, hasVoBo: true },
        Proceso: { id: 101, nombre: 'Reclutamiento', asis: false, dniEspacio: 1 },
        solicitante: 'Juan Pérez',
        autoriza: 'María López',
        dniAutoriza: 2,
        strFechaEnvio: '2025-10-15',
        strFechaRespuesta: '2025-10-16',
        comentarios: 'Aprobado sin observaciones'
    },
    {
        dni: 1002,
        dniEstatus: 1,
        estatus: 'Pendiente',
        Diagrama: { dni: 5002, version: 2, final: false, hasVoBo: false },
        Proceso: { id: 101, nombre: 'Reclutamiento', asis: false, dniEspacio: 1 },
        solicitante: 'Carlos González',
        autoriza: 'Ana Sánchez',
        dniAutoriza: 4,
        strFechaEnvio: '2025-10-20',
        strFechaRespuesta: '01/01/0001',
        comentarios: ''
    }
]

// VoBos de Olas
let mockVoBosOlas: IVoBoOla[] = [
    {
        dni: 2001,
        dniEstatus: 2,
        estatus: 'Aprobado',
        Ola: { dni: 3001, ola_numero: 0, tipoImplementacion: 'Quick Hits', concepto: 'Automatización' },
        Proceso: { id: 101, nombre: 'Reclutamiento', asis: false, dniEspacio: 1 },
        solicitante: 'Juan Pérez',
        autoriza: 'Luis Ramírez',
        dniAutoriza: 5,
        strFechaEnvio: '2025-10-10',
        strFechaRespuesta: '2025-10-11',
        comentarios: 'Aprobado'
    }
]

// VoBos de Manuales
let mockVoBosManuales: IVoBoManual[] = [
    {
        dni: 3001,
        dniEstatus: 1,
        estatus: 'Pendiente',
        Diagrama: { dni: 5001, version: 1, final: true, hasVoBo: true },
        Proceso: { id: 101, nombre: 'Reclutamiento', codigo: 'RH-01', asis: false, dniEspacio: 1 },
        solicitante: 'Juan Pérez García',
        autoriza: '',
        dniAutoriza: null,
        strFechaEnvio: '01/01/0001',
        strFechaRespuesta: '01/01/0001',
        comentarios: '',
        Archivos: []
    },
    {
        dni: 3002,
        dniEstatus: 2,
        estatus: 'Aprobado',
        Diagrama: { dni: 5002, version: 1, final: true, hasVoBo: true },
        Proceso: { id: 101, nombre: 'Reclutamiento', codigo: 'RH-01', asis: false, dniEspacio: 1 },
        solicitante: 'María López',
        autoriza: 'Carlos González',
        dniAutoriza: 3,
        strFechaEnvio: '2025-10-20',
        strFechaRespuesta: '2025-10-21',
        comentarios: 'Aprobado correctamente',
        Archivos: [
            { nombre: 'Manual_Reclutamiento_v1', ext: '.pdf', url: '#', size: 1024 }
        ]
    }
]

// ============================================
// SERVICIOS
// ============================================

// Obtener datos iniciales
export const getVoBoDataService = async (): Promise<IVoBoData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                cvs: mockCadenasValor,
                usuarios: mockUsuarios,
                procesos: mockVoBosProcesos,
                olas: mockVoBosOlas,
                manuales: mockVoBosManuales
            })
        }, 400)
    })
}

// Obtener espacios por Cadena de Valor
export const getEspaciosByCVService = async (dniCV: number): Promise<{ espacios: IEspacio[], cvEsps: ICVEspacio[] }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                espacios: mockEspacios,
                cvEsps: mockCVEspacios
            })
        }, 300)
    })
}

// Crear nuevo VoBo de Manual
export const createVoBoManualService = async (payload: ICreateVoBoPayload): Promise<IVoBoResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newVoBo: IVoBoManual = {
                dni: mockVoBosManuales.length + 3001,
                dniEstatus: 1,
                estatus: 'Pendiente',
                Diagrama: { dni: 5003, version: 1, final: true, hasVoBo: false },
                Proceso: mockEspacios
                    .flatMap(e => e.Procesos)
                    .find(p => p.id === payload.dniProc) || mockEspacios[0].Procesos[0],
                solicitante: 'Usuario Actual',
                autoriza: '',
                dniAutoriza: null,
                strFechaEnvio: '01/01/0001',
                strFechaRespuesta: '01/01/0001',
                comentarios: '',
                Archivos: []
            }

            mockVoBosManuales.push(newVoBo)

            resolve({
                status: 'success',
                message: 'VoBo creado exitosamente',
                data: newVoBo
            })
        }, 500)
    })
}

// Actualizar VoBo (asignar responsable)
export const updateVoBoService = async (payload: IUpdateVoBoPayload): Promise<IVoBoResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const vobo = mockVoBosManuales.find(v => v.dni === payload.dni)
            
            if (vobo) {
                vobo.dniAutoriza = payload.dniAutoriza
                const usuario = mockUsuarios.find(u => u.dni === payload.dniAutoriza)
                if (usuario) {
                    vobo.autoriza = `${usuario.nombre} ${usuario.apellidos}`
                }
            }

            resolve({
                status: 'success',
                message: 'Responsable asignado correctamente'
            })
        }, 400)
    })
}

// Enviar correo de VoBo
export const sendVoBoEmailService = async (payload: ISendVoBoEmailPayload): Promise<IVoBoResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const vobo = mockVoBosManuales.find(v => v.dni === payload.dni)
            
            if (vobo) {
                vobo.dniEstatus = 4 // En Revisión
                vobo.estatus = 'En Revisión'
                vobo.strFechaEnvio = new Date().toLocaleDateString('es-MX')
            }

            resolve({
                status: 'success',
                message: 'Correo enviado exitosamente',
                data: { dni: 4, nombre: 'En Revisión' }
            })
        }, 600)
    })
}

// Eliminar VoBo
export const deleteVoBoService = async (payload: IDeleteVoBoPayload): Promise<IVoBoResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = mockVoBosManuales.findIndex(v => v.dni === payload.dni)
            
            if (index !== -1) {
                mockVoBosManuales.splice(index, 1)
            }

            resolve({
                status: 'success',
                message: 'VoBo eliminado correctamente'
            })
        }, 400)
    })
}

// Adjuntar archivo (simulado)
export const attachFileService = async (payload: IAttachFilePayload): Promise<IVoBoResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const vobo = mockVoBosManuales.find(v => v.dni === payload.dni)
            
            if (vobo) {
                const newFile: IArchivo = {
                    nombre: payload.file.name.split('.')[0],
                    ext: '.' + payload.file.name.split('.').pop(),
                    url: '#',
                    size: payload.file.size
                }
                
                vobo.Archivos.push(newFile)
                
                resolve({
                    status: 'success',
                    message: 'Archivo adjuntado correctamente',
                    data: newFile
                })
            } else {
                resolve({
                    status: 'error',
                    message: 'VoBo no encontrado'
                })
            }
        }, 500)
    })
}
