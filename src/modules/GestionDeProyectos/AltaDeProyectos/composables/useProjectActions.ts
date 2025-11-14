import type { ProjectResponseType, ProjectFormType, ProjectType } from '@/modules/GestionDeProyectos/AltaDeProyectos/types/projectTypes'
import useProjectStore from '@/modules/GestionDeProyectos/AltaDeProyectos/store/projectStore'
import { createProjectService, deleteProjectService, updateProjectService, getProjectsService, generateFolioService } from '@/modules/GestionDeProyectos/AltaDeProyectos/services/projectService'
import { mapProject, mapProjectRequest } from '@/modules/GestionDeProyectos/AltaDeProyectos/composables/mappingProjectData'

export const useProjectActions = () => {
    
    const projectStore = useProjectStore()

    const getProjects = async (page: number, pageSize: number): Promise<{ items: ProjectType[], total: number }> => {
        const response = await getProjectsService(page, pageSize)
        return {
            items: response.data.items.map(mapProject),
            total: response.data.totalItems
        }
    }

    const createProject = async (data: ProjectFormType): Promise<{ message: string, status: string, data: ProjectResponseType }> => {
        const model = mapProjectRequest(data)
        const response = await createProjectService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editProject = async (data: ProjectFormType): Promise<{ message: string, status: string, data: ProjectResponseType }> => {
        const model = mapProjectRequest(data)
        const id = projectStore.selectedProject.id ?? 0
        const response = await updateProjectService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteProject = async (): Promise<{ message: string, status: string, data: ProjectResponseType }> => {
        let id = projectStore.selectedProject?.id
        if (id == undefined) id = 0
        const response = await deleteProjectService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const generateFolio = async (): Promise<string> => {
        const response = await generateFolioService()
        return response.data.folio
    }

    const saveToLocalStorage = (project: ProjectType) => {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]')
        projects.push(project)
        localStorage.setItem('projects', JSON.stringify(projects))
    }

    return { 
        createProject, 
        editProject, 
        deleteProject, 
        getProjects,
        generateFolio,
        saveToLocalStorage
    }
}
