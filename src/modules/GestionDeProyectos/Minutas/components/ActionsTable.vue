<script setup lang="ts">
import useMinuteStore from '@/modules/GestionDeProyectos/Minutas/store/minuteStore'
import { useMinuteActions } from '@/modules/GestionDeProyectos/Minutas/composables/useMinuteActions'

const minuteStore = useMinuteStore()
const { getActionStatusColor } = useMinuteActions()
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Listado de Pendientes (Action Items)</h2>
            
            <div class="overflow-x-auto">
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Acción</th>
                            <th>Minuta Origen</th>
                            <th>Responsable</th>
                            <th>Fecha Límite</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="action in minuteStore.allActionItems" :key="`${action.minuteId}-${action.id}`">
                            <td class="font-medium">{{ action.id }}</td>
                            <td class="max-w-xs">{{ action.description }}</td>
                            <td class="text-sm opacity-70">{{ action.minuteTitle }}</td>
                            <td>{{ action.responsible }}</td>
                            <td>{{ action.dueDate }}</td>
                            <td>
                                <span :class="['badge', getActionStatusColor(action.status)]">
                                    {{ action.status }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
