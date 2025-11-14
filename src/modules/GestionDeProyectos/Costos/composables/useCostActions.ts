import { computed } from 'vue'
import type { CostItemType, ProjectCostsType, CostTotalsType, CostCategoryType } from '@/modules/GestionDeProyectos/Costos/types/costTypes'
import useCostStore from '@/modules/GestionDeProyectos/Costos/store/costStore'
import { showNotification } from '@/utils/toastNotifications'

export const useCostActions = () => {
    
    const costStore = useCostStore()

    const loadProjects = () => {
        const projectsData = localStorage.getItem('projects')
        if (projectsData) {
            const projects = JSON.parse(projectsData)
            costStore.setProjects(projects)
        }
    }

    const loadCosts = (projectId: string) => {
        const storedCosts = localStorage.getItem(`costs_${projectId}`)
        const project = costStore.projects.find(p => p.id === projectId)
        
        if (storedCosts) {
            costStore.setCosts(JSON.parse(storedCosts))
        } else {
            // Initialize with project data
            const ganttData = localStorage.getItem(`gantt_${projectId}`)
            const projectCosts: CostItemType[] = []
            
            if (ganttData) {
                const gantt = JSON.parse(ganttData)
                gantt.forEach((stage: any) => {
                    // Add stage
                    projectCosts.push({
                        id: stage.id,
                        concept: stage.name,
                        description: '',
                        plannedCost: 0,
                        plannedDate: '',
                        actualCost: 0,
                        actualDate: '',
                        extraordinaryCost: 0
                    })
                    
                    // Add activities
                    if (stage.activities) {
                        stage.activities.forEach((activity: any) => {
                            projectCosts.push({
                                id: activity.id,
                                concept: `  ${activity.name}`,
                                description: '',
                                plannedCost: 0,
                                plannedDate: '',
                                actualCost: 0,
                                actualDate: '',
                                extraordinaryCost: 0
                            })
                        })
                    }
                })
            }

            // Initialize user costs (mock data)
            const userCosts: CostItemType[] = [
                {
                    id: 'u1',
                    concept: 'Juan Pérez',
                    description: 'Desarrollador Senior',
                    plannedCost: 0,
                    plannedDate: '',
                    actualCost: 0,
                    actualDate: '',
                    extraordinaryCost: 0
                },
                {
                    id: 'u2',
                    concept: 'María García',
                    description: 'Project Manager',
                    plannedCost: 0,
                    plannedDate: '',
                    actualCost: 0,
                    actualDate: '',
                    extraordinaryCost: 0
                }
            ]

            costStore.setCosts({
                projectCosts,
                userCosts,
                otherCosts: [],
                estimatedBudget: project?.estimatedBudget || 0,
                authorizedBudget: 0
            })
        }
    }

    const saveCosts = (updatedCosts: ProjectCostsType) => {
        costStore.setCosts(updatedCosts)
        if (costStore.selectedProject) {
            localStorage.setItem(`costs_${costStore.selectedProject}`, JSON.stringify(updatedCosts))
            showNotification('Costos guardados correctamente', 'success')
        }
    }

    const calculateTotals = computed((): CostTotalsType => {
        const calculateTotal = (items: CostItemType[], field: keyof CostItemType) =>
            items.reduce((sum, item) => sum + (Number(item[field]) || 0), 0)

        const allItems = [
            ...costStore.costs.projectCosts,
            ...costStore.costs.userCosts,
            ...costStore.costs.otherCosts
        ]
        
        const totalPlanned = calculateTotal(allItems, 'plannedCost')
        const totalActual = calculateTotal(allItems, 'actualCost')
        const totalExtraordinary = calculateTotal(allItems, 'extraordinaryCost')
        const totalActualWithExtra = totalActual + totalExtraordinary

        const executionPercentage = totalPlanned > 0 ? (totalActualWithExtra / totalPlanned) * 100 : 0
        const variance = costStore.costs.authorizedBudget - totalPlanned
        const forecast = totalActualWithExtra > 0 && totalActual > 0 
            ? (totalPlanned / totalActual) * totalActualWithExtra 
            : totalPlanned

        return {
            totalPlanned,
            totalActual: totalActualWithExtra,
            executionPercentage,
            variance,
            forecast
        }
    })

    const updateCostItem = (
        category: CostCategoryType,
        id: string,
        field: keyof CostItemType,
        value: any
    ) => {
        const updatedCosts = {
            ...costStore.costs,
            [category]: costStore.costs[category].map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }
        saveCosts(updatedCosts)
    }

    const addOtherCost = () => {
        const newCost: CostItemType = {
            id: `other_${Date.now()}`,
            concept: '',
            description: '',
            plannedCost: 0,
            plannedDate: '',
            actualCost: 0,
            actualDate: '',
            extraordinaryCost: 0
        }
        saveCosts({
            ...costStore.costs,
            otherCosts: [...costStore.costs.otherCosts, newCost]
        })
    }

    const deleteOtherCost = (id: string) => {
        saveCosts({
            ...costStore.costs,
            otherCosts: costStore.costs.otherCosts.filter(item => item.id !== id)
        })
    }

    return {
        loadProjects,
        loadCosts,
        saveCosts,
        calculateTotals,
        updateCostItem,
        addOtherCost,
        deleteOtherCost
    }
}
