<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import useInvoiceStore from '@/modules/Fiscal/FacturasEmitidas/store/invoiceStore'
import { useModalStore } from '@/shared/stores/modal.store'
import useInvoice from '@/modules/Fiscal/FacturasEmitidas/composables/useInvoice'
import { useInvoiceActions } from '@/modules/Fiscal/FacturasEmitidas/composables/useInvoiceActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const invoiceStore = useInvoiceStore()
const modalStore = useModalStore()
const { formatCurrency, formatDate, getStatusColor, getStatusIcon } = useInvoice()
const { stampInvoice, downloadPdf, downloadXml } = useInvoiceActions()

const isProcessing = ref(false)

const handleStamp = async () => {
    isProcessing.value = true
    try {
        const { message, status } = await stampInvoice()
        showNotification(message, status)
        if (status === 'success') {
            props.onRefresh?.()
            modalStore.close(invoiceStore.detailModalId)
        }
    } catch (error) {
        showNotification('Error al timbrar la factura', 'error')
    } finally {
        isProcessing.value = false
    }
}

const handleDownloadPdf = async () => {
    try {
        const blob = await downloadPdf()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `factura-${invoiceStore.selectedInvoice?.folio}.pdf`
        link.click()
        window.URL.revokeObjectURL(url)
        showNotification('PDF descargado exitosamente', 'success')
    } catch (error) {
        showNotification('Error al descargar el PDF', 'error')
    }
}

const handleDownloadXml = async () => {
    try {
        const blob = await downloadXml()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `factura-${invoiceStore.selectedInvoice?.folio}.xml`
        link.click()
        window.URL.revokeObjectURL(url)
        showNotification('XML descargado exitosamente', 'success')
    } catch (error) {
        showNotification('Error al descargar el XML', 'error')
    }
}

const handleCancel = () => {
    modalStore.open(invoiceStore.cancelModalId, {
        type: 'CANCEL',
        title: 'Cancelar Factura'
    })
}

const onClose = () => {
    invoiceStore.setData()
}
</script>

<template>
    <BaseModal
        :modalId="invoiceStore.detailModalId"
        :onClose="onClose"
        :showFooter="false"
        size="large"
    >
        <template v-slot:modalBody>
            <div v-if="invoiceStore.selectedInvoice" class="space-y-4">
                <!-- Header -->
                <div class="flex items-center justify-between border-b pb-4">
                    <div>
                        <h2 class="text-xl font-bold">{{ invoiceStore.selectedInvoice.folio }}</h2>
                        <p class="text-sm text-base-content/60 font-mono">{{ invoiceStore.selectedInvoice.uuid || 'Sin UUID' }}</p>
                    </div>
                    <span class="badge badge-lg" :class="getStatusColor(invoiceStore.selectedInvoice.status)">
                        <span class="material-symbols-outlined text-sm mr-1">
                            {{ getStatusIcon(invoiceStore.selectedInvoice.status) }}
                        </span>
                        {{ invoiceStore.selectedInvoice.status }}
                    </span>
                </div>

                <!-- Client Info -->
                <div class="card bg-base-200">
                    <div class="card-body p-4">
                        <h3 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">person</span>
                            Información del Cliente
                        </h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <p class="text-xs text-base-content/60">Nombre</p>
                                <p class="font-medium">{{ invoiceStore.selectedInvoice.clientName }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-base-content/60">RFC</p>
                                <p class="font-medium font-mono">{{ invoiceStore.selectedInvoice.clientRfc }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Invoice Info -->
                <div class="card bg-base-200">
                    <div class="card-body p-4">
                        <h3 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">receipt_long</span>
                            Información de la Factura
                        </h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <p class="text-xs text-base-content/60">Fecha de Emisión</p>
                                <p class="font-medium">{{ formatDate(invoiceStore.selectedInvoice.issueDate) }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-base-content/60">Método de Pago</p>
                                <p class="font-medium">{{ invoiceStore.selectedInvoice.paymentMethod }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-base-content/60">Forma de Pago</p>
                                <p class="font-medium">{{ invoiceStore.selectedInvoice.paymentForm }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-base-content/60">Uso de CFDI</p>
                                <p class="font-medium">{{ invoiceStore.selectedInvoice.cfdiUse }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Items -->
                <div class="card bg-base-200">
                    <div class="card-body p-4">
                        <h3 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">list</span>
                            Conceptos
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Descripción</th>
                                        <th class="text-right">P. Unitario</th>
                                        <th class="text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, idx) in invoiceStore.selectedInvoice.items" :key="idx">
                                        <td>{{ item.quantity }} {{ item.unit }}</td>
                                        <td>{{ item.description }}</td>
                                        <td class="text-right">{{ formatCurrency(item.unitPrice) }}</td>
                                        <td class="text-right font-semibold">{{ formatCurrency(item.total) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Totals -->
                <div class="card bg-primary text-primary-content">
                    <div class="card-body p-4">
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span>Subtotal:</span>
                                <span class="font-semibold">{{ formatCurrency(invoiceStore.selectedInvoice.subtotal) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>IVA (16%):</span>
                                <span class="font-semibold">{{ formatCurrency(invoiceStore.selectedInvoice.tax) }}</span>
                            </div>
                            <div class="divider my-1"></div>
                            <div class="flex justify-between text-lg">
                                <span class="font-bold">Total:</span>
                                <span class="font-bold">{{ formatCurrency(invoiceStore.selectedInvoice.total) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-2 flex-wrap">
                    <button 
                        v-if="invoiceStore.selectedInvoice.status === 'Borrador'"
                        class="btn btn-primary btn-sm"
                        @click="handleStamp"
                        :disabled="isProcessing"
                    >
                        <span class="material-symbols-outlined text-base">verified</span>
                        {{ isProcessing ? 'Timbrando...' : 'Timbrar Factura' }}
                    </button>
                    
                    <button 
                        v-if="invoiceStore.selectedInvoice.status === 'Timbrada'"
                        class="btn btn-error btn-sm"
                        @click="handleCancel"
                    >
                        <span class="material-symbols-outlined text-base">cancel</span>
                        Cancelar Factura
                    </button>

                    <button 
                        v-if="invoiceStore.selectedInvoice.pdfUrl"
                        class="btn btn-outline btn-sm"
                        @click="handleDownloadPdf"
                    >
                        <span class="material-symbols-outlined text-base">picture_as_pdf</span>
                        Descargar PDF
                    </button>

                    <button 
                        v-if="invoiceStore.selectedInvoice.xmlUrl"
                        class="btn btn-outline btn-sm"
                        @click="handleDownloadXml"
                    >
                        <span class="material-symbols-outlined text-base">code</span>
                        Descargar XML
                    </button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
