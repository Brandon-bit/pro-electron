import { computed } from 'vue'
import type { ProjectDetailType, GlobalSummaryType } from '@/modules/GestionDeProyectos/Operacion/EstatusFinanciero/types/financialStatusTypes'
import useFinancialStatusStore from '@/modules/GestionDeProyectos/Operacion/EstatusFinanciero/store/financialStatusStore'
import { showNotification } from '@/utils/toastNotifications'
import * as XLSX from 'xlsx'

export const useFinancialActions = () => {
    
    const financialStore = useFinancialStatusStore()

    const loadData = () => {
        // Load areas and categories
        const loadedAreas = JSON.parse(localStorage.getItem('areas') || '[]')
        const loadedCategories = JSON.parse(localStorage.getItem('categories') || '[]')
        
        financialStore.setAreas(loadedAreas)
        financialStore.setCategories(loadedCategories)

        // Load projects and costs data
        const projects = JSON.parse(localStorage.getItem('projects') || '[]')
        
        const details: ProjectDetailType[] = projects.map((project: any) => {
            const costsKey = `costs_${project.id}`
            const costs = JSON.parse(localStorage.getItem(costsKey) || '{}')
            
            const exercisedAmount = calculateExercisedAmount(costs)
            const contractedAmount = costs.authorizedBudget || 0
            
            return {
                oficio: project.oficio || '',
                projectId: project.folio || project.id,
                name: project.name || '',
                type: project.type || 'Inversión',
                classification: project.classification || '',
                receptionDate: project.receptionDate ? new Date(project.receptionDate) : null,
                stage: project.stage || 'Análisis',
                status: project.currentStage || project.stage || 'Análisis',
                statusDate: project.statusDate ? new Date(project.statusDate) : null,
                estimatedAmountToAward: contractedAmount - exercisedAmount,
                awardedAmount: exercisedAmount,
                awardNoticeDate: project.awardNoticeDate ? new Date(project.awardNoticeDate) : null,
                isCompleted: project.status === 'Completado' || project.progress === 100,
                areaId: project.area,
                categoryId: project.category
            }
        })
        
        financialStore.setProjectDetails(details)
    }

    const calculateExercisedAmount = (costs: any): number => {
        let total = 0
        
        if (costs.projectCosts) {
            costs.projectCosts.forEach((cost: any) => {
                total += cost.actualCost || 0
                total += cost.extraordinaryCost || 0
            })
        }
        
        if (costs.userCosts) {
            costs.userCosts.forEach((cost: any) => {
                total += cost.actualCost || 0
                total += cost.extraordinaryCost || 0
            })
        }
        
        if (costs.otherCosts) {
            costs.otherCosts.forEach((cost: any) => {
                total += cost.actualCost || 0
                total += cost.extraordinaryCost || 0
            })
        }
        
        return total
    }

    const globalSummary = computed((): GlobalSummaryType[] => {
        return financialStore.filteredCategories.map(category => {
            const categoryProjects = financialStore.filteredProjects.filter(
                p => p.categoryId === category.id && !p.isCompleted
            )
            
            // Count projects by stage
            const stagesMap = new Map<string, number>()
            categoryProjects.forEach(project => {
                const stage = project.stage || 'Sin etapa'
                stagesMap.set(stage, (stagesMap.get(stage) || 0) + 1)
            })
            
            const stages = Array.from(stagesMap.entries()).map(([name, count]) => ({ name, count }))
            
            // Calculate totals
            const totalInvestment = categoryProjects.reduce((sum, p) => {
                const costsKey = `costs_${p.projectId}`
                const costs = JSON.parse(localStorage.getItem(costsKey) || '{}')
                return sum + (costs.estimatedBudget || 0)
            }, 0)
            
            const contractedAmount = categoryProjects.reduce((sum, p) => {
                const costsKey = `costs_${p.projectId}`
                const costs = JSON.parse(localStorage.getItem(costsKey) || '{}')
                return sum + (costs.authorizedBudget || 0)
            }, 0)
            
            const exercisedAmount = categoryProjects.reduce((sum, p) => sum + p.awardedAmount, 0)
            
            return {
                category: category.name,
                projectCount: categoryProjects.length,
                stages,
                totalInvestment,
                contractedAmount,
                exercisedAmount,
                toContract: totalInvestment - contractedAmount,
                toExercise: contractedAmount - exercisedAmount
            }
        })
    })

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(value)
    }

    const updateProjectDetail = (projectId: string, field: string, value: any) => {
        financialStore.updateProjectDetail(projectId, field, value)
        
        // Save to localStorage
        const projects = JSON.parse(localStorage.getItem('projects') || '[]')
        const updatedProjects = projects.map((p: any) => {
            if (p.id === projectId || p.folio === projectId) {
                return { ...p, [field]: value }
            }
            return p
        })
        localStorage.setItem('projects', JSON.stringify(updatedProjects))
    }

    const exportToExcel = () => {
        try {
            const wb = XLSX.utils.book_new()
            
            // Sheet 1: Resumen Global
            const summaryData = globalSummary.value.map(row => ({
                'Categoría': row.category,
                'No. Proyectos': row.projectCount,
                'Etapas': row.stages.map(s => `${s.name}: ${s.count}`).join(', '),
                'Inversión Total': row.totalInvestment,
                'Monto Contratado': row.contractedAmount,
                'Monto Ejercido': row.exercisedAmount,
                'Monto por Contratar': row.toContract,
                'Monto por Ejercer': row.toExercise
            }))
            
            const ws1 = XLSX.utils.json_to_sheet(summaryData)
            XLSX.utils.book_append_sheet(wb, ws1, 'Resumen Global')
            
            // Sheet 2: Detalle de la inversión
            const detailData = financialStore.activeProjects.map(project => ({
                'Oficio': project.oficio,
                'ID Proyecto': project.projectId,
                'Nombre': project.name,
                'Tipo': project.type,
                'Clasificación': project.classification,
                'Fecha Recepción': project.receptionDate ? project.receptionDate.toLocaleDateString('es-MX') : '',
                'Etapa': project.stage,
                'Estatus': project.status,
                'Fecha Estatus': project.statusDate ? project.statusDate.toLocaleDateString('es-MX') : '',
                'Importe Est. Por Adjudicar': project.estimatedAmountToAward,
                'Importe Adjudicado': project.awardedAmount,
                'Fecha Fallo': project.awardNoticeDate ? project.awardNoticeDate.toLocaleDateString('es-MX') : ''
            }))
            
            const ws2 = XLSX.utils.json_to_sheet(detailData)
            XLSX.utils.book_append_sheet(wb, ws2, 'Detalle de la inversión')
            
            // Sheet 3: Histórico
            const historicalData = financialStore.completedProjects.map(project => ({
                'Oficio': project.oficio,
                'ID Proyecto': project.projectId,
                'Nombre': project.name,
                'Tipo': project.type,
                'Clasificación': project.classification,
                'Fecha Recepción': project.receptionDate ? project.receptionDate.toLocaleDateString('es-MX') : '',
                'Etapa': project.stage,
                'Estatus': project.status,
                'Fecha Estatus': project.statusDate ? project.statusDate.toLocaleDateString('es-MX') : '',
                'Importe Est. Por Adjudicar': project.estimatedAmountToAward,
                'Importe Adjudicado': project.awardedAmount,
                'Fecha Fallo': project.awardNoticeDate ? project.awardNoticeDate.toLocaleDateString('es-MX') : ''
            }))
            
            const ws3 = XLSX.utils.json_to_sheet(historicalData)
            XLSX.utils.book_append_sheet(wb, ws3, 'Histórico')
            
            // Generate file
            const today = new Date().toLocaleDateString('es-MX').replace(/\//g, '-')
            XLSX.writeFile(wb, `Estatus_Financiero_${today}.xlsx`)
            
            showNotification('Archivo Excel exportado exitosamente', 'success')
        } catch (error) {
            console.error('Error exporting to Excel:', error)
            showNotification('Error al exportar el archivo', 'error')
        }
    }

    return {
        loadData,
        globalSummary,
        formatCurrency,
        updateProjectDetail,
        exportToExcel
    }
}
