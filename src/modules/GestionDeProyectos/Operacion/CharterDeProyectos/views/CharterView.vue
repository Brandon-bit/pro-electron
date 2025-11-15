<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import StatsCards from '@/modules/GestionDeProyectos/Operacion/CharterDeProyectos/components/StatsCards.vue'
import CreateCharterModal from '@/modules/GestionDeProyectos/Operacion/CharterDeProyectos/components/CreateCharterModal.vue'
import ViewCharterModal from '@/modules/GestionDeProyectos/Operacion/CharterDeProyectos/components/ViewCharterModal.vue'
import useCharterStore from '@/modules/GestionDeProyectos/Operacion/CharterDeProyectos/store/charterStore'
import { useCharterActions } from '@/modules/GestionDeProyectos/Operacion/CharterDeProyectos/composables/useCharterActions'

const charterStore = useCharterStore()
const { getStatusColor, loadCharters, saveCharters, handleSendToReview } = useCharterActions()

onMounted(() => {
    loadCharters()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Charter de Proyectos" 
                subtitle="Documentación formal de autorización e inicio de proyectos"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">description</span>
                </template>
            </BaseTitle>
            <div class="flex gap-2">
                <button @click="saveCharters" class="btn btn-outline gap-2">
                    <span class="material-symbols-outlined">save</span>
                    Guardar
                </button>
                <button @click="charterStore.openCreateModal()" class="btn btn-primary gap-2">
                    <span class="material-symbols-outlined">add</span>
                    Crear Charter
                </button>
            </div>
        </div>

        <!-- Stats Cards -->
        <StatsCards />

        <!-- Charters List -->
        <div class="grid grid-cols-1 gap-4">
            <div 
                v-for="charter in charterStore.charters" 
                :key="charter.id" 
                class="card bg-base-100 shadow-xl"
            >
                <div class="card-body">
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <h3 class="card-title text-xl">{{ charter.projectName }}</h3>
                            <span :class="['badge', getStatusColor(charter.status)]">{{ charter.status }}</span>
                            <span class="badge badge-outline">v{{ charter.version }}</span>
                        </div>
                        <div class="flex gap-2">
                            <button 
                                @click="charterStore.openViewModal(charter)" 
                                class="btn btn-outline btn-sm gap-2"
                            >
                                <span class="material-symbols-outlined">visibility</span>
                                Ver Detalle
                            </button>
                            <button 
                                v-if="charter.status === 'Borrador'" 
                                @click="handleSendToReview(charter.id)" 
                                class="btn btn-sm btn-primary"
                            >
                                Enviar a Aprobación
                            </button>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="space-y-2">
                        <p class="opacity-70">{{ charter.description }}</p>
                        <div class="grid grid-cols-3 gap-4 text-sm mt-4">
                            <div>
                                <p class="font-semibold">PM:</p>
                                <p class="opacity-70">{{ charter.projectManager }}</p>
                            </div>
                            <div>
                                <p class="font-semibold">Sponsor:</p>
                                <p class="opacity-70">{{ charter.sponsor }}</p>
                            </div>
                            <div>
                                <p class="font-semibold">Presupuesto:</p>
                                <p class="opacity-70">{{ charter.budget }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <CreateCharterModal />
        <ViewCharterModal />
    </div>
</template>
