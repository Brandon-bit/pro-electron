import type {
    IProceso,
    IMatrizRasci,
    IModificarValorPayload,
    IRasciResponse
} from '../types/rasci.types'

// ============================================
// DATA MOCK
// ============================================

// Procesos disponibles
export const mockProcesos: IProceso[] = [
    { dni: 1, nombre: 'Proceso de Compras' },
    { dni: 2, nombre: 'Proceso de Ventas' },
    { dni: 3, nombre: 'Proceso de Recursos Humanos' },
    { dni: 4, nombre: 'Proceso de Desarrollo de Software' },
    { dni: 5, nombre: 'Proceso de Atención al Cliente' }
]

// Matrices RASCI por proceso
const matricesRasci: Record<number, IMatrizRasci> = {
    1: {
        Proceso: { dni: 1, nombre: 'Proceso de Compras' },
        Roles: [
            { dni: 101, titulo: 'Gerente de Compras' },
            { dni: 102, titulo: 'Analista de Compras' },
            { dni: 103, titulo: 'Jefe de Almacén' },
            { dni: 104, titulo: 'Contador' },
            { dni: 105, titulo: 'Gerente General' }
        ],
        Actividades: [
            {
                dni: 1001,
                titulo: 'Identificar necesidad de compra',
                Valores: [
                    { rol: 101, valor: 'A' },
                    { rol: 102, valor: 'R' },
                    { rol: 103, valor: 'C' },
                    { rol: 104, valor: 'I' },
                    { rol: 105, valor: 'I' }
                ]
            },
            {
                dni: 1002,
                titulo: 'Solicitar cotizaciones',
                Valores: [
                    { rol: 101, valor: 'A' },
                    { rol: 102, valor: 'R' },
                    { rol: 103, valor: '' },
                    { rol: 104, valor: 'I' },
                    { rol: 105, valor: '' }
                ]
            },
            {
                dni: 1003,
                titulo: 'Evaluar proveedores',
                Valores: [
                    { rol: 101, valor: 'R/A' },
                    { rol: 102, valor: 'S' },
                    { rol: 103, valor: 'C' },
                    { rol: 104, valor: 'C' },
                    { rol: 105, valor: 'I' }
                ]
            },
            {
                dni: 1004,
                titulo: 'Aprobar orden de compra',
                Valores: [
                    { rol: 101, valor: 'R' },
                    { rol: 102, valor: 'S' },
                    { rol: 103, valor: '' },
                    { rol: 104, valor: 'C' },
                    { rol: 105, valor: 'A' }
                ]
            },
            {
                dni: 1005,
                titulo: 'Recepcionar productos',
                Valores: [
                    { rol: 101, valor: 'I' },
                    { rol: 102, valor: 'C' },
                    { rol: 103, valor: 'R/A' },
                    { rol: 104, valor: '' },
                    { rol: 105, valor: '' }
                ]
            },
            {
                dni: 1006,
                titulo: 'Verificar factura',
                Valores: [
                    { rol: 101, valor: 'C' },
                    { rol: 102, valor: 'S' },
                    { rol: 103, valor: 'C' },
                    { rol: 104, valor: 'R/A' },
                    { rol: 105, valor: 'I' }
                ]
            },
            {
                dni: 1007,
                titulo: 'Realizar pago',
                Valores: [
                    { rol: 101, valor: 'I' },
                    { rol: 102, valor: '' },
                    { rol: 103, valor: '' },
                    { rol: 104, valor: 'R/A' },
                    { rol: 105, valor: 'I' }
                ]
            }
        ]
    },
    2: {
        Proceso: { dni: 2, nombre: 'Proceso de Ventas' },
        Roles: [
            { dni: 201, titulo: 'Gerente de Ventas' },
            { dni: 202, titulo: 'Ejecutivo de Ventas' },
            { dni: 203, titulo: 'Asistente Comercial' },
            { dni: 204, titulo: 'Jefe de Marketing' }
        ],
        Actividades: [
            {
                dni: 2001,
                titulo: 'Prospección de clientes',
                Valores: [
                    { rol: 201, valor: 'A' },
                    { rol: 202, valor: 'R' },
                    { rol: 203, valor: 'S' },
                    { rol: 204, valor: 'C' }
                ]
            },
            {
                dni: 2002,
                titulo: 'Elaborar propuesta comercial',
                Valores: [
                    { rol: 201, valor: 'C' },
                    { rol: 202, valor: 'R/A' },
                    { rol: 203, valor: 'S' },
                    { rol: 204, valor: 'I' }
                ]
            },
            {
                dni: 2003,
                titulo: 'Negociar con cliente',
                Valores: [
                    { rol: 201, valor: 'A' },
                    { rol: 202, valor: 'R' },
                    { rol: 203, valor: '' },
                    { rol: 204, valor: 'C' }
                ]
            },
            {
                dni: 2004,
                titulo: 'Cerrar venta',
                Valores: [
                    { rol: 201, valor: 'A' },
                    { rol: 202, valor: 'R' },
                    { rol: 203, valor: 'S' },
                    { rol: 204, valor: 'I' }
                ]
            },
            {
                dni: 2005,
                titulo: 'Seguimiento post-venta',
                Valores: [
                    { rol: 201, valor: 'I' },
                    { rol: 202, valor: 'R/A' },
                    { rol: 203, valor: 'S' },
                    { rol: 204, valor: '' }
                ]
            }
        ]
    },
    3: {
        Proceso: { dni: 3, nombre: 'Proceso de Recursos Humanos' },
        Roles: [
            { dni: 301, titulo: 'Gerente de RRHH' },
            { dni: 302, titulo: 'Reclutador' },
            { dni: 303, titulo: 'Jefe de Área Solicitante' },
            { dni: 304, titulo: 'Gerente General' }
        ],
        Actividades: [
            {
                dni: 3001,
                titulo: 'Identificar vacante',
                Valores: [
                    { rol: 301, valor: 'A' },
                    { rol: 302, valor: '' },
                    { rol: 303, valor: 'R' },
                    { rol: 304, valor: 'I' }
                ]
            },
            {
                dni: 3002,
                titulo: 'Publicar oferta laboral',
                Valores: [
                    { rol: 301, valor: 'C' },
                    { rol: 302, valor: 'R/A' },
                    { rol: 303, valor: 'I' },
                    { rol: 304, valor: '' }
                ]
            },
            {
                dni: 3003,
                titulo: 'Filtrar candidatos',
                Valores: [
                    { rol: 301, valor: 'A' },
                    { rol: 302, valor: 'R' },
                    { rol: 303, valor: 'C' },
                    { rol: 304, valor: '' }
                ]
            },
            {
                dni: 3004,
                titulo: 'Realizar entrevistas',
                Valores: [
                    { rol: 301, valor: 'C' },
                    { rol: 302, valor: 'R' },
                    { rol: 303, valor: 'A' },
                    { rol: 304, valor: 'I' }
                ]
            },
            {
                dni: 3005,
                titulo: 'Seleccionar candidato',
                Valores: [
                    { rol: 301, valor: 'R' },
                    { rol: 302, valor: 'S' },
                    { rol: 303, valor: 'A' },
                    { rol: 304, valor: 'I' }
                ]
            },
            {
                dni: 3006,
                titulo: 'Hacer oferta laboral',
                Valores: [
                    { rol: 301, valor: 'R/A' },
                    { rol: 302, valor: 'S' },
                    { rol: 303, valor: 'C' },
                    { rol: 304, valor: 'I' }
                ]
            }
        ]
    },
    4: {
        Proceso: { dni: 4, nombre: 'Proceso de Desarrollo de Software' },
        Roles: [
            { dni: 401, titulo: 'Product Owner' },
            { dni: 402, titulo: 'Scrum Master' },
            { dni: 403, titulo: 'Desarrollador' },
            { dni: 404, titulo: 'QA Tester' },
            { dni: 405, titulo: 'DevOps' }
        ],
        Actividades: [
            {
                dni: 4001,
                titulo: 'Definir requerimientos',
                Valores: [
                    { rol: 401, valor: 'R/A' },
                    { rol: 402, valor: 'S' },
                    { rol: 403, valor: 'C' },
                    { rol: 404, valor: 'C' },
                    { rol: 405, valor: 'I' }
                ]
            },
            {
                dni: 4002,
                titulo: 'Planificar sprint',
                Valores: [
                    { rol: 401, valor: 'C' },
                    { rol: 402, valor: 'R/A' },
                    { rol: 403, valor: 'R' },
                    { rol: 404, valor: 'R' },
                    { rol: 405, valor: 'C' }
                ]
            },
            {
                dni: 4003,
                titulo: 'Desarrollar funcionalidad',
                Valores: [
                    { rol: 401, valor: 'C' },
                    { rol: 402, valor: 'S' },
                    { rol: 403, valor: 'R/A' },
                    { rol: 404, valor: 'I' },
                    { rol: 405, valor: 'I' }
                ]
            },
            {
                dni: 4004,
                titulo: 'Realizar pruebas',
                Valores: [
                    { rol: 401, valor: 'I' },
                    { rol: 402, valor: 'C' },
                    { rol: 403, valor: 'S' },
                    { rol: 404, valor: 'R/A' },
                    { rol: 405, valor: 'I' }
                ]
            },
            {
                dni: 4005,
                titulo: 'Desplegar a producción',
                Valores: [
                    { rol: 401, valor: 'I' },
                    { rol: 402, valor: 'C' },
                    { rol: 403, valor: 'S' },
                    { rol: 404, valor: 'C' },
                    { rol: 405, valor: 'R/A' }
                ]
            }
        ]
    },
    5: {
        Proceso: { dni: 5, nombre: 'Proceso de Atención al Cliente' },
        Roles: [
            { dni: 501, titulo: 'Agente de Soporte' },
            { dni: 502, titulo: 'Supervisor de Soporte' },
            { dni: 503, titulo: 'Especialista Técnico' }
        ],
        Actividades: [
            {
                dni: 5001,
                titulo: 'Recibir solicitud del cliente',
                Valores: [
                    { rol: 501, valor: 'R/A' },
                    { rol: 502, valor: 'I' },
                    { rol: 503, valor: '' }
                ]
            },
            {
                dni: 5002,
                titulo: 'Diagnosticar problema',
                Valores: [
                    { rol: 501, valor: 'R' },
                    { rol: 502, valor: 'A' },
                    { rol: 503, valor: 'C' }
                ]
            },
            {
                dni: 5003,
                titulo: 'Resolver incidencia',
                Valores: [
                    { rol: 501, valor: 'R/A' },
                    { rol: 502, valor: 'S' },
                    { rol: 503, valor: 'S' }
                ]
            },
            {
                dni: 5004,
                titulo: 'Escalar caso complejo',
                Valores: [
                    { rol: 501, valor: 'R' },
                    { rol: 502, valor: 'A' },
                    { rol: 503, valor: 'R' }
                ]
            },
            {
                dni: 5005,
                titulo: 'Cerrar ticket',
                Valores: [
                    { rol: 501, valor: 'R/A' },
                    { rol: 502, valor: 'C' },
                    { rol: 503, valor: 'I' }
                ]
            }
        ]
    }
}

// ============================================
// SERVICIOS
// ============================================

// Obtener lista de procesos
export const getProcesosService = async (): Promise<IProceso[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProcesos)
        }, 200)
    })
}

// Obtener matriz RASCI de un proceso
export const getMatrizRasciService = async (dniProceso: number): Promise<IRasciResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const matriz = matricesRasci[dniProceso]
            
            if (matriz) {
                resolve({
                    status: 'success',
                    message: 'Matriz RASCI cargada exitosamente',
                    data: JSON.parse(JSON.stringify(matriz)) // Deep clone
                })
            } else {
                resolve({
                    status: 'error',
                    message: 'Proceso no encontrado'
                })
            }
        }, 300)
    })
}

// Modificar un valor RASCI
export const modificarValorService = async (payload: IModificarValorPayload): Promise<IRasciResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const matriz = matricesRasci[payload.dniProc]
            
            if (!matriz) {
                resolve({
                    status: 'error',
                    message: 'Proceso no encontrado'
                })
                return
            }

            // Buscar la actividad
            const actividad = matriz.Actividades.find(a => a.dni === payload.dniAct)
            
            if (!actividad) {
                resolve({
                    status: 'error',
                    message: 'Actividad no encontrada'
                })
                return
            }

            // Buscar el valor del rol
            const valorIndex = actividad.Valores.findIndex(v => v.rol === payload.rol)
            
            if (valorIndex === -1) {
                resolve({
                    status: 'error',
                    message: 'Rol no encontrado'
                })
                return
            }

            // Actualizar el valor
            actividad.Valores[valorIndex].valor = payload.valor

            resolve({
                status: 'success',
                message: 'Valor actualizado exitosamente',
                data: JSON.parse(JSON.stringify(matriz.Actividades)) // Deep clone
            })
        }, 400)
    })
}
