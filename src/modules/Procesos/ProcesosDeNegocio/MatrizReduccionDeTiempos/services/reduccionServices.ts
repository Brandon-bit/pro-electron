import type {
    ICadenaValor,
    IEspacio,
    ICVEspacio,
    IProyecto,
    IReduccionData,
    IReduccionResponse,
    ICompararPayload,
    IActividad
} from '../types/reduccion.types'

// ============================================
// DATA MOCK
// ============================================

// Cadenas de Valor
export const mockCadenasValor: ICadenaValor[] = [
    { dni: 1, name: 'Gestión Estratégica' },
    { dni: 2, name: 'Gestión Operativa' },
    { dni: 3, name: 'Gestión de Soporte' }
]

// Proyectos
export const mockProyectos: IProyecto[] = [
    { dni: 1, nombre: 'Proyecto Alpha' },
    { dni: 2, nombre: 'Proyecto Beta' },
    { dni: 3, nombre: 'Proyecto Gamma' },
    { dni: 4, nombre: 'Optimización de Procesos 2024' },
    { dni: 5, nombre: 'Transformación Digital' }
]

// Actividades mock para ASIS
const actividadesAsisMock: IActividad[] = [
    {
        dni: 1001,
        descActividad: 'Recepción de solicitud',
        responsable: 'Juan Pérez',
        tEfecDias: 0,
        tEfecHrs: 2,
        tEfecMin: 30,
        tEspDia: 1,
        tEspHrs: 0,
        tEspMin: 0
    },
    {
        dni: 1002,
        descActividad: 'Revisión de documentos',
        responsable: 'María García',
        tEfecDias: 0,
        tEfecHrs: 1,
        tEfecMin: 45,
        tEspDia: 0,
        tEspHrs: 3,
        tEspMin: 0
    },
    {
        dni: 1003,
        descActividad: 'Aprobación gerencial',
        responsable: 'Carlos López',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 30,
        tEspDia: 2,
        tEspHrs: 0,
        tEspMin: 0
    },
    {
        dni: 1004,
        descActividad: 'Registro en sistema',
        responsable: 'Ana Martínez',
        tEfecDias: 0,
        tEfecHrs: 1,
        tEfecMin: 0,
        tEspDia: 0,
        tEspHrs: 1,
        tEspMin: 30
    },
    {
        dni: 1005,
        descActividad: 'Notificación al cliente',
        responsable: 'Pedro Sánchez',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 15,
        tEspDia: 1,
        tEspHrs: 0,
        tEspMin: 0
    }
]

// Actividades mock para TOBE v1 (Optimización Alta - 4 actividades)
const actividadesTobeV1Mock: IActividad[] = [
    {
        dni: 2001,
        descActividad: 'Recepción automatizada de solicitud',
        responsable: 'Sistema Automático',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 15,
        tEspDia: 0,
        tEspHrs: 0,
        tEspMin: 0
    },
    {
        dni: 2002,
        descActividad: 'Validación automática de documentos',
        responsable: 'Sistema Automático',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 30,
        tEspDia: 0,
        tEspHrs: 0,
        tEspMin: 0
    },
    {
        dni: 2003,
        descActividad: 'Aprobación digital',
        responsable: 'Carlos López',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 20,
        tEspDia: 0,
        tEspHrs: 2,
        tEspMin: 0
    },
    {
        dni: 2004,
        descActividad: 'Notificación automática',
        responsable: 'Sistema Automático',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 5,
        tEspDia: 0,
        tEspHrs: 0,
        tEspMin: 0
    }
]

// Actividades mock para TOBE v2 (Optimización Media - 3 actividades)
const actividadesTobeV2Mock: IActividad[] = [
    {
        dni: 2101,
        descActividad: 'Recepción y validación automática',
        responsable: 'Sistema Automático',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 45,
        tEspDia: 0,
        tEspHrs: 0,
        tEspMin: 0
    },
    {
        dni: 2102,
        descActividad: 'Aprobación por flujo digital',
        responsable: 'Carlos López',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 30,
        tEspDia: 0,
        tEspHrs: 4,
        tEspMin: 0
    },
    {
        dni: 2103,
        descActividad: 'Registro y notificación automática',
        responsable: 'Sistema Automático',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 10,
        tEspDia: 0,
        tEspHrs: 0,
        tEspMin: 0
    }
]

// Actividades mock para TOBE v3 (Optimización Completa - 2 actividades)
const actividadesTobeV3Mock: IActividad[] = [
    {
        dni: 2201,
        descActividad: 'Procesamiento automático completo',
        responsable: 'Sistema IA',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 30,
        tEspDia: 0,
        tEspHrs: 0,
        tEspMin: 0
    },
    {
        dni: 2202,
        descActividad: 'Aprobación automática por reglas',
        responsable: 'Sistema IA',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 10,
        tEspDia: 0,
        tEspHrs: 1,
        tEspMin: 0
    }
]

// Actividades mock para TOBE v4 (Optimización Híbrida - 4 actividades con más esperas)
const actividadesTobeV4Mock: IActividad[] = [
    {
        dni: 2301,
        descActividad: 'Recepción de solicitud por portal',
        responsable: 'Juan Pérez',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 30,
        tEspDia: 0,
        tEspHrs: 2,
        tEspMin: 0
    },
    {
        dni: 2302,
        descActividad: 'Validación semi-automatizada',
        responsable: 'Sistema + María García',
        tEfecDias: 0,
        tEfecHrs: 1,
        tEfecMin: 0,
        tEspDia: 0,
        tEspHrs: 1,
        tEspMin: 0
    },
    {
        dni: 2303,
        descActividad: 'Aprobación digital rápida',
        responsable: 'Carlos López',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 15,
        tEspDia: 0,
        tEspHrs: 6,
        tEspMin: 0
    },
    {
        dni: 2304,
        descActividad: 'Notificación por email',
        responsable: 'Sistema Automático',
        tEfecDias: 0,
        tEfecHrs: 0,
        tEfecMin: 5,
        tEspDia: 0,
        tEspHrs: 0,
        tEspMin: 0
    }
]

// Espacios (Procesos nivel 3)
export const mockEspacios: IEspacio[] = [
    {
        id: 101,
        nombre: 'Gestión de Compras',
        Procesos: [
            {
                id: 1011,
                nombre: 'Solicitud de Compra',
                asis: true,
                Diagramas: [
                    {
                        dni: 10111,
                        version: 1,
                        tobe: false,
                        Actividades: JSON.parse(JSON.stringify(actividadesAsisMock))
                    },
                    {
                        dni: 10112,
                        version: 2,
                        tobe: false,
                        Actividades: JSON.parse(JSON.stringify(actividadesAsisMock))
                    }
                ]
            },
            {
                id: 1012,
                nombre: 'Solicitud de Compra Optimizada',
                asis: false,
                Diagramas: [
                    {
                        dni: 10121,
                        version: 1,
                        tobe: true,
                        Actividades: JSON.parse(JSON.stringify(actividadesTobeV1Mock))
                    },
                    {
                        dni: 10122,
                        version: 2,
                        tobe: true,
                        Actividades: JSON.parse(JSON.stringify(actividadesTobeV2Mock))
                    },
                    {
                        dni: 10123,
                        version: 3,
                        tobe: true,
                        Actividades: JSON.parse(JSON.stringify(actividadesTobeV3Mock))
                    },
                    {
                        dni: 10124,
                        version: 4,
                        tobe: true,
                        Actividades: JSON.parse(JSON.stringify(actividadesTobeV4Mock))
                    }
                ]
            }
        ]
    },
    {
        id: 102,
        nombre: 'Gestión de Ventas',
        Procesos: [
            {
                id: 1021,
                nombre: 'Cotización',
                asis: true,
                Diagramas: [
                    {
                        dni: 10211,
                        version: 1,
                        tobe: false,
                        Actividades: JSON.parse(JSON.stringify(actividadesAsisMock))
                    }
                ]
            },
            {
                id: 1022,
                nombre: 'Cotización Automática',
                asis: false,
                Diagramas: [
                    {
                        dni: 10221,
                        version: 1,
                        tobe: true,
                        Actividades: JSON.parse(JSON.stringify(actividadesTobeV1Mock))
                    },
                    {
                        dni: 10222,
                        version: 2,
                        tobe: true,
                        Actividades: JSON.parse(JSON.stringify(actividadesTobeV2Mock))
                    },
                    {
                        dni: 10223,
                        version: 3,
                        tobe: true,
                        Actividades: JSON.parse(JSON.stringify(actividadesTobeV3Mock))
                    }
                ]
            }
        ]
    }
]

// CV Espacios (Procesos de Cadena de Valor)
export const mockCVEspacios: ICVEspacio[] = [
    {
        dni: 201,
        titulo: 'Proceso Estratégico 1',
        CVProcesos: [
            {
                dni: 2011,
                nombre: 'Planificación Estratégica',
                asis: true,
                Diagramas: [
                    {
                        dni: 20111,
                        version: 1,
                        tobe: false,
                        Actividades: JSON.parse(JSON.stringify(actividadesAsisMock))
                    }
                ]
            },
            {
                dni: 2012,
                nombre: 'Planificación Estratégica Mejorada',
                asis: false,
                Diagramas: [
                    {
                        dni: 20121,
                        version: 1,
                        tobe: true,
                        Actividades: JSON.parse(JSON.stringify(actividadesTobeV1Mock))
                    },
                    {
                        dni: 20122,
                        version: 2,
                        tobe: true,
                        Actividades: JSON.parse(JSON.stringify(actividadesTobeV2Mock))
                    },
                    {
                        dni: 20123,
                        version: 3,
                        tobe: true,
                        Actividades: JSON.parse(JSON.stringify(actividadesTobeV4Mock))
                    }
                ]
            }
        ]
    }
]

// ============================================
// SERVICIOS
// ============================================

// Obtener datos iniciales
export const getReduccionDataService = async (): Promise<IReduccionData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                espacios: mockEspacios,
                cvEsps: mockCVEspacios,
                CV: mockCadenasValor[0],
                area: '',
                person: '',
                strFechaIni: new Date().toISOString().split('T')[0],
                Asis: [],
                Tobes: [],
                show: false
            })
        }, 300)
    })
}

// Obtener cadenas de valor
export const getCadenasValorService = async (): Promise<ICadenaValor[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCadenasValor)
        }, 200)
    })
}

// Obtener proyectos
export const getProyectosService = async (): Promise<IProyecto[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProyectos)
        }, 200)
    })
}

// Comparar diagramas (obtener actividades)
export const compararDiagramasService = async (payload: ICompararPayload): Promise<IReduccionResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Validar que se haya seleccionado al menos un diagrama
            if (!payload.idA && !payload.idT) {
                resolve({
                    status: 'error',
                    message: 'Selecciona al menos un diagrama ASIS o TOBE'
                })
                return
            }

            // Buscar el diagrama ASIS
            let actividadesAsis: IActividad[] = []
            if (payload.idA) {
                // Buscar en espacios
                for (const espacio of mockEspacios) {
                    for (const proceso of espacio.Procesos) {
                        for (const diagrama of proceso.Diagramas) {
                            if (diagrama.dni === payload.idA) {
                                actividadesAsis = JSON.parse(JSON.stringify(diagrama.Actividades))
                                break
                            }
                        }
                    }
                }
                
                // Buscar en CVEspacios
                for (const cvEsp of mockCVEspacios) {
                    for (const cvProc of cvEsp.CVProcesos) {
                        for (const diagrama of cvProc.Diagramas) {
                            if (diagrama.dni === payload.idA) {
                                actividadesAsis = JSON.parse(JSON.stringify(diagrama.Actividades))
                                break
                            }
                        }
                    }
                }
            }

            // Buscar el diagrama TOBE
            let actividadesTobes: IActividad[] = []
            if (payload.idT) {
                // Buscar en espacios
                for (const espacio of mockEspacios) {
                    for (const proceso of espacio.Procesos) {
                        for (const diagrama of proceso.Diagramas) {
                            if (diagrama.dni === payload.idT) {
                                actividadesTobes = JSON.parse(JSON.stringify(diagrama.Actividades))
                                break
                            }
                        }
                    }
                }
                
                // Buscar en CVEspacios
                for (const cvEsp of mockCVEspacios) {
                    for (const cvProc of cvEsp.CVProcesos) {
                        for (const diagrama of cvProc.Diagramas) {
                            if (diagrama.dni === payload.idT) {
                                actividadesTobes = JSON.parse(JSON.stringify(diagrama.Actividades))
                                break
                            }
                        }
                    }
                }
            }

            resolve({
                status: 'success',
                message: 'Diagramas comparados exitosamente',
                data: {
                    Asis: actividadesAsis,
                    Tobes: actividadesTobes
                }
            })
        }, 500)
    })
}
