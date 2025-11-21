import type {
    IncidenceCategory,
    IncidenceType,
    IncidenceStatus,
    IncidenceTypeInfo,
    IncidenceCategoryInfo,
    IncidenceStatusInfo,
    SelectOptionDTO
} from '@/modules/RRHH/Incidencias/types/incidencesTypes'

// Catálogos de información de incidencias
const CATEGORIAS_INCIDENCIAS: IncidenceCategoryInfo[] = [
    { id: 'ASISTENCIA', label: 'Asistencia' },
    { id: 'INCAPACIDAD', label: 'Incapacidad' },
    { id: 'TIEMPO_EXTRA', label: 'Tiempo Extra' }
]

const TIPOS_INCIDENCIAS: IncidenceTypeInfo[] = [
    // ASISTENCIA
    {
        id: 'FALTA',
        label: 'Falta',
        category: 'ASISTENCIA',
        requiresDateRange: false,
        requiresHours: false,
        requiresJustification: true
    },
    {
        id: 'RETARDO',
        label: 'Retardo',
        category: 'ASISTENCIA',
        requiresDateRange: false,
        requiresHours: true,
        requiresJustification: true
    },
    {
        id: 'SALIDA_ANTICIPADA',
        label: 'Salida Anticipada',
        category: 'ASISTENCIA',
        requiresDateRange: false,
        requiresHours: true,
        requiresJustification: true
    },
    {
        id: 'PERMISO_CON_GOCE',
        label: 'Permiso con Goce de Sueldo',
        category: 'ASISTENCIA',
        requiresDateRange: true,
        requiresHours: false,
        requiresJustification: false
    },
    {
        id: 'PERMISO_SIN_GOCE',
        label: 'Permiso sin Goce de Sueldo',
        category: 'ASISTENCIA',
        requiresDateRange: true,
        requiresHours: false,
        requiresJustification: false
    },
    // INCAPACIDAD
    {
        id: 'INCAPACIDAD_ENFERMEDAD_GENERAL',
        label: 'Incapacidad por Enfermedad General',
        category: 'INCAPACIDAD',
        requiresDateRange: true,
        requiresHours: false,
        requiresJustification: false
    },
    {
        id: 'INCAPACIDAD_RIESGO_TRABAJO',
        label: 'Incapacidad por Riesgo de Trabajo',
        category: 'INCAPACIDAD',
        requiresDateRange: true,
        requiresHours: false,
        requiresJustification: false
    },
    {
        id: 'INCAPACIDAD_MATERNIDAD_PATERNIDAD',
        label: 'Incapacidad por Maternidad/Paternidad',
        category: 'INCAPACIDAD',
        requiresDateRange: true,
        requiresHours: false,
        requiresJustification: false
    },
    // TIEMPO_EXTRA
    {
        id: 'HORAS_EXTRA',
        label: 'Horas Extra',
        category: 'TIEMPO_EXTRA',
        requiresDateRange: false,
        requiresHours: true,
        requiresJustification: false
    },
    {
        id: 'TRABAJO_DIA_FESTIVO',
        label: 'Trabajo en Día Festivo',
        category: 'TIEMPO_EXTRA',
        requiresDateRange: false,
        requiresHours: true,
        requiresJustification: false
    }
]

const ESTADOS_INCIDENCIAS: IncidenceStatusInfo[] = [
    { id: 'PENDIENTE', label: 'Pendiente', badgeClass: 'badge-warning' },
    { id: 'APROBADA', label: 'Aprobada', badgeClass: 'badge-success' },
    { id: 'RECHAZADA', label: 'Rechazada', badgeClass: 'badge-error' },
    { id: 'APLICADA_NOMINA', label: 'Aplicada a Nómina', badgeClass: 'badge-info' }
]

export const getStatusBadgeClass = (status: IncidenceStatus): string => {
    const statusInfo = ESTADOS_INCIDENCIAS.find((s) => s.id === status)
    return statusInfo?.badgeClass || 'badge-ghost'
}

export const getTypesByCategory = (category: IncidenceCategory): IncidenceTypeInfo[] => {
    return TIPOS_INCIDENCIAS.filter((t) => t.category === category)
}

export const getTypeInfo = (type: IncidenceType): IncidenceTypeInfo | undefined => {
    return TIPOS_INCIDENCIAS.find((t) => t.id === type)
}

export const getIncidenceCategories = () => {
    return CATEGORIAS_INCIDENCIAS.map((cat) => ({ id: cat.id, label: cat.label }))
}

export const getIncidenceStatuses = () => {
    return ESTADOS_INCIDENCIAS.map((status) => ({ id: status.id, label: status.label }))
}

export const getEmployeesBySearch = async (
    query: string,
    limit: number = 10,
    page: number = 1
): Promise<{ employees: SelectOptionDTO[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const mockEmployees: SelectOptionDTO[] = [
        { id: 1, label: 'Juan Pérez González' },
        { id: 2, label: 'María García Rodríguez' },
        { id: 3, label: 'Carlos López Martínez' },
        { id: 4, label: 'Ana Sánchez Torres' },
        { id: 5, label: 'Luis Hernández Torres' },
        { id: 6, label: 'Patricia Ramírez Flores' },
        { id: 7, label: 'Roberto Díaz Morales' },
        { id: 8, label: 'Laura Jiménez Castro' }
    ]

    const filtered = mockEmployees.filter((emp) =>
        emp.label.toLowerCase().includes(query.toLowerCase())
    )

    const start = (page - 1) * limit
    const end = start + limit

    return {
        employees: filtered.slice(start, end),
        total: filtered.length
    }
}
