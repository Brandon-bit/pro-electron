import { defineStore } from 'pinia'
import type { ProjectEvidenceType } from '@/modules/GestionDeProyectos/MatrizDeEvidencias/types/evidenceTypes'

const useEvidenceStore = defineStore('evidence-store', {
    state: () => ({
        projects: [] as ProjectEvidenceType[],
        searchTerm: '',
        selectedProject: null as ProjectEvidenceType | null,
        currentPage: 1,
        itemsPerPage: 25,
        isLoading: false
    }),
    actions: {
        setProjects(projects: ProjectEvidenceType[]) {
            this.projects = projects
        },
        setSearchTerm(term: string) {
            this.searchTerm = term
            this.currentPage = 1
        },
        setSelectedProject(project: ProjectEvidenceType | null) {
            this.selectedProject = project
        },
        setCurrentPage(page: number) {
            this.currentPage = page
        },
        setItemsPerPage(items: number) {
            this.itemsPerPage = items
            this.currentPage = 1
        },
        setIsLoading(loading: boolean) {
            this.isLoading = loading
        }
    },
    getters: {
        filteredProjects: (state) => {
            if (!state.searchTerm) return state.projects
            
            const term = state.searchTerm.toLowerCase()
            return state.projects.filter(project =>
                project.name.toLowerCase().includes(term) ||
                project.folio.toLowerCase().includes(term) ||
                project.stage.toLowerCase().includes(term) ||
                project.status.toLowerCase().includes(term)
            )
        },
        totalPages: (state) => {
            const filtered = state.searchTerm 
                ? state.projects.filter(project => {
                    const term = state.searchTerm.toLowerCase()
                    return project.name.toLowerCase().includes(term) ||
                        project.folio.toLowerCase().includes(term) ||
                        project.stage.toLowerCase().includes(term) ||
                        project.status.toLowerCase().includes(term)
                })
                : state.projects
            return Math.ceil(filtered.length / state.itemsPerPage)
        },
        paginatedProjects: (state) => {
            const filtered = state.searchTerm 
                ? state.projects.filter(project => {
                    const term = state.searchTerm.toLowerCase()
                    return project.name.toLowerCase().includes(term) ||
                        project.folio.toLowerCase().includes(term) ||
                        project.stage.toLowerCase().includes(term) ||
                        project.status.toLowerCase().includes(term)
                })
                : state.projects
            
            const startIndex = (state.currentPage - 1) * state.itemsPerPage
            return filtered.slice(startIndex, startIndex + state.itemsPerPage)
        }
    }
})

export default useEvidenceStore
