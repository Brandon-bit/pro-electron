import { defineStore } from 'pinia'
import type { 
    MinuteType, 
    ProjectOptionType, 
    ParticipantType,
    AgreedActionType,
    AgreedActionWithMinuteType
} from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

const useMinuteStore = defineStore('minute-store', {
    state: () => ({
        // Projects
        projectsOptions: [] as ProjectOptionType[],
        selectedProject: null as ProjectOptionType | null,
        
        // Minutes
        minutes: [] as MinuteType[],
        selectedMinute: null as MinuteType | null,
        
        // Participants (cached for selects)
        participants: [] as ParticipantType[],
        
        // Loading & Error
        isLoading: false,
        error: null as string | null,
        
        // Modal IDs
        minuteModalId: 'minute-modal',
        attendeeModalId: 'attendee-modal',
        agreedActionModalId: 'agreed-action-modal',
    }),
    actions: {
        // Projects
        setProjectsOptions(projects: ProjectOptionType[]) {
            this.projectsOptions = projects
        },
        
        setSelectedProject(project: ProjectOptionType | null) {
            this.selectedProject = project
            // Clear minutes when changing project
            this.minutes = []
        },
        
        // Minutes
        setMinutes(minutes: MinuteType[]) {
            this.minutes = minutes
        },
        
        addMinute(minute: MinuteType) {
            this.minutes.push(minute)
        },
        
        updateMinute(dni: string, updatedMinute: Partial<MinuteType>) {
            const index = this.minutes.findIndex(m => m.dni === dni)
            if (index !== -1) {
                this.minutes[index] = { ...this.minutes[index], ...updatedMinute }
            }
        },
        
        deleteMinute(dni: string) {
            const index = this.minutes.findIndex(m => m.dni === dni)
            if (index !== -1) {
                this.minutes.splice(index, 1)
            }
        },
        
        setSelectedMinute(minute: MinuteType | null) {
            this.selectedMinute = minute
        },
        
        clearSelectedMinute() {
            this.selectedMinute = null
        },
        
        // Participants
        setParticipants(participants: ParticipantType[]) {
            this.participants = participants
        },
        
        // Attendees
        addAttendeeToMinute(minuteDni: string, attendee: ParticipantType) {
            const minute = this.minutes.find(m => m.dni === minuteDni)
            if (minute) {
                minute.attendees.push(attendee)
            }
        },
        
        removeAttendeeFromMinute(minuteDni: string, attendeeDni: string) {
            const minute = this.minutes.find(m => m.dni === minuteDni)
            if (minute) {
                minute.attendees = minute.attendees.filter(a => a.dni !== attendeeDni)
            }
        },
        
        // Agreed Actions
        addAgreedActionToMinute(minuteDni: string, action: AgreedActionType) {
            const minute = this.minutes.find(m => m.dni === minuteDni)
            if (minute) {
                minute.agreedActions.push(action)
            }
        },
        
        updateAgreedActionInMinute(minuteDni: string, actionDni: number, updatedAction: Partial<AgreedActionType>) {
            const minute = this.minutes.find(m => m.dni === minuteDni)
            if (minute) {
                const actionIndex = minute.agreedActions.findIndex(a => a.dni === actionDni)
                if (actionIndex !== -1) {
                    minute.agreedActions[actionIndex] = {
                        ...minute.agreedActions[actionIndex],
                        ...updatedAction
                    }
                }
            }
        },
        
        deleteAgreedActionFromMinute(minuteDni: string, actionDni: number) {
            const minute = this.minutes.find(m => m.dni === minuteDni)
            if (minute) {
                minute.agreedActions = minute.agreedActions.filter(a => a.dni !== actionDni)
            }
        },
        
        // Loading & Error
        setLoading(loading: boolean) {
            this.isLoading = loading
        },
        
        setError(error: string | null) {
            this.error = error
        }
    },
    getters: {
        // All agreed actions from all minutes (for table)
        allAgreedActions: (state): AgreedActionWithMinuteType[] => {
            return state.minutes.flatMap(m =>
                m.agreedActions.map(action => ({
                    ...action,
                    minuteName: m.name
                }))
            )
        },
        
        // Pending agreed actions (status not completed)
        pendingAgreedActions: (state): AgreedActionWithMinuteType[] => {
            return state.minutes.flatMap(m =>
                m.agreedActions
                    .filter(action => action.status.name !== 'Completada')
                    .map(action => ({
                        ...action,
                        minuteName: m.name
                    }))
            )
        }
    }
})

export default useMinuteStore
