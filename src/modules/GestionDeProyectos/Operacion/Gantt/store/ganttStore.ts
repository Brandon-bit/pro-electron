import { defineStore } from 'pinia'
import type { ProjectGanttType } from '@/modules/GestionDeProyectos/Operacion/Gantt/types/ganttTypes'

// Proyectos de ejemplo
const mockProjects: ProjectGanttType[] = [
    {
        id: 'PROJ-001',
        folio: '00000001',
        name: 'Sistema CRM Empresarial',
        startDate: '2024-01-15',
        endDate: '2024-12-31',
        status: 'ontime',
        stages: 4,
        activities: 12
    },
    {
        id: 'PROJ-002',
        folio: '00000002',
        name: 'Portal Web Corporativo',
        startDate: '2024-02-01',
        endDate: '2024-08-30',
        status: 'delayed',
        stages: 3,
        activities: 9
    },
    {
        id: 'PROJ-003',
        folio: '00000003',
        name: 'App Móvil de Ventas',
        startDate: '2024-03-10',
        endDate: '2024-10-15',
        status: 'controllable',
        stages: 5,
        activities: 15
    },
    {
        id: 'PROJ-004',
        folio: '00000004',
        name: 'Migración a la Nube',
        startDate: '2023-11-01',
        endDate: '2024-05-31',
        status: 'critical',
        stages: 3,
        activities: 8
    },
    {
        id: 'PROJ-005',
        folio: '00000005',
        name: 'Campaña Marketing Digital',
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        status: 'immediate',
        stages: 4,
        activities: 10
    },
    {
        id: 'PROJ-006',
        folio: '00000006',
        name: 'Capacitación Personal',
        startDate: '2023-12-01',
        endDate: '2024-03-31',
        status: 'finished',
        stages: 2,
        activities: 6
    }
]

const useGanttStore = defineStore('gantt-store', {
    state: () => ({
        projects: mockProjects as ProjectGanttType[],
        searchQuery: '',
        selectedProject: null as ProjectGanttType | null
    }),
    actions: {
        setProjects(projects: ProjectGanttType[]) {
            this.projects = projects
        },
        setSearchQuery(query: string) {
            this.searchQuery = query
        },
        setSelectedProject(project: ProjectGanttType | null) {
            this.selectedProject = project
        }
    },
    getters: {
        filteredProjects: (state) => {
            if (!state.searchQuery) return state.projects
            
            const query = state.searchQuery.toLowerCase()
            return state.projects.filter(project => 
                project.id.toLowerCase().includes(query) ||
                project.folio.toLowerCase().includes(query) ||
                project.name.toLowerCase().includes(query)
            )
        }
    }
})

export default useGanttStore
