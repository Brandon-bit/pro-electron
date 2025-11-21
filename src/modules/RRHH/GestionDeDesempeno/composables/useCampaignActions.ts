import {
    CampaignDTO,
    CampaignFormDTO,
    SelectOptionDTO
} from '@/modules/RRHH/GestionDeDesempeno/types/campaignTypes'
import { useCompetencyActions } from '@/modules/RRHH/Competencias/composables/useCompetencyActions'

export const useCampaignActions = () => {
    // Mock data for campaigns
    const mockCampaigns: CampaignDTO[] = [
        {
            id: 1,
            name: 'Evaluación Anual 2024',
            description: 'Evaluación de desempeño anual para todos los empleados',
            evaluationType: '360',
            startDate: '2024-01-15',
            endDate: '2024-02-15',
            departments: [1, 2],
            employees: [],
            competencies: [1, 2, 3],
            includeAllEmployees: true,
            active: true
        },
        {
            id: 2,
            name: 'Evaluación de Competencias Q1',
            description: 'Evaluación trimestral de competencias técnicas',
            evaluationType: 'competencies',
            startDate: '2024-03-01',
            endDate: '2024-03-31',
            departments: [2],
            employees: [],
            competencies: [4, 6],
            includeAllEmployees: false,
            active: true
        },
        {
            id: 3,
            name: 'Evaluación de Liderazgo',
            description: 'Evaluación específica para posiciones de liderazgo',
            evaluationType: 'performance',
            startDate: '2024-04-01',
            endDate: '2024-04-30',
            departments: [1],
            employees: [],
            competencies: [1, 5],
            includeAllEmployees: false,
            active: false
        }
    ]

    const getCampaigns = async (
        page: number,
        pageSize: number
    ): Promise<{ items: CampaignDTO[]; total: number }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockCampaigns.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockCampaigns.length
        }
    }

    const getCampaignById = async (id: number): Promise<CampaignFormDTO | null> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        const campaign = mockCampaigns.find((c) => c.id === id)
        return campaign || null
    }

    const createCampaign = async (
        data: CampaignFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const newCampaign: CampaignDTO = {
            id: mockCampaigns.length + 1,
            ...data
        }

        mockCampaigns.push(newCampaign)

        console.log('CREATE Campaign:', newCampaign)

        return {
            message: 'Campaña creada exitosamente',
            status: 'success',
            data: newCampaign
        }
    }

    const updateCampaign = async (
        id: number,
        data: CampaignFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const index = mockCampaigns.findIndex((c) => c.id === id)

        if (index !== -1) {
            mockCampaigns[index] = {
                ...mockCampaigns[index],
                ...data
            }

            console.log('UPDATE Campaign:', mockCampaigns[index])

            return {
                message: 'Campaña actualizada exitosamente',
                status: 'success',
                data: mockCampaigns[index]
            }
        }

        return {
            message: 'Campaña no encontrada',
            status: 'error',
            data: null
        }
    }

    const deleteCampaign = async (
        id: number
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const index = mockCampaigns.findIndex((c) => c.id === id)

        if (index !== -1) {
            const deleted = mockCampaigns.splice(index, 1)
            console.log('DELETE Campaign:', deleted[0])
            return {
                message: 'Campaña eliminada exitosamente',
                status: 'success',
                data: deleted[0]
            }
        }

        return {
            message: 'Campaña no encontrada',
            status: 'error',
            data: null
        }
    }

    const getEvaluationTypes = (): Array<{ id: string; label: string }> => {
        return [
            { id: '360', label: 'Evaluación 360°' },
            { id: 'performance', label: 'Evaluación de Desempeño' },
            { id: 'competencies', label: 'Evaluación de Competencias' }
        ]
    }

    const getCompetenciesForSelect = async (): Promise<SelectOptionDTO[]> => {
        // Use the competencies from the Competencias module
        const { getCompetenciesForSelect } = useCompetencyActions()
        return await getCompetenciesForSelect()
    }

    return {
        getCampaigns,
        getCampaignById,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        getEvaluationTypes,
        getCompetenciesForSelect
    }
}
