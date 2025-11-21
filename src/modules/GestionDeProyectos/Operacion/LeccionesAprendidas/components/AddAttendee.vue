<script setup lang="ts">
import { computed } from 'vue'
import BaseUserSelect from '@/shared/components/BaseUserSelect.vue'
import useLessonStore from '@/modules/GestionDeProyectos/Operacion/LeccionesAprendidas/store/lessonStore'

const lessonStore = useLessonStore()

// Filter out users already added as attendees
const availableParticipants = computed(() => {
    if (!lessonStore.selectedLesson) return lessonStore.participants

    const attendeeDnis = lessonStore.selectedLesson.attendees.map(a => a.dni)
    return lessonStore.participants.filter(p => !attendeeDnis.includes(p.dni))
})
</script>

<template>
    <div class="space-y-4">
        <BaseUserSelect
            name="dniUsuario"
            label="Seleccionar Usuario"
            :users="availableParticipants"
            :required="true"
            placeholder="Buscar usuario para agregar..."
        />

        <div v-if="availableParticipants.length === 0" class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span>Todos los usuarios disponibles ya están agregados como asistentes.</span>
        </div>
    </div>
</template>
