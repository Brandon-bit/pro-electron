<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import KPICard from '@/modules/Fiscal/Provisionales/components/KPICard.vue'
import DueDateAlert from '@/modules/Fiscal/Provisionales/components/DueDateAlert.vue'
import CalculationInfoCard from '@/modules/Fiscal/Provisionales/components/CalculationInfoCard.vue'
import VATInfoCard from '@/modules/Fiscal/Provisionales/components/VATInfoCard.vue'
import GenerateDeclarationModal from '@/modules/Fiscal/Provisionales/components/GenerateDeclarationModal.vue'
import useProvisionalPayment from '@/modules/Fiscal/Provisionales/composables/useProvisionalPayment'
import useProvisionalPaymentStore from '@/modules/Fiscal/Provisionales/store/provisionalPaymentStore'
import { useProvisionalPaymentActions } from '@/modules/Fiscal/Provisionales/composables/useProvisionalPaymentActions'
import type { ProvisionalPaymentKPIType } from '@/modules/Fiscal/Provisionales/types/provisionalPaymentTypes'

const { getISRTableColumns, getVATTableColumns } = useProvisionalPayment()
const { getProvisionalPayments, getVATDeclarations } = useProvisionalPaymentActions()

const provisionalPaymentStore = useProvisionalPaymentStore()
const modalStore = useModalStore()

const isrTableRef = ref()
const vatTableRef = ref()
const kpis = ref<ProvisionalPaymentKPIType[]>([])
const isLoadingKPIs = ref(false)
const activeTab = ref<'isr' | 'iva'>('isr')

// Mock KPIs data
const mockKPIs: ProvisionalPaymentKPIType[] = [
    {
        title: "ISR Provisional",
        value: "$124,580.00",
        subtitle: "Septiembre 2025",
        icon: "payments",
        color: "text-error"
    },
    {
        title: "IVA a Pagar",
        value: "$87,456.00",
        subtitle: "Septiembre 2025",
        icon: "trending_up",
        color: "text-warning"
    },
    {
        title: "Coeficiente de Utilidad",
        value: "0.3425",
        subtitle: "Ejercicio 2024",
        icon: "trending_down",
        color: "text-info"
    },
    {
        title: "Próximo Pago",
        value: "17 Oct",
        subtitle: "Sep 2025",
        icon: "event",
        color: "text-secondary"
    }
]

const loadKPIs = async () => {
    isLoadingKPIs.value = true
    try {
        // Using mock data for now
        kpis.value = mockKPIs
    } catch (error) {
        console.error('Error loading KPIs:', error)
        kpis.value = mockKPIs
    } finally {
        isLoadingKPIs.value = false
    }
}

const openGenerateModal = () => {
    modalStore.open(provisionalPaymentStore.generateModalId, { 
        type: 'CREATE', 
        title: 'Generar Declaración' 
    })
}

const fetchProvisionalPayments = async (page: number, pageSize: number) => {
    return await getProvisionalPayments(page, pageSize)
}

const fetchVATDeclarations = async (page: number, pageSize: number) => {
    return await getVATDeclarations(page, pageSize)
}

const changeTab = (tab: 'isr' | 'iva') => {
    activeTab.value = tab
    provisionalPaymentStore.setActiveTab(tab)
}

onMounted(() => {
    loadKPIs()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-start">
            <BaseTitle 
                title="Declaraciones Provisionales" 
                subtitle="Pagos provisionales mensuales de ISR e IVA"
            />
            <BaseButton 
                text="Generar Declaración" 
                icon="description"
                size="lg"
                @click="openGenerateModal"
            />
        </div>

        <!-- KPIs -->
        <div v-if="isLoadingKPIs" class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="i in 4" :key="i" class="skeleton h-24"></div>
        </div>
        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard v-for="(kpi, index) in kpis" :key="index" :kpi="kpi" />
        </div>

        <!-- Alert -->
        <DueDateAlert 
            period="Septiembre 2025"
            dueDate="17 de Octubre"
        />

        <!-- Tabs -->
        <div class="card bg-base-100 shadow">
            <div class="card-body p-0">
                <!-- Tab Headers -->
                <div role="tablist" class="tabs tabs-bordered px-4 pt-4">
                    <a 
                        role="tab" 
                        class="tab"
                        :class="{ 'tab-active': activeTab === 'isr' }"
                        @click="changeTab('isr')"
                    >
                        Pagos Provisionales ISR
                    </a>
                    <a 
                        role="tab" 
                        class="tab"
                        :class="{ 'tab-active': activeTab === 'iva' }"
                        @click="changeTab('iva')"
                    >
                        Declaraciones IVA
                    </a>
                </div>

                <!-- Tab Content -->
                <div class="p-4">
                    <!-- ISR Tab -->
                    <div v-show="activeTab === 'isr'" class="space-y-4">
                        <div class="card bg-base-100 border">
                            <div class="card-body p-4">
                                <h3 class="card-title text-base mb-4">Historial de Pagos Provisionales (ISR)</h3>
                                <BaseTable
                                    ref="isrTableRef"
                                    :headers="getISRTableColumns()"
                                    :fetch-callback="fetchProvisionalPayments"
                                />
                            </div>
                        </div>

                        <CalculationInfoCard />
                    </div>

                    <!-- IVA Tab -->
                    <div v-show="activeTab === 'iva'" class="space-y-4">
                        <div class="card bg-base-100 border">
                            <div class="card-body p-4">
                                <h3 class="card-title text-base mb-4">Historial de Declaraciones (IVA)</h3>
                                <BaseTable
                                    ref="vatTableRef"
                                    :headers="getVATTableColumns()"
                                    :fetch-callback="fetchVATDeclarations"
                                />
                            </div>
                        </div>

                        <VATInfoCard />
                    </div>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <GenerateDeclarationModal 
            :onRefresh="() => { 
                isrTableRef?.fetchData(); 
                vatTableRef?.fetchData(); 
                loadKPIs(); 
            }" 
        />
    </div>
</template>
