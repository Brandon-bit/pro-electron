import type {
    IOla,
    IProceso,
    IUsuarioVoBo,
    ICreateOlaPayload,
    ISendVoBoPayload,
    IOlaResponse
} from '../types/ola.types'

// ============================================
// DATA MOCK
// ============================================

// Mock de procesos disponibles
export const mockProcesos: IProceso[] = [
    { id: 101, nombre: 'Gestión de Compras', codigo: 'GC-001', descripcion: 'Proceso de compras', dniEspacio: 1 },
    { id: 102, nombre: 'Gestión de Ventas', codigo: 'GV-002', descripcion: 'Proceso de ventas', dniEspacio: 1 },
    { id: 103, nombre: 'Recursos Humanos', codigo: 'RH-003', descripcion: 'Proceso de RRHH', dniEspacio: 1 },
    { id: 104, nombre: 'Contabilidad', codigo: 'CT-004', descripcion: 'Proceso contable', dniEspacio: 2 },
    { id: 105, nombre: 'Inventarios', codigo: 'IN-005', descripcion: 'Proceso de inventarios', dniEspacio: 2 }
]

// Mock de olas existentes
let mockOlas: IOla[] = [
    {
        id: 1,
        concepto: 'Automatización de órdenes de compra',
        tipoImplementacion: 'Desarrollo de Sistema',
        prioridad: 'Muy Alta',
        ola_numero: 0,
        ola_descripcion: 'Inmediato',
        dniProceso: 101
    },
    {
        id: 2,
        concepto: 'Digitalización de facturas',
        tipoImplementacion: 'Quick Hits',
        prioridad: 'Alta',
        ola_numero: 0,
        ola_descripcion: 'Inmediato',
        dniProceso: 101
    },
    {
        id: 3,
        concepto: 'Sistema de aprobaciones',
        tipoImplementacion: 'Desarrollo de Sistema',
        prioridad: 'Media',
        ola_numero: 1,
        ola_descripcion: 'Corto Plazo',
        dniProceso: 101
    },
    {
        id: 4,
        concepto: 'Integración con proveedores',
        tipoImplementacion: 'Proyecto de Inversión',
        prioridad: 'Baja',
        ola_numero: 2,
        ola_descripcion: 'Mediano Plazo',
        dniProceso: 101
    },
    {
        id: 5,
        concepto: 'Portal de autoservicio',
        tipoImplementacion: 'Proyecto de Inversión',
        prioridad: 'Alta',
        ola_numero: 3,
        ola_descripcion: 'Largo Plazo',
        dniProceso: 101
    }
]

// Mock de usuarios para VoBo
export const mockUsuarios: IUsuarioVoBo[] = [
    { id: 1, nombre: 'Juan', apellidos: 'Pérez García', correo: 'juan.perez@empresa.com', selected: false },
    { id: 2, nombre: 'María', apellidos: 'López Martínez', correo: 'maria.lopez@empresa.com', selected: false },
    { id: 3, nombre: 'Carlos', apellidos: 'González Rodríguez', correo: 'carlos.gonzalez@empresa.com', selected: false },
    { id: 4, nombre: 'Ana', apellidos: 'Sánchez Hernández', correo: 'ana.sanchez@empresa.com', selected: false },
    { id: 5, nombre: 'Luis', apellidos: 'Ramírez Torres', correo: 'luis.ramirez@empresa.com', selected: false }
]

// ============================================
// SERVICIOS
// ============================================

// Obtener lista de procesos
export const getProcesosService = async (): Promise<IProceso[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProcesos)
        }, 300)
    })
}

// Obtener olas de un proceso específico
export const getOlasByProcesoService = async (dniProceso: number): Promise<IOla[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const olas = mockOlas.filter(o => o.dniProceso === dniProceso)
            resolve(olas)
        }, 400)
    })
}

// Crear nueva ola
export const createOlaService = async (payload: ICreateOlaPayload): Promise<IOlaResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mapear descripción a número
            const olaNumeroMap: Record<string, 0 | 1 | 2 | 3> = {
                'Inmediato': 0,
                'Corto Plazo': 1,
                'Mediano Plazo': 2,
                'Largo Plazo': 3
            }

            const newOla: IOla = {
                id: mockOlas.length + 1,
                concepto: payload.concepto,
                tipoImplementacion: payload.tipoImplementacion,
                prioridad: payload.prioridad,
                ola_numero: olaNumeroMap[payload.ola_descripcion],
                ola_descripcion: payload.ola_descripcion,
                dniProceso: payload.dniProceso
            }

            mockOlas.push(newOla)

            resolve({
                status: 'success',
                message: 'Ola creada exitosamente',
                data: newOla
            })
        }, 500)
    })
}

// Obtener usuarios para VoBo
export const getUsuariosVoBoService = async (): Promise<IUsuarioVoBo[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Resetear selección
            const usuarios = mockUsuarios.map(u => ({ ...u, selected: false }))
            resolve(usuarios)
        }, 300)
    })
}

// Enviar VoBo
export const sendVoBoService = async (payload: ISendVoBoPayload): Promise<IOlaResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('[MOCK] Enviando VoBo a:', payload.correos)
            console.log('[MOCK] Proceso ID:', payload.dniProceso)
            
            resolve({
                status: 'success',
                message: `VoBo enviado a ${payload.correos.length} usuario(s)`
            })
        }, 600)
    })
}

// Obtener proceso por ID
export const getProcesoByIdService = async (id: number): Promise<IProceso | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const proceso = mockProcesos.find(p => p.id === id) || null
            resolve(proceso)
        }, 200)
    })
}
