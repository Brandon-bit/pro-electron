<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import DIOTTab from '@/modules/Fiscal/Informativas/components/DIOTTab.vue'
import ElectronicAccountingTab from '@/modules/Fiscal/Informativas/components/ElectronicAccountingTab.vue'
import InterestTab from '@/modules/Fiscal/Informativas/components/InterestTab.vue'
import CashDepositsTab from '@/modules/Fiscal/Informativas/components/CashDepositsTab.vue'
import TaxLossTab from '@/modules/Fiscal/Informativas/components/TaxLossTab.vue'
import useInformativeDeclarationStore from '@/modules/Fiscal/Informativas/store/informativeDeclarationStore'
import type { InformativeDeclarationTabType } from '@/modules/Fiscal/Informativas/types/informativeDeclarationTypes'

const informativeDeclarationStore = useInformativeDeclarationStore()
const activeTab = ref<InformativeDeclarationTabType>('diot')

const tabs = [
    { 
        id: 'diot' as InformativeDeclarationTabType, 
        label: 'DIOT',
        component: DIOTTab
    },
    { 
        id: 'electronic-accounting' as InformativeDeclarationTabType, 
        label: 'Contabilidad electrónica',
        component: ElectronicAccountingTab
    },
    { 
        id: 'interest' as InformativeDeclarationTabType, 
        label: 'Informativa de interés',
        component: InterestTab
    },
    { 
        id: 'cash-deposits' as InformativeDeclarationTabType, 
        label: 'Informativa de depósitos en efectivo',
        component: CashDepositsTab
    },
    { 
        id: 'tax-loss' as InformativeDeclarationTabType, 
        label: 'Quebranto',
        component: TaxLossTab
    }
]

const changeTab = (tabId: InformativeDeclarationTabType) => {
    activeTab.value = tabId
    informativeDeclarationStore.setActiveTab(tabId)
}

const getActiveComponent = () => {
    const tab = tabs.find(t => t.id === activeTab.value)
    return tab?.component || DIOTTab
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Declaraciones Informativas" 
            subtitle="Gestión de obligaciones informativas fiscales"
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
