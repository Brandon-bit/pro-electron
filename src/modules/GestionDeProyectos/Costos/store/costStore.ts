import { defineStore } from 'pinia'
import type { ProjectCostsType, ProjectType } from '@/modules/GestionDeProyectos/Costos/types/costTypes'

const useCostStore = defineStore('cost-store', {
    state: () => ({
        selectedProject: '' as string,
        projects: [] as ProjectType[],
        costs: {
            projectCosts: [],
            userCosts: [],
            otherCosts: [],
            estimatedBudget: 0,
            authorizedBudget: 0
        } as ProjectCostsType
    }),
    actions: {
        setSelectedProject(projectId: string) {
            this.selectedProject = projectId
        },
        setProjects(projects: ProjectType[]) {
            this.projects = projects
        },
        setCosts(costs: ProjectCostsType) {
            this.costs = costs
        },
        updateAuthorizedBudget(budget: number) {
            this.costs.authorizedBudget = budget
        }
    },
    getters: {
        selectedProjectData: (state) => {
            return state.projects.find(p => p.id === state.selectedProject)
        }
    }
})

export default useCostStore
