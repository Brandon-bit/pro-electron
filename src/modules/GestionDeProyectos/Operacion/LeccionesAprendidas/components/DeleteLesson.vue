<script setup lang="ts">
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'

const lessonStore = useLessonStore()
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <h3 class="font-bold">¿Estás seguro?</h3>
                <div class="text-sm">
                    Esta acción eliminará permanentemente la lección aprendida y no se podrá recuperar.
                    <br>
                    <span class="font-semibold">Autor: {{ lessonStore.selectedLesson?.author }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
