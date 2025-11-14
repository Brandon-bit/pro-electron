import type {
    ICadenaValor,
    IManual,
    INivel1,
    IEspacio,
    IAgregarManualPayload,
    IHabilitarManualPayload,
    IEliminarManualPayload,
    ISubirArchivoPayload,
    IEliminarArchivoPayload,
    IResponse,
    IArchivo
} from '../types/manuales.types'

// ============================================
// DATOS MOCK
// ============================================

const STORAGE_KEY = 'manuales_politicas_data'

// Cadenas de Valor Mock
const mockCadenasValor: ICadenaValor[] = [
    { dni: 1, name: 'Cadena de Valor - Producción' },
    { dni: 2, name: 'Cadena de Valor - Logística' },
    { dni: 3, name: 'Cadena de Valor - Ventas' }
]

// Manuales de Cadena de Valor Mock
const mockManualesCV: IManual[] = [
    {
        id: 1,
        dni: 1001,
        lvl1: 'Estratégicos',
        lvl2: 'Planeación Estratégica',
        lvls3: '',
        isAuto: true,
        Lvls3: [
            { lvl3: 'Análisis de Mercado' },
            { lvl3: 'Definición de Objetivos' },
            { lvl3: 'Plan de Acción' }
        ],
        diagrama: 'DG-EST-001',
        Manuales: [
            { dni: 10001, nombre: 'Manual_Planeacion_v1', ext: '.docx', fechaSubida: '2025-01-15' },
            { dni: 10002, nombre: 'Manual_Planeacion_v2', ext: '.docx', fechaSubida: '2025-03-20' },
            { dni: 10003, nombre: 'Manual_Planeacion_v3', ext: '.docx', fechaSubida: '2025-10-10' }
        ],
        Historial: [
            { dni: 20001, idProceso: 1001, version: 1, final: false, fecha: '2025-01-15' },
            { dni: 20002, idProceso: 1001, version: 2, final: false, fecha: '2025-03-20' },
            { dni: 20003, idProceso: 1001, version: 3, final: true, fecha: '2025-10-10' }
        ],
        Soporte: [
            { dni: 30001, nombre: 'Formatos_Planeacion', ext: '.xlsx', fechaSubida: '2025-01-15' },
            { dni: 30002, nombre: 'Guia_Uso', ext: '.pdf', fechaSubida: '2025-02-01' }
        ],
        HistorialAu: [
            { dni: 40001, dniProc: 1001, dniForm: 0, fecha: '2025-02-20', calificacion: 95 },
            { dni: 40002, dniProc: 1001, dniForm: 0, fecha: '2025-05-15', calificacion: 92 },
            { dni: 40003, dniProc: 1001, dniForm: 0, fecha: '2025-08-10', calificacion: 97 }
        ],
        promedioAuditorias: 94.67,
        dniCV: 1
    },
    {
        id: 2,
        dni: 1002,
        lvl1: 'Operativos',
        lvl2: 'Producción',
        lvls3: '',
        isAuto: true,
        Lvls3: [
            { lvl3: 'Planificación de Producción' },
            { lvl3: 'Control de Calidad' }
        ],
        diagrama: 'DG-PROD-002',
        Manuales: [
            { dni: 10004, nombre: 'Manual_Produccion_v1', ext: '.docx', fechaSubida: '2025-02-10' },
            { dni: 10005, nombre: 'Manual_Produccion_v2', ext: '.docx', fechaSubida: '2025-07-05' }
        ],
        Historial: [
            { dni: 20004, idProceso: 1002, version: 1, final: false, fecha: '2025-02-10' },
            { dni: 20005, idProceso: 1002, version: 2, final: true, fecha: '2025-07-05' }
        ],
        Soporte: [
            { dni: 30003, nombre: 'Checklist_Calidad', ext: '.xlsx', fechaSubida: '2025-02-10' },
            { dni: 30004, nombre: 'Diagrama_Flujo', ext: '.pdf', fechaSubida: '2025-02-15' },
            { dni: 30005, nombre: 'Foto_Proceso', ext: '.jpg', fechaSubida: '2025-03-01' }
        ],
        HistorialAu: [
            { dni: 40004, dniProc: 1002, dniForm: 0, fecha: '2025-04-10', calificacion: 88 },
            { dni: 40005, dniProc: 1002, dniForm: 0, fecha: '2025-09-20', calificacion: 91 }
        ],
        promedioAuditorias: 89.5,
        dniCV: 1
    },
    {
        id: 3,
        dni: 1003,
        lvl1: 'Soporte',
        lvl2: 'Recursos Humanos',
        lvls3: '',
        isAuto: true,
        Lvls3: [
            { lvl3: 'Reclutamiento' },
            { lvl3: 'Capacitación' },
            { lvl3: 'Nómina' }
        ],
        diagrama: 'DG-RH-003',
        Manuales: [
            { dni: 10006, nombre: 'Manual_RRHH_v1', ext: '.docx', fechaSubida: '2025-03-01' }
        ],
        Historial: [
            { dni: 20006, idProceso: 1003, version: 1, final: true, fecha: '2025-03-01' }
        ],
        Soporte: [
            { dni: 30006, nombre: 'Formatos_Contratacion', ext: '.docx', fechaSubida: '2025-03-05' },
            { dni: 30007, nombre: 'Politicas_RRHH', ext: '.pdf', fechaSubida: '2025-03-10' }
        ],
        HistorialAu: [
            { dni: 40006, dniProc: 1003, dniForm: 0, fecha: '2025-06-15', calificacion: 85 }
        ],
        promedioAuditorias: 85,
        dniCV: 1
    },
    {
        id: 4,
        dni: 1004,
        lvl1: 'Operativos',
        lvl2: 'Logística',
        lvls3: '',
        isAuto: true,
        Lvls3: [
            { lvl3: 'Almacenamiento' },
            { lvl3: 'Distribución' }
        ],
        diagrama: 'DG-LOG-004',
        Manuales: [
            { dni: 10007, nombre: 'Manual_Logistica_v1', ext: '.docx', fechaSubida: '2025-04-12' },
            { dni: 10008, nombre: 'Manual_Logistica_v2', ext: '.docx', fechaSubida: '2025-08-20' }
        ],
        Historial: [
            { dni: 20007, idProceso: 1004, version: 1, final: false, fecha: '2025-04-12' },
            { dni: 20008, idProceso: 1004, version: 2, final: true, fecha: '2025-08-20' }
        ],
        Soporte: [
            { dni: 30008, nombre: 'Layout_Almacen', ext: '.png', fechaSubida: '2025-04-15' }
        ],
        HistorialAu: [
            { dni: 40007, dniProc: 1004, dniForm: 0, fecha: '2025-07-10', calificacion: 90 },
            { dni: 40008, dniProc: 1004, dniForm: 0, fecha: '2025-10-05', calificacion: 93 }
        ],
        promedioAuditorias: 91.5,
        dniCV: 2
    },
    {
        id: 5,
        dni: 1005,
        lvl1: 'Estratégicos',
        lvl2: 'Ventas y Marketing',
        lvls3: '',
        isAuto: true,
        Lvls3: [
            { lvl3: 'Prospección' },
            { lvl3: 'Cotización' },
            { lvl3: 'Cierre de Ventas' }
        ],
        diagrama: 'DG-VEN-005',
        Manuales: [
            { dni: 10009, nombre: 'Manual_Ventas_v1', ext: '.docx', fechaSubida: '2025-05-18' }
        ],
        Historial: [
            { dni: 20009, idProceso: 1005, version: 1, final: true, fecha: '2025-05-18' }
        ],
        Soporte: [
            { dni: 30009, nombre: 'Script_Ventas', ext: '.docx', fechaSubida: '2025-05-20' },
            { dni: 30010, nombre: 'Catalogo_Productos', ext: '.pdf', fechaSubida: '2025-05-25' }
        ],
        HistorialAu: [],
        promedioAuditorias: 0,
        dniCV: 3
    }
]

// Manuales Manuales Mock
const mockManuales: IManual[] = [
    {
        id: 6,
        dni: 2001,
        lvl1: 'Soporte',
        lvl2: 'Tecnologías de Información',
        lvls3: 'Gestión de Incidentes\nSoporte Técnico\nMantenimiento de Sistemas',
        isAuto: false,
        Lvls3: [],
        diagrama: 'DG-TI-006',
        Manuales: [
            { dni: 10010, nombre: 'Manual_TI_v1', ext: '.docx', fechaSubida: '2025-06-01' }
        ],
        Historial: [
            { dni: 20010, idProceso: 2001, version: 1, final: true, fecha: '2025-06-01' }
        ],
        Soporte: [
            { dni: 30011, nombre: 'Formatos_Tickets', ext: '.xlsx', fechaSubida: '2025-06-05' }
        ],
        HistorialAu: [
            { dni: 40009, dniProc: 2001, dniForm: 0, fecha: '2025-08-15', calificacion: 87 }
        ],
        promedioAuditorias: 87,
        habilitado: true,
        dniCV: 1
    },
    {
        id: 7,
        dni: 2002,
        lvl1: 'Operativos',
        lvl2: 'Mantenimiento',
        lvls3: 'Mantenimiento Preventivo\nMantenimiento Correctivo',
        isAuto: false,
        Lvls3: [],
        diagrama: 'DG-MNT-007',
        Manuales: [
            { dni: 10011, nombre: 'Manual_Mantenimiento_v1', ext: '.docx', fechaSubida: '2025-07-10' }
        ],
        Historial: [
            { dni: 20011, idProceso: 2002, version: 1, final: true, fecha: '2025-07-10' }
        ],
        Soporte: [],
        HistorialAu: [],
        promedioAuditorias: 0,
        habilitado: false,
        dniCV: 1
    },
    {
        id: 8,
        dni: 2003,
        lvl1: 'Soporte',
        lvl2: 'Finanzas',
        lvls3: 'Contabilidad\nPresupuestos\nTesorería',
        isAuto: false,
        Lvls3: [],
        diagrama: 'DG-FIN-008',
        Manuales: [
            { dni: 10012, nombre: 'Manual_Finanzas_v1', ext: '.docx', fechaSubida: '2025-08-05' },
            { dni: 10013, nombre: 'Manual_Finanzas_v2', ext: '.docx', fechaSubida: '2025-10-01' }
        ],
        Historial: [
            { dni: 20012, idProceso: 2003, version: 1, final: false, fecha: '2025-08-05' },
            { dni: 20013, idProceso: 2003, version: 2, final: true, fecha: '2025-10-01' }
        ],
        Soporte: [
            { dni: 30012, nombre: 'Formatos_Contables', ext: '.xlsx', fechaSubida: '2025-08-10' },
            { dni: 30013, nombre: 'Politica_Gastos', ext: '.pdf', fechaSubida: '2025-08-15' }
        ],
        HistorialAu: [
            { dni: 40010, dniProc: 2003, dniForm: 0, fecha: '2025-09-20', calificacion: 92 }
        ],
        promedioAuditorias: 92,
        habilitado: true,
        dniCV: 1
    }
]

// Niveles 1 Mock (para modo automático)
const mockNiveles1: INivel1[] = [
    {
        dni: 1,
        titulo: 'Estratégicos',
        lvls2: [
            {
                dni: 11,
                titulo: 'Planeación Estratégica',
                lvls3: [
                    { dni: 111, titulo: 'Análisis de Mercado', selected: false, inuse: true },
                    { dni: 112, titulo: 'Definición de Objetivos', selected: false, inuse: true },
                    { dni: 113, titulo: 'Plan de Acción', selected: false, inuse: true },
                    { dni: 114, titulo: 'Seguimiento', selected: false, inuse: false }
                ]
            },
            {
                dni: 12,
                titulo: 'Dirección General',
                lvls3: [
                    { dni: 121, titulo: 'Toma de Decisiones', selected: false, inuse: false },
                    { dni: 122, titulo: 'Comunicación Organizacional', selected: false, inuse: false }
                ]
            }
        ]
    },
    {
        dni: 2,
        titulo: 'Operativos',
        lvls2: [
            {
                dni: 21,
                titulo: 'Producción',
                lvls3: [
                    { dni: 211, titulo: 'Planificación de Producción', selected: false, inuse: true },
                    { dni: 212, titulo: 'Control de Calidad', selected: false, inuse: true },
                    { dni: 213, titulo: 'Empaque', selected: false, inuse: false }
                ]
            },
            {
                dni: 22,
                titulo: 'Logística',
                lvls3: [
                    { dni: 221, titulo: 'Almacenamiento', selected: false, inuse: true },
                    { dni: 222, titulo: 'Distribución', selected: false, inuse: true },
                    { dni: 223, titulo: 'Inventarios', selected: false, inuse: false }
                ]
            }
        ]
    },
    {
        dni: 3,
        titulo: 'Soporte',
        lvls2: [
            {
                dni: 31,
                titulo: 'Recursos Humanos',
                lvls3: [
                    { dni: 311, titulo: 'Reclutamiento', selected: false, inuse: true },
                    { dni: 312, titulo: 'Capacitación', selected: false, inuse: true },
                    { dni: 313, titulo: 'Nómina', selected: false, inuse: true },
                    { dni: 314, titulo: 'Evaluación de Desempeño', selected: false, inuse: false }
                ]
            }
        ]
    }
]

// Espacios Mock (para modo manual)
const mockEspacios: IEspacio[] = [
    {
        id: 1,
        nombre: 'Estratégicos',
        Procesos: [
            { id: 101, nombre: 'DG-EST-001 - Planeación Estratégica' },
            { id: 102, nombre: 'DG-EST-002 - Dirección General' }
        ]
    },
    {
        id: 2,
        nombre: 'Operativos',
        Procesos: [
            { id: 201, nombre: 'DG-PROD-001 - Producción' },
            { id: 202, nombre: 'DG-LOG-001 - Logística' },
            { id: 203, nombre: 'DG-VEN-001 - Ventas' }
        ]
    },
    {
        id: 3,
        nombre: 'Soporte',
        Procesos: [
            { id: 301, nombre: 'DG-RH-001 - Recursos Humanos' },
            { id: 302, nombre: 'DG-TI-001 - Tecnologías de Información' },
            { id: 303, nombre: 'DG-FIN-001 - Finanzas' },
            { id: 304, nombre: 'DG-MNT-001 - Mantenimiento' }
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
        cadenasValor: mockCadenasValor,
        manualesCV: mockManualesCV,
        manuales: mockManuales,
        niveles1: mockNiveles1,
        espacios: mockEspacios,
        nextDni: 3000
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

// Obtener cadenas de valor
export async function getCadenasValorService(): Promise<ICadenaValor[]> {
    await delay(300)
    const data = getData()
    return data.cadenasValor
}

// Obtener manuales de CV por cadena
export async function getManualesCVService(dniCV: number): Promise<IManual[]> {
    await delay(500)
    const data = getData()
    return data.manualesCV.filter((m: IManual) => m.dniCV === dniCV)
}

// Obtener manuales manuales por cadena
export async function getManualesService(dniCV: number): Promise<IManual[]> {
    await delay(500)
    const data = getData()
    return data.manuales.filter((m: IManual) => m.dniCV === dniCV)
}

// Obtener niveles 1 (para modal automático)
export async function getNiveles1Service(): Promise<INivel1[]> {
    await delay(300)
    const data = getData()
    return JSON.parse(JSON.stringify(data.niveles1))
}

// Obtener espacios (para modal manual)
export async function getEspaciosService(dniCV: number): Promise<IEspacio[]> {
    await delay(300)
    const data = getData()
    // En mock, devolver todos
    return JSON.parse(JSON.stringify(data.espacios))
}

// Agregar manual
export async function agregarManualService(
    payload: IAgregarManualPayload,
    dniCV: number
): Promise<IResponse<IManual>> {
    await delay(700)
    const data = getData()

    const nuevoManual: IManual = {
        id: data.nextDni,
        dni: data.nextDni,
        lvl1: payload.lvl1 ? mockEspacios.find(e => e.id === payload.lvl1)?.nombre || '' : '',
        lvl2: payload.lvl2 || '',
        lvls3: payload.lvls3 || '',
        isAuto: false,
        Lvls3: [],
        diagrama: payload.lvl4 ? `DG-${payload.lvl4}` : 'DG-NEW',
        Manuales: [],
        Historial: [],
        Soporte: [],
        HistorialAu: [],
        promedioAuditorias: 0,
        habilitado: true,
        dniCV
    }

    data.manuales.push(nuevoManual)
    data.nextDni++
    saveData(data)

    return {
        tipo: 'success',
        titulo: 'Manual agregado exitosamente',
        m: nuevoManual
    }
}

// Eliminar manual
export async function eliminarManualService(
    payload: IEliminarManualPayload
): Promise<IResponse> {
    await delay(500)
    const data = getData()

    const index = data.manuales.findIndex((m: IManual) => m.dni === payload.dniProc)
    if (index !== -1) {
        data.manuales.splice(index, 1)
        saveData(data)

        return {
            tipo: 'success',
            titulo: 'Manual eliminado exitosamente'
        }
    }

    return {
        tipo: 'error',
        titulo: 'Manual no encontrado'
    }
}

// Habilitar/Deshabilitar manual
export async function habilitarManualService(
    payload: IHabilitarManualPayload
): Promise<IResponse> {
    await delay(400)
    const data = getData()

    const manual = data.manuales.find((m: IManual) => m.dni === payload.dniManual)
    if (manual) {
        manual.habilitado = payload.habilitado
        saveData(data)

        return {
            tipo: 'success',
            titulo: payload.habilitado ? 'Manual habilitado' : 'Manual deshabilitado'
        }
    }

    return {
        tipo: 'error',
        titulo: 'Manual no encontrado'
    }
}

// Subir archivo (simulado)
export async function subirArchivoService(
    payload: ISubirArchivoPayload
): Promise<IResponse<IArchivo>> {
    await delay(1000) // Simular upload
    const data = getData()

    // Buscar manual en ambas listas
    let manual = data.manualesCV.find((m: IManual) => m.dni === payload.dni)
    if (!manual) {
        manual = data.manuales.find((m: IManual) => m.dni === payload.dni)
    }

    if (!manual) {
        return {
            tipo: 'error',
            titulo: 'Manual no encontrado'
        }
    }

    const nuevoArchivo: IArchivo = {
        dni: data.nextDni,
        nombre: payload.archivo.name.replace(/\.[^/.]+$/, ''),
        ext: '.' + payload.archivo.name.split('.').pop(),
        size: payload.archivo.size,
        fechaSubida: new Date().toISOString().split('T')[0]
    }

    if (payload.tipo === 'version') {
        manual.Manuales.push(nuevoArchivo)
    } else {
        manual.Soporte.push(nuevoArchivo)
    }

    data.nextDni++
    saveData(data)

    return {
        tipo: 'success',
        titulo: 'Archivo subido exitosamente',
        m: nuevoArchivo
    }
}

// Eliminar archivo
export async function eliminarArchivoService(
    payload: IEliminarArchivoPayload
): Promise<IResponse> {
    await delay(400)
    const data = getData()

    // Buscar manual en ambas listas
    let manual = data.manualesCV.find((m: IManual) => m.dni === payload.dni)
    if (!manual) {
        manual = data.manuales.find((m: IManual) => m.dni === payload.dni)
    }

    if (!manual) {
        return {
            tipo: 'error',
            titulo: 'Manual no encontrado'
        }
    }

    const lista = payload.tipo === 'version' ? manual.Manuales : manual.Soporte
    const index = lista.findIndex((a: IArchivo) => a.dni === payload.dniArchivo)

    if (index !== -1) {
        lista.splice(index, 1)
        saveData(data)

        return {
            tipo: 'success',
            titulo: 'Archivo eliminado'
        }
    }

    return {
        tipo: 'error',
        titulo: 'Archivo no encontrado'
    }
}
