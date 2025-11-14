import type {
    ValueChainType,
    SpaceType,
    ValueChainSpaceType,
    ProcessType,
    CVProcessType,
    DiagramType,
    Level2Type,
    VoBoUserType
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'

// ============================================
// CADENAS DE VALOR DISPONIBLES
// ============================================
export const mockValueChains: ValueChainType[] = [
    { dni: 1, name: 'Cadena de Valor Principal' },
    { dni: 2, name: 'Cadena de Valor Secundaria' },
    { dni: 3, name: 'Cadena de Valor de Soporte' }
]

// ============================================
// CADENA DE VALOR ACTUAL (seleccionada)
// ============================================
export let currentValueChain: ValueChainType = mockValueChains[0]

// ============================================
// NIVELES 2 Y 3 DE LA CADENA DE VALOR
// ============================================
export const mockLevel2And3: Level2Type[] = [
    {
        dni: 201,
        titulo: 'Diseño de Producto',
        lvls3: [
            { id: 301, dni: 301, titulo: 'Investigación de Mercado', selected: false, inuse: false },
            { id: 302, dni: 302, titulo: 'Diseño Conceptual', selected: false, inuse: false },
            { id: 303, dni: 303, titulo: 'Prototipado', selected: false, inuse: true }
        ]
    },
    {
        dni: 202,
        titulo: 'Producción',
        lvls3: [
            { id: 304, dni: 304, titulo: 'Planificación de Producción', selected: false, inuse: false },
            { id: 305, dni: 305, titulo: 'Control de Calidad', selected: false, inuse: false },
            { id: 306, dni: 306, titulo: 'Ensamblaje', selected: false, inuse: true }
        ]
    },
    {
        dni: 203,
        titulo: 'Distribución',
        lvls3: [
            { id: 307, dni: 307, titulo: 'Logística', selected: false, inuse: false },
            { id: 308, dni: 308, titulo: 'Almacenamiento', selected: false, inuse: false },
            { id: 309, dni: 309, titulo: 'Transporte', selected: false, inuse: false }
        ]
    }
]

// ============================================
// ESPACIOS ACTIVOS (creados por el usuario)
// ============================================
export const mockSpaces: SpaceType[] = [
    {
        id: 1,
        nombre: 'Recursos Humanos',
        edit: false,
        Procesos: [
            {
                id: 101,
                nombre: 'Reclutamiento',
                asis: true,
                dniEspacio: 1,
                Diagramas: [
                    { dni: 1001, version: 1, final: false, hasVoBo: false },
                    { dni: 1002, version: 2, final: true, hasVoBo: true, VoBo: [] }
                ]
            },
            {
                id: 102,
                nombre: 'Capacitación',
                asis: false,
                dniEspacio: 1,
                Diagramas: [
                    { dni: 1003, version: 1, final: true, hasVoBo: false }
                ]
            }
        ]
    },
    {
        id: 2,
        nombre: 'Finanzas',
        edit: false,
        Procesos: [
            {
                id: 103,
                nombre: 'Presupuesto Anual',
                asis: true,
                dniEspacio: 2,
                Diagramas: [
                    { dni: 1004, version: 1, final: true, hasVoBo: false }
                ]
            },
            {
                id: 104,
                nombre: 'Control de Gastos',
                asis: false,
                dniEspacio: 2,
                Diagramas: [
                    { dni: 1005, version: 1, final: false, hasVoBo: false },
                    { dni: 1006, version: 2, final: true, hasVoBo: true, VoBo: [] }
                ]
            }
        ]
    },
    {
        id: 3,
        nombre: 'Tecnología',
        edit: false,
        Procesos: [
            {
                id: 105,
                nombre: 'Desarrollo de Software',
                asis: true,
                dniEspacio: 3,
                Diagramas: [
                    { dni: 1007, version: 1, final: true, hasVoBo: false }
                ]
            }
        ]
    }
]

// ============================================
// ESPACIOS DE CADENA DE VALOR
// ============================================
export const mockValueChainSpaces: ValueChainSpaceType[] = [
    {
        dni: 101,
        titulo: 'Generación de Oferta de Valor',
        isCV: true,
        lvls2: mockLevel2And3,
        CVProcesos: [
            {
                id: 201,
                nombre: 'Desarrollo de Producto',
                asis: true,
                dniCV: 1,
                dniLvl1: 101,
                dniLvl2: 201,
                dnisLvl3: [301, 302],
                Diagramas: [
                    { dni: 2001, version: 1, final: false, hasVoBo: false },
                    { dni: 2002, version: 2, final: true, hasVoBo: false }
                ]
            }
        ]
    },
    {
        dni: 102,
        titulo: 'Habilitación de la Oferta',
        isCV: true,
        lvls2: mockLevel2And3,
        CVProcesos: [
            {
                id: 202,
                nombre: 'Gestión de Producción',
                asis: false,
                dniCV: 1,
                dniLvl1: 102,
                dniLvl2: 202,
                dnisLvl3: [304, 305],
                Diagramas: [
                    { dni: 2003, version: 1, final: true, hasVoBo: true, VoBo: [] }
                ]
            }
        ]
    },
    {
        dni: 103,
        titulo: 'Experiencia y Lealtad del Cliente',
        isCV: true,
        lvls2: mockLevel2And3,
        CVProcesos: []
    }
]

// ============================================
// USUARIOS PARA VOBO
// ============================================
export const mockVoBoUsers: VoBoUserType[] = [
    {
        id: 1,
        nombre: 'Juan',
        apellidos: 'Pérez García',
        correo: 'juan.perez@empresa.com',
        selected: false
    },
    {
        id: 2,
        nombre: 'María',
        apellidos: 'González López',
        correo: 'maria.gonzalez@empresa.com',
        selected: false
    },
    {
        id: 3,
        nombre: 'Carlos',
        apellidos: 'Ramírez Torres',
        correo: 'carlos.ramirez@empresa.com',
        selected: false
    },
    {
        id: 4,
        nombre: 'Ana',
        apellidos: 'Martínez Ruiz',
        correo: 'ana.martinez@empresa.com',
        selected: false
    },
    {
        id: 5,
        nombre: 'Luis',
        apellidos: 'Hernández Silva',
        correo: 'luis.hernandez@empresa.com',
        selected: false
    }
]

// ============================================
// HELPER PARA OBTENER TODOS LOS PROCESOS
// ============================================
export const getAllProcesses = (): (ProcessType | CVProcessType)[] => {
    const allProcesses: (ProcessType | CVProcessType)[] = []
    
    // Agregar procesos de espacios activos
    mockSpaces.forEach((space) => {
        allProcesses.push(...space.Procesos)
    })
    
    // Agregar procesos de CV
    mockValueChainSpaces.forEach((space) => {
        allProcesses.push(...space.CVProcesos)
    })
    
    return allProcesses
}

// ============================================
// HELPER PARA GENERAR NUEVO ID
// ============================================
let nextSpaceId = 4
let nextProcessId = 300
let nextDiagramId = 3000

export const generateNewSpaceId = () => ++nextSpaceId
export const generateNewProcessId = () => ++nextProcessId
export const generateNewDiagramId = () => ++nextDiagramId
