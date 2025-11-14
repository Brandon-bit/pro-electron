import type { EDTNodeType, GanttTaskType } from '@/modules/GestionDeProyectos/EDTDelProyecto/types/edtTypes'
import useEDTStore from '@/modules/GestionDeProyectos/EDTDelProyecto/store/edtStore'
import { getEDTNodesService, saveEDTTreeService } from '@/modules/GestionDeProyectos/EDTDelProyecto/services/edtService'
import { useRouter } from 'vue-router'

export const useEDTActions = () => {
    
    const edtStore = useEDTStore()
    const router = useRouter()

    const getEDTNodes = async (projectId: number): Promise<EDTNodeType[]> => {
        const response = await getEDTNodesService(projectId)
        return response.data.map(node => ({
            id: node.id.toString(),
            name: node.nombre,
            level: node.nivel,
            children: [],
            parentId: node.padreId ? node.padreId.toString() : null
        }))
    }

    const saveEDTTree = async (projectId: number, tree: EDTNodeType): Promise<{ message: string, status: string }> => {
        const response = await saveEDTTreeService(projectId, tree)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    const generateGantt = () => {
        if (!edtStore.edtRoot) {
            return { success: false, message: 'No hay estructura EDT para generar el Gantt' }
        }

        // Convertir EDT a tareas
        const tasks: GanttTaskType[] = []
        let taskId = 1

        const traverseTree = (node: EDTNodeType, parentTaskId: number | null = null) => {
            const task: GanttTaskType = {
                id: taskId++,
                name: node.name,
                level: node.level,
                parentId: parentTaskId,
                startDate: null,
                endDate: null,
                duration: 1,
                dependencies: [],
                responsible: ''
            }
            tasks.push(task)

            const currentTaskId = task.id
            node.children.forEach(child => traverseTree(child, currentTaskId))
        }

        traverseTree(edtStore.edtRoot)
        localStorage.setItem('ganttTasks', JSON.stringify(tasks))
        localStorage.setItem('ganttProject', JSON.stringify(edtStore.selectedProject))
        
        router.push('/gestion-de-proyectos/diagrama-de-gantt')
        
        return { success: true, message: 'Diagrama de Gantt generado' }
    }

    return { 
        getEDTNodes,
        saveEDTTree,
        generateGantt
    }
}
