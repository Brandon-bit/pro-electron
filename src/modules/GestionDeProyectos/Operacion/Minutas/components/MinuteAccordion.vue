<script setup lang="ts">
import { defineProps } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import type { MinuteType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'
import { useMinuteActions } from '@/modules/GestionDeProyectos/Operacion/Minutas/composables/useMinuteActions'

const props = defineProps<{
    minute: MinuteType
}>()

const emit = defineEmits<{
    edit: [id: string]
    addAction: [id: string]
    editAction: [minuteId: string, action: any]
    delete: [id: string]
    distribute: [id: string]
}>()

const { getActionStatusColor } = useMinuteActions()

const handleDistribute = () => {
    emit('distribute', props.minute.id)
}
</script>

<template>
    <div class="collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
        <input type="checkbox" class="peer" />
        
        <!-- Trigger del Accordion -->
        <div class="collapse-title">
            <div class="flex items-center justify-between gap-4">
                <!-- Información principal -->
                <div class="flex items-center gap-3 flex-1 min-w-0">
                    <span class="material-symbols-outlined text-primary">description</span>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-base truncate">{{ minute.title }}</h3>
                    </div>
                </div>
                
                <!-- Badges de estado y fecha -->
                <div class="flex items-center gap-2 shrink-0">
                    <span v-if="minute.distributed" class="badge badge-success badge-sm gap-1">
                        <span class="material-symbols-outlined text-xs">send</span>
                        Distribuida
                    </span>
                    <span v-else class="badge badge-warning badge-sm gap-1">
                        <span class="material-symbols-outlined text-xs">schedule</span>
                        Pendiente
                    </span>
                    <div class="flex items-center gap-1 text-sm opacity-70">
                        <span class="material-symbols-outlined text-sm">event</span>
                        <span>{{ minute.date }}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Body del Accordion -->
        <div class="collapse-content">
            <div class="space-y-4 pt-2">
                <!-- Hora -->
                <div class="flex items-center gap-2 text-sm opacity-70">
                    <span class="material-symbols-outlined text-sm">schedule</span>
                    <span>{{ minute.time }}</span>
                </div>

                <!-- Asistentes y Ausentes -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm font-semibold mb-2 flex items-center gap-1">
                            <span class="material-symbols-outlined text-sm">group</span>
                            Asistentes:
                        </p>
                        <div class="flex flex-wrap gap-1">
                            <span 
                                v-for="(att, idx) in minute.attendees" 
                                :key="idx" 
                                class="badge badge-secondary text-xs gap-1"
                            >
                                <span class="material-symbols-outlined text-xs">person</span>
                                {{ att }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Agenda -->
                <div>
                    <p class="text-sm font-semibold mb-1 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">list</span>
                        Agenda:
                    </p>
                    <pre class="text-sm opacity-70 whitespace-pre-wrap font-sans bg-base-200 p-3 rounded-lg">{{ minute.agenda }}</pre>
                </div>

                <!-- Discusión -->
                <div>
                    <p class="text-sm font-semibold mb-1 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">forum</span>
                        Discusión:
                    </p>
                    <p class="text-sm opacity-70 bg-base-200 p-3 rounded-lg">{{ minute.discussion }}</p>
                </div>

                <!-- Decisiones -->
                <div>
                    <p class="text-sm font-semibold mb-1 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">gavel</span>
                        Decisiones:
                    </p>
                    <pre class="text-sm opacity-70 whitespace-pre-wrap font-sans bg-base-200 p-3 rounded-lg">{{ minute.decisions }}</pre>
                </div>

                <!-- Acciones Acordadas -->
                <div v-if="minute.actionItems.length > 0">
                    <p class="text-sm font-semibold mb-2 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">check_box</span>
                        Acciones Acordadas:
                    </p>
                    <div class="space-y-2">
                        <button
                            v-for="action in minute.actionItems" 
                            :key="action.id"
                            type="button"
                            class="flex items-center justify-between p-3 border rounded-lg bg-base-200 hover:bg-base-300 transition-colors cursor-pointer w-full text-left"
                            @click.stop="emit('editAction', minute.id, action)"
                        >
                            <div class="flex-1">
                                <p class="font-medium text-sm">{{ action.description }}</p>
                                <p class="text-xs opacity-70 mt-1">
                                    Responsable: {{ action.responsible }} • Fecha límite: {{ action.dueDate }}
                                </p>
                            </div>
                            <span :class="['badge badge-sm', getActionStatusColor(action.status)]">
                                {{ action.status }}
                            </span>
                        </button>
                    </div>
                </div>

                <!-- Botones de acción -->
                <div class="flex items-center justify-between gap-2 pt-4 border-t">
                    <div class="flex gap-2">
                        <button
                            type="button"
                            class="btn btn-ghost btn-sm"
                            @click.stop="emit('edit', minute.id)"
                            title="Editar minuta"
                        >
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button
                            type="button"
                            class="btn btn-ghost btn-sm text-primary"
                            @click.stop="emit('addAction', minute.id)"
                            title="Agregar acción"
                        >
                            <span class="material-symbols-outlined">add_task</span>
                        </button>
                        <button
                            type="button"
                            class="btn btn-ghost btn-sm text-error"
                            @click.stop="emit('delete', minute.id)"
                            title="Eliminar minuta"
                        >
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                    
                    <BaseButton
                        v-if="!minute.distributed"
                        text="Distribuir"
                        icon="send"
                        variant="primary"
                        class-name="btn-sm"
                        @click="handleDistribute"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.collapse-title {
    padding: 1rem 1.5rem;
}

.collapse-content {
    padding: 0 1.5rem 1rem 1.5rem;
}

/* Animación suave para el accordion */
.collapse:not(.collapse-close) input[type="checkbox"]:checked ~ .collapse-content {
    animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
