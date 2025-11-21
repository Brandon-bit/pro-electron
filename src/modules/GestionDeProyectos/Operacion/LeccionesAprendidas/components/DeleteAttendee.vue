<script setup lang="ts">
import { computed } from 'vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'

const modalStore = useModalStore()
const lessonStore = useLessonStore()

const attendeeToDelete = computed(() => {
    const userDni = modalStore.modals[lessonStore.attendeeModalId]?.data?.userDni
    return lessonStore.selectedLesson?.attendees.find(a => a.dni === userDni)
})
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <h3 class="font-bold">¿Estás seguro?</h3>
                <div class="text-sm">
                    Esta acción eliminará a
                    <span class="font-semibold">{{ attendeeToDelete?.name }}</span>
                    de la lista de asistentes.
                </div>
            </div>
        </div>
    </div>
</template>
