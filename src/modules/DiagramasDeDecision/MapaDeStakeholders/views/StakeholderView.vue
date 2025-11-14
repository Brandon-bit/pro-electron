<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import StakeholderCard from '@/modules/DiagramasDeDecision/MapaDeStakeholders/components/StakeholderCard.vue'
import CreateStakeholderModal from '@/modules/DiagramasDeDecision/MapaDeStakeholders/components/CreateStakeholderModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useStakeholderStore from '@/modules/DiagramasDeDecision/MapaDeStakeholders/store/stakeholderStore'

const modalStore = useModalStore()
const stakeholderStore = useStakeholderStore()

const openCreateModal = () => {
    modalStore.open(stakeholderStore.createModalId, {
        title: 'Agregar Stakeholder',
        type: 'CREATE'
    })
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Mapa de Stakeholders" 
                subtitle="Matriz interactiva de Poder vs. Interés para gestión de partes interesadas"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">group</span>
                </template>
            </BaseTitle>
            <button @click="openCreateModal" class="btn btn-primary btn-lg gap-2">
                <span class="material-symbols-outlined">add</span>
                Agregar Stakeholder
            </button>
        </div>

        <!-- Power/Interest Matrix -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Matriz Poder vs. Interés</h2>
                <p class="text-sm opacity-70 mb-4">
                    Arrastra y suelta los stakeholders en el cuadrante apropiado
                </p>

                <div class="grid grid-cols-2 gap-4 min-h-[500px]">
                    <!-- High Power High Interest -->
                    <div :class="[
                        'border-2 rounded-lg p-4',
                        stakeholderStore.quadrants[0].borderColor,
                        stakeholderStore.quadrants[0].color
                    ]">
                        <h3 class="font-semibold text-error mb-2">
                            {{ stakeholderStore.quadrants[0].title }}
                        </h3>
                        <p class="text-xs opacity-70 mb-4">{{ stakeholderStore.quadrants[0].description }}</p>
                        <div class="space-y-2">
                            <StakeholderCard
                                v-for="stakeholder in stakeholderStore.getStakeholdersByQuadrant('high', 'high')"
                                :key="stakeholder.id"
                                :stakeholder="stakeholder"
                            />
                        </div>
                    </div>

                    <!-- High Power Low Interest -->
                    <div :class="[
                        'border-2 rounded-lg p-4',
                        stakeholderStore.quadrants[1].borderColor,
                        stakeholderStore.quadrants[1].color
                    ]">
                        <h3 class="font-semibold text-warning mb-2">
                            {{ stakeholderStore.quadrants[1].title }}
                        </h3>
                        <p class="text-xs opacity-70 mb-4">{{ stakeholderStore.quadrants[1].description }}</p>
                        <div class="space-y-2">
                            <StakeholderCard
                                v-for="stakeholder in stakeholderStore.getStakeholdersByQuadrant('high', 'low')"
                                :key="stakeholder.id"
                                :stakeholder="stakeholder"
                            />
                        </div>
                    </div>

                    <!-- Low Power High Interest -->
                    <div :class="[
                        'border-2 rounded-lg p-4',
                        stakeholderStore.quadrants[2].borderColor,
                        stakeholderStore.quadrants[2].color
                    ]">
                        <h3 class="font-semibold text-info mb-2">
                            {{ stakeholderStore.quadrants[2].title }}
                        </h3>
                        <p class="text-xs opacity-70 mb-4">{{ stakeholderStore.quadrants[2].description }}</p>
                        <div class="space-y-2">
                            <StakeholderCard
                                v-for="stakeholder in stakeholderStore.getStakeholdersByQuadrant('low', 'high')"
                                :key="stakeholder.id"
                                :stakeholder="stakeholder"
                            />
                        </div>
                    </div>

                    <!-- Low Power Low Interest -->
                    <div :class="[
                        'border-2 rounded-lg p-4',
                        stakeholderStore.quadrants[3].borderColor,
                        stakeholderStore.quadrants[3].color
                    ]">
                        <h3 class="font-semibold opacity-70 mb-2">
                            {{ stakeholderStore.quadrants[3].title }}
                        </h3>
                        <p class="text-xs opacity-70 mb-4">{{ stakeholderStore.quadrants[3].description }}</p>
                        <div class="space-y-2">
                            <StakeholderCard
                                v-for="stakeholder in stakeholderStore.getStakeholdersByQuadrant('low', 'low')"
                                :key="stakeholder.id"
                                :stakeholder="stakeholder"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <CreateStakeholderModal />
    </div>
</template>
