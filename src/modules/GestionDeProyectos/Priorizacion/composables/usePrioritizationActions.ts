import type { PrioritizedProjectResponseType, PrioritizedProjectFormType, PrioritizedProjectType } from '@/modules/GestionDeProyectos/Priorizacion/types/prioritizationTypes'
import usePrioritizationStore from '@/modules/GestionDeProyectos/Priorizacion/store/prioritizationStore'
import { createPrioritizedProjectService, deletePrioritizedProjectService, updatePrioritizedProjectService, getPrioritizedProjectsService, updatePrioritiesService } from '@/modules/GestionDeProyectos/Priorizacion/services/prioritizationService'
import { mapPrioritizedProject, mapPrioritizedProjectRequest } from '@/modules/GestionDeProyectos/Priorizacion/composables/mappingPrioritizationData'

export const usePrioritizationActions = () => {
    
    const prioritizationStore = usePrioritizationStore()

    const getPrioritizedProjects = async (page: number, pageSize: number): Promise<{ items: PrioritizedProjectType[], total: number }> => {
        const response = await getPrioritizedProjectsService(page, pageSize)
        return {
            items: response.data.items.map(mapPrioritizedProject),
            total: response.data.totalItems
        }
    }

    const createPrioritizedProject = async (data: PrioritizedProjectFormType): Promise<{ message: string, status: string, data: PrioritizedProjectResponseType }> => {
        const model = mapPrioritizedProjectRequest(data)
        const response = await createPrioritizedProjectService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editPrioritizedProject = async (data: PrioritizedProjectFormType): Promise<{ message: string, status: string, data: PrioritizedProjectResponseType }> => {
        const model = mapPrioritizedProjectRequest(data)
        const id = prioritizationStore.selectedProject.id ?? 0
        const response = await updatePrioritizedProjectService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deletePrioritizedProject = async (): Promise<{ message: string, status: string, data: PrioritizedProjectResponseType }> => {
        let id = prioritizationStore.selectedProject?.id
        if (id == undefined) id = 0
        const response = await deletePrioritizedProjectService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const updatePriorities = async (projects: PrioritizedProjectType[]): Promise<{ message: string, status: string }> => {
        const projectsData = projects.map(p => ({
            Id: p.id,
            Prioridad: p.priority
        }))
        const response = await updatePrioritiesService(projectsData)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    const generateEDT = (project: PrioritizedProjectType) => {
        localStorage.setItem('edtProject', JSON.stringify(project))
    }

    return { 
        createPrioritizedProject, 
        editPrioritizedProject, 
        deletePrioritizedProject, 
        getPrioritizedProjects,
        updatePriorities,
        generateEDT
    }
}
