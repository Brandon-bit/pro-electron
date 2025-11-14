<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import KPICard from '@/modules/Fiscal/FacturasRecibidas/components/KPICard.vue'
import ReceivedInvoiceFilters from '@/modules/Fiscal/FacturasRecibidas/components/ReceivedInvoiceFilters.vue'
import InfoAlert from '@/modules/Fiscal/FacturasRecibidas/components/InfoAlert.vue'
import UploadXmlModal from '@/modules/Fiscal/FacturasRecibidas/components/UploadXmlModal.vue'
import ReceivedInvoiceDetailModal from '@/modules/Fiscal/FacturasRecibidas/components/ReceivedInvoiceDetailModal.vue'
import RejectInvoiceModal from '@/modules/Fiscal/FacturasRecibidas/components/RejectInvoiceModal.vue'
import useReceivedInvoice from '@/modules/Fiscal/FacturasRecibidas/composables/useReceivedInvoice'
import useReceivedInvoiceStore from '@/modules/Fiscal/FacturasRecibidas/store/receivedInvoiceStore'
import { useReceivedInvoiceActions } from '@/modules/Fiscal/FacturasRecibidas/composables/useReceivedInvoiceActions'
import { showNotification } from '@/utils/toastNotifications'
import type { ReceivedInvoiceKPIType, ReceivedInvoiceFilterType } from '@/modules/Fiscal/FacturasRecibidas/types/receivedInvoiceTypes'

const { getTableColumns } = useReceivedInvoice()
const { getReceivedInvoices, exportInvoices } = useReceivedInvoiceActions()

const receivedInvoiceStore = useReceivedInvoiceStore()
const modalStore = useModalStore()

const tablaRef = ref()
const kpis = ref<ReceivedInvoiceKPIType[]>([])
const isLoadingKPIs = ref(false)

// Mock KPIs data
const mockKPIs: ReceivedInvoiceKPIType[] = [
    {
        title: "Total Recibido",
        value: "$1,847,300.00",
        subtitle: "Este mes",
        icon: "payments",
        color: "text-info"
    },
    {
        title: "Facturas Recibidas",
        value: "98",
        subtitle: "Este mes",
        icon: "description",
        color: "text-secondary"
    },
    {
        title: "IVA Acreditable",
        value: "$295,568.00",
        subtitle: "Este mes",
        icon: "trending_down",
        color: "text-success"
    },
    {
        title: "Pendientes de Validar",
        value: "12",
        subtitle: "Requieren revisión",
        icon: "error",
        color: "text-warning"
    }
]

const loadKPIs = async () => {
    isLoadingKPIs.value = true
    try {
        // const data = await getKPIs()
        // kpis.value = data
        
        // Using mock data for now
        kpis.value = mockKPIs
    } catch (error) {
        console.error('Error loading KPIs:', error)
        kpis.value = mockKPIs
    } finally {
        isLoadingKPIs.value = false
    }
}

const openUploadModal = () => {
    modalStore.open(receivedInvoiceStore.uploadModalId, { 
        type: 'CREATE', 
        title: 'Cargar XML' 
    })
}

const handleFilter = (filters: ReceivedInvoiceFilterType) => {
    receivedInvoiceStore.setFilters(filters)
    tablaRef.value?.fetchData()
}

const handleExport = async () => {
    try {
        const blob = await exportInvoices(receivedInvoiceStore.filters)
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `facturas-recibidas-${new Date().toISOString().split('T')[0]}.xlsx`
        link.click()
        window.URL.revokeObjectURL(url)
        showNotification('Exportación completada', 'success')
    } catch (error) {
        showNotification('Error al exportar facturas', 'error')
    }
}

const fetchReceivedInvoicesWithFilters = async (page: number, pageSize: number) => {
    return await getReceivedInvoices(page, pageSize, receivedInvoiceStore.filters)
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
                title="Facturas Recibidas" 
                subtitle="Gestión de facturas de proveedores y gastos"
            />
            <BaseButton 
                text="Cargar XML" 
                icon="upload"
                size="lg"
                @click="openUploadModal"
            />
        </div>

        <!-- KPIs -->
        <div v-if="isLoadingKPIs" class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="i in 4" :key="i" class="skeleton h-24"></div>
        </div>
        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard v-for="(kpi, index) in kpis" :key="index" :kpi="kpi" />
        </div>

        <!-- Info Alert -->
        <InfoAlert />

        <!-- Table -->
        <div class="card bg-base-100 shadow">
            <div class="card-body p-4">
                <h3 class="card-title text-base mb-4">Listado de Facturas Recibidas</h3>
                <BaseTable
                    ref="tablaRef"
                    :headers="getTableColumns()"
                    :fetch-callback="fetchReceivedInvoicesWithFilters"
                />
            </div>
        </div>

        <!-- Modals -->
        <UploadXmlModal :onRefresh="() => { tablaRef?.fetchData(); loadKPIs(); }" />
        <ReceivedInvoiceDetailModal :onRefresh="() => { tablaRef?.fetchData(); loadKPIs(); }" />
        <RejectInvoiceModal :onRefresh="() => { tablaRef?.fetchData(); loadKPIs(); }" />
    </div>
</template>
