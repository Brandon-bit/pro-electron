import { defineStore } from 'pinia'
import type { MinuteType, NewMinuteType, ActionItemWithMinute } from '@/modules/GestionDeProyectos/Minutas/types/minuteTypes'

const useMinuteStore = defineStore('minute-store', {
    state: () => ({
        minutes: [
            {
                id: 'MIN001',
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
        isModalOpen: false
    }),
    actions: {
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
        distributeMinute(id: string) {
            const index = this.minutes.findIndex(m => m.id === id)
            if (index !== -1) {
                this.minutes[index].distributed = true
            }
        },
        openModal() {
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
        }
    },
    getters: {
        allActionItems: (state): ActionItemWithMinute[] => {
            return state.minutes.flatMap(m =>
                m.actionItems.map(ai => ({
                    ...ai,
                    minuteId: m.id,
                    minuteTitle: m.title
                }))
            )
        },
        pendingActions: (state): ActionItemWithMinute[] => {
            return state.minutes.flatMap(m =>
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
