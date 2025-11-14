<script setup lang="ts">
import useLessonStore from '@/modules/GestionDeProyectos/LeccionesAprendidas/store/lessonStore'

const lessonStore = useLessonStore()
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title gap-2">
                <span class="material-symbols-outlined">search</span>
                Buscar en Base de Conocimiento
            </h2>
            <input
                v-model="lessonStore.searchTerm"
                type="text"
                class="input input-bordered text-lg"
                placeholder="Buscar por situación, lección, etiquetas, proyecto..."
            />
        </div>
    </div>
</template>
