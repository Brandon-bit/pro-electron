<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import StatCard from '@/modules/RRHH/GestionDeDesempeno/components/StatCard.vue'
import CampaignsTable from '@/modules/RRHH/GestionDeDesempeno/components/CampaignsTable.vue'
import CampaignStatsCards from '@/modules/RRHH/GestionDeDesempeno/components/CampaignStatsCards.vue'
import CompetencyCatalog from '@/modules/RRHH/GestionDeDesempeno/components/CompetencyCatalog.vue'
import FeedbackList from '@/modules/RRHH/GestionDeDesempeno/components/FeedbackList.vue'

const router = useRouter()

const activeTab = ref('campanas')

const stats = ref({
    activeCampaigns: 3,
    pendingEvaluations: 142,
    completionRate: 78,
    completedCampaigns: 12
})

const handleNewCampaign = () => {
    router.push('/rrhh/gestion-desempeno/crear')
}
</script>

<template>
    <div>
        <BaseTitle
            title="Gestión del Desempeño"
            subtitle="Sistema de Evaluación 360° y gestión de objetivos"
        />

        <div class="mb-6 flex justify-end">
            <BaseButton
                text="Nueva Campaña 360°"
                icon="add"
                @click="handleNewCampaign"
            />
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard
                icon="play_arrow"
                color="success"
                title="Campañas Activas"
                :value="stats.activeCampaigns"
            />
            <StatCard
                icon="event"
                color="warning"
                title="Evaluaciones Pendientes"
                :value="stats.pendingEvaluations"
            />
            <StatCard
                icon="trending_up"
                color="primary"
                title="Tasa de Completitud"
                :value="`${stats.completionRate}%`"
            />
            <StatCard
                icon="check_circle"
                color="secondary"
                title="Campañas Completadas"
                :value="stats.completedCampaigns"
            />
        </div>

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-lifted mb-6">
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'campanas' }"
                @click="activeTab = 'campanas'"
            >
                <span class="material-symbols-outlined text-sm mr-2">campaign</span>
                Campañas
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'resultados' }"
                @click="activeTab = 'resultados'"
            >
                <span class="material-symbols-outlined text-sm mr-2">bar_chart</span>
                Resultados
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'feedback' }"
                @click="activeTab = 'feedback'"
            >
                <span class="material-symbols-outlined text-sm mr-2">chat</span>
                Feedback 365
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'competencias' }"
                @click="activeTab = 'competencias'"
            >
                <span class="material-symbols-outlined text-sm mr-2">school</span>
                Competencias
            </a>
        </div>

        <!-- Tab Content -->
        <div class="mt-6">
            <!-- Campañas Tab -->
            <div v-show="activeTab === 'campanas'">
                <CampaignsTable />
            </div>

            <!-- Resultados Tab -->
            <div v-show="activeTab === 'resultados'">
                <CampaignStatsCards />
            </div>

            <!-- Feedback Tab -->
            <div v-show="activeTab === 'feedback'">
                <FeedbackList />
            </div>

            <!-- Competencias Tab -->
            <div v-show="activeTab === 'competencias'">
                <CompetencyCatalog />
            </div>
        </div>
    </div>
</template>
