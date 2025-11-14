import type {
    IProceso,
    IFase,
    IActividad,
    ICreateActividadPayload,
    IFinalizarActividadPayload,
    IDeleteActividadPayload,
    IMetodologiaResponse,
    IMetodologiaData
} from '../types/metodologia.types'

// ============================================
// DATA MOCK
// ============================================

// Procesos disponibles
export const mockProcesos: IProceso[] = [
    { id: 101, nombre: 'Gestión de Compras', codigo: 'GC-001', descripcion: 'Proceso de compras' },
    { id: 102, nombre: 'Gestión de Ventas', codigo: 'GV-002', descripcion: 'Proceso de ventas' },
    { id: 103, nombre: 'Recursos Humanos', codigo: 'RH-003', descripcion: 'Proceso de RRHH' },
    { id: 104, nombre: 'Desarrollo de Software', codigo: 'DS-004', descripcion: 'Proceso de desarrollo' },
    { id: 105, nombre: 'Marketing Digital', codigo: 'MK-005', descripcion: 'Proceso de marketing' }
]

// Fases predefinidas (se crean para cada proceso)
const fasesTemplate = [
    { nombre: 'Planificación', descripcion: 'Fase de planeación inicial' },
    { nombre: 'Análisis', descripcion: 'Fase de análisis de requerimientos' },
    { nombre: 'Diseño', descripcion: 'Fase de diseño de solución' },
    { nombre: 'Implementación', descripcion: 'Fase de implementación' },
    { nombre: 'Pruebas', descripcion: 'Fase de pruebas y validación' },
    { nombre: 'Cierre', descripcion: 'Fase de cierre y documentación' }
]

// Base de datos simulada (se persistirá en memoria durante la sesión)
let metodologiasDB: Record<number, IFase[]> = {}

// Inicializar fases para un proceso
const initFasesForProceso = (procesoId: number): IFase[] => {
    if (metodologiasDB[procesoId]) {
        return metodologiasDB[procesoId]
    }

    const fases: IFase[] = fasesTemplate.map((template, index) => ({
        dni: procesoId * 1000 + index + 1,
        nombre: template.nombre,
        descripcion: template.descripcion,
        activa: false,
        finalizada: false,
        Start: undefined,
        End: undefined,
        Actividades: generarActividadesMock(template.nombre, procesoId * 1000 + index + 1),
        orden: index + 1
    }))

    metodologiasDB[procesoId] = fases
    return fases
}

// Generar actividades de ejemplo
const generarActividadesMock = (nombreFase: string, dniFase: number): IActividad[] => {
    const actividadesPorFase: Record<string, string[]> = {
        'Planificación': [
            'Definir objetivos del proceso',
            'Identificar stakeholders',
            'Elaborar plan de trabajo'
        ],
        'Análisis': [
            'Recopilar información',
            'Analizar proceso actual (AS-IS)',
            'Identificar oportunidades de mejora'
        ],
        'Diseño': [
            'Diseñar proceso futuro (TO-BE)',
            'Crear diagramas BPMN',
            'Definir indicadores'
        ],
        'Implementación': [
            'Desarrollar cambios',
            'Capacitar personal',
            'Realizar pruebas piloto'
        ],
        'Pruebas': [
            'Ejecutar casos de prueba',
            'Validar resultados',
            'Ajustar según feedback'
        ],
        'Cierre': [
            'Documentar lecciones aprendidas',
            'Entregar documentación',
            'Celebrar logros del equipo'
        ]
    }

    const actividades = actividadesPorFase[nombreFase] || []
    
    return actividades.map((nombre, index) => ({
        dni: dniFase * 100 + index + 1,
        nombre,
        finalizada: false
    }))
}

// ============================================
// SERVICIOS
// ============================================

// Obtener datos de metodología de un proceso
export const getMetodologiaDataService = async (procesoId: number): Promise<IMetodologiaData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const proceso = mockProcesos.find(p => p.id === procesoId) || mockProcesos[0]
            const metodologias = initFasesForProceso(procesoId)

            resolve({
                Proceso: proceso,
                Metodologias: metodologias
            })
        }, 400)
    })
}

// Obtener lista de procesos
export const getProcesosService = async (): Promise<IProceso[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProcesos)
        }, 300)
    })
}

// Crear nueva actividad
export const createActividadService = async (payload: ICreateActividadPayload): Promise<IMetodologiaResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const fases = metodologiasDB[payload.dniProc]
            const fase = fases?.find(f => f.dni === payload.dniFase)

            if (fase) {
                const newActividad: IActividad = {
                    dni: Date.now(), // ID único simulado
                    nombre: payload.nombre,
                    finalizada: false
                }

                fase.Actividades.push(newActividad)

                resolve({
                    status: 'success',
                    message: 'Actividad creada exitosamente',
                    data: newActividad
                })
            } else {
                resolve({
                    status: 'error',
                    message: 'Fase no encontrada'
                })
            }
        }, 500)
    })
}

// Finalizar actividad (marcar checkbox)
export const finalizarActividadService = async (payload: IFinalizarActividadPayload): Promise<IMetodologiaResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const fases = metodologiasDB[payload.dniProc]
            const fase = fases?.find(f => f.dni === payload.dniFase)
            const actividad = fase?.Actividades.find(a => a.dni === payload.dni)

            if (fase && actividad) {
                actividad.finalizada = true
                actividad.fechaFinalizacion = new Date().toISOString()

                const responseData: any = {
                    finalizada: false,
                    activa: false,
                    justActivated: false // Nuevo flag
                }

                // Si es la primera actividad finalizada, iniciar fase
                if (!fase.activa) {
                    fase.activa = true
                    fase.Start = new Date().toISOString()
                    responseData.activa = true
                    responseData.justActivated = true // Solo la primera vez
                    responseData.Start = fase.Start
                }

                // Si todas las actividades están finalizadas, finalizar fase
                const todasFinalizadas = fase.Actividades.every(a => a.finalizada)
                if (todasFinalizadas) {
                    fase.finalizada = true
                    fase.End = new Date().toISOString()
                    responseData.finalizada = true
                    responseData.End = fase.End
                }

                resolve({
                    status: 'success',
                    message: 'Actividad finalizada',
                    data: responseData
                })
            } else {
                resolve({
                    status: 'error',
                    message: 'Actividad no encontrada'
                })
            }
        }, 400)
    })
}

// Eliminar actividad
export const deleteActividadService = async (payload: IDeleteActividadPayload): Promise<IMetodologiaResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const fases = metodologiasDB[payload.dniProc]
            const fase = fases?.find(f => f.dni === payload.dniFase)

            if (fase) {
                const index = fase.Actividades.findIndex(a => a.dni === payload.dni)
                
                if (index !== -1) {
                    fase.Actividades.splice(index, 1)

                    // Si no quedan actividades, resetear fase
                    if (fase.Actividades.length === 0) {
                        fase.activa = false
                        fase.finalizada = false
                        fase.Start = undefined
                        fase.End = undefined
                    } else {
                        // Recalcular si todas están finalizadas
                        const todasFinalizadas = fase.Actividades.every(a => a.finalizada)
                        fase.finalizada = todasFinalizadas
                        
                        if (todasFinalizadas && fase.Actividades.length > 0) {
                            fase.End = new Date().toISOString()
                        }
                    }

                    resolve({
                        status: 'success',
                        message: 'Actividad eliminada',
                        data: { finalizada: fase.finalizada }
                    })
                } else {
                    resolve({
                        status: 'error',
                        message: 'Actividad no encontrada'
                    })
                }
            } else {
                resolve({
                    status: 'error',
                    message: 'Fase no encontrada'
                })
            }
        }, 400)
    })
}
