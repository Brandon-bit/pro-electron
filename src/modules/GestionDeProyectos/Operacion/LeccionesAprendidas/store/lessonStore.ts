import { defineStore } from 'pinia'
import type {
    LessonLearnedType,
    ProjectOptionType,
    CategoryOptionType,
    AttendeeType
} from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/types/lessonTypes'

const useLessonStore = defineStore('lesson-store', {
    state: () => ({
        lessons: [] as LessonLearnedType[],
        projectOptions: [] as ProjectOptionType[],
        categoryOptions: [] as CategoryOptionType[],
        participants: [] as AttendeeType[],
        selectedProject: null as ProjectOptionType | null,
        selectedLesson: null as LessonLearnedType | null,
        isLoading: false,
        searchTerm: '',
        
        // Modal IDs
        lessonModalId: 'lesson-modal',
        attendeeModalId: 'lesson-attendee-modal'
    }),
    actions: {
        setLessons(lessons: LessonLearnedType[]) {
            this.lessons = lessons
        },
        setProjectOptions(options: ProjectOptionType[]) {
            this.projectOptions = options
        },
        setCategoryOptions(options: CategoryOptionType[]) {
            this.categoryOptions = options
        },
        setParticipants(participants: AttendeeType[]) {
            this.participants = participants
        },
        setSelectedProject(project: ProjectOptionType | null) {
            this.selectedProject = project
            // Clear lessons when project changes
            if (!project) {
                this.lessons = []
            }
        },
        setSelectedLesson(lesson: LessonLearnedType | null) {
            this.selectedLesson = lesson
        },
        clearSelectedLesson() {
            this.selectedLesson = null
        },
        setSearchTerm(term: string) {
            this.searchTerm = term
        },
        setLoading(loading: boolean) {
            this.isLoading = loading
        }
    },
    getters: {
        filteredLessons: (state) => {
            if (!state.searchTerm) return state.lessons
            
            const term = state.searchTerm.toLowerCase()
            return state.lessons.filter(lesson =>
                lesson.description.toLowerCase().includes(term) ||
                lesson.lessonLearned.toLowerCase().includes(term) ||
                lesson.tags.some(tag => tag.toLowerCase().includes(term)) ||
                lesson.author.toLowerCase().includes(term) ||
                lesson.category.name.toLowerCase().includes(term)
            )
        },
        positiveLessons: (state) => state.lessons.filter(l => l.type === 'Positiva'),
        negativeLessons: (state) => state.lessons.filter(l => l.type === 'Negativa'),
        categoryCount: (state) => {
            const count: Record<string, number> = {}
            state.lessons.forEach(lesson => {
                count[lesson.category.name] = (count[lesson.category.name] || 0) + 1
            })
            return count
        },
        phaseCount: (state) => {
            const count: Record<string, number> = {}
            state.lessons.forEach(lesson => {
                count[lesson.projectPhase] = (count[lesson.projectPhase] || 0) + 1
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
