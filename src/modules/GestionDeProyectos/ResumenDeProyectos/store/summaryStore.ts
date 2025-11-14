import { defineStore } from 'pinia'
import type { AreaType, ProjectSummaryType } from '@/modules/GestionDeProyectos/ResumenDeProyectos/types/summaryTypes'

const useSummaryStore = defineStore('summary-store', {
    state: () => ({
        areas: [] as AreaType[],
        selectedArea: '' as string,
        projects: [] as ProjectSummaryType[],
        isLoading: false
    }),
    actions: {
        setAreas(areas: AreaType[]) {
            this.areas = areas
        },
        setSelectedArea(areaId: string) {
            this.selectedArea = areaId
        },
        setProjects(projects: ProjectSummaryType[]) {
            this.projects = projects
        },
        setIsLoading(loading: boolean) {
            this.isLoading = loading
        }
    },
    getters: {
        getAreaName: (state) => (areaId: string) => {
            const area = state.areas.find(a => a.id === areaId)
            return area?.name || areaId
        },
        getCategoryName: () => (_areaId: string, categoryName: string) => {
            return categoryName || 'Sin categoría'
        }
    }
})

export default useSummaryStore
