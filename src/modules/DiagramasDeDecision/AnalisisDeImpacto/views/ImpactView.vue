<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ImpactItemCard from '@/modules/DiagramasDeDecision/AnalisisDeImpacto/components/ImpactItemCard.vue'
import CreateImpactModal from '@/modules/DiagramasDeDecision/AnalisisDeImpacto/components/CreateImpactModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useImpactStore from '@/modules/DiagramasDeDecision/AnalisisDeImpacto/store/impactStore'

const modalStore = useModalStore()
const impactStore = useImpactStore()

const openCreateModal = () => {
    modalStore.open(impactStore.createModalId, {
        title: 'Agregar Análisis de Impacto',
        type: 'CREATE'
    })
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Análisis de Impacto" 
                subtitle="Matriz de roles y procesos afectados con nivel de impacto"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">target</span>
                </template>
            </BaseTitle>
            <button @click="openCreateModal" class="btn btn-primary btn-lg gap-2">
                <span class="material-symbols-outlined">add</span>
                Agregar Impacto
            </button>
        </div>

        <!-- Impact Matrix Card -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Matriz de Impacto</h2>
                <p class="text-sm opacity-70 mb-4">Roles y procesos afectados por el cambio</p>

                <div class="space-y-3">
                    <ImpactItemCard
                        v-for="item in impactStore.impactItems"
                        :key="item.id"
                        :item="item"
                    />
                </div>
            </div>
        </div>

        <!-- Modal -->
        <CreateImpactModal />
    </div>
</template>
