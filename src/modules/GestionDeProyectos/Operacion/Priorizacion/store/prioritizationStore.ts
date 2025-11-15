import { defineStore } from 'pinia'
import type { PrioritizedProjectType } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/types/prioritizationTypes'

const initialProject: PrioritizedProjectType = {
    id: undefined,
    name: '',
    classification: '',
    strategicAlignment: 0,
    roi: '',
    risks: '',
    resources: '',
    priority: 1,
    active: true
}

// Datos de ejemplo para desarrollo
const mockProjects: PrioritizedProjectType[] = [
    {
        id: 1,
        name: 'Sistema CRM Empresarial',
        classification: 'Estratégico',
        strategicAlignment: 92,
        roi: '35%',
        risks: 'Medio',
        resources: '8 personas',
        priority: 1,
        active: true
    },
    {
        id: 2,
        name: 'Automatización de Procesos',
        classification: 'Operacional',
        strategicAlignment: 85,
        roi: '28%',
        risks: 'Bajo',
        resources: '5 personas',
        priority: 2,
        active: true
    },
    {
        id: 3,
        name: 'Plataforma E-commerce',
        classification: 'Estratégico',
        strategicAlignment: 78,
        roi: '42%',
        risks: 'Alto',
        resources: '12 personas',
        priority: 3,
        active: true
    },
    {
        id: 4,
        name: 'Migración a la Nube',
        classification: 'Infraestructura',
        strategicAlignment: 70,
        roi: '22%',
        risks: 'Medio',
        resources: '6 personas',
        priority: 4,
        active: true
    },
    {
        id: 5,
        name: 'Sistema de Business Intelligence',
        classification: 'Analítico',
        strategicAlignment: 65,
        roi: '18%',
        risks: 'Bajo',
        resources: '4 personas',
        priority: 5,
        active: true
    }
]

const usePrioritizationStore = defineStore('prioritization-store', {
    state: () => ({
        selectedProject: initialProject as PrioritizedProjectType,
        projects: [...mockProjects] as PrioritizedProjectType[],
        draggedIndex: null as number | null,
        modalId: 'prioritization-modal'
    }),
    actions: {
        setData(data: PrioritizedProjectType = initialProject) {
            this.selectedProject = data
        },
        setProjects(projects: PrioritizedProjectType[]) {
            this.projects = projects
        },
        updateProject(id: number, field: keyof PrioritizedProjectType, value: string | number) {
            const project = this.projects.find(p => p.id === id)
            if (project) {
                (project as any)[field] = value
            }
        },
        reorderProjects(fromIndex: number, toIndex: number) {
            const newProjects = [...this.projects]
            const [movedProject] = newProjects.splice(fromIndex, 1)
            newProjects.splice(toIndex, 0, movedProject)
            
            // Actualizar prioridades
            newProjects.forEach((proj, idx) => {
                proj.priority = idx + 1
            })
            
            this.projects = newProjects
        },
        setDraggedIndex(index: number | null) {
            this.draggedIndex = index
        },
        loadFromLocalStorage() {
            const storedProjects = localStorage.getItem('prioritizationProjects')
            if (storedProjects) {
                const parsedProjects = JSON.parse(storedProjects)
                this.projects = parsedProjects.map((proj: any, index: number) => ({
                    id: proj.id,
                    name: proj.name,
                    classification: proj.classification,
                    strategicAlignment: proj.strategicAlignment || 0,
                    roi: '',
                    risks: '',
                    resources: '',
                    priority: index + 1,
                    active: true
                }))
            }
        }
    },
    getters: {
        topPriorityProject: (state) => state.projects[0] || null
    }
})

export default usePrioritizationStore
