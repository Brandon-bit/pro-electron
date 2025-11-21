import type {
    LessonLearnedResponseType,
    LessonLearnedType,
    AttendeeResponseType,
    AttendeeType,
    ProjectOptionResponseType,
    ProjectOptionType,
    CategoryOptionResponseType,
    CategoryOptionType,
    LessonCategoryResponseType,
    LessonCategoryType
} from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/types/lessonTypes'

export const mapLessonCategoryResponse = (model: LessonCategoryResponseType): LessonCategoryType => {
    return {
        dni: model.dni,
        name: model.nombre,
        description: model.descripcion,
        active: model.activo
    }
}

export const mapAttendeeResponse = (model: AttendeeResponseType): AttendeeType => {
    return {
        dni: model.dni,
        name: model.nombre,
        email: model.correo
    }
}

export const mapLessonResponse = (model: LessonLearnedResponseType): LessonLearnedType => {
    return {
        dni: model.dni,
        projectDni: model.dniProyecto,
        category: mapLessonCategoryResponse(model.categoria),
        projectPhase: model.faseProyecto,
        description: model.descripcion,
        causes: model.causas,
        impact: model.impacto,
        lessonLearned: model.leccionAprendida,
        recommendation: model.recomendacion,
        type: model.tipo,
        author: model.autor,
        tags: model.etiquetas,
        attendees: model.asistentes.map(mapAttendeeResponse),
        active: model.activo
    }
}

export const mapProjectOptionResponse = (model: ProjectOptionResponseType): ProjectOptionType => {
    return {
        dni: model.dni,
        label: model.label
    }
}

export const mapCategoryOptionResponse = (model: CategoryOptionResponseType): CategoryOptionType => {
    return {
        dni: model.dni,
        label: model.label
    }
}
