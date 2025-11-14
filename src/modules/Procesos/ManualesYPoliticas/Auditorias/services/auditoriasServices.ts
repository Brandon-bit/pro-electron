import type {
    IFormulario,
    IAuditoria,
    INuevaAuditoriaPayload,
    ITerminarAuditoriaPayload,
    IModificarRespuestaPayload,
    IModificarSubdominioPayload,
    IResponse
} from '../types/auditorias.types'

// ============================================
// DATOS MOCK
// ============================================

const STORAGE_KEY = 'auditorias_data'

// Formularios Mock
const mockFormularios: IFormulario[] = [
    { dni: 1, titulo: 'Formulario ISO 9001:2015' },
    { dni: 2, titulo: 'Formulario de Calidad Interna' },
    { dni: 3, titulo: 'Formulario de Seguridad y Salud' }
]

// Auditorías Mock
const mockAuditorias: IAuditoria[] = [
    {
        dni: 1,
        descripcion: 'Auditoría Trimestre 1 - 2025',
        calificacion: 87.5,
        mejor: false,
        fechaFin: null,
        strFechaFin: null,
        show: false,
        Dominios: [
            {
                dni: 11,
                titulo: 'Documentación',
                peso: 30,
                calificacion: 0,
                Subdominios: [
                    { dni: 111, titulo: 'Manuales actualizados', peso: 40, evaluacion: 85, seleccionado: false, observaciones: 'Todos los manuales están al día' },
                    { dni: 112, titulo: 'Procedimientos documentados', peso: 30, evaluacion: 90, seleccionado: false, observaciones: '' },
                    { dni: 113, titulo: 'Registros completos', peso: 30, evaluacion: 88, seleccionado: false, observaciones: 'Falta actualizar 2 registros' }
                ]
            },
            {
                dni: 12,
                titulo: 'Implementación',
                peso: 40,
                calificacion: 0,
                Subdominios: [
                    { dni: 121, titulo: 'Capacitación del personal', peso: 50, evaluacion: 92, seleccionado: false, observaciones: 'Excelente participación' },
                    { dni: 122, titulo: 'Uso de procedimientos', peso: 50, evaluacion: 85, seleccionado: false, observaciones: '' }
                ]
            },
            {
                dni: 13,
                titulo: 'Mejora Continua',
                peso: 30,
                calificacion: 0,
                Subdominios: [
                    { dni: 131, titulo: 'Acciones correctivas', peso: 33, evaluacion: 80, seleccionado: false, observaciones: '' },
                    { dni: 132, titulo: 'Acciones preventivas', peso: 33, evaluacion: 75, seleccionado: false, observaciones: 'Necesita más seguimiento' },
                    { dni: 133, titulo: 'Lecciones aprendidas', peso: 34, evaluacion: 85, seleccionado: false, observaciones: '' }
                ]
            }
        ]
    },
    {
        dni: 2,
        descripcion: 'Auditoría Trimestre 4 - 2024',
        calificacion: 92.3,
        mejor: true,
        fechaFin: '2024-12-20T10:30:00',
        strFechaFin: '20/12/2024 10:30',
        show: false,
        Dominios: [
            {
                dni: 21,
                titulo: 'Documentación',
                peso: 30,
                calificacion: 0,
                Subdominios: [
                    { dni: 211, titulo: 'Manuales actualizados', peso: 40, evaluacion: 95, seleccionado: false, observaciones: '' },
                    { dni: 212, titulo: 'Procedimientos documentados', peso: 30, evaluacion: 92, seleccionado: false, observaciones: '' },
                    { dni: 213, titulo: 'Registros completos', peso: 30, evaluacion: 90, seleccionado: false, observaciones: '' }
                ]
            },
            {
                dni: 22,
                titulo: 'Implementación',
                peso: 40,
                calificacion: 0,
                Subdominios: [
                    { dni: 221, titulo: 'Capacitación del personal', peso: 50, evaluacion: 95, seleccionado: false, observaciones: '' },
                    { dni: 222, titulo: 'Uso de procedimientos', peso: 50, evaluacion: 88, seleccionado: false, observaciones: '' }
                ]
            },
            {
                dni: 23,
                titulo: 'Mejora Continua',
                peso: 30,
                calificacion: 0,
                Subdominios: [
                    { dni: 231, titulo: 'Acciones correctivas', peso: 33, evaluacion: 92, seleccionado: false, observaciones: '' },
                    { dni: 232, titulo: 'Acciones preventivas', peso: 33, evaluacion: 90, seleccionado: false, observaciones: '' },
                    { dni: 233, titulo: 'Lecciones aprendidas', peso: 34, evaluacion: 95, seleccionado: false, observaciones: '' }
                ]
            }
        ]
    },
    {
        dni: 3,
        descripcion: 'Auditoría Trimestre 3 - 2024',
        calificacion: 78.2,
        mejor: false,
        fechaFin: '2024-09-15T14:00:00',
        strFechaFin: '15/09/2024 14:00',
        show: false,
        Dominios: [
            {
                dni: 31,
                titulo: 'Documentación',
                peso: 30,
                calificacion: 0,
                Subdominios: [
                    { dni: 311, titulo: 'Manuales actualizados', peso: 40, evaluacion: 75, seleccionado: false, observaciones: 'Requiere actualización' },
                    { dni: 312, titulo: 'Procedimientos documentados', peso: 30, evaluacion: 80, seleccionado: false, observaciones: '' },
                    { dni: 313, titulo: 'Registros completos', peso: 30, evaluacion: 78, seleccionado: false, observaciones: '' }
                ]
            },
            {
                dni: 32,
                titulo: 'Implementación',
                peso: 40,
                calificacion: 0,
                Subdominios: [
                    { dni: 321, titulo: 'Capacitación del personal', peso: 50, evaluacion: 82, seleccionado: false, observaciones: '' },
                    { dni: 322, titulo: 'Uso de procedimientos', peso: 50, evaluacion: 75, seleccionado: false, observaciones: 'Mejorar adopción' }
                ]
            },
            {
                dni: 33,
                titulo: 'Mejora Continua',
                peso: 30,
                calificacion: 0,
                Subdominios: [
                    { dni: 331, titulo: 'Acciones correctivas', peso: 50, evaluacion: 80, seleccionado: false, observaciones: '' },
                    { dni: 332, titulo: 'Acciones preventivas', peso: 50, evaluacion: 75, seleccionado: false, observaciones: '' }
                ]
            }
        ]
    }
]

// ============================================
// HELPERS
// ============================================

function getData() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
        return JSON.parse(stored)
    }

    const initialData = {
        formularios: mockFormularios,
        auditorias: {
            1: JSON.parse(JSON.stringify(mockAuditorias)), // Form 1
            2: JSON.parse(JSON.stringify(mockAuditorias)), // Form 2
            3: JSON.parse(JSON.stringify(mockAuditorias))  // Form 3
        },
        mejoropcion: {
            1: false,
            2: false,
            3: false
        },
        nextDni: 1000
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
    return initialData
}

function saveData(data: any) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// ============================================
// SERVICIOS
// ============================================

// Obtener formularios
export async function getFormulariosService(dniProc: number): Promise<IFormulario[]> {
    await delay(300)
    const data = getData()
    return data.formularios
}

// Obtener auditorías por formulario
export async function getAuditoriasService(
    dniProc: number,
    dniForm: number
): Promise<{ propuestas: IAuditoria[], mejoropcion: boolean }> {
    await delay(500)
    const data = getData()

    const auditorias = data.auditorias[dniForm] || []
    const mejoropcion = data.mejoropcion[dniForm] || false

    return {
        propuestas: JSON.parse(JSON.stringify(auditorias)),
        mejoropcion
    }
}

// Nueva auditoría
export async function nuevaAuditoriaService(
    payload: INuevaAuditoriaPayload
): Promise<IResponse<IAuditoria>> {
    await delay(700)
    const data = getData()

    const nuevaAuditoria: IAuditoria = {
        dni: data.nextDni,
        descripcion: payload.descripcion,
        calificacion: 0,
        mejor: false,
        fechaFin: null,
        strFechaFin: null,
        show: true,
        Dominios: [
            {
                dni: data.nextDni + 1,
                titulo: 'Nuevo Dominio',
                peso: 100,
                calificacion: 0,
                Subdominios: [
                    {
                        dni: data.nextDni + 2,
                        titulo: 'Nuevo Subdominio',
                        peso: 100,
                        evaluacion: 0,
                        seleccionado: false,
                        observaciones: ''
                    }
                ]
            }
        ]
    }

    if (!data.auditorias[payload.dni]) {
        data.auditorias[payload.dni] = []
    }

    data.auditorias[payload.dni].push(nuevaAuditoria)
    data.nextDni += 10
    saveData(data)

    return {
        tipo: 'success',
        titulo: 'Auditoría creada exitosamente',
        m: nuevaAuditoria
    }
}

// Terminar auditoría
export async function terminarAuditoriaService(
    payload: ITerminarAuditoriaPayload,
    dniForm: number
): Promise<IResponse> {
    await delay(500)
    const data = getData()

    const auditorias = data.auditorias[dniForm] || []
    const auditoria = auditorias.find((a: IAuditoria) => a.dni === payload.dni)

    if (!auditoria) {
        return {
            tipo: 'error',
            titulo: 'Auditoría no encontrada'
        }
    }

    const now = new Date()
    auditoria.fechaFin = now.toISOString()
    auditoria.strFechaFin = now.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    saveData(data)

    return {
        tipo: 'success',
        titulo: 'Auditoría finalizada',
        m: {
            auditoria: {
                fechaFin: auditoria.fechaFin,
                strFechaFin: auditoria.strFechaFin
            }
        }
    }
}

// Modificar respuesta (evaluación + observaciones)
export async function modificarRespuestaService(
    payload: IModificarRespuestaPayload
): Promise<IResponse> {
    await delay(400)
    const data = getData()

    const auditorias = data.auditorias[payload.dni] || []
    const auditoria = auditorias.find((a: IAuditoria) => a.dni === payload.dniProp)

    if (!auditoria) {
        return {
            tipo: 'error',
            titulo: 'Auditoría no encontrada'
        }
    }

    const dominio = auditoria.Dominios.find((d: any) => d.dni === payload.dniDom)
    if (!dominio) {
        return {
            tipo: 'error',
            titulo: 'Dominio no encontrado'
        }
    }

    const subdominio = dominio.Subdominios.find((s: any) => s.dni === payload.dniSub)
    if (!subdominio) {
        return {
            tipo: 'error',
            titulo: 'Subdominio no encontrado'
        }
    }

    subdominio.evaluacion = payload.evaluacion
    subdominio.observaciones = payload.observaciones

    // Actualizar calificaciones desde payload.lista
    payload.lista.forEach(item => {
        const aud = auditorias.find((a: IAuditoria) => a.dni === item.dni)
        if (aud) {
            aud.calificacion = item.calificacion
            aud.mejor = item.mejor
        }
    })

    saveData(data)

    return {
        tipo: 'success',
        titulo: 'Evaluación guardada'
    }
}

// Modificar subdominio (modo mejor opción)
export async function modificarSubdominioService(
    payload: IModificarSubdominioPayload,
    dniForm: number
): Promise<IResponse> {
    await delay(400)
    const data = getData()

    const auditorias = data.auditorias[dniForm] || []
    const auditoria = auditorias.find((a: IAuditoria) => a.dni === payload.dniPropuesta)

    if (!auditoria) {
        return {
            tipo: 'error',
            titulo: 'Auditoría no encontrada'
        }
    }

    const dominio = auditoria.Dominios.find((d: any) => d.dni === payload.dniDominio)
    if (!dominio) {
        return {
            tipo: 'error',
            titulo: 'Dominio no encontrado'
        }
    }

    // Desmarcar todos los subdominios del dominio
    dominio.Subdominios.forEach((s: any) => {
        s.seleccionado = false
    })

    // Marcar el subdominio seleccionado
    const subdominio = dominio.Subdominios.find((s: any) => s.dni === payload.dniSubdominio)
    if (subdominio) {
        subdominio.seleccionado = payload.opcion
    }

    saveData(data)

    return {
        tipo: 'success',
        titulo: 'Selección guardada'
    }
}

// Cambiar modo de cálculo
export async function cambiarModoCalculoService(
    dniForm: number,
    mejoropcion: boolean
): Promise<IResponse> {
    await delay(300)
    const data = getData()

    data.mejoropcion[dniForm] = mejoropcion
    saveData(data)

    return {
        tipo: 'success',
        titulo: mejoropcion ? 'Modo "Mejor Opción" activado' : 'Modo normal activado'
    }
}
