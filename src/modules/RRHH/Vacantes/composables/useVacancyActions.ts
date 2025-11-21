import { VacancyDTO, VacancyFormDTO, CandidateDTO } from '@/modules/RRHH/Vacantes/types/vacancyTypes'
import { mapVacancyRequest } from '@/modules/RRHH/Vacantes/composables/mappingVacancies'

export const useVacancyActions = () => {
    // Mock data for vacancies
    const mockVacancies: VacancyDTO[] = [
        {
            id: 1,
            title: 'Desarrollador Full Stack Senior',
            description: 'Buscamos un desarrollador full stack con experiencia en Vue.js y Node.js para unirse a nuestro equipo de tecnología.',
            requirements: '5+ años de experiencia, Vue.js, Node.js, TypeScript, PostgreSQL',
            offeredSalary: 45000,
            status: 'abierta',
            publicationDate: '2025-01-15',
            closingDate: '2025-02-28',
            candidatesCount: 12
        },
        {
            id: 2,
            title: 'Reclutador Senior',
            description: 'Profesional en reclutamiento y selección de personal con experiencia en tecnología.',
            requirements: '3+ años de experiencia en RRHH, conocimiento en reclutamiento IT',
            offeredSalary: 30000,
            status: 'abierta',
            publicationDate: '2025-01-10',
            closingDate: '2025-02-15',
            candidatesCount: 8
        },
        {
            id: 3,
            title: 'Diseñador UX/UI',
            description: 'Diseñador con experiencia en interfaces de usuario y experiencia de usuario.',
            requirements: 'Figma, Adobe XD, experiencia en diseño web y mobile',
            offeredSalary: 35000,
            status: 'en_proceso',
            publicationDate: '2025-01-05',
            closingDate: '2025-02-10',
            candidatesCount: 15
        },
        {
            id: 4,
            title: 'Analista de Datos',
            description: 'Analista con experiencia en análisis de datos y visualización.',
            requirements: 'Python, SQL, Power BI, experiencia en análisis estadístico',
            offeredSalary: 32000,
            status: 'cerrada',
            publicationDate: '2024-12-01',
            closingDate: '2025-01-15',
            candidatesCount: 20
        }
    ]

    // Mock candidates data
    const mockCandidates: Record<number, CandidateDTO[]> = {
        1: [
            { id: 1, name: 'Juan Pérez García', email: 'juan.perez@email.com', status: 'En revisión' },
            { id: 2, name: 'María González López', email: 'maria.gonzalez@email.com', status: 'Entrevista' },
            { id: 3, name: 'Carlos Ramírez Torres', email: 'carlos.ramirez@email.com', status: 'Pendiente' },
            { id: 4, name: 'Ana Martínez Flores', email: 'ana.martinez@email.com', status: 'Aprobado' },
            { id: 5, name: 'Luis Hernández Ruiz', email: 'luis.hernandez@email.com', status: 'En revisión' },
            { id: 6, name: 'Sofia Díaz Castro', email: 'sofia.diaz@email.com', status: 'Entrevista' },
            { id: 7, name: 'Miguel Ángel Morales', email: 'miguel.morales@email.com', status: 'Pendiente' },
            { id: 8, name: 'Laura Jiménez Vega', email: 'laura.jimenez@email.com', status: 'Aprobado' },
            { id: 9, name: 'Roberto Sánchez Cruz', email: 'roberto.sanchez@email.com', status: 'En revisión' },
            { id: 10, name: 'Patricia López Mendoza', email: 'patricia.lopez@email.com', status: 'Rechazado' },
            { id: 11, name: 'Fernando Torres Ruiz', email: 'fernando.torres@email.com', status: 'Entrevista' },
            { id: 12, name: 'Gabriela Moreno Silva', email: 'gabriela.moreno@email.com', status: 'Pendiente' }
        ],
        2: [
            { id: 13, name: 'Diego Fernández Ortiz', email: 'diego.fernandez@email.com', status: 'En revisión' },
            { id: 14, name: 'Valeria Castro Pérez', email: 'valeria.castro@email.com', status: 'Entrevista' },
            { id: 15, name: 'Andrés Gutiérrez Ramos', email: 'andres.gutierrez@email.com', status: 'Aprobado' }
        ],
        3: [
            { id: 16, name: 'Carolina Vega Morales', email: 'carolina.vega@email.com', status: 'En revisión' },
            { id: 17, name: 'Ricardo Herrera Luna', email: 'ricardo.herrera@email.com', status: 'Entrevista' }
        ]
    }

    const getVacancies = async (
        page: number,
        pageSize: number
    ): Promise<{ items: VacancyDTO[]; total: number }> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockVacancies.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockVacancies.length
        }
    }

    const getVacancyById = async (id: number): Promise<VacancyFormDTO> => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const vacancy = mockVacancies.find((v) => v.id === id)

        if (!vacancy) {
            throw new Error('Vacancy not found')
        }

        return {
            id: vacancy.id,
            title: vacancy.title,
            description: vacancy.description,
            requirements: vacancy.requirements,
            offeredSalary: vacancy.offeredSalary,
            status: vacancy.status,
            publicationDate: vacancy.publicationDate,
            closingDate: vacancy.closingDate
        }
    }

    const getCandidatesByVacancy = async (vacancyId: number): Promise<CandidateDTO[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return mockCandidates[vacancyId] || []
    }

    const createVacancy = async (
        data: VacancyFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Map frontend data to backend format
        const requestData = mapVacancyRequest(data)
        
        // TODO: Uncomment when backend is ready
        // const response = await axios.post('/api/vacantes', requestData)
        // return response.data

        // Mock implementation
        const newVacancy: VacancyDTO = {
            id: mockVacancies.length + 1,
            title: data.title,
            description: data.description,
            requirements: data.requirements,
            offeredSalary: data.offeredSalary,
            status: data.status,
            publicationDate: data.publicationDate,
            closingDate: data.closingDate,
            candidatesCount: 0
        }

        mockVacancies.push(newVacancy)

        return {
            message: 'Vacante creada exitosamente',
            status: 'success',
            data: newVacancy
        }
    }

    const updateVacancy = async (
        id: number,
        data: VacancyFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Map frontend data to backend format
        const requestData = mapVacancyRequest({ ...data, id })
        
        // TODO: Uncomment when backend is ready
        // const response = await axios.put(`/api/vacantes/${id}`, requestData)
        // return response.data

        // Mock implementation
        const index = mockVacancies.findIndex((vac) => vac.id === id)

        if (index !== -1) {
            mockVacancies[index] = {
                ...mockVacancies[index],
                title: data.title,
                description: data.description,
                requirements: data.requirements,
                offeredSalary: data.offeredSalary,
                status: data.status,
                publicationDate: data.publicationDate,
                closingDate: data.closingDate
            }

            return {
                message: 'Vacante actualizada exitosamente',
                status: 'success',
                data: mockVacancies[index]
            }
        }

        return {
            message: 'Vacante no encontrada',
            status: 'error',
            data: null
        }
    }

    const deleteVacancy = async (id: number): Promise<{ message: string; status: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const index = mockVacancies.findIndex((vac) => vac.id === id)

        if (index !== -1) {
            mockVacancies.splice(index, 1)
            return {
                message: 'Vacante eliminada exitosamente',
                status: 'success'
            }
        }

        return {
            message: 'Vacante no encontrada',
            status: 'error'
        }
    }

    return {
        getVacancies,
        getVacancyById,
        getCandidatesByVacancy,
        createVacancy,
        updateVacancy,
        deleteVacancy
    }
}
