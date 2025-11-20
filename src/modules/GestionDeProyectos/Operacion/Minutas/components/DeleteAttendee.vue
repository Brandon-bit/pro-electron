<script setup lang="ts">
import { computed } from 'vue'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'

const minuteStore = useMinuteStore()

const modelValue = defineModel<string>({ required: true })

const selectedAttendee = computed(() => {
    if (!minuteStore.selectedMinute || !modelValue.value) return null
    return minuteStore.selectedMinute.attendees.find(a => a.dni === modelValue.value)
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
                    <span class="font-semibold">{{ selectedAttendee?.name }}</span>
                    de la lista de asistentes.
                </div>
            </div>
        </div>
    </div>
</template>
