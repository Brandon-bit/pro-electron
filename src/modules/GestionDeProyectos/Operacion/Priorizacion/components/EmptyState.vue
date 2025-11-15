<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToInitiatives = () => {
    router.push('/gestion-de-proyectos/analisis-de-iniciativas')
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex flex-col items-center justify-center py-12">
                <span class="material-symbols-outlined text-6xl opacity-30 mb-4">description</span>
                <p class="text-center opacity-70 mb-4">
                    No hay proyectos seleccionados. Ve a Análisis de Iniciativas para seleccionar proyectos.
                </p>
                <button class="btn btn-outline" @click="goToInitiatives">
                    <span class="material-symbols-outlined text-sm">arrow_back</span>
                    Ir a Iniciativas
                </button>
            </div>
        </div>
    </div>
</template>
