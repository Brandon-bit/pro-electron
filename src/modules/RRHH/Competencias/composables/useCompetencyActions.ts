import {
    CompetencyDTO,
    CompetencyFormDTO,
    SelectOptionDTO
} from '@/modules/RRHH/Competencias/types/competencyTypes'
import useCompetencyStore from '@/modules/RRHH/Competencias/store/competencyStore'

export const useCompetencyActions = () => {
    const competencyStore = useCompetencyStore()

    // Mock data for competencies
    const mockCompetencies: CompetencyDTO[] = [
        { id: 1, name: 'Liderazgo', description: 'Capacidad de guiar y motivar equipos hacia objetivos comunes', category: 'leadership', active: true },
        { id: 2, name: 'Comunicación Efectiva', description: 'Habilidad para transmitir ideas de forma clara y persuasiva', category: 'behavioral', active: true },
        { id: 3, name: 'Trabajo en Equipo', description: 'Colaboración efectiva con otros para alcanzar metas compartidas', category: 'behavioral', active: true },
        { id: 4, name: 'Programación', description: 'Conocimientos en lenguajes de programación y desarrollo de software', category: 'technical', active: true },
        { id: 5, name: 'Toma de Decisiones', description: 'Capacidad para analizar situaciones y tomar decisiones acertadas', category: 'leadership', active: true },
        { id: 6, name: 'Análisis de Datos', description: 'Habilidad para interpretar y extraer insights de datos', category: 'technical', active: true }
    ]

    const getCompetencies = async (
        page: number,
        pageSize: number
    ): Promise<{ items: CompetencyDTO[]; total: number }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockCompetencies.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockCompetencies.length
        }
    }

    const getCompetenciesForSelect = async (): Promise<SelectOptionDTO[]> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        // Return only active competencies for select options
        return mockCompetencies
            .filter((comp) => comp.active)
            .map((comp) => ({
                id: comp.id!,
                label: comp.name
            }))
    }

    const createCompetency = async (
        data: CompetencyFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const newCompetency: CompetencyDTO = {
            id: mockCompetencies.length + 1,
            name: data.name,
            description: data.description,
            category: data.category,
            active: data.active
        }

        // Solo mostrar en consola cómo se enviaría al backend
        console.log('POST /api/competencies - Body:', newCompetency)

        return {
            message: 'Competencia creada exitosamente',
            status: 'success',
            data: newCompetency
        }
    }

    const updateCompetency = async (
        data: CompetencyFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const index = mockCompetencies.findIndex((comp) => comp.id === data.id)

        if (index !== -1) {
            const updatedCompetency = {
                ...mockCompetencies[index],
                name: data.name,
                description: data.description,
                category: data.category,
                active: data.active
            }

            // Solo mostrar en consola cómo se enviaría al backend
            console.log(`PUT /api/competencies/${data.id} - Body:`, updatedCompetency)

            return {
                message: 'Competencia actualizada exitosamente',
                status: 'success',
                data: updatedCompetency
            }
        }

        return {
            message: 'Competencia no encontrada',
            status: 'error',
            data: null
        }
    }

    const deleteCompetency = async (): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const id = competencyStore.selectedCompetency?.id

        if (!id) {
            return {
                message: 'ID de competencia no válido',
                status: 'error',
                data: null
            }
        }

        const index = mockCompetencies.findIndex((comp) => comp.id === id)

        if (index !== -1) {
            // Solo mostrar en consola cómo se enviaría al backend
            console.log(`DELETE /api/competencies/${id}`)
            
            return {
                message: 'Competencia eliminada exitosamente',
                status: 'success',
                data: mockCompetencies[index]
            }
        }

        return {
            message: 'Competencia no encontrada',
            status: 'error',
            data: null
        }
    }

    return {
        getCompetencies,
        getCompetenciesForSelect,
        createCompetency,
        updateCompetency,
        deleteCompetency
    }
}
