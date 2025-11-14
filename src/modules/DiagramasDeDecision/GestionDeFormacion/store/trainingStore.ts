import { defineStore } from 'pinia'
import type { CourseType } from '@/modules/DiagramasDeDecision/GestionDeFormacion/types/trainingTypes'

const useTrainingStore = defineStore('training-store', {
    state: () => ({
        courses: [
            {
                id: '1',
                title: 'Fundamentos ERP',
                type: 'video' as const,
                duration: '2 horas',
                enrolled: 45,
                capacity: 50
            },
            {
                id: '2',
                title: 'Módulo Finanzas Avanzado',
                type: 'presencial' as const,
                duration: '4 horas',
                enrolled: 23,
                capacity: 30
            }
        ] as CourseType[],
        createModalId: 'create-course-modal'
    }),
    actions: {
        addCourse(title: string, type: 'video' | 'presencial', duration: string, capacity: number) {
            const newCourse: CourseType = {
                id: Date.now().toString(),
                title,
                type,
                duration,
                enrolled: 0,
                capacity
            }
            this.courses.push(newCourse)
        },
        enrollCourse(courseId: string) {
            const course = this.courses.find(c => c.id === courseId)
            if (course && course.enrolled < course.capacity) {
                course.enrolled++
            }
        }
    },
    getters: {
        availableSpots: (state) => (courseId: string) => {
            const course = state.courses.find(c => c.id === courseId)
            return course ? course.capacity - course.enrolled : 0
        }
    }
})

export default useTrainingStore
