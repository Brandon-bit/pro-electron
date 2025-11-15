<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import CreateLessonModal from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/components/CreateLessonModal.vue'
import SearchBar from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/components/SearchBar.vue'
import TrendsAnalysis from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/components/TrendsAnalysis.vue'
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'
import { useLessonActions } from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/composables/useLessonActions'

const lessonStore = useLessonStore()
const { loadLessons, saveLessons } = useLessonActions()

onMounted(() => {
    loadLessons()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Lecciones Aprendidas" 
                subtitle="Base de conocimiento organizacional para mejora continua"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">lightbulb</span>
                </template>
            </BaseTitle>
            <div class="flex gap-2">
                <button @click="saveLessons" class="btn btn-outline gap-2">
                    <span class="material-symbols-outlined">save</span>
                    Guardar
                </button>
                <button @click="lessonStore.openModal()" class="btn btn-primary gap-2">
                    <span class="material-symbols-outlined">add</span>
                    Registrar Lección
                </button>
            </div>
        </div>

        <!-- Search Bar -->
        <SearchBar />

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-boxed bg-base-200">
            <input type="radio" name="lesson_tabs" role="tab" class="tab" aria-label="Lecciones" checked />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4">
                <div class="space-y-4">
                    <div 
                        v-for="lesson in lessonStore.filteredLessons" 
                        :key="lesson.id" 
                        class="card bg-base-100 shadow-xl"
                    >
                        <div class="card-body">
                            <!-- Header -->
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-3 flex-wrap">
                                    <h3 class="card-title text-lg">{{ lesson.project }}</h3>
                                    <span class="badge badge-outline">{{ lesson.phase }}</span>
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
                                    <span class="badge badge-secondary">{{ lesson.category }}</span>
                                </div>
                                <span class="text-sm opacity-70">{{ lesson.date }}</span>
                            </div>

                            <!-- Content -->
                            <div class="space-y-3">
                                <!-- Situación -->
                                <div>
                                    <p class="text-sm font-semibold mb-1">Situación:</p>
                                    <p class="opacity-70">{{ lesson.situation }}</p>
                                </div>

                                <!-- Causa e Impacto -->
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <p class="text-sm font-semibold mb-1">Causa:</p>
                                        <p class="text-sm opacity-70">{{ lesson.cause }}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold mb-1">Impacto:</p>
                                        <p class="text-sm opacity-70">{{ lesson.impact }}</p>
                                    </div>
                                </div>

                                <!-- Lección Aprendida -->
                                <div class="bg-base-200 p-4 rounded-lg">
                                    <p class="text-sm font-semibold mb-1 flex items-center gap-2">
                                        <span class="material-symbols-outlined text-sm">lightbulb</span>
                                        Lección Aprendida:
                                    </p>
                                    <p class="font-medium">{{ lesson.lesson }}</p>
                                </div>

                                <!-- Recomendación -->
                                <div class="bg-info/10 p-4 rounded-lg">
                                    <p class="text-sm font-semibold mb-1">Recomendación:</p>
                                    <p class="text-sm">{{ lesson.recommendation }}</p>
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

                    <!-- Empty State -->
                    <div v-if="lessonStore.filteredLessons.length === 0" class="text-center py-12">
                        <span class="material-symbols-outlined text-6xl opacity-30">search_off</span>
                        <p class="mt-4 text-lg opacity-70">No se encontraron lecciones</p>
                        <p class="text-sm opacity-50">Intenta con otros términos de búsqueda</p>
                    </div>
                </div>
            </div>

            <input type="radio" name="lesson_tabs" role="tab" class="tab" aria-label="Análisis de Tendencias" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4">
                <TrendsAnalysis />
            </div>
        </div>

        <!-- Modal -->
        <CreateLessonModal />
    </div>
</template>
