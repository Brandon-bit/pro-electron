import type { Incidence } from '@/modules/RRHH/Incidencias/types/incidencesTypes'
import { getIncidenceCategoriesService } from '@/modules/RRHH/CategoriaIncidencias/services/incidenceCategoryService'
import { getIncidenceTypesService } from '@/modules/RRHH/TipoIncidencias/services/incidenceTypeService'

// Mock data de incidencias (formato backend - español)
const mockIncidencias: Incidence[] = [
    {
        id: 1,
        empleadoId: 1,
        empleadoNombre: 'Juan Pérez González',
        categoria: 'ASISTENCIA',
        tipo: 'FALTA',
        fechaInicio: '2024-11-15',
        justificada: false,
        comentarios: 'Falta injustificada',
        estado: 'APROBADA',
        creadoPor: 'Admin RH',
        creadoEn: '2024-11-15T08:00:00',
        aprobadoPor: 'Carlos López',
        aprobadoEn: '2024-11-15T10:30:00'
    },
    {
        id: 2,
        empleadoId: 2,
        empleadoNombre: 'María García Rodríguez',
        categoria: 'ASISTENCIA',
        tipo: 'RETARDO',
        fechaInicio: '2024-11-16',
        horas: 1.5,
        justificada: true,
        comentarios: 'Tráfico por accidente en la vía principal',
        estado: 'PENDIENTE',
        creadoPor: 'Admin RH',
        creadoEn: '2024-11-16T09:00:00'
    },
    {
        id: 3,
        empleadoId: 3,
        empleadoNombre: 'Carlos López Martínez',
        categoria: 'INCAPACIDAD',
        tipo: 'INCAPACIDAD_ENFERMEDAD_GENERAL',
        fechaInicio: '2024-11-10',
        fechaFin: '2024-11-14',
        comentarios: 'Gripe estacional con certificado médico',
        evidencia: 'certificado_medico_123.pdf',
        estado: 'APLICADA_NOMINA',
        creadoPor: 'Admin RH',
        creadoEn: '2024-11-10T08:00:00',
        aprobadoPor: 'Director General',
        aprobadoEn: '2024-11-10T11:00:00'
    },
    {
        id: 4,
        empleadoId: 4,
        empleadoNombre: 'Ana Sánchez Torres',
        categoria: 'TIEMPO_EXTRA',
        tipo: 'HORAS_EXTRA',
        fechaInicio: '2024-11-17',
        horas: 3,
        comentarios: 'Cierre de proyecto mensual',
        estado: 'APROBADA',
        creadoPor: 'Gerente Operaciones',
        creadoEn: '2024-11-17T18:00:00',
        aprobadoPor: 'Director General',
        aprobadoEn: '2024-11-18T08:00:00'
    },
    {
        id: 5,
        empleadoId: 5,
        empleadoNombre: 'Luis Hernández Torres',
        categoria: 'ASISTENCIA',
        tipo: 'PERMISO_CON_GOCE',
        fechaInicio: '2024-11-20',
        fechaFin: '2024-11-22',
        comentarios: 'Asuntos personales urgentes',
        estado: 'PENDIENTE',
        creadoPor: 'Luis Hernández',
        creadoEn: '2024-11-18T10:00:00'
    },
    {
        id: 6,
        empleadoId: 6,
        empleadoNombre: 'Patricia Ramírez Flores',
        categoria: 'ASISTENCIA',
        tipo: 'SALIDA_ANTICIPADA',
        fechaInicio: '2024-11-18',
        horas: 2,
        justificada: true,
        comentarios: 'Cita médica programada',
        estado: 'APROBADA',
        creadoPor: 'Admin RH',
        creadoEn: '2024-11-18T14:00:00',
        aprobadoPor: 'Gerente Ventas',
        aprobadoEn: '2024-11-18T14:15:00'
    },
    {
        id: 7,
        empleadoId: 7,
        empleadoNombre: 'Roberto Díaz Morales',
        categoria: 'TIEMPO_EXTRA',
        tipo: 'TRABAJO_DIA_FESTIVO',
        fechaInicio: '2024-11-20',
        horas: 8,
        comentarios: 'Día de la Revolución - Campaña especial',
        estado: 'APROBADA',
        creadoPor: 'Gerente Marketing',
        creadoEn: '2024-11-15T10:00:00',
        aprobadoPor: 'Director General',
        aprobadoEn: '2024-11-15T12:00:00'
    },
    {
        id: 8,
        empleadoId: 8,
        empleadoNombre: 'Laura Jiménez Castro',
        categoria: 'INCAPACIDAD',
        tipo: 'INCAPACIDAD_RIESGO_TRABAJO',
        fechaInicio: '2024-11-12',
        fechaFin: '2024-11-15',
        comentarios: 'Accidente en almacén - lesión en pie',
        evidencia: 'reporte_accidente_456.pdf',
        estado: 'APLICADA_NOMINA',
        creadoPor: 'Admin RH',
        creadoEn: '2024-11-12T11:00:00',
        aprobadoPor: 'Gerente Logística',
        aprobadoEn: '2024-11-12T13:00:00'
    },
    {
        id: 9,
        empleadoId: 1,
        empleadoNombre: 'Juan Pérez González',
        categoria: 'ASISTENCIA',
        tipo: 'RETARDO',
        fechaInicio: '2024-11-18',
        horas: 0.5,
        justificada: false,
        comentarios: '',
        estado: 'RECHAZADA',
        creadoPor: 'Admin RH',
        creadoEn: '2024-11-18T09:00:00',
        aprobadoPor: 'Carlos López',
        aprobadoEn: '2024-11-18T10:00:00'
    },
    {
        id: 10,
        empleadoId: 2,
        empleadoNombre: 'María García Rodríguez',
        categoria: 'ASISTENCIA',
        tipo: 'PERMISO_SIN_GOCE',
        fechaInicio: '2024-11-25',
        fechaFin: '2024-11-26',
        comentarios: 'Viaje familiar',
        estado: 'PENDIENTE',
        creadoPor: 'María García',
        creadoEn: '2024-11-18T11:00:00'
    }
]

let nextId = 11

/**
 * Simula petición GET para obtener incidencias paginadas
 * @param page - Número de página
 * @param pageSize - Tamaño de página
 * @param empleadoId - ID del empleado (opcional)
 */
export const getIncidenciasService = async (
    page: number,
    pageSize: number,
    empleadoId?: number
): Promise<{
    data: { items: Incidence[]; totalItems: number }
    success: boolean
    message: string
}> => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Filtrar por empleado si se especifica
    let filteredIncidencias = empleadoId
        ? mockIncidencias.filter((inc) => inc.empleadoId === empleadoId)
        : mockIncidencias

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredIncidencias.slice(startIndex, endIndex)

    return {
        data: {
            items: paginatedData,
            totalItems: filteredIncidencias.length
        },
        success: true,
        message: 'Incidencias obtenidas exitosamente'
    }
}

/**
 * Simula petición GET para obtener una incidencia por ID
 * @param id - ID de la incidencia
 */
export const getIncidenciaByIdService = async (
    id: number
): Promise<{ data: Incidence; success: boolean; message: string }> => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 200))

    const incidencia = mockIncidencias.find((inc) => inc.id === id)
    if (!incidencia) {
        return {
            data: {} as Incidence,
            success: false,
            message: 'Incidencia no encontrada'
        }
    }

    return {
        data: incidencia,
        success: true,
        message: 'Incidencia obtenida exitosamente'
    }
}

/**
 * Simula petición POST para crear una incidencia
 * @param formData - FormData con los datos de la incidencia
 */
export const createIncidenciaService = async (
    formData: FormData
): Promise<{ data: Incidence; success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const nuevaIncidencia: Incidence = {
        id: nextId++,
        empleadoId: Number(formData.get('EmpleadoId')),
        empleadoNombre: 'Empleado Mock',
        categoria: formData.get('Categoria') as any,
        tipo: formData.get('Tipo') as any,
        fechaInicio: formData.get('FechaInicio') as string,
        fechaFin: formData.get('FechaFin') as string | undefined,
        horas: formData.get('Horas') ? Number(formData.get('Horas')) : undefined,
        justificada: formData.get('Justificada') === 'true',
        comentarios: formData.get('Comentarios') as string | undefined,
        evidencia: formData.get('Evidencia') ? 'archivo_evidencia.pdf' : undefined,
        estado: 'PENDIENTE',
        creadoPor: 'Admin RH',
        creadoEn: new Date().toISOString()
    }

    mockIncidencias.unshift(nuevaIncidencia)

    return {
        data: nuevaIncidencia,
        success: true,
        message: 'Incidencia creada exitosamente'
    }
}

/**
 * Simula petición PUT para actualizar una incidencia
 * @param id - ID de la incidencia
 * @param formData - FormData con los datos actualizados
 */
export const updateIncidenciaService = async (
    id: number,
    formData: FormData
): Promise<{ data: Incidence | null; success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = mockIncidencias.findIndex((inc) => inc.id === id)
    if (index === -1) {
        return {
            data: null,
            success: false,
            message: 'Incidencia no encontrada'
        }
    }

    const incidenciaActualizada: Incidence = {
        ...mockIncidencias[index],
        empleadoId: Number(formData.get('EmpleadoId')),
        categoria: formData.get('Categoria') as any,
        tipo: formData.get('Tipo') as any,
        fechaInicio: formData.get('FechaInicio') as string,
        fechaFin: formData.get('FechaFin') as string | undefined,
        horas: formData.get('Horas') ? Number(formData.get('Horas')) : undefined,
        justificada: formData.get('Justificada') === 'true',
        comentarios: formData.get('Comentarios') as string | undefined,
        evidencia: formData.get('Evidencia')
            ? 'archivo_evidencia.pdf'
            : mockIncidencias[index].evidencia
    }

    mockIncidencias[index] = incidenciaActualizada

    return {
        data: incidenciaActualizada,
        success: true,
        message: 'Incidencia actualizada exitosamente'
    }
}

/**
 * Simula petición DELETE para eliminar una incidencia
 * @param id - ID de la incidencia
 */
export const deleteIncidenciaService = async (
    id: number
): Promise<{ data: null; success: boolean; message: string }> => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = mockIncidencias.findIndex((inc) => inc.id === id)
    if (index === -1) {
        return {
            data: null,
            success: false,
            message: 'Incidencia no encontrada'
        }
    }

    mockIncidencias.splice(index, 1)

    return {
        data: null,
        success: true,
        message: 'Incidencia eliminada exitosamente'
    }
}

/**
 * Obtiene las categorías de incidencias desde el módulo CategoriaIncidencias
 */
export const getCategoriasIncidenciasService = async (): Promise<{
    data: Array<{ id: number; nombre: string }>
    success: boolean
    message: string
}> => {
    try {
        const response = await getIncidenceCategoriesService(1, 100)
        const categorias = response.data.items
            .filter((cat) => cat.activo && !cat.eliminado)
            .map((cat) => ({
                id: cat.id,
                nombre: cat.nombre
            }))

        return {
            data: categorias,
            success: true,
            message: 'Categorías obtenidas exitosamente'
        }
    } catch (error) {
        console.error('Error al obtener categorías:', error)
        return {
            data: [],
            success: false,
            message: 'Error al obtener categorías'
        }
    }
}

/**
 * Obtiene los tipos de incidencias desde el módulo TipoIncidencias
 * @param categoriaId - ID de la categoría para filtrar tipos (opcional)
 */
export const getTiposIncidenciasService = async (
    categoriaId?: number
): Promise<{
    data: Array<{
        id: number
        nombre: string
        idCategoriaPadre: number
        requiereRangoFechas: boolean
        requiereHoras: boolean
        requiereJustificacion: boolean
    }>
    success: boolean
    message: string
}> => {
    try {
        const response = await getIncidenceTypesService(1, 100)
        let tipos = response.data.items
            .filter((tipo) => tipo.activo && !tipo.eliminado)
            .map((tipo) => ({
                id: tipo.id,
                nombre: tipo.nombre,
                idCategoriaPadre: tipo.idCategoriaPadre,
                requiereRangoFechas: tipo.requiereRangoFechas,
                requiereHoras: tipo.requiereHoras,
                requiereJustificacion: tipo.requiereJustificacion
            }))

        // Filtrar por categoría si se especifica
        if (categoriaId) {
            tipos = tipos.filter((tipo) => tipo.idCategoriaPadre === categoriaId)
        }

        return {
            data: tipos,
            success: true,
            message: 'Tipos obtenidos exitosamente'
        }
    } catch (error) {
        console.error('Error al obtener tipos:', error)
        return {
            data: [],
            success: false,
            message: 'Error al obtener tipos'
        }
    }
}
