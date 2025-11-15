import type { ProjectSummaryType, ProjectStageType } from '@/modules/GestionDeProyectos/Operacion/ResumenDeProyectos/types/summaryTypes'
import useSummaryStore from '@/modules/GestionDeProyectos/Operacion/ResumenDeProyectos/store/summaryStore'
import { showNotification } from '@/utils/toastNotifications'
import * as XLSX from 'xlsx'

export const useSummaryActions = () => {
    
    const summaryStore = useSummaryStore()

    const loadAreas = () => {
        const storedAreas = localStorage.getItem('areas')
        if (storedAreas) {
            summaryStore.setAreas(JSON.parse(storedAreas))
        }
    }

    const loadProjects = async (areaId: string) => {
        if (!areaId) {
            summaryStore.setProjects([])
            return
        }

        summaryStore.setIsLoading(true)
        
        // Simular async data loading
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const storedProjects = localStorage.getItem('projects')
        if (storedProjects) {
            const allProjects = JSON.parse(storedProjects)
            const filteredProjects = allProjects.filter((p: ProjectSummaryType) => p.area === areaId)
            summaryStore.setProjects(filteredProjects)
        } else {
            summaryStore.setProjects([])
        }
        
        summaryStore.setIsLoading(false)
    }

    const getProjectStages = (projectId: string): ProjectStageType[] => {
        const ganttData = localStorage.getItem(`gantt_${projectId}`)
        if (!ganttData) {
            return []
        }

        try {
            const tasks = JSON.parse(ganttData)
            // Get unique parent tasks (stages)
            const stages = tasks
                .filter((task: any) => !task.parentId || task.parentId === '0')
                .map((task: any, index: number) => ({
                    name: task.name,
                    isActive: index === 0 // First stage is active by default
                }))
            
            return stages
        } catch {
            return []
        }
    }

    const formatCurrency = (value: string | number): string => {
        const numValue = typeof value === 'string' ? parseFloat(value) : value
        if (isNaN(numValue)) return '$0.00'
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(numValue)
    }

    const exportToExcel = () => {
        if (summaryStore.projects.length === 0) {
            showNotification('No hay proyectos para exportar', 'error')
            return
        }

        try {
            const areaName = summaryStore.getAreaName(summaryStore.selectedArea)
            
            const data = summaryStore.projects.map(project => {
                const stages = getProjectStages(project.id)
                const stagesText = stages.length > 0 
                    ? stages.map(s => s.name).join(' | ') 
                    : 'Sin etapas definidas'
                
                return {
                    'Proyecto': project.name,
                    'Categoría': summaryStore.getCategoryName(project.area, project.category),
                    'Etapas': stagesText,
                    'Importe Estimado': formatCurrency(project.budget)
                }
            })
            
            const ws = XLSX.utils.json_to_sheet(data)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'Resumen de Proyectos')
            
            const today = new Date().toISOString().split('T')[0]
            XLSX.writeFile(wb, `Resumen_Proyectos_${areaName}_${today}.xlsx`)
            
            showNotification('Archivo Excel generado exitosamente', 'success')
        } catch (error) {
            console.error('Error al exportar:', error)
            showNotification('Error al generar el archivo Excel', 'error')
        }
    }

    return {
        loadAreas,
        loadProjects,
        getProjectStages,
        formatCurrency,
        exportToExcel
    }
}
