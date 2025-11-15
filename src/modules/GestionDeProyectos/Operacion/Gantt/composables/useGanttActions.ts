import type { ProjectGanttType, GanttTaskType, StatusType } from '@/modules/GestionDeProyectos/Operacion/Gantt/types/ganttTypes'
import useGanttStore from '@/modules/GestionDeProyectos/Operacion/Gantt/store/ganttStore'
import { useRouter } from 'vue-router'
import * as XLSX from 'xlsx'

export const useGanttActions = () => {
    
    const ganttStore = useGanttStore()
    const router = useRouter()

    const loadProjects = (): ProjectGanttType[] => {
        const savedProjects = localStorage.getItem('projects')
        if (!savedProjects) return []

        const projectsData = JSON.parse(savedProjects)
        const formattedProjects: ProjectGanttType[] = projectsData.map((proj: any, index: number) => {
            // Get Gantt data for this project to count stages and activities
            const ganttData = localStorage.getItem(`gantt_${proj.id}`)
            let stages = 0
            let activities = 0
            
            if (ganttData) {
                const tasks = JSON.parse(ganttData)
                stages = tasks.filter((t: any) => t.level === 1).length
                activities = tasks.filter((t: any) => t.level > 1).length
            }

            // Calculate status based on dates and progress
            const status = calculateProjectStatus(proj, ganttData)

            return {
                id: proj.id || `PROJ-${index + 1}`,
                folio: proj.folio || generateFolio(index),
                name: proj.name || 'Sin nombre',
                startDate: proj.startDate || '',
                endDate: proj.endDate || '',
                status,
                stages,
                activities
            }
        })

        ganttStore.setProjects(formattedProjects)
        return formattedProjects
    }

    const generateFolio = (index: number): string => {
        return String(index + 1).padStart(8, '0')
    }

    const calculateProjectStatus = (project: any, ganttData: string | null): StatusType => {
        if (!project.endDate) return 'ontime'

        const today = new Date()
        const endDate = new Date(project.endDate)
        const startDate = new Date(project.startDate || today)
        
        // Calculate if project is finished
        if (today > endDate) {
            // Check if all tasks are complete (if we have Gantt data)
            if (ganttData) {
                const tasks = JSON.parse(ganttData)
                const allComplete = tasks.every((t: any) => t.progress === 100)
                if (allComplete) return 'finished'
            }
        }

        // Calculate planned vs actual progress
        const totalDuration = endDate.getTime() - startDate.getTime()
        const elapsed = today.getTime() - startDate.getTime()
        const plannedProgress = Math.min((elapsed / totalDuration) * 100, 100)

        // Get actual progress from Gantt data
        let actualProgress = 0
        if (ganttData) {
            const tasks = JSON.parse(ganttData)
            if (tasks.length > 0) {
                actualProgress = tasks.reduce((sum: number, t: any) => sum + (t.progress || 0), 0) / tasks.length
            }
        }

        const progressDiff = plannedProgress - actualProgress

        // Determine status based on progress difference
        if (progressDiff > 30) return 'critical'
        if (progressDiff > 20) return 'immediate'
        if (progressDiff > 10) return 'controllable'
        if (progressDiff > 5) return 'delayed'
        return 'ontime'
    }

    const handleEditGantt = (projectId: string) => {
        router.push(`/gestion-de-proyectos/gantt/${projectId}`)
    }

    const handleExportToExcel = (project: ProjectGanttType) => {
        const ganttData = localStorage.getItem(`gantt_${project.id}`)
        let tasks: GanttTaskType[] = []
        
        if (ganttData) {
            tasks = JSON.parse(ganttData)
        }

        const exportData = tasks.map((task: GanttTaskType) => ({
            'Nombre Tarea': task.name,
            'Fecha Inicio': task.startDate,
            'Fecha Fin': task.endDate,
            'Duración': task.duration,
            'Responsable': task.responsible,
            'Dependencias': task.dependencies.join(', '),
            'Progreso': `${task.progress || 0}%`
        }))

        const ws = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Gantt')

        XLSX.writeFile(wb, `Gantt_${project.name}_${project.folio}.xlsx`)
    }

    const getProjects = async (page: number, pageSize: number): Promise<{ items: ProjectGanttType[]; total: number }> => {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const allProjects = ganttStore.projects
        const filteredProjects = ganttStore.filteredProjects
        
        // Si hay búsqueda, usar los proyectos filtrados
        const projectsToUse = ganttStore.searchQuery ? filteredProjects : allProjects
        
        // Calcular paginación
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedProjects = projectsToUse.slice(start, end)
        
        return {
            items: paginatedProjects,
            total: projectsToUse.length
        }
    }

    return { 
        loadProjects,
        getProjects,
        handleEditGantt,
        handleExportToExcel,
        calculateProjectStatus
    }
}
