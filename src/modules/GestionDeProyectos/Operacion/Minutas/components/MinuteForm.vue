<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseUserSelect from '@/shared/components/BaseUserSelect.vue'
import { useUsers } from '@/modules/GestionDeProyectos/Operacion/Minutas/composables/useUsers'

const props = defineProps<{
    attendees: string[]
}>()

const emit = defineEmits<{
    addAttendee: [value: string]
    removeAttendee: [index: number]
}>()

const { users, loadUsers } = useUsers()

const selectedAttendee = ref('')

onMounted(() => {
    loadUsers()
})

const handleAddAttendee = () => {
    if (selectedAttendee.value && !props.attendees.includes(selectedAttendee.value)) {
        emit('addAttendee', selectedAttendee.value)
        selectedAttendee.value = ''
    }
}
</script>

<template>
    <div class="space-y-6">
        <!-- Información básica -->
        <div class="space-y-4">
            <BaseFormInput
                name="title"
                type="text"
                label="Título / Tema de la Reunión"
                placeholder="Ej: Reunión de Seguimiento Semanal - Proyecto X"
                :required="true"
            />

            <div class="grid grid-cols-2 gap-4">
                <BaseFormInput
                    name="date"
                    type="date"
                    label="Fecha"
                    :required="true"
                />
                <BaseFormInput
                    name="time"
                    type="text"
                    label="Hora"
                    placeholder="Ej: 10:00 - 11:00"
                    :required="true"
                />
            </div>
        </div>

        <!-- Asistentes -->
        <div class="border-t pt-4">
            <div class="mb-3">
                <BaseUserSelect
                    v-model="selectedAttendee"
                    :users="users"
                    label="Agregar Asistente"
                    placeholder="Buscar usuario..."
                />
                <BaseButton
                    text="Añadir Asistente"
                    icon="add"
                    variant="primary"
                    class-name="btn-sm mt-2 w-full"
                    :disabled="!selectedAttendee"
                    @click="handleAddAttendee"
                />
            </div>
            
            <div v-if="attendees.length > 0" class="mt-4">
                <p class="text-sm font-semibold mb-2">Asistentes confirmados:</p>
                <div class="flex flex-wrap gap-2">
                    <div 
                        v-for="(att, idx) in attendees" 
                        :key="idx" 
                        class="badge badge-secondary gap-2 py-3"
                    >
                        <span class="material-symbols-outlined text-xs">person</span>
                        {{ att }}
                        <button 
                            @click="emit('removeAttendee', idx)" 
                            type="button"
                            class="btn btn-ghost btn-xs"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Contenido de la reunión -->
        <div class="border-t pt-4 space-y-4">
            <BaseTextArea
                name="agenda"
                label="Agenda"
                class="mb-4"
            />

            <BaseTextArea
                name="discussion"
                label="Puntos Discutidos"
                class="mb-4"
            />

            <BaseTextArea
                name="decisions"
                label="Decisiones Tomadas"
                class="mb-4"
            />
        </div>

    </div>
</template>
