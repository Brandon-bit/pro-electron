import { defineStore } from 'pinia'
import type { AreaType, CategoryType, ProjectDetailType } from '@/modules/GestionDeProyectos/EstatusFinanciero/types/financialStatusTypes'

const useFinancialStatusStore = defineStore('financial-status-store', {
    state: () => ({
        selectedArea: '' as string,
        areas: [] as AreaType[],
        categories: [] as CategoryType[],
        projectDetails: [] as ProjectDetailType[],
        projectTypeFilter: 'General' as string,
        stageFilter: 'Todas' as string
    }),
    actions: {
        setSelectedArea(areaId: string) {
            this.selectedArea = areaId
        },
        setAreas(areas: AreaType[]) {
            this.areas = areas
        },
        setCategories(categories: CategoryType[]) {
            this.categories = categories
        },
        setProjectDetails(details: ProjectDetailType[]) {
            this.projectDetails = details
        },
        setProjectTypeFilter(filter: string) {
            this.projectTypeFilter = filter
        },
        setStageFilter(filter: string) {
            this.stageFilter = filter
        },
        updateProjectDetail(projectId: string, field: string, value: any) {
            const index = this.projectDetails.findIndex(p => p.projectId === projectId)
            if (index !== -1) {
                this.projectDetails[index] = {
                    ...this.projectDetails[index],
                    [field]: value
                }
            }
        }
    },
    getters: {
        filteredCategories: (state) => {
            if (!state.selectedArea) return []
            return state.categories.filter(cat => cat.areaId === state.selectedArea)
        },
        filteredProjects: (state) => {
            if (!state.selectedArea) return []
            return state.projectDetails.filter(project => project.areaId === state.selectedArea)
        },
        activeProjects: (state) => {
            let filtered = state.projectDetails.filter(p => 
                p.areaId === state.selectedArea && !p.isCompleted
            )
            
            if (state.projectTypeFilter !== 'General') {
                filtered = filtered.filter(p => p.type === state.projectTypeFilter)
            }
            
            if (state.stageFilter !== 'Todas') {
                filtered = filtered.filter(p => p.stage === state.stageFilter)
            }
            
            return filtered
        },
        completedProjects: (state) => {
            return state.projectDetails.filter(p => 
                p.areaId === state.selectedArea && p.isCompleted
            )
        },
        uniqueStages: (state) => {
            const filtered = state.projectDetails.filter(p => p.areaId === state.selectedArea)
            const stages = new Set(filtered.map(p => p.stage))
            return ['Todas', ...Array.from(stages)]
        }
    }
})

export default useFinancialStatusStore
