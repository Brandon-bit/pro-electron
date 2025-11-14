import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'
import type { ValueChainResponseType } from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'

// Mock data for simulation - Estructura de Cadena de Valor completa
const createEmptySection = () => ({
    esp1: { areas: [] },
    esp2: { areas: [] },
    esp3: { areas: [] }
})

// Crear datos mock completos para la primera cadena de valor
const createMockValueChain1 = (): ValueChainResponseType => ({
    id: 1,
    titulo: 'Cadena de Valor Principal',
    esPrincipal: true,
    fechaCreacion: new Date('2025-01-15'),
    
    // PLANEACIÓN
    planeacion: {
        esp1: {
            areas: [
                {
                    dni: 101,
                    titulo: 'Planificación Estratégica',
                    tipo: 'Planeación',
                    espacio: 1,
                    lvls1: [
                        {
                            dni: 1011,
                            titulo: 'Análisis de Mercado',
                            hasProc: false,
                            lvls2: [
                                {
                                    dni: 10111,
                                    titulo: 'Investigación de Tendencias',
                                    hasProc: false,
                                    lvls3: [
                                        {
                                            dni: 101111,
                                            titulo: 'Análisis de Competencia',
                                            desc: 'Realizar estudios comparativos de los competidores principales, identificando sus fortalezas, debilidades y estrategias de mercado.',
                                            hasProc: false
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            dni: 1012,
                            titulo: 'Definición de Objetivos',
                            hasProc: false,
                            lvls2: []
                        }
                    ]
                }
            ]
        },
        esp2: {
            areas: [
                {
                    dni: 102,
                    titulo: 'Gestión Financiera',
                    tipo: 'Planeación',
                    espacio: 2,
                    lvls1: [
                        {
                            dni: 1021,
                            titulo: 'Presupuestación',
                            hasProc: false,
                            lvls2: []
                        }
                    ]
                }
            ]
        },
        esp3: { areas: [] }
    },
    
    // CADENA DE VALOR
    valor: {
        esp1: {
            areas: [
                {
                    dni: 201,
                    titulo: 'Diseño de Producto',
                    tipo: 'Cadena de valor',
                    espacio: 1,
                    connRight: true,
                    lvls1: [
                        {
                            dni: 2011,
                            titulo: 'Investigación y Desarrollo',
                            hasProc: false,
                            lvls2: [
                                {
                                    dni: 20111,
                                    titulo: 'Prototipado',
                                    hasProc: false,
                                    lvls3: [
                                        {
                                            dni: 201111,
                                            titulo: 'Diseño Conceptual',
                                            desc: 'Crear bocetos y modelos conceptuales del producto basados en las necesidades del cliente y las tendencias del mercado.',
                                            hasProc: false
                                        },
                                        {
                                            dni: 201112,
                                            titulo: 'Pruebas de Prototipo',
                                            desc: 'Realizar pruebas funcionales y de usabilidad con usuarios reales para validar el diseño y realizar ajustes necesarios.',
                                            hasProc: false
                                        }
                                    ]
                                },
                                {
                                    dni: 20112,
                                    titulo: 'Validación Técnica',
                                    hasProc: false,
                                    lvls3: []
                                }
                            ]
                        },
                        {
                            dni: 2012,
                            titulo: 'Innovación de Producto',
                            hasProc: false,
                            lvls2: []
                        }
                    ]
                },
                {
                    dni: 202,
                    titulo: 'Desarrollo',
                    tipo: 'Cadena de valor',
                    espacio: 1,
                    connRight: false,
                    lvls1: []
                }
            ]
        },
        esp2: {
            areas: [
                {
                    dni: 203,
                    titulo: 'Producción',
                    tipo: 'Cadena de valor',
                    espacio: 2,
                    connRight: true,
                    lvls1: [
                        {
                            dni: 2031,
                            titulo: 'Manufactura',
                            hasProc: false,
                            lvls2: [
                                {
                                    dni: 20311,
                                    titulo: 'Línea de Ensamblaje',
                                    hasProc: false,
                                    lvls3: []
                                }
                            ]
                        }
                    ]
                },
                {
                    dni: 204,
                    titulo: 'Control de Calidad',
                    tipo: 'Cadena de valor',
                    espacio: 2,
                    lvls1: [
                        {
                            dni: 2041,
                            titulo: 'Inspección Final',
                            hasProc: false,
                            lvls2: []
                        }
                    ]
                }
            ]
        },
        esp3: {
            areas: [
                {
                    dni: 205,
                    titulo: 'Distribución',
                    tipo: 'Cadena de valor',
                    espacio: 3,
                    lvls1: [
                        {
                            dni: 2051,
                            titulo: 'Logística de Entrega',
                            hasProc: false,
                            lvls2: [
                                {
                                    dni: 20511,
                                    titulo: 'Transporte',
                                    hasProc: false,
                                    lvls3: [
                                        {
                                            dni: 205111,
                                            titulo: 'Planificación de Rutas',
                                            desc: 'Optimizar las rutas de entrega considerando factores como distancia, tráfico, y ventanas de tiempo para maximizar la eficiencia.',
                                            hasProc: false
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    
    // SOPORTE
    soporte: {
        esp1: {
            areas: [
                {
                    dni: 301,
                    titulo: 'Recursos Humanos',
                    tipo: 'Soporte',
                    espacio: 1,
                    lvls1: [
                        {
                            dni: 3011,
                            titulo: 'Reclutamiento',
                            hasProc: false,
                            lvls2: [
                                {
                                    dni: 30111,
                                    titulo: 'Selección de Personal',
                                    hasProc: false,
                                    lvls3: []
                                }
                            ]
                        },
                        {
                            dni: 3012,
                            titulo: 'Capacitación',
                            hasProc: false,
                            lvls2: []
                        }
                    ]
                }
            ]
        },
        esp2: {
            areas: [
                {
                    dni: 302,
                    titulo: 'Tecnología de la Información',
                    tipo: 'Soporte',
                    espacio: 2,
                    lvls1: [
                        {
                            dni: 3021,
                            titulo: 'Infraestructura IT',
                            hasProc: false,
                            lvls2: []
                        }
                    ]
                }
            ]
        },
        esp3: {
            areas: [
                {
                    dni: 303,
                    titulo: 'Mantenimiento',
                    tipo: 'Soporte',
                    espacio: 3,
                    lvls1: []
                }
            ]
        }
    }
})

const mockValueChains: ValueChainResponseType[] = [
    createMockValueChain1(),
    {
        id: 2,
        titulo: 'Operaciones',
        esPrincipal: false,
        fechaCreacion: new Date('2025-01-20'),
        planeacion: createEmptySection(),
        valor: createEmptySection(),
        soporte: createEmptySection()
    },
    {
        id: 3,
        titulo: 'Marketing y Ventas',
        esPrincipal: false,
        fechaCreacion: new Date('2025-02-01'),
        planeacion: createEmptySection(),
        valor: createEmptySection(),
        soporte: createEmptySection()
    }
]

export const getValueChainsService = async (
    page: number,
    pageSize: number
): Promise<ApiResponseType<PagedResponseType<ValueChainResponseType>>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300)) // Simular delay de API

    return {
        success: true,
        message: 'Cadenas de valor obtenidas exitosamente',
        data: {
            items: mockValueChains,
            totalItems: mockValueChains.length,
            page: page,
            pageSize: pageSize,
            length: mockValueChains.length
        }
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.get('/procesos/cadenas-de-valor', {
    //     params: {
    //         limit: page,
    //         skip: pageSize
    //     }
    // })
    // return response.data
}

export const createValueChainService = async (
    data: any
): Promise<ApiResponseType<ValueChainResponseType>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newChain: ValueChainResponseType = {
        id: mockValueChains.length + 1,
        titulo: data.Titulo,
        esPrincipal: false,
        fechaCreacion: new Date(),
        planeacion: createEmptySection(),
        valor: createEmptySection(),
        soporte: createEmptySection()
    }

    mockValueChains.push(newChain)

    return {
        success: true,
        message: 'Cadena de valor creada exitosamente',
        data: newChain
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.post('/procesos/cadenas-de-valor', data)
    // return response.data
}

export const getValueChainByIdService = async (
    id: number
): Promise<ApiResponseType<ValueChainResponseType>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 300))

    const chain = mockValueChains.find((c) => c.id === id)
    
    if (!chain) {
        return {
            success: false,
            message: 'Cadena de valor no encontrada',
            data: null as any
        }
    }

    return {
        success: true,
        message: 'Cadena de valor obtenida exitosamente',
        data: chain
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.get(`/procesos/cadenas-de-valor/${id}`)
    // return response.data
}

export const updateValueChainService = async (
    id: number,
    data: any
): Promise<ApiResponseType<ValueChainResponseType>> => {
    // Simulación con datos mock
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = mockValueChains.findIndex((chain) => chain.id === id)
    if (index !== -1) {
        mockValueChains[index] = {
            ...mockValueChains[index],
            titulo: data.Titulo
        }
    }

    return {
        success: true,
        message: 'Cadena de valor actualizada exitosamente',
        data: mockValueChains[index]
    }

    // Descomenta cuando tengas el endpoint real:
    // const response = await axiosApiInstance.put(`/procesos/cadenas-de-valor/${id}`, data)
    // return response.data
}
