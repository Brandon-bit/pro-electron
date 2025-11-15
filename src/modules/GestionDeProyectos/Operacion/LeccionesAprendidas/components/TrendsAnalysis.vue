<script setup lang="ts">
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'

const lessonStore = useLessonStore()
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title gap-2">
                <span class="material-symbols-outlined">trending_up</span>
                Análisis de Tendencias
            </h2>

            <div class="space-y-6">
                <!-- Lecciones por Categoría -->
                <div>
                    <h3 class="font-semibold mb-4">Lecciones por Categoría</h3>
                    <div class="grid grid-cols-3 gap-4">
                        <div 
                            v-for="[category, count] in Object.entries(lessonStore.categoryCount)" 
                            :key="category"
                            class="card bg-base-100 shadow-md"
                        >
                            <div class="card-body items-center text-center">
                                <p class="text-2xl font-bold">{{ count }}</p>
                                <p class="text-sm opacity-70">{{ category }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Distribución Positiva vs Negativa -->
                <div>
                    <h3 class="font-semibold mb-4">Distribución Positiva vs Negativa</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="card bg-base-100 shadow-md">
                            <div class="card-body items-center text-center">
                                <div class="text-3xl font-bold text-success">
                                    {{ lessonStore.positiveLessons.length }}
                                </div>
                                <p class="text-sm opacity-70 mt-1">Lecciones Positivas</p>
                            </div>
                        </div>
                        <div class="card bg-base-100 shadow-md">
                            <div class="card-body items-center text-center">
                                <div class="text-3xl font-bold text-warning">
                                    {{ lessonStore.negativeLessons.length }}
                                </div>
                                <p class="text-sm opacity-70 mt-1">Lecciones Negativas</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Etiquetas Más Frecuentes -->
                <div>
                    <h3 class="font-semibold mb-4">Etiquetas Más Frecuentes</h3>
                    <div class="flex flex-wrap gap-2">
                        <span 
                            v-for="tag in lessonStore.allTags" 
                            :key="tag"
                            class="badge badge-secondary text-sm"
                        >
                            {{ tag }} ({{ lessonStore.tagCount(tag) }})
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
