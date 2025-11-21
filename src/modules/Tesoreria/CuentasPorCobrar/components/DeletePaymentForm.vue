<script setup lang="ts">
import useAccountReceivableStore from '@/modules/Tesoreria/CuentasPorCobrar/store/accountReceivableStore'

const accountReceivableStore = useAccountReceivableStore()

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
</script>

<template>
    <div class="space-y-4">
        <p class="text-center text-lg font-semibold">
            ¿Estás seguro de que deseas eliminar este pago?
        </p>
        <div class="bg-base-200 p-4 rounded-lg space-y-2">
            <div class="grid grid-cols-2 gap-2">
                <p class="font-semibold">Fecha de Pago:</p>
                <p>{{ formatDate(accountReceivableStore.currentPayment.paymentDate) }}</p>
                
                <p class="font-semibold">Monto:</p>
                <p class="text-success font-semibold">{{ formatCurrency(accountReceivableStore.currentPayment.amount) }}</p>
                
                <p class="font-semibold">Método de Pago:</p>
                <p>{{ paymentMethodMap[accountReceivableStore.currentPayment.paymentMethod] }}</p>
                
                <p class="font-semibold">Referencia:</p>
                <p>{{ accountReceivableStore.currentPayment.reference || '-' }}</p>
            </div>
        </div>
        <p class="text-center text-sm text-warning">
            Esta acción no se puede deshacer
        </p>
    </div>
</template>
