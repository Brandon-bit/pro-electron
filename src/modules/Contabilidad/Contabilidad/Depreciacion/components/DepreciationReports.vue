<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useDepreciationStore from '@/modules/Contabilidad/Contabilidad/Depreciacion/store/depreciationStore'
import { useDepreciationActions } from '@/modules/Contabilidad/Contabilidad/Depreciacion/composables/useDepreciationActions'
import { showNotification } from '@/utils/toastNotifications'

const depreciationStore = useDepreciationStore()
const {
    downloadAnnualDepreciationReport,
    downloadAccountingTaxReconciliationReport,
    downloadDepreciationHistoryReport
} = useDepreciationActions()

const handleDownloadAnnualReport = async () => {
    try {
        await downloadAnnualDepreciationReport(depreciationStore.selectedYear)
        showNotification('Descargando reporte anual de depreciación...', 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al descargar el reporte', 'error')
    }
}

const handleDownloadReconciliationReport = async () => {
    try {
        await downloadAccountingTaxReconciliationReport(depreciationStore.selectedYear)
        showNotification('Descargando reporte de conciliación...', 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al descargar el reporte', 'error')
    }
}

const handleDownloadHistoryReport = async () => {
    try {
        await downloadDepreciationHistoryReport()
        showNotification('Descargando historial de depreciaciones...', 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al descargar el reporte', 'error')
    }
}
</script>

<template>
    <div class="card bg-base-100 border border-base-content/10">
        <div class="card-body">
            <h3 class="card-title text-lg">Reportes de Depreciación</h3>
            <p class="text-sm text-gray-500 mb-4">
                Genere reportes detallados para conciliación contable-fiscal
            </p>

            <div class="flex gap-3 flex-wrap">
                <BaseButton
                    text="Reporte anual de depreciación"
                    icon="description"
                    variant="outline"
                    @click="handleDownloadAnnualReport"
                />
                <BaseButton
                    text="Conciliación contable-fiscal"
                    icon="description"
                    variant="outline"
                    @click="handleDownloadReconciliationReport"
                />
                <BaseButton
                    text="Historial de depreciaciones"
                    icon="description"
                    variant="outline"
                    @click="handleDownloadHistoryReport"
                />
            </div>
        </div>
    </div>
</template>
