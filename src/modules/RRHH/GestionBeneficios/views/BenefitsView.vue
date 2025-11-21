<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import StatCard from '@/modules/RRHH/GestionBeneficios/components/StatCard.vue'
import UnifiedBenefitsModal from '@/modules/RRHH/GestionBeneficios/components/UnifiedBenefitsModal.vue'
import EmployeeBenefitsModal from '@/modules/RRHH/GestionBeneficios/components/EmployeeBenefitsModal.vue'
import useBenefitCatalogStore from '@/modules/RRHH/GestionBeneficios/store/benefitCatalogStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useBenefits } from '@/modules/RRHH/GestionBeneficios/composables/useBenefits'
import { useBenefitsActions } from '@/modules/RRHH/GestionBeneficios/composables/useBenefitsActions'
import type { BenefitsStats } from '@/modules/RRHH/GestionBeneficios/types/benefitsTypes'

// Tab Components
import CatalogTab from '@/modules/RRHH/GestionBeneficios/components/tabs/CatalogTab.vue'
import MarketplaceTab from '@/modules/RRHH/GestionBeneficios/components/tabs/MarketplaceTab.vue'
import RecognitionTab from '@/modules/RRHH/GestionBeneficios/components/tabs/RecognitionTab.vue'
import EligibilityTab from '@/modules/RRHH/GestionBeneficios/components/tabs/EligibilityTab.vue'
import MatrixTab from '@/modules/RRHH/GestionBeneficios/components/tabs/MatrixTab.vue'

const modalStore = useModalStore()
const benefitCatalogStore = useBenefitCatalogStore()
const { CONFIG_MODAL_ID, RECOGNITION_MODAL_ID, MATRIX_MODAL_ID, REDEEM_MODAL_ID, EMPLOYEE_BENEFITS_MODAL_ID } = useBenefits()
const { getBenefitsStats, getMarketplaceBenefits, getRecognitions, getEligibleEmployees, getBenefitMatrix } = useBenefitsActions()

const catalogTabRef = ref()
const marketplaceTabRef = ref()
const recognitionTabRef = ref()
const eligibilityTabRef = ref()
const matrixTabRef = ref()

const activeTab = ref('catalog')
const stats = ref<BenefitsStats>({
    availablePoints: 0,
    activeBenefits: 0,
    participatingEmployees: 0,
    monthlyRecognitions: 0
})

const loadStats = async () => {
    try {
        stats.value = await getBenefitsStats()
    } catch (error) {
        console.error('Error loading stats:', error)
    }
}

const loadBenefits = async () => {
    if (marketplaceTabRef.value) {
        marketplaceTabRef.value.loading = true
        try {
            marketplaceTabRef.value.benefits = await getMarketplaceBenefits()
        } finally {
            marketplaceTabRef.value.loading = false
        }
    }
}

const loadRecognitions = async () => {
    if (recognitionTabRef.value) {
        recognitionTabRef.value.loading = true
        try {
            recognitionTabRef.value.recognitions = await getRecognitions()
        } finally {
            recognitionTabRef.value.loading = false
        }
    }
}

const loadEligibleEmployees = async () => {
    if (eligibilityTabRef.value) {
        eligibilityTabRef.value.loading = true
        try {
            eligibilityTabRef.value.eligibleEmployees = await getEligibleEmployees()
        } finally {
            eligibilityTabRef.value.loading = false
        }
    }
}

const loadBenefitMatrix = async () => {
    if (matrixTabRef.value) {
        matrixTabRef.value.loading = true
        try {
            matrixTabRef.value.benefitMatrix = await getBenefitMatrix()
        } finally {
            matrixTabRef.value.loading = false
        }
    }
}

const handleRedeem = (benefitId: number) => {
    modalStore.open(REDEEM_MODAL_ID, {
        type: 'CREATE',
        title: 'Canjear Beneficio',
        data: { benefitId }
    })
}

const handleViewDetails = (employeeId: number) => {
    modalStore.open(EMPLOYEE_BENEFITS_MODAL_ID, {
        type: 'VIEW',
        title: 'Beneficios Disponibles',
        data: { employeeId }
    })
}

const handleEditMatrix = (matrixId: number) => {
    modalStore.open(MATRIX_MODAL_ID, {
        type: 'EDIT',
        title: 'Editar Matriz de Beneficios',
        data: { id: matrixId }
    })
}

onMounted(() => {
    loadStats()
    loadEligibleEmployees()
    loadBenefitMatrix()
})
</script>

<template>
    <div>
        <BaseTitle
            title="Beneficios y Compensación"
            subtitle="Portal de beneficios flexibles y reconocimiento peer-to-peer"
        />

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard
                icon="stars"
                color="primary"
                label="Puntos Disponibles"
                :value="stats.availablePoints"
                description="Basados en desempeño"
            />
            <StatCard
                icon="card_giftcard"
                color="success"
                label="Beneficios Activos"
                :value="stats.activeBenefits"
                description="Disponibles para canjear"
            />
            <StatCard
                icon="groups"
                color="secondary"
                label="Empleados Participando"
                :value="stats.participatingEmployees"
                description="En el programa"
            />
            <StatCard
                icon="emoji_events"
                color="warning"
                label="Reconocimientos (Mes)"
                :value="stats.monthlyRecognitions"
                description="Peer-to-peer"
            />
        </div>

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-lifted mb-6">
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'catalog' }"
                @click="activeTab = 'catalog'"
            >
                <span class="material-symbols-outlined text-sm mr-2">inventory_2</span>
                Catálogo
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'marketplace' }"
                @click="activeTab = 'marketplace'"
            >
                <span class="material-symbols-outlined text-sm mr-2">shopping_cart</span>
                Marketplace
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'recognition' }"
                @click="activeTab = 'recognition'"
            >
                <span class="material-symbols-outlined text-sm mr-2">workspace_premium</span>
                Reconocimiento P2P
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'eligibility' }"
                @click="activeTab = 'eligibility'"
            >
                <span class="material-symbols-outlined text-sm mr-2">verified</span>
                Elegibilidad
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'matrix' }"
                @click="activeTab = 'matrix'"
            >
                <span class="material-symbols-outlined text-sm mr-2">table_chart</span>
                Matriz de Beneficios
            </a>
        </div>

        <!-- Tab Content -->
        <div class="mt-6">
            <!-- Catalog Tab -->
            <CatalogTab v-show="activeTab === 'catalog'" ref="catalogTabRef" />

            <!-- Marketplace Tab -->
            <MarketplaceTab
                v-show="activeTab === 'marketplace'"
                ref="marketplaceTabRef"
                :stats="stats"
                :on-redeem="handleRedeem"
                :load-benefits="loadBenefits"
            />

            <!-- Recognition Tab -->
            <RecognitionTab
                v-show="activeTab === 'recognition'"
                ref="recognitionTabRef"
                :recognition-modal-id="RECOGNITION_MODAL_ID"
                :load-recognitions="loadRecognitions"
            />

            <!-- Eligibility Tab -->
            <EligibilityTab
                v-show="activeTab === 'eligibility'"
                ref="eligibilityTabRef"
                :on-view-details="handleViewDetails"
                :load-eligible-employees="loadEligibleEmployees"
            />

            <!-- Matrix Tab -->
            <MatrixTab
                v-show="activeTab === 'matrix'"
                ref="matrixTabRef"
                :matrix-modal-id="MATRIX_MODAL_ID"
                :on-edit-matrix="handleEditMatrix"
                :load-benefit-matrix="loadBenefitMatrix"
            />
        </div>

        <!-- Unified Modals -->
        <UnifiedBenefitsModal
            :modal-id="benefitCatalogStore.modalId"
            :on-refresh="() => catalogTabRef?.tablaRef?.fetchData()"
        />
        <UnifiedBenefitsModal :modal-id="RECOGNITION_MODAL_ID" :on-refresh="loadRecognitions" />
        <UnifiedBenefitsModal :modal-id="CONFIG_MODAL_ID" :on-refresh="loadBenefits" />
        <UnifiedBenefitsModal :modal-id="REDEEM_MODAL_ID" :on-refresh="loadBenefits" />
        <UnifiedBenefitsModal :modal-id="MATRIX_MODAL_ID" :on-refresh="loadBenefitMatrix" />
        
        <!-- Employee Benefits Modal (VIEW only, no form) -->
        <EmployeeBenefitsModal :modal-id="EMPLOYEE_BENEFITS_MODAL_ID" />
    </div>
</template>
