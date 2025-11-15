import { defineStore } from 'pinia'
import type { LessonLearnedType, NewLessonType } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/types/lessonTypes'

const useLessonStore = defineStore('lesson-store', {
    state: () => ({
        lessons: [
            {
                id: 'LL001',
                project: 'Implementación ERP',
                phase: 'Planificación' as const,
                situation: 'Subestimación del tiempo necesario para mapeo de procesos',
                cause: 'No se consultó a usuarios finales en etapa inicial',
                impact: 'Retraso de 3 semanas en cronograma y necesidad de re-trabajo',
                lesson: 'La participación temprana de usuarios finales es crítica para entender procesos reales',
                recommendation: 'Incluir workshops con usuarios finales en la fase de Discovery antes de diseñar solución',
                category: 'Alcance' as const,
                type: 'Negativa' as const,
                tags: ['gestión-stakeholders', 'planificación', 'requisitos'],
                author: 'Juan Pérez',
                date: '2024-01-15'
            },
            {
                id: 'LL002',
                project: 'Implementación ERP',
                phase: 'Ejecución' as const,
                situation: 'Implementación de ambiente de pruebas paralelo al desarrollo',
                cause: 'Decisión proactiva del equipo técnico',
                impact: 'Detección temprana de conflictos de integración, ahorro de 2 semanas en fase de testing',
                lesson: 'Ambiente de testing temprano permite identificar problemas antes de UAT',
                recommendation: 'Provisionar ambiente de testing desde el inicio del proyecto, no esperar a fase de pruebas',
                category: 'Calidad' as const,
                type: 'Positiva' as const,
                tags: ['testing', 'calidad', 'infraestructura'],
                author: 'María García',
                date: '2024-01-20'
            }
        ] as LessonLearnedType[],
        isModalOpen: false,
        searchTerm: ''
    }),
    actions: {
        setLessons(lessons: LessonLearnedType[]) {
            this.lessons = lessons
        },
        addLesson(newLesson: NewLessonType) {
            const lesson: LessonLearnedType = {
                id: `LL${String(this.lessons.length + 1).padStart(3, '0')}`,
                ...newLesson,
                date: new Date().toISOString().split('T')[0]
            }
            this.lessons.push(lesson)
        },
        setSearchTerm(term: string) {
            this.searchTerm = term
        },
        openModal() {
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
        }
    },
    getters: {
        filteredLessons: (state) => {
            if (!state.searchTerm) return state.lessons
            
            const term = state.searchTerm.toLowerCase()
            return state.lessons.filter(lesson =>
                lesson.situation.toLowerCase().includes(term) ||
                lesson.lesson.toLowerCase().includes(term) ||
                lesson.tags.some(tag => tag.toLowerCase().includes(term)) ||
                lesson.project.toLowerCase().includes(term)
            )
        },
        positiveLessons: (state) => state.lessons.filter(l => l.type === 'Positiva'),
        negativeLessons: (state) => state.lessons.filter(l => l.type === 'Negativa'),
        categoryCount: (state) => {
            const count: Record<string, number> = {}
            state.lessons.forEach(lesson => {
                count[lesson.category] = (count[lesson.category] || 0) + 1
            })
            return count
        },
        allTags: (state) => {
            const tags = new Set(state.lessons.flatMap(l => l.tags))
            return Array.from(tags)
        },
        tagCount: (state) => (tag: string) => {
            return state.lessons.filter(l => l.tags.includes(tag)).length
        }
    }
})

export default useLessonStore
