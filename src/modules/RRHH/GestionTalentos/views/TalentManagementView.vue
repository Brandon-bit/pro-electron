<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import StatCard from '@/modules/RRHH/GestionTalentos/components/StatCard.vue'
import NineBoxGrid from '@/modules/RRHH/GestionTalentos/components/NineBoxGrid.vue'
import SuccessionPlanList from '@/modules/RRHH/GestionTalentos/components/SuccessionPlanList.vue'
import CareerPathCards from '@/modules/RRHH/GestionTalentos/components/CareerPathCards.vue'
import SkillsGapHeatmap from '@/modules/RRHH/GestionTalentos/components/SkillsGapHeatmap.vue'
import PDIList from '@/modules/RRHH/GestionTalentos/components/PDIList.vue'
import CreatePDIModal from '@/modules/RRHH/GestionTalentos/components/CreatePDIModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useTalentStore } from '@/modules/RRHH/GestionTalentos/store/talentStore'
import { useTalentActions } from '@/modules/RRHH/GestionTalentos/composables/useTalentActions'
import type { TalentStats } from '@/modules/RRHH/GestionTalentos/types/talentTypes'

const modalStore = useModalStore()
const talentStore = useTalentStore()
const { getTalentStats } = useTalentActions()

const activeTab = ref('nine-box')
const stats = ref<TalentStats>({
    highPotentials: 0,
    inDevelopment: 0,
    criticalRoles: 0,
    criticalSkillGaps: 0
})

const loadStats = async () => {
    try {
        stats.value = await getTalentStats()
    } catch (error) {
        console.error('Error loading stats:', error)
    }
}

const handleNewPDI = () => {
    talentStore.clearData()
    modalStore.open(talentStore.modalId, {
        type: 'CREATE',
        title: 'Crear Plan de Desarrollo'
    })
}

onMounted(() => {
    loadStats()
})
</script>

<template>
    <div>
        <BaseTitle
            title="Gestión de Talentos"
            subtitle="Matriz 9-Box, planes de sucesión y career pathing"
        />

        <div class="mb-6 flex justify-end">
            <BaseButton
                text="Crear Plan de Desarrollo"
                icon="target"
                @click="handleNewPDI"
            />
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard
                icon="star"
                color="success"
                title="High Potentials"
                :value="stats.highPotentials"
                description="Top-right 9-Box"
            />
            <StatCard
                icon="trending_up"
                color="warning"
                title="En Desarrollo"
                :value="stats.inDevelopment"
                description="Con PDI activo"
            />
            <StatCard
                icon="workspace_premium"
                color="primary"
                title="Roles Críticos"
                :value="stats.criticalRoles"
                description="Con plan de sucesión"
            />
            <StatCard
                icon="warning"
                color="error"
                title="Brechas Críticas"
                :value="stats.criticalSkillGaps"
                description="Habilidades críticas"
            />
        </div>

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-lifted mb-6">
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'nine-box' }"
                @click="activeTab = 'nine-box'"
            >
                <span class="material-symbols-outlined text-sm mr-2">grid_view</span>
                Matriz 9-Box
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'succession' }"
                @click="activeTab = 'succession'"
            >
                <span class="material-symbols-outlined text-sm mr-2">account_tree</span>
                Plan de Sucesión
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'career' }"
                @click="activeTab = 'career'"
            >
                <span class="material-symbols-outlined text-sm mr-2">route</span>
                Mapas de Carrera
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'gaps' }"
                @click="activeTab = 'gaps'"
            >
                <span class="material-symbols-outlined text-sm mr-2">warning</span>
                Brechas de Habilidades
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'pdi' }"
                @click="activeTab = 'pdi'"
            >
                <span class="material-symbols-outlined text-sm mr-2">book</span>
                PDI
            </a>
        </div>

        <!-- Tab Content -->
        <div class="mt-6">
            <div v-show="activeTab === 'nine-box'">
                <NineBoxGrid />
            </div>

            <div v-show="activeTab === 'succession'">
                <SuccessionPlanList />
            </div>

            <div v-show="activeTab === 'career'">
                <CareerPathCards />
            </div>

            <div v-show="activeTab === 'gaps'">
                <SkillsGapHeatmap />
            </div>

            <div v-show="activeTab === 'pdi'">
                <PDIList />
            </div>
        </div>

        <!-- Modal -->
        <CreatePDIModal />
    </div>
</template>
