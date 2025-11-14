<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import CreateMinuteModal from '@/modules/GestionDeProyectos/Minutas/components/CreateMinuteModal.vue'
import ActionsTable from '@/modules/GestionDeProyectos/Minutas/components/ActionsTable.vue'
import useMinuteStore from '@/modules/GestionDeProyectos/Minutas/store/minuteStore'
import { useMinuteActions } from '@/modules/GestionDeProyectos/Minutas/composables/useMinuteActions'

const minuteStore = useMinuteStore()
const { getActionStatusColor, loadMinutes, saveMinutes, handleDistribute } = useMinuteActions()

onMounted(() => {
    loadMinutes()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Minutas" 
                subtitle="Registro de reuniones, decisiones y acciones"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">description</span>
                </template>
            </BaseTitle>
            <div class="flex gap-2">
                <button @click="saveMinutes" class="btn btn-outline gap-2">
                    <span class="material-symbols-outlined">save</span>
                    Guardar
                </button>
                <button @click="minuteStore.openModal()" class="btn btn-primary gap-2">
                    <span class="material-symbols-outlined">add</span>
                    Nueva Minuta
                </button>
            </div>
        </div>

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-boxed bg-base-200">
            <input type="radio" name="minute_tabs" role="tab" class="tab" aria-label="Minutas" checked />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4">
                <div class="space-y-4">
                    <div 
                        v-for="minute in minuteStore.minutes" 
                        :key="minute.id" 
                        class="card bg-base-100 shadow-xl"
                    >
                        <div class="card-body">
                            <!-- Header -->
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-3">
                                    <h3 class="card-title">{{ minute.title }}</h3>
                                    <span v-if="minute.distributed" class="badge badge-outline badge-success gap-2">
                                        <span class="material-symbols-outlined text-sm">send</span>
                                        Distribuida
                                    </span>
                                </div>
                                <div class="flex items-center gap-2 opacity-70">
                                    <span class="material-symbols-outlined">event</span>
                                    <span>{{ minute.date }} • {{ minute.time }}</span>
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="space-y-4">
                                <!-- Asistentes y Ausentes -->
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <p class="text-sm font-semibold mb-1">Asistentes:</p>
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
                                    <div v-if="minute.absentees.length > 0">
                                        <p class="text-sm font-semibold mb-1">Ausentes:</p>
                                        <div class="flex flex-wrap gap-1">
                                            <span 
                                                v-for="(abs, idx) in minute.absentees" 
                                                :key="idx" 
                                                class="badge badge-outline text-xs"
                                            >
                                                {{ abs }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Agenda -->
                                <div>
                                    <p class="text-sm font-semibold mb-1">Agenda:</p>
                                    <pre class="text-sm opacity-70 whitespace-pre-wrap font-sans">{{ minute.agenda }}</pre>
                                </div>

                                <!-- Discusión -->
                                <div>
                                    <p class="text-sm font-semibold mb-1">Discusión:</p>
                                    <p class="text-sm opacity-70">{{ minute.discussion }}</p>
                                </div>

                                <!-- Decisiones -->
                                <div>
                                    <p class="text-sm font-semibold mb-1">Decisiones:</p>
                                    <pre class="text-sm opacity-70 whitespace-pre-wrap font-sans">{{ minute.decisions }}</pre>
                                </div>

                                <!-- Acciones Acordadas -->
                                <div v-if="minute.actionItems.length > 0">
                                    <p class="text-sm font-semibold mb-2">Acciones Acordadas:</p>
                                    <div class="space-y-2">
                                        <div 
                                            v-for="action in minute.actionItems" 
                                            :key="action.id" 
                                            class="flex items-center justify-between p-3 border rounded-lg"
                                        >
                                            <div class="flex-1">
                                                <p class="font-medium">{{ action.description }}</p>
                                                <p class="text-sm opacity-70">
                                                    Responsable: {{ action.responsible }} • Fecha límite: {{ action.dueDate }}
                                                </p>
                                            </div>
                                            <span :class="['badge', getActionStatusColor(action.status)]">
                                                {{ action.status }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Botón Distribuir -->
                                <button 
                                    v-if="!minute.distributed" 
                                    @click="handleDistribute(minute.id)" 
                                    class="btn btn-primary w-full gap-2"
                                >
                                    <span class="material-symbols-outlined">send</span>
                                    Distribuir Minuta por Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input type="radio" name="minute_tabs" role="tab" class="tab" aria-label="Acciones Pendientes" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4">
                <ActionsTable />
            </div>
        </div>

        <!-- Modal -->
        <CreateMinuteModal />
    </div>
</template>
