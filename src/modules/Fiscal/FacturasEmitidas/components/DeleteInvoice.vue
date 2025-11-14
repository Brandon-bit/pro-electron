<script setup lang="ts">
import useInvoiceStore from '@/modules/Fiscal/FacturasEmitidas/store/invoiceStore'
import useInvoice from '@/modules/Fiscal/FacturasEmitidas/composables/useInvoice'

const invoiceStore = useInvoiceStore()
const { formatCurrency, formatDate } = useInvoice()
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <span>Esta acción no se puede deshacer. ¿Está seguro de eliminar esta factura?</span>
        </div>

        <div class="card bg-base-200">
            <div class="card-body p-4 space-y-2">
                <div class="flex justify-between">
                    <span class="text-sm text-base-content/60">Folio:</span>
                    <span class="font-medium">{{ invoiceStore.selectedInvoice?.folio }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-sm text-base-content/60">Cliente:</span>
                    <span class="font-medium">{{ invoiceStore.selectedInvoice?.clientName }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-sm text-base-content/60">Fecha:</span>
                    <span class="font-medium">
                        {{ formatDate(invoiceStore.selectedInvoice?.issueDate || new Date()) }}
                    </span>
                </div>
                <div class="flex justify-between">
                    <span class="text-sm text-base-content/60">Total:</span>
                    <span class="font-medium">
                        {{ formatCurrency(invoiceStore.selectedInvoice?.total || 0) }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
