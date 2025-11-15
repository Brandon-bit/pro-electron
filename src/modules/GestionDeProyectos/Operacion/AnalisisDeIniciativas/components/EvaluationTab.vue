<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import MatrixChart from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/components/MatrixChart.vue'
import type { InitiativeType } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'
import { useModalStore } from '@/shared/stores/modal.store'
import useInitiativeStore from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/store/initiativeStore'
import { showNotification } from '@/utils/toastNotifications'
import { useRouter } from 'vue-router'

const props = defineProps<{
    initiatives: InitiativeType[]
    onToggleSelection: (id: number) => void
    onRefresh: () => void
}>()

const router = useRouter()
const modalStore = useModalStore()
const initiativeStore = useInitiativeStore()

const selectedCount = computed(() => {
    return props.initiatives.filter(init => init.selected).length
})

const openCreateModal = () => {
    initiativeStore.setData()
    modalStore.open(initiativeStore.modalId, { type: 'CREATE', title: 'Añadir Proyecto a Evaluar' })
}

const sendToPrioritization = () => {
    const selectedInitiatives = props.initiatives.filter(init => init.selected)
    if (selectedInitiatives.length === 0) {
        showNotification('Selecciona al menos un proyecto para enviar a priorización', 'error')
        return
    }
    
    localStorage.setItem('prioritizationProjects', JSON.stringify(selectedInitiatives))
    showNotification(`${selectedInitiatives.length} proyecto(s) enviado(s) a Priorización`, 'success')
    router.push('/gestion-de-proyectos/priorizacion')
}

const editInitiative = (initiative: InitiativeType) => {
    initiativeStore.setData(initiative)
    modalStore.open(initiativeStore.modalId, { type: 'EDIT', title: 'Editar Iniciativa' })
}

const deleteInitiative = (initiative: InitiativeType) => {
    initiativeStore.setData(initiative)
    modalStore.open(initiativeStore.modalId, { type: 'DELETE', title: 'Eliminar Iniciativa' })
}
</script>

<template>
    <div class="space-y-4">
        <!-- Botones de acción -->
        <div class="flex gap-2 justify-between items-center flex-wrap">
            <div class="flex gap-2">
                <BaseButton 
                    text="Añadir Proyecto a Evaluar" 
                    @click="openCreateModal" 
                    icon="add" 
                />
                <BaseButton 
                    text="Gestionar Clasificaciones" 
                    @click="() => {}" 
                    icon="category"
                    class="btn-outline"
                />
            </div>
            <BaseButton 
                :text="`Enviar a Priorización (${selectedCount})`"
                @click="sendToPrioritization"
                :disabled="selectedCount === 0"
                icon="send"
                class="btn-accent"
            />
        </div>

        <!-- Tabla de evaluación -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Tabla de Evaluación</h2>
                
                <div class="overflow-x-auto mt-4">
                    <table class="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th class="text-center">Seleccionar</th>
                                <th>ID</th>
                                <th>Clasificación</th>
                                <th>Iniciativa</th>
                                <th>Inversión</th>
                                <th>Alcance</th>
                                <th>Horizonte</th>
                                <th>Ahorro</th>
                                <th>Beneficios</th>
                                <th>Satisfacción</th>
                                <th>Alineación</th>
                                <th class="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="initiative in initiatives" :key="initiative.id" class="hover">
                                <td class="text-center">
                                    <input 
                                        type="checkbox" 
                                        class="checkbox checkbox-primary"
                                        :checked="initiative.selected"
                                        @change="() => onToggleSelection(initiative.id!)"
                                    />
                                </td>
                                <td>{{ initiative.id }}</td>
                                <td>
                                    <span class="badge badge-primary badge-sm">
                                        {{ initiative.classification }}
                                    </span>
                                </td>
                                <td class="font-medium">{{ initiative.name }}</td>
                                <td>
                                    <span class="badge badge-ghost badge-sm">{{ initiative.investment }}</span>
                                </td>
                                <td>
                                    <span class="badge badge-ghost badge-sm">{{ initiative.scope }}</span>
                                </td>
                                <td>
                                    <span class="badge badge-ghost badge-sm">{{ initiative.timeHorizon }}</span>
                                </td>
                                <td>
                                    <span class="badge badge-ghost badge-sm">{{ initiative.savings }}</span>
                                </td>
                                <td>
                                    <span class="badge badge-ghost badge-sm">{{ initiative.benefits }}</span>
                                </td>
                                <td>
                                    <span class="badge badge-ghost badge-sm">{{ initiative.satisfaction }}</span>
                                </td>
                                <td>
                                    <span class="badge badge-accent badge-sm font-medium">
                                        {{ initiative.strategicAlignment }}%
                                    </span>
                                </td>
                                <td>
                                    <div class="flex gap-2 justify-center">
                                        <button 
                                            class="btn btn-ghost btn-xs"
                                            @click="editInitiative(initiative)"
                                        >
                                            <span class="material-symbols-outlined text-sm">edit</span>
                                        </button>
                                        <button 
                                            class="btn btn-ghost btn-xs text-error"
                                            @click="deleteInitiative(initiative)"
                                        >
                                            <span class="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="initiatives.length === 0">
                                <td colspan="12" class="text-center py-8">
                                    <span class="material-symbols-outlined text-4xl opacity-30 mb-2 block">inbox</span>
                                    <p class="opacity-60">No hay iniciativas para evaluar</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Matriz -->
        <MatrixChart :initiatives="initiatives" />
    </div>
</template>
