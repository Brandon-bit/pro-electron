import {
    Vacancy,
    VacancyDTO,
    VacancyFormDTO,
    VacancyRequest
} from '@/modules/RRHH/Vacantes/types/vacancyTypes'

// Map backend response to frontend DTO
export const mapVacancyDTO = (data: Vacancy): VacancyDTO => ({
    id: data.id,
    title: data.titulo,
    description: data.descripcion,
    requirements: data.requisitos,
    offeredSalary: data.salarioOfrecido,
    status: data.estado,
    publicationDate: data.fechaPublicacion,
    closingDate: data.fechaCierre,
    candidatesCount: data.candidatosCount
})

// Map frontend form to backend request
export const mapVacancyRequest = (data: VacancyFormDTO): VacancyRequest => ({
    id: data.id,
    titulo: data.title,
    descripcion: data.description,
    requisitos: data.requirements,
    salarioOfrecido: data.offeredSalary,
    estado: data.status,
    fechaPublicacion: data.publicationDate,
    fechaCierre: data.closingDate
})
