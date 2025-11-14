<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import KPICard from '@/modules/Inversiones/Inversion/Prospectos/components/KPICard.vue'
import ProspectFilters from '@/modules/Inversiones/Inversion/Prospectos/components/ProspectFilters.vue'
import ProspectFormModal from '@/modules/Inversiones/Inversion/Prospectos/components/ProspectFormModal.vue'
import ProspectDetailModal from '@/modules/Inversiones/Inversion/Prospectos/components/ProspectDetailModal.vue'
import useProspect from '@/modules/Inversiones/Inversion/Prospectos/composables/useProspect'
import useProspectStore from '@/modules/Inversiones/Inversion/Prospectos/store/prospectStore'
import { useProspectActions } from '@/modules/Inversiones/Inversion/Prospectos/composables/useProspectActions'
import type { ProspectKPIType, ProspectFilterType } from '@/modules/Inversiones/Inversion/Prospectos/types/prospectTypes'
import { showNotification } from '@/utils/toastNotifications'

const { getTableColumns } = useProspect()
const { getProspects, exportProspects } = useProspectActions()

const prospectStore = useProspectStore()
const modalStore = useModalStore()

const tablaRef = ref()
const kpis = ref<ProspectKPIType[]>([])
const isLoadingKPIs = ref(false)

// Mock KPIs data
const mockKPIs: ProspectKPIType[] = [
    {
        title: "Total Prospectos",
        value: "248",
        subtitle: "Este mes",
        icon: "group",
        color: "text-primary",
        trend: 12
    },
    {
        title: "Valor Pipeline",
        value: "$2,450,000",
        subtitle: "Valor estimado total",
        icon: "payments",
        color: "text-success",
        trend: 8
    },
    {
        title: "Tasa de Conversión",
        value: "32%",
        subtitle: "Últimos 30 días",
        icon: "trending_up",
        color: "text-info",
        trend: 5
    },
    {
        title: "Prospectos Calientes",
        value: "45",
        subtitle: "Alta prioridad",
        icon: "local_fire_department",
        color: "text-error",
        trend: -3
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

const openCreateModal = () => {
    prospectStore.setSelectedProspect()
    modalStore.open(prospectStore.modalId, { 
        type: 'CREATE', 
        title: 'Nuevo Prospecto' 
    })
}

const fetchProspectsWithFilters = async (page: number, pageSize: number) => {
    const filters = prospectStore.getFilters
    return await getProspects(page, pageSize, filters)
}

const handleFilter = (filters: ProspectFilterType) => {
    prospectStore.setFilters(filters)
    tablaRef.value?.fetchData()
}

const handleExport = async () => {
    try {
        const filters = prospectStore.getFilters
        const blob = await exportProspects(filters)
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `prospectos_${new Date().toISOString().split('T')[0]}.xlsx`
        link.click()
        window.URL.revokeObjectURL(url)
        showNotification('Prospectos exportados exitosamente', 'success')
    } catch (error) {
        showNotification('Error al exportar prospectos', 'error')
    }
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
                title="Prospectos" 
                subtitle="Gestión de prospectos y oportunidades de inversión"
            />
            <BaseButton 
                text="Nuevo Prospecto" 
                icon="person_add"
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

        <!-- Table -->
        <div class="card bg-base-100 shadow">
            <div class="card-body p-4">
                <h3 class="card-title text-base mb-4">Listado de Prospectos</h3>
                <BaseTable
                    ref="tablaRef"
                    :headers="getTableColumns()"
                    :fetch-callback="fetchProspectsWithFilters"
                />
            </div>
        </div>

        <!-- Modals -->
        <ProspectFormModal 
            :onRefresh="() => { 
                tablaRef?.fetchData(); 
                loadKPIs(); 
            }" 
        />
        <ProspectDetailModal />
    </div>
</template>
