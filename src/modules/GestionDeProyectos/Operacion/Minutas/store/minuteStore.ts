import { defineStore } from 'pinia'
import type { MinuteType, NewMinuteType, ActionItemWithMinute, ProjectOptionType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

const useMinuteStore = defineStore('minute-store', {
    state: () => ({
        // Projects
        projectsOptions: [] as ProjectOptionType[],
        selectedProject: null as ProjectOptionType | null,
        
        // Minutes
        minutes: [
            {
                id: 'MIN001',
                projectId: 1,
                title: 'Reunión de Kickoff - Proyecto ERP',
                date: '2024-01-20',
                time: '10:00 - 11:30',
                attendees: ['Juan Pérez (PM)', 'María García', 'Carlos López', 'Ana Martínez'],
                absentees: ['Roberto Sánchez'],
                agenda: '1. Presentación del proyecto\n2. Definición de roles y responsabilidades\n3. Revisión del cronograma inicial\n4. Próximos pasos',
                discussion: 'Se presentó el alcance general del proyecto ERP. Se discutió la estrategia de implementación por fases y la importancia de la gestión del cambio.',
                decisions: 'D1: Implementación será en 3 fases\nD2: Sesiones semanales de seguimiento los lunes 9am\nD3: Plan de comunicación será responsabilidad de Ana',
                actionItems: [
                    { id: 'AI001', description: 'Preparar plan detallado de proyecto', responsible: 'Juan Pérez', dueDate: '2024-01-27', status: 'En Progreso' as const },
                    { id: 'AI002', description: 'Identificar stakeholders clave', responsible: 'María García', dueDate: '2024-01-25', status: 'Completada' as const }
                ],
                distributed: true
            }
        ] as MinuteType[],
        
        // Loading & Error
        isLoading: false,
        error: null as string | null,
        
        // Modal
        isModalOpen: false,
        isActionModalOpen: false,
        selectedMinuteId: null as string | null,
        selectedAction: null as any | null,
    }),
    actions: {
        // Projects
        setProjectsOptions(projects: ProjectOptionType[]) {
            this.projectsOptions = projects
        },
        
        setSelectedProject(project: ProjectOptionType | null) {
            this.selectedProject = project
        },
        
        // Minutes
        setMinutes(minutes: MinuteType[]) {
            this.minutes = minutes
        },
        
        addMinute(newMinute: NewMinuteType) {
            const minute: MinuteType = {
                id: `MIN${String(this.minutes.length + 1).padStart(3, '0')}`,
                ...newMinute
            }
            this.minutes.push(minute)
        },
        
        updateMinute(id: string, updatedMinute: Partial<MinuteType>) {
            const index = this.minutes.findIndex(m => m.id === id)
            if (index !== -1) {
                this.minutes[index] = { ...this.minutes[index], ...updatedMinute }
            }
        },
        
        deleteMinute(id: string) {
            const index = this.minutes.findIndex(m => m.id === id)
            if (index !== -1) {
                this.minutes.splice(index, 1)
            }
        },
        
        distributeMinute(id: string) {
            const index = this.minutes.findIndex(m => m.id === id)
            if (index !== -1) {
                this.minutes[index].distributed = true
            }
        },
        
        // Actions
        addActionToMinute(minuteId: string, action: { description: string; responsible: string; dueDate: string }) {
            const minute = this.minutes.find(m => m.id === minuteId)
            if (minute) {
                const newAction = {
                    id: `AI${String(minute.actionItems.length + 1).padStart(3, '0')}`,
                    ...action,
                    status: 'Pendiente' as const
                }
                minute.actionItems.push(newAction)
            }
        },
        
        updateActionInMinute(minuteId: string, actionId: string, updatedAction: { description: string; responsible: string; dueDate: string }) {
            const minute = this.minutes.find(m => m.id === minuteId)
            if (minute) {
                const actionIndex = minute.actionItems.findIndex(a => a.id === actionId)
                if (actionIndex !== -1) {
                    minute.actionItems[actionIndex] = {
                        ...minute.actionItems[actionIndex],
                        ...updatedAction
                    }
                }
            }
        },
        
        // Modal
        openModal() {
            this.isModalOpen = true
        },
        
        closeModal() {
            this.isModalOpen = false
        },
        
        openActionModal(minuteId: string, action: any = null) {
            this.selectedMinuteId = minuteId
            this.selectedAction = action
            this.isActionModalOpen = true
        },
        
        closeActionModal() {
            this.selectedMinuteId = null
            this.selectedAction = null
            this.isActionModalOpen = false
        }
    },
    getters: {
        // Filtrar minutas por proyecto seleccionado
        filteredMinutes: (state): MinuteType[] => {
            if (!state.selectedProject) return []
            return state.minutes.filter(m => m.projectId === state.selectedProject?.dni)
        },
        
        // Todas las acciones del proyecto seleccionado
        allActionItems: (state): ActionItemWithMinute[] => {
            const minutes = state.selectedProject 
                ? state.minutes.filter(m => m.projectId === state.selectedProject?.dni)
                : state.minutes
            
            return minutes.flatMap(m =>
                m.actionItems.map(ai => ({
                    ...ai,
                    minuteId: m.id,
                    minuteTitle: m.title
                }))
            )
        },
        
        // Acciones pendientes del proyecto seleccionado
        pendingActions: (state): ActionItemWithMinute[] => {
            const minutes = state.selectedProject 
                ? state.minutes.filter(m => m.projectId === state.selectedProject?.dni)
                : state.minutes
            
            return minutes.flatMap(m =>
                m.actionItems
                    .filter(ai => ai.status !== 'Completada')
                    .map(ai => ({
                        ...ai,
                        minuteId: m.id,
                        minuteTitle: m.title
                    }))
            )
        }
    }
})

export default useMinuteStore
