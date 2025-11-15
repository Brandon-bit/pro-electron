import useBusinessCaseStore from '@/modules/GestionDeProyectos/Operacion/CasoDeNegocio/store/businessCaseStore'
import { showNotification } from '@/utils/toastNotifications'

export const useBusinessActions = () => {
    
    const businessStore = useBusinessCaseStore()

    const loadProjects = () => {
        const storedProjects = localStorage.getItem('projects')
        if (storedProjects) {
            const projects = JSON.parse(storedProjects)
            businessStore.setProjects(projects.map((p: any) => ({
                id: p.id,
                name: p.name
            })))
        } else {
            // Mock projects
            businessStore.setProjects([
                { id: '1', name: 'Proyecto Alpha' },
                { id: '2', name: 'Proyecto Beta' },
                { id: '3', name: 'Proyecto Gamma' }
            ])
        }
    }

    const updateBenefitDistribution = (yearIdx: number, value: string) => {
        const numValue = Number(value) || 0
        const newDist = [...businessStore.benefitDistribution]
        newDist[yearIdx] = numValue
        
        const sum = newDist.reduce((s, v) => s + v, 0)
        if (sum > 100) {
            showNotification('La suma de distribución no puede exceder 100%', 'error')
            return
        }
        
        businessStore.updateBenefitDistribution(yearIdx, numValue)
    }

    const saveBusinessCase = () => {
        if (!businessStore.selectedProject) {
            showNotification('Seleccione un proyecto primero', 'error')
            return
        }

        const data = {
            projectId: businessStore.selectedProject,
            discountRate: businessStore.discountRate,
            benefitDistribution: businessStore.benefitDistribution,
            benefits: businessStore.benefits,
            nonRecurringCosts: businessStore.nonRecurringCosts,
            recurringCosts: businessStore.recurringCosts,
            updatedAt: new Date().toISOString()
        }

        localStorage.setItem(`business_case_${businessStore.selectedProject}`, JSON.stringify(data))
        showNotification('Caso de negocio guardado exitosamente', 'success')
    }

    const loadBusinessCase = (projectId: string) => {
        const stored = localStorage.getItem(`business_case_${projectId}`)
        if (stored) {
            const data = JSON.parse(stored)
            businessStore.setDiscountRate(data.discountRate)
            businessStore.setBenefitDistribution(data.benefitDistribution)
            businessStore.setBenefits(data.benefits)
            businessStore.setNonRecurringCosts(data.nonRecurringCosts)
            businessStore.setRecurringCosts(data.recurringCosts)
        }
    }

    return {
        loadProjects,
        updateBenefitDistribution,
        saveBusinessCase,
        loadBusinessCase
    }
}
