<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import InflationAdjustmentTab from '@/modules/Fiscal/Anuales/components/InflationAdjustmentTab.vue'
import CreditsTab from '@/modules/Fiscal/Anuales/components/CreditsTab.vue'
import DebtsTab from '@/modules/Fiscal/Anuales/components/DebtsTab.vue'
import ProfitCoefficientTab from '@/modules/Fiscal/Anuales/components/ProfitCoefficientTab.vue'
import AccountingReconciliationTab from '@/modules/Fiscal/Anuales/components/AccountingReconciliationTab.vue'
import AnnualISRTab from '@/modules/Fiscal/Anuales/components/AnnualISRTab.vue'
import useAnnualDeclarationStore from '@/modules/Fiscal/Anuales/store/annualDeclarationStore'
import type { AnnualDeclarationTabType } from '@/modules/Fiscal/Anuales/types/annualDeclarationTypes'

const annualDeclarationStore = useAnnualDeclarationStore()
const activeTab = ref<AnnualDeclarationTabType>('inflation-adjustment')

const tabs = [
    { 
        id: 'inflation-adjustment' as AnnualDeclarationTabType, 
        label: 'Ajuste anual por inflación',
        component: InflationAdjustmentTab
    },
    { 
        id: 'credits' as AnnualDeclarationTabType, 
        label: 'Saldo promedio de créditos',
        component: CreditsTab
    },
    { 
        id: 'debts' as AnnualDeclarationTabType, 
        label: 'Saldo promedio de deudas',
        component: DebtsTab
    },
    { 
        id: 'coeficiente' as AnnualDeclarationTabType, 
        label: 'Coeficiente de utilidad',
        component: ProfitCoefficientTab
    },
    { 
        id: 'conciliacion' as AnnualDeclarationTabType, 
        label: 'Conciliación contable fiscal',
        component: AccountingReconciliationTab
    },
    { 
        id: 'isr' as AnnualDeclarationTabType, 
        label: 'ISR anual',
        component: AnnualISRTab
    }
]

const changeTab = (tabId: AnnualDeclarationTabType) => {
    activeTab.value = tabId
    annualDeclarationStore.setActiveTab(tabId)
}

const getActiveComponent = () => {
    const tab = tabs.find(t => t.id === activeTab.value)
    return tab?.component || InflationAdjustmentTab
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Declaraciones Anuales" 
            subtitle="Gestión de obligaciones fiscales anuales"
        />

        <!-- Tabs Container -->
        <div class="card bg-base-100 shadow">
            <div class="card-body p-0">
                <!-- Tab Headers -->
                <div class="overflow-x-auto">
                    <div role="tablist" class="tabs tabs-bordered px-4 pt-4 flex-nowrap">
                        <a 
                            v-for="tab in tabs"
                            :key="tab.id"
                            role="tab" 
                            class="tab whitespace-nowrap"
                            :class="{ 'tab-active': activeTab === tab.id }"
                            @click="changeTab(tab.id)"
                        >
                            {{ tab.label }}
                        </a>
                    </div>
                </div>

                <!-- Tab Content -->
                <div class="p-6">
                    <component :is="getActiveComponent()" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Ensure tabs don't wrap on smaller screens */
.tabs {
    min-width: max-content;
}

/* Custom scrollbar for tab container */
.overflow-x-auto::-webkit-scrollbar {
    height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: hsl(var(--bc) / 0.2);
    border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--bc) / 0.3);
}
</style>
