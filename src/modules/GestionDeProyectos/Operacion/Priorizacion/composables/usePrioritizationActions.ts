import type { PrioritizedProjectType } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/types/prioritizationTypes'
import { getPrioritizedProjectsService, updatePrioritizedProjectService } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/services/prioritizationService'
import { mapPrioritizedProject, mapPrioritizedProjectUpdateRequest } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/composables/mappingPrioritizationData'

export const usePrioritizationActions = () => {

    const getPrioritizedProjects = async (): Promise<PrioritizedProjectType[]> => {
        const response = await getPrioritizedProjectsService()
        return response.data.map(mapPrioritizedProject)
    }

    const updatePrioritizedProject = async (project: PrioritizedProjectType): Promise<{ message: string, status: string }> => {
        try {
            const model = mapPrioritizedProjectUpdateRequest(project)
            const response = await updatePrioritizedProjectService(model)
            return {
                message: response.message,
                status: response.success ? "success" : "error"
            }
        } catch (error) {
            console.error('Error al actualizar proyecto:', error)
            return {
                message: 'Error al actualizar el proyecto',
                status: 'error'
            }
        }
    }

    return { 
        getPrioritizedProjects,
        updatePrioritizedProject
    }
}
