import { defineStore } from 'pinia'
import type { FMEARowType } from '@/modules/DiagramasDeDecision/FMEA/types/fmeaTypes'

const useFMEAStore = defineStore('fmea-store', {
    state: () => ({
        fmeaData: [
            {
                id: '1',
                failureMode: 'Fallo del servidor principal',
                effect: 'Sistema completamente inoperativo',
                severity: 10,
                occurrence: 3,
                detection: 4,
                rpn: 120,
                recommendedAction: 'Implementar servidor de respaldo automático',
                severityPost: 10,
                occurrencePost: 1,
                detectionPost: 2,
                rpnPost: 20
            },
            {
                id: '2',
                failureMode: 'Error en proceso de aprobación',
                effect: 'Retrasos en entregas',
                severity: 7,
                occurrence: 6,
                detection: 5,
                rpn: 210,
                recommendedAction: 'Automatizar flujo de aprobaciones',
                severityPost: 7,
                occurrencePost: 2,
                detectionPost: 3,
                rpnPost: 42
            }
        ] as FMEARowType[]
    }),
    actions: {
        setFMEAData(data: FMEARowType[]) {
            this.fmeaData = data
        },
        addRow(failureMode: string, effect: string, severity: number, occurrence: number, detection: number) {
            const rpn = severity * occurrence * detection
            const newRow: FMEARowType = {
                id: Date.now().toString(),
                failureMode,
                effect,
                severity,
                occurrence,
                detection,
                rpn,
                recommendedAction: '',
                severityPost: severity,
                occurrencePost: occurrence,
                detectionPost: detection,
                rpnPost: rpn
            }
            this.fmeaData.push(newRow)
            this.sortByRPN()
        },
        updateValue(id: string, field: keyof FMEARowType, value: any) {
            const row = this.fmeaData.find(r => r.id === id)
            if (!row) return

            row[field] = value as never

            // Recalculate RPN if S, O, or D changed
            if (field === 'severity' || field === 'occurrence' || field === 'detection') {
                row.rpn = row.severity * row.occurrence * row.detection
            }

            // Recalculate RPN Post if post values changed
            if (field === 'severityPost' || field === 'occurrencePost' || field === 'detectionPost') {
                row.rpnPost = row.severityPost * row.occurrencePost * row.detectionPost
            }

            this.sortByRPN()
        },
        sortByRPN() {
            this.fmeaData.sort((a, b) => b.rpn - a.rpn)
        }
    }
})

export default useFMEAStore
