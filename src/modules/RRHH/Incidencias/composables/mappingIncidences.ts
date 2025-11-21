import type {
    Incidence,
    IncidenceDTO,
    IncidenceFormDTO
} from '@/modules/RRHH/Incidencias/types/incidencesTypes'

const CATEGORY_LABELS = {
    ASISTENCIA: 'Asistencia',
    INCAPACIDAD: 'Incapacidad',
    TIEMPO_EXTRA: 'Tiempo Extra'
}

const TYPE_LABELS = {
    FALTA: 'Falta',
    RETARDO: 'Retardo',
    SALIDA_ANTICIPADA: 'Salida Anticipada',
    PERMISO_CON_GOCE: 'Permiso con Goce de Sueldo',
    PERMISO_SIN_GOCE: 'Permiso sin Goce de Sueldo',
    INCAPACIDAD_ENFERMEDAD_GENERAL: 'Incapacidad por Enfermedad General',
    INCAPACIDAD_RIESGO_TRABAJO: 'Incapacidad por Riesgo de Trabajo',
    INCAPACIDAD_MATERNIDAD_PATERNIDAD: 'Incapacidad por Maternidad/Paternidad',
    HORAS_EXTRA: 'Horas Extra',
    TRABAJO_DIA_FESTIVO: 'Trabajo en Día Festivo'
}

const STATUS_LABELS = {
    PENDIENTE: 'Pendiente',
    APROBADA: 'Aprobada',
    RECHAZADA: 'Rechazada',
    APLICADA_NOMINA: 'Aplicada a Nómina'
}

export const mapIncidenceDTO = (model: Incidence): IncidenceDTO => ({
    id: model.id,
    employeeId: model.empleadoId,
    employeeName: model.empleadoNombre,
    category: model.categoria,
    categoryLabel: CATEGORY_LABELS[model.categoria] || model.categoria,
    type: model.tipo,
    typeLabel: TYPE_LABELS[model.tipo] || model.tipo,
    startDate: model.fechaInicio,
    endDate: model.fechaFin,
    hours: model.horas,
    justified: model.justificada,
    comments: model.comentarios,
    evidence: model.evidencia,
    status: model.estado,
    statusLabel: STATUS_LABELS[model.estado] || model.estado,
    createdBy: model.creadoPor,
    createdAt: model.creadoEn,
    approvedBy: model.aprobadoPor,
    approvedAt: model.aprobadoEn
})

export const mapIncidenceRequest = (model: IncidenceFormDTO): FormData => {
    const formData = new FormData()

    formData.append('EmpleadoId', String(model.employeeId))
    formData.append('Categoria', model.category)
    formData.append('Tipo', model.type)
    formData.append('FechaInicio', model.startDate)
    if (model.endDate) formData.append('FechaFin', model.endDate)
    if (model.hours) formData.append('Horas', String(model.hours))
    if (model.justified !== undefined) formData.append('Justificada', String(model.justified))
    if (model.comments) formData.append('Comentarios', model.comments)
    if (model.evidence) formData.append('Evidencia', model.evidence[0])

    return formData
}

// Format date for display
export const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

// Format datetime for display
export const formatDateTime = (dateString: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}
