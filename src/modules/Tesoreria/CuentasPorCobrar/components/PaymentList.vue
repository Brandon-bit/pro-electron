<script setup lang="ts">
import useAccountReceivableStore from '@/modules/Tesoreria/CuentasPorCobrar/store/accountReceivableStore'
import BaseActionButtonTable from '@/shared/components/BaseActionButtonTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const accountReceivableStore = useAccountReceivableStore()
const modalStore = useModalStore()

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount)
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const paymentMethodMap: Record<string, string> = {
    EFECTIVO: 'Efectivo',
    TRANSFERENCIA: 'Transferencia',
    CHEQUE: 'Cheque',
    TARJETA: 'Tarjeta',
    OTRO: 'Otro'
}

const showEditPaymentModal = (index: number) => {
    accountReceivableStore.setIndexPayment(index)
    accountReceivableStore.setCurrentPaymentByIndex(index)
    modalStore.open(accountReceivableStore.paymentModalId, {
        type: 'UPDATE',
        title: 'Editar pago'
    })
}

const showDeletePaymentModal = (index: number) => {
    accountReceivableStore.setIndexPayment(index)
    accountReceivableStore.setCurrentPaymentByIndex(index)
    modalStore.open(accountReceivableStore.paymentModalId, {
        type: 'DELETE',
        title: 'Eliminar pago'
    })
}
</script>

<template>
    <div v-if="accountReceivableStore.payments.length">
        <h3 class="text-center text-lg !font-semibold mb-5">Pagos registrados</h3>
        <div
            tabindex="0"
            class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
        >
            <div class="!block overflow-auto w-full max-w-full">
                <div class="overflow-x-auto">
                    <div class="max-h-[300px] overflow-y-auto">
                        <table class="table text-center w-full min-w-[600px]">
                            <thead class="bg-base-200">
                                <tr>
                                    <th class="sticky top-0 z-10 bg-base-200">Fecha de Pago</th>
                                    <th class="sticky top-0 z-10 bg-base-200">Monto</th>
                                    <th class="sticky top-0 z-10 bg-base-200">Método de Pago</th>
                                    <th class="sticky top-0 z-10 bg-base-200">Referencia</th>
                                    <th class="sticky top-0 z-10 bg-base-200">Notas</th>
                                    <th class="sticky top-0 z-10 bg-base-200">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(payment, index) in accountReceivableStore.payments"
                                    :key="index"
                                >
                                    <td>{{ formatDate(payment.paymentDate) }}</td>
                                    <td class="font-semibold text-success">{{ formatCurrency(payment.amount) }}</td>
                                    <td>
                                        <span class="badge badge-info badge-sm">
                                            {{ paymentMethodMap[payment.paymentMethod] || payment.paymentMethod }}
                                        </span>
                                    </td>
                                    <td>{{ payment.reference || '-' }}</td>
                                    <td>{{ payment.notes || '-' }}</td>
                                    <td>
                                        <div class="flex justify-center gap-4">
                                            <BaseActionButtonTable
                                                icon="edit_square"
                                                variant="info"
                                                tooltipText="Editar"
                                                :onClick="() => showEditPaymentModal(index)"
                                            />
                                            <BaseActionButtonTable
                                                icon="delete"
                                                variant="error"
                                                tooltipText="Eliminar"
                                                :onClick="() => showDeletePaymentModal(index)"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
