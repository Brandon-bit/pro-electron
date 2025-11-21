// Backend response type (español)
export type Vacancy = {
    id?: number
    titulo: string
    descripcion: string
    requisitos: string
    salarioOfrecido: number
    estado: string
    fechaPublicacion: string
    fechaCierre: string
    candidatosCount: number
}

// Frontend DTO type (inglés)
export type VacancyDTO = {
    id?: number
    title: string
    description: string
    requirements: string
    offeredSalary: number
    status: string
    publicationDate: string
    closingDate: string
    candidatesCount: number
}

// Form type for create/update
export type VacancyFormDTO = {
    id?: number
    title: string
    description: string
    requirements: string
    offeredSalary: number
    status: string
    publicationDate: string
    closingDate: string
}

// Request type to backend
export type VacancyRequest = {
    id?: number
    titulo: string
    descripcion: string
    requisitos: string
    salarioOfrecido: number
    estado: string
    fechaPublicacion: string
    fechaCierre: string
}

// Select option type for dropdowns
export type SelectOptionDTO = {
    id: number | string
    label: string
}

// Candidate type
export type CandidateDTO = {
    id: number
    name: string
    email: string
    status: string
}
