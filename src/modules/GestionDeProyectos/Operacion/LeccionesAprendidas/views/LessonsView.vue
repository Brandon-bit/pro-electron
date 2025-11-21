<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import SearchBar from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/components/SearchBar.vue'
import TrendsAnalysis from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/components/TrendsAnalysis.vue'
import LessonModal from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/components/LessonModal.vue'
import AttendeeModal from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/components/AttendeeModal.vue'
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'
import { useLessonActions } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/composables/useLessonActions'
import { useModalStore } from '@/shared/stores/modal.store'

const lessonStore = useLessonStore()
const modalStore = useModalStore()
const { loadProjectOptions, loadLessons, loadParticipants } = useLessonActions()

const activeTab = ref<'lessons' | 'trends'>('lessons')

// Computed for project select options
const projectsOptions = computed(() => 
    lessonStore.projectOptions.map(p => ({
        value: p.dni,
        label: p.label
    }))
)

// Selected project with getter/setter
const selectedProjectDni = computed({
    get: () => lessonStore.selectedProject?.dni || null,
    set: async (value: string | null) => {
        if (value) {
            const project = lessonStore.projectOptions.find(p => p.dni === value)
            lessonStore.setSelectedProject(project || null)
            
            // Load lessons for selected project
            if (project) {
                await loadLessons(project.dni)
            }
        } else {
            lessonStore.setSelectedProject(null)
        }
    }
})

const handleTabChange = (tab: 'lessons' | 'trends') => {
    activeTab.value = tab
}

const handleCreateLesson = () => {
    lessonStore.clearSelectedLesson()
    modalStore.open(lessonStore.lessonModalId, {
        title: 'Nueva Lección Aprendida',
        type: 'CREATE',
        submitText: 'Crear'
    })
}

const handleEditLesson = (lesson: any) => {
    lessonStore.setSelectedLesson(lesson)
    modalStore.open(lessonStore.lessonModalId, {
        title: 'Editar Lección Aprendida',
        type: 'UPDATE',
        submitText: 'Actualizar'
    })
}

const handleDeleteLesson = (lesson: any) => {
    lessonStore.setSelectedLesson(lesson)
    modalStore.open(lessonStore.lessonModalId, {
        title: 'Eliminar Lección Aprendida',
        type: 'DELETE',
        submitText: 'Eliminar'
    })
}

const handleAddAttendee = (lesson: any) => {
    lessonStore.setSelectedLesson(lesson)
    modalStore.open(lessonStore.attendeeModalId, {
        title: 'Agregar Asistente',
        type: 'CREATE',
        submitText: 'Agregar'
    })
}

const handleDeleteAttendee = (lesson: any, userDni: string) => {
    lessonStore.setSelectedLesson(lesson)
    modalStore.open(lessonStore.attendeeModalId, {
        title: 'Eliminar Asistente',
        type: 'DELETE',
        submitText: 'Eliminar',
        data: { userDni }
    })
}

onMounted(async () => {
    // Load initial data
    await loadProjectOptions()
    await loadParticipants()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Lecciones Aprendidas" 
            subtitle="Base de conocimiento organizacional para mejora continua"
        />

        <!-- Project Selector -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title text-lg mb-4">Seleccionar Proyecto</h3>
                <div class="form-control w-full max-w-md">
                    <label class="label">
                        <span class="label-text">Proyecto</span>
                    </label>
                    <select 
                        v-model="selectedProjectDni" 
                        class="select select-bordered w-full"
                        :disabled="lessonStore.isLoading"
                    >
                        <option :value="null">Selecciona un proyecto...</option>
                        <option 
                            v-for="option in projectsOptions" 
                            :key="option.value" 
                            :value="option.value"
                        >
                            {{ option.label }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Loading state -->
        <div v-if="lessonStore.isLoading" class="flex items-center justify-center py-12">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <!-- Empty state: no project selected -->
        <div v-else-if="!lessonStore.selectedProject" class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <span class="material-symbols-outlined text-6xl opacity-30 mb-4">lightbulb</span>
                    <h3 class="text-xl font-semibold mb-2">No hay proyecto seleccionado</h3>
                    <p class="text-sm opacity-70">
                        Selecciona un proyecto para visualizar y gestionar sus lecciones aprendidas
                    </p>
                </div>
            </div>
        </div>

        <!-- Main view with selected project -->
        <template v-else>
            <!-- Action buttons and project name -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">folder_open</span>
                    <span class="font-semibold">{{ lessonStore.selectedProject.label }}</span>
                </div>
                <div class="flex gap-2">
                    <BaseButton
                        text="Nueva Lección"
                        icon="add"
                        variant="primary"
                        @click="handleCreateLesson"
                    />
                </div>
            </div>

            <!-- Search Bar -->
            <SearchBar />

            <!-- Tabs -->
            <div class="tabs tabs-boxed bg-base-200 w-fit">
                <button
                    :class="['tab', { 'tab-active': activeTab === 'lessons' }]"
                    @click="handleTabChange('lessons')"
                >
                    <span class="material-symbols-outlined text-sm mr-2">lightbulb</span>
                    Lecciones
                </button>

                <button
                    :class="['tab', { 'tab-active': activeTab === 'trends' }]"
                    @click="handleTabChange('trends')"
                >
                    <span class="material-symbols-outlined text-sm mr-2">analytics</span>
                    Análisis de Tendencias
                </button>
            </div>

            <!-- Tab: Lessons -->
            <section v-if="activeTab === 'lessons'" class="space-y-4">
                <!-- List of lessons -->
                <div v-if="lessonStore.lessons.length > 0" class="space-y-4">
                    <div 
                        v-for="lesson in lessonStore.filteredLessons" 
                        :key="lesson.dni" 
                        class="card bg-base-100 shadow-xl"
                    >
                        <div class="card-body">
                            <!-- Header -->
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-3 flex-wrap">
                                    <span class="badge badge-outline">{{ lesson.projectPhase }}</span>
                                    <span 
                                        :class="[
                                            'badge gap-1',
                                            lesson.type === 'Positiva' ? 'badge-success' : 'badge-warning'
                                        ]"
                                    >
                                        <span class="material-symbols-outlined text-xs">
                                            {{ lesson.type === 'Positiva' ? 'thumb_up' : 'thumb_down' }}
                                        </span>
                                        {{ lesson.type }}
                                    </span>
                                    <span class="badge badge-secondary">{{ lesson.category.name }}</span>
                                </div>
                                <div class="flex gap-2">
                                    <BaseButton
                                        text=""
                                        icon="edit"
                                        variant="ghost"
                                        class-name="btn-sm"
                                        @click="handleEditLesson(lesson)"
                                    />
                                    <BaseButton
                                        text=""
                                        icon="delete"
                                        variant="ghost"
                                        class-name="btn-sm text-error"
                                        @click="handleDeleteLesson(lesson)"
                                    />
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="space-y-3">
                                <!-- Descripción -->
                                <div>
                                    <p class="text-sm font-semibold mb-1">Descripción:</p>
                                    <p class="opacity-70">{{ lesson.description }}</p>
                                </div>

                                <!-- Causa e Impacto -->
                                <div v-if="lesson.causes || lesson.impact" class="grid grid-cols-2 gap-4">
                                    <div v-if="lesson.causes">
                                        <p class="text-sm font-semibold mb-1">Causa:</p>
                                        <p class="text-sm opacity-70">{{ lesson.causes }}</p>
                                    </div>
                                    <div v-if="lesson.impact">
                                        <p class="text-sm font-semibold mb-1">Impacto:</p>
                                        <p class="text-sm opacity-70">{{ lesson.impact }}</p>
                                    </div>
                                </div>

                                <!-- Lección Aprendida -->
                                <div v-if="lesson.lessonLearned" class="bg-base-200 p-4 rounded-lg">
                                    <p class="text-sm font-semibold mb-1 flex items-center gap-2">
                                        <span class="material-symbols-outlined text-sm">lightbulb</span>
                                        Lección Aprendida:
                                    </p>
                                    <p class="font-medium">{{ lesson.lessonLearned }}</p>
                                </div>

                                <!-- Recomendación -->
                                <div v-if="lesson.recommendation" class="bg-info/10 p-4 rounded-lg">
                                    <p class="text-sm font-semibold mb-1">Recomendación:</p>
                                    <p class="text-sm">{{ lesson.recommendation }}</p>
                                </div>

                                <!-- Asistentes -->
                                <div class="border-t pt-3">
                                    <div class="flex items-center justify-between mb-2">
                                        <p class="text-sm font-semibold">Asistentes:</p>
                                        <BaseButton
                                            text="Agregar"
                                            icon="person_add"
                                            variant="ghost"
                                            class-name="btn-xs"
                                            @click="handleAddAttendee(lesson)"
                                        />
                                    </div>
                                    <div class="flex flex-wrap gap-2">
                                        <div 
                                            v-for="attendee in lesson.attendees" 
                                            :key="attendee.dni"
                                            class="badge badge-outline gap-2"
                                        >
                                            {{ attendee.name }}
                                            <button 
                                                @click="handleDeleteAttendee(lesson, attendee.dni)"
                                                class="btn btn-ghost btn-xs"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <span v-if="lesson.attendees.length === 0" class="text-sm opacity-50">
                                            Sin asistentes
                                        </span>
                                    </div>
                                </div>

                                <!-- Footer con Tags y Autor -->
                                <div class="flex items-center justify-between pt-2 border-t">
                                    <div class="flex flex-wrap gap-1">
                                        <span 
                                            v-for="(tag, idx) in lesson.tags" 
                                            :key="idx"
                                            class="badge badge-outline text-xs"
                                        >
                                            {{ tag }}
                                        </span>
                                    </div>
                                    <span class="text-sm opacity-70">Por: {{ lesson.author }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty State (filtered) -->
                    <div v-if="lessonStore.filteredLessons.length === 0" class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <div class="flex flex-col items-center justify-center py-12 text-center">
                                <span class="material-symbols-outlined text-6xl opacity-30 mb-4">search_off</span>
                                <h3 class="text-xl font-semibold mb-2">No se encontraron lecciones</h3>
                                <p class="text-sm opacity-70">
                                    Intenta con otros términos de búsqueda
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty state: no lessons -->
                <div v-else class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex flex-col items-center justify-center py-12 text-center">
                            <span class="material-symbols-outlined text-6xl opacity-30 mb-4">lightbulb</span>
                            <h3 class="text-xl font-semibold mb-2">No hay lecciones aprendidas registradas</h3>
                            <p class="text-sm opacity-70 mb-4">
                                Comienza creando la primera lección aprendida para este proyecto
                            </p>
                            <BaseButton
                                text="Crear Primera Lección"
                                icon="add"
                                variant="primary"
                                @click="handleCreateLesson"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Tab: Trends Analysis -->
            <section v-else class="space-y-4">
                <TrendsAnalysis />
            </section>
        </template>

        <!-- Modals -->
        <LessonModal />
        <AttendeeModal />
    </div>
</template>

<style scoped>
.tab {
    display: flex;
    align-items: center;
}
</style>
