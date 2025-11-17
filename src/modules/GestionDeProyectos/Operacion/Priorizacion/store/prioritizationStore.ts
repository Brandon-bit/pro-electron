import { defineStore } from 'pinia'
import type { PrioritizedProjectType } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/types/prioritizationTypes'

const usePrioritizationStore = defineStore('prioritization-store', {
    state: () => ({
        projects: [] as PrioritizedProjectType[]
    }),
    actions: {
        setProjects(projects: PrioritizedProjectType[]) {
            // Ordenar por prioridad
            this.projects = projects.sort((a, b) => a.priority - b.priority)
        },
        updateProject(dni: number, field: keyof PrioritizedProjectType, value: any) {
            const project = this.projects.find(p => p.dni === dni)
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
        }
    },
    getters: {
        topPriorityProject: (state) => state.projects[0] || null
    }
})

export default usePrioritizationStore
