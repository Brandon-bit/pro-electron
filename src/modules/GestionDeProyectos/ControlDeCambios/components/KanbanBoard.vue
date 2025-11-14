<script setup lang="ts">
import useChangeStore from '@/modules/GestionDeProyectos/ControlDeCambios/store/changeStore'
import { useChangeActions } from '@/modules/GestionDeProyectos/ControlDeCambios/composables/useChangeActions'

const changeStore = useChangeStore()
const { handleApprove, handleReject } = useChangeActions()

const columns = ['Abierta', 'En Análisis', 'Pendiente Aprobación', 'Aprobada', 'Implementada']
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div v-for="column in columns" :key="column" class="space-y-3">
            <!-- Column Header -->
            <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <h3 class="font-semibold text-sm">{{ column }}</h3>
                <span class="badge badge-secondary">
                    {{ changeStore.getRequestsByStatus(column).length }}
                </span>
            </div>

            <!-- Column Cards -->
            <div class="space-y-2 max-h-[600px] overflow-y-auto">
                <div 
                    v-for="cr in changeStore.getRequestsByStatus(column)" 
                    :key="cr.id" 
                    class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                    <div class="card-body p-4">
                        <h4 class="card-title text-sm">{{ cr.id }}</h4>
                        <p class="text-sm font-medium line-clamp-2">{{ cr.title }}</p>
                        <div class="text-xs opacity-70 space-y-1">
                            <p>Solicitante: {{ cr.requester }}</p>
                            <p>Fecha: {{ cr.dateRequested }}</p>
                        </div>
                        
                        <!-- Approval Buttons -->
                        <div v-if="cr.status === 'Pendiente Aprobación'" class="flex gap-2 pt-2">
                            <button 
                                @click="handleApprove(cr.id)" 
                                class="btn btn-success btn-sm flex-1 gap-1"
                            >
                                <span class="material-symbols-outlined text-sm">thumb_up</span>
                                Aprobar
                            </button>
                            <button 
                                @click="handleReject(cr.id)" 
                                class="btn btn-error btn-sm flex-1 gap-1"
                            >
                                <span class="material-symbols-outlined text-sm">thumb_down</span>
                                Rechazar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
