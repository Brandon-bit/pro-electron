<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import KPICard from '@/modules/Fiscal/FacturasEmitidas/components/KPICard.vue'
import InvoiceFilters from '@/modules/Fiscal/FacturasEmitidas/components/InvoiceFilters.vue'
import InvoiceModal from '@/modules/Fiscal/FacturasEmitidas/components/InvoiceModal.vue'
import InvoiceDetailModal from '@/modules/Fiscal/FacturasEmitidas/components/InvoiceDetailModal.vue'
import CancelInvoiceModal from '@/modules/Fiscal/FacturasEmitidas/components/CancelInvoiceModal.vue'
import useInvoice from '@/modules/Fiscal/FacturasEmitidas/composables/useInvoice'
import useInvoiceStore from '@/modules/Fiscal/FacturasEmitidas/store/invoiceStore'
import { useInvoiceActions } from '@/modules/Fiscal/FacturasEmitidas/composables/useInvoiceActions'
import { showNotification } from '@/utils/toastNotifications'
import type { InvoiceKPIType, InvoiceFilterType } from '@/modules/Fiscal/FacturasEmitidas/types/invoiceTypes'

const { getTableColumns } = useInvoice()
const { getInvoices, getKPIs, exportInvoices } = useInvoiceActions()

const invoiceStore = useInvoiceStore()
const modalStore = useModalStore()

const tablaRef = ref()
const kpis = ref<InvoiceKPIType[]>([])
const isLoadingKPIs = ref(false)

// Mock KPIs data - Replace with API call
const mockKPIs: InvoiceKPIType[] = [
    {
        title: "Total Facturado",
        value: "$2,458,900.00",
        subtitle: "Este mes",
        icon: "payments",
        color: "text-success"
    },
    {
        title: "Facturas Emitidas",
        value: "156",
        subtitle: "Este mes",
        icon: "description",
        color: "text-info"
    },
    {
        title: "IVA Cobrado",
        value: "$393,424.00",
        subtitle: "Este mes",
        icon: "trending_up",
        color: "text-secondary"
    },
    {
        title: "Pendientes de Cobro",
        value: "$487,200.00",
        subtitle: "20 facturas",
        icon: "schedule",
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

const openCreateModal = () => {
    invoiceStore.setData()
    modalStore.open(invoiceStore.modalId, { type: 'CREATE', title: 'Crear Factura' })
}

const handleFilter = (filters: InvoiceFilterType) => {
    invoiceStore.setFilters(filters)
    tablaRef.value?.fetchData()
}

const handleExport = async () => {
    try {
        const blob = await exportInvoices(invoiceStore.filters)
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `facturas-emitidas-${new Date().toISOString().split('T')[0]}.xlsx`
        link.click()
        window.URL.revokeObjectURL(url)
        showNotification('Exportación completada', 'success')
    } catch (error) {
        showNotification('Error al exportar facturas', 'error')
    }
}

const fetchInvoicesWithFilters = async (page: number, pageSize: number) => {
    return await getInvoices(page, pageSize, invoiceStore.filters)
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
                title="Facturas Emitidas" 
                subtitle="Control de facturas electrónicas emitidas"
            />
            <BaseButton 
                text="Nueva Factura" 
                icon="description"
                size="lg"
                @click="openCreateModal"
            />
        </div>

        <!-- KPIs -->
        <div v-if="isLoadingKPIs" class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="i in 4" :key="i" class="skeleton h-24"></div>
        </div>
        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard v-for="(kpi, index) in kpis" :key="index" :kpi="kpi" />
        </div>

        <!-- Filters -->
       

        <!-- Table -->
        <div class="card bg-base-100 shadow">
            <div class="card-body p-4">
                <h3 class="card-title text-base mb-4">Listado de Facturas</h3>
                <BaseTable
                    ref="tablaRef"
                    :headers="getTableColumns()"
                    :fetch-callback="fetchInvoicesWithFilters"
                />
            </div>
        </div>

        <!-- Modals -->
        <InvoiceModal :onRefresh="() => { tablaRef?.fetchData(); loadKPIs(); }" />
        <InvoiceDetailModal :onRefresh="() => { tablaRef?.fetchData(); loadKPIs(); }" />
        <CancelInvoiceModal :onRefresh="() => { tablaRef?.fetchData(); loadKPIs(); }" />
    </div>
</template>
