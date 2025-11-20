<script setup lang="ts">
import { useModalStore } from '@/shared/stores/modal.store'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import type { MinuteType, AgreedActionType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

const props = defineProps<{
    minute: MinuteType
}>()

const modalStore = useModalStore()
const minuteStore = useMinuteStore()

const handleEditMinute = () => {
    minuteStore.setSelectedMinute(props.minute)
    modalStore.open(minuteStore.minuteModalId, {
        title: 'Editar Minuta',
        type: 'UPDATE'
    })
}

const handleDeleteMinute = () => {
    minuteStore.setSelectedMinute(props.minute)
    modalStore.open(minuteStore.minuteModalId, {
        title: 'Eliminar Minuta',
        type: 'DELETE',
        submitText: 'Eliminar'
    })
}

const handleAddAttendee = () => {
    minuteStore.setSelectedMinute(props.minute)
    modalStore.open(minuteStore.attendeeModalId, {
        title: 'Agregar Asistente',
        type: 'CREATE',
        submitText: 'Agregar'
    })
}

const handleDeleteAttendee = (attendeeDni: string) => {
    minuteStore.setSelectedMinute(props.minute)
    // Set the selected user dni in the modal
    modalStore.open(minuteStore.attendeeModalId, {
        title: 'Eliminar Asistente',
        type: 'DELETE',
        submitText: 'Eliminar',
        data: { userDni: attendeeDni }
    })
}

const handleAddAgreedAction = () => {
    minuteStore.setSelectedMinute(props.minute)
    modalStore.open(minuteStore.agreedActionModalId, {
        title: 'Agregar Acción Acordada',
        type: 'CREATE',
        submitText: 'Agregar'
    })
}

const handleEditAgreedAction = (action: AgreedActionType) => {
    minuteStore.setSelectedMinute(props.minute)
    modalStore.open(minuteStore.agreedActionModalId, {
        title: 'Editar Acción Acordada',
        type: 'UPDATE',
        submitText: 'Actualizar',
        data: { action }
    })
}

const handleDeleteAgreedAction = (action: AgreedActionType) => {
    minuteStore.setSelectedMinute(props.minute)
    modalStore.open(minuteStore.agreedActionModalId, {
        title: 'Eliminar Acción Acordada',
        type: 'DELETE',
        submitText: 'Eliminar',
        data: { action }
    })
}

const getStatusBadgeClass = (statusName: string): string => {
    const statusMap: Record<string, string> = {
        'En Tiempo': 'badge-success',
        'Por Vencer': 'badge-warning',
        'Vencida': 'badge-error',
        'Completada': 'badge-info'
    }
    return statusMap[statusName] || 'badge-ghost'
}
</script>

<template>
    <div class="collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
        <input type="checkbox" class="peer" />
        
        <!-- Accordion Header -->
        <div class="collapse-title">
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                    <span class="material-symbols-outlined text-primary">description</span>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-base truncate">{{ minute.name }}</h3>
                    </div>
                </div>
                
                <div class="flex items-center gap-2 shrink-0">
                    <span class="badge badge-sm gap-1">
                        <span class="material-symbols-outlined text-xs">event</span>
                        {{ new Date(minute.date).toLocaleDateString() }}
                    </span>
                </div>
            </div>
        </div>
        
        <!-- Accordion Body -->
        <div class="collapse-content">
            <div class="space-y-4 pt-2">
                <!-- Date and Time -->
                <div class="flex items-center gap-2 text-sm opacity-70">
                    <span class="material-symbols-outlined text-sm">schedule</span>
                    <span>{{ new Date(minute.date).toLocaleString() }}</span>
                </div>

                <!-- Attendees -->
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm font-semibold flex items-center gap-1">
                            <span class="material-symbols-outlined text-sm">group</span>
                            Asistentes:
                        </p>
                        <button
                            type="button"
                            class="btn btn-ghost btn-xs text-primary"
                            @click.stop="handleAddAttendee"
                            title="Agregar asistente"
                        >
                            <span class="material-symbols-outlined text-sm">person_add</span>
                        </button>
                    </div>
                    <div class="flex flex-wrap gap-1">
                        <div
                            v-for="attendee in minute.attendees"
                            :key="attendee.dni"
                            class="badge badge-secondary text-xs gap-1 group relative"
                        >
                            <span class="material-symbols-outlined text-xs">person</span>
                            {{ attendee.name }}
                            <button
                                type="button"
                                class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                @click.stop="handleDeleteAttendee(attendee.dni)"
                                title="Eliminar asistente"
                            >
                                <span class="material-symbols-outlined text-xs">close</span>
                            </button>
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

                <!-- Discussion Points -->
                <div>
                    <p class="text-sm font-semibold mb-1 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">forum</span>
                        Puntos Discutidos:
                    </p>
                    <p class="text-sm opacity-70 bg-base-200 p-3 rounded-lg">{{ minute.discussionPoints }}</p>
                </div>

                <!-- Decisions Made -->
                <div>
                    <p class="text-sm font-semibold mb-1 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">gavel</span>
                        Decisiones Tomadas:
                    </p>
                    <pre class="text-sm opacity-70 whitespace-pre-wrap font-sans bg-base-200 p-3 rounded-lg">{{ minute.decisionsMade }}</pre>
                </div>

                <!-- Agreed Actions -->
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm font-semibold flex items-center gap-1">
                            <span class="material-symbols-outlined text-sm">check_box</span>
                            Acciones Acordadas:
                        </p>
                    </div>
                    <div v-if="minute.agreedActions.length > 0" class="space-y-2">
                        <div
                            v-for="action in minute.agreedActions"
                            :key="action.dni"
                            class="flex items-center justify-between p-3 border rounded-lg bg-base-200 hover:bg-base-300 transition-colors group"
                        >
                            <div class="flex-1 cursor-pointer" @click="handleEditAgreedAction(action)">
                                <p class="font-medium text-sm">{{ action.description }}</p>
                                <p class="text-xs opacity-70 mt-1">
                                    Responsable: {{ action.responsible.name }} • 
                                    Fecha límite: {{ new Date(action.dueDate).toLocaleDateString() }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <span 
                                    :class="['badge badge-sm', getStatusBadgeClass(action.status.name)]"
                                    :style="{ backgroundColor: action.status.color }"
                                >
                                    {{ action.status.name }}
                                </span>
                                <button
                                    type="button"
                                    class="btn btn-ghost btn-xs text-error opacity-0 group-hover:opacity-100 transition-opacity"
                                    @click.stop="handleDeleteAgreedAction(action)"
                                    title="Eliminar acción"
                                >
                                    <span class="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-sm opacity-50 italic">
                        No hay acciones acordadas registradas
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center justify-between gap-2 pt-4 border-t">
                    <div class="flex gap-2">
                        <button
                            type="button"
                            class="btn btn-ghost btn-sm"
                            @click.stop="handleEditMinute"
                            title="Editar minuta"
                        >
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button
                            type="button"
                            class="btn btn-ghost btn-sm text-primary"
                            @click.stop="handleAddAgreedAction"
                            title="Agregar acción"
                        >
                            <span class="material-symbols-outlined">add_task</span>
                        </button>
                        <button
                            type="button"
                            class="btn btn-ghost btn-sm text-error"
                            @click.stop="handleDeleteMinute"
                            title="Eliminar minuta"
                        >
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
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
