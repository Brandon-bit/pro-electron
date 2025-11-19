import type {
  ProjectResponseType,
  ProjectFormType,
  ProjectType,
  ProjectRequestType,
} from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/types/projectTypes'

/**
 * Maps the API response to the internal ProjectType representation.
 *
 * @param {ProjectResponseType} model - The API response model
 * @returns {ProjectType} The internal project representation
 */
export const mapProjectResponse = (model: ProjectResponseType): ProjectType => {
  // Helper to convert ISO date to input date format (YYYY-MM-DD)
  const toInputDate = (isoString: string): string => {
    if (!isoString) return ''
    return isoString.split('T')[0]
  }

  return {
    name: model.nombre,
    customId: model.dniPersonalizado,
    startDate: toInputDate(model.fechaInicio),
    endDate: toInputDate(model.fechaFin),
    estimatedBudget: model.presupuestoEstimado,
    classificationId: model.dniClasificacion,
    objective: model.objetivo,
    scope: model.alcance,
    leaderId: model.dniLider,
    sponsorId: model.dniSponsor,
    projectManagerId: model.dniProjectManager || '',
    processManagerId: model.dniGestorDeProcesos || '',
    areaId: model.dniArea,
    categoryId: model.dniCategoria,
    adminIds: model.dniAdministradores,
    isSubproject: model.esSubProyecto,
    parentProjectId: model.dniProyectoPadre || null,
    includeSaturday: model.incluirSabados,
    includeSunday: model.incluirDomingos,
    isInvestmentType: model.esTipoInversion,
    useTemplate: model.usarPlantilla,
    templateId: model.dniPlantilla || null,
    useInitiative: model.usarIniciativa,
    initiativeId: model.dniIniciativa || null,
    active: model.activo,
  }
}

/**
 * Maps the form data to the API request format.
 *
 * @param {ProjectFormType} form - The form data
 * @returns {ProjectRequestType} The API request payload
 */
export const mapProjectRequest = (form: ProjectFormType): ProjectRequestType => {
  // Helper function to format dates from input date string to ISO format
  const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    
    // El input date retorna formato "YYYY-MM-DD"
    // Convertir a Date y luego a ISO sin milisegundos: "2025-11-01T00:00:00"
    const dateObj = new Date(dateString)
    
    // Verificar que sea una fecha válida
    if (isNaN(dateObj.getTime())) return ''
    
    return dateObj.toISOString().split('.')[0]
  }

  return {
    nombre: form.name,
    dniPersonalizado: form.customId,
    fechaInicio: formatDate(form.startDate),
    fechaFin: formatDate(form.endDate),
    presupuestoEstimado: form.estimatedBudget,
    dniClasificacion: form.classificationId,
    objetivo: form.objective,
    alcance: form.scope,
    dniLider: form.leaderId,
    dniSponsor: form.sponsorId,
    dniProjectManager: form.projectManagerId || undefined,
    dniGestorDeProcesos: form.processManagerId || undefined,
    dniArea: form.areaId,
    dniCategoria: form.categoryId,
    dniAdministradores: form.adminIds,
    esSubProyecto: form.isSubproject,
    dniProyectoPadre: form.parentProjectId || null,
    incluirSabados: form.includeSaturday,
    incluirDomingos: form.includeSunday,
    esTipoInversion: form.isInvestmentType,
    usarPlantilla: form.useTemplate,
    dniPlantilla: form.templateId || null,
    usarIniciativa: form.useInitiative,
    dniIniciativa: form.initiativeId || null,
    activo: true, // Siempre activo al crear
  }
}
