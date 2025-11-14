<script setup lang="ts">
import { computed } from 'vue'
import { useFieldArray } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import useInvoice from '@/modules/Fiscal/FacturasEmitidas/composables/useInvoice'

const { formatCurrency } = useInvoice()

const { fields, push, remove } = useFieldArray<any>('items')

const addItem = () => {
    push({
        quantity: 1,
        unit: 'Pieza',
        productCode: '',
        description: '',
        unitPrice: 0,
        discount: 0
    })
}

const calculateItemTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice - (item.discount || 0)
    const tax = subtotal * 0.16
    return subtotal + tax
}

const totalAmount = computed(() => {
    return fields.value.reduce((sum, item) => sum + calculateItemTotal(item.value), 0)
})
</script>

<template>
    <div class="card bg-base-200">
        <div class="card-body p-4">
            <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold flex items-center gap-2">
                    <span class="material-symbols-outlined">list</span>
                    Conceptos
                </h3>
                <button type="button" class="btn btn-primary btn-sm" @click="addItem">
                    <span class="material-symbols-outlined text-base">add</span>
                    Agregar Concepto
                </button>
            </div>

            <div v-if="fields.length === 0" class="text-center py-8 text-base-content/40">
                <span class="material-symbols-outlined text-4xl">inbox</span>
                <p class="text-sm mt-2">No hay conceptos agregados</p>
            </div>

            <div class="space-y-4">
                <div 
                    v-for="(field, index) in fields" 
                    :key="field.key"
                    class="card bg-base-100 border"
                >
                    <div class="card-body p-4">
                        <div class="flex items-center justify-between mb-3">
                            <h4 class="font-medium text-sm">Concepto {{ index + 1 }}</h4>
                            <button 
                                type="button" 
                                class="btn btn-ghost btn-xs btn-circle"
                                @click="remove(index)"
                            >
                                <span class="material-symbols-outlined text-base">close</span>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <BaseFormInput
                                :name="`items[${index}].quantity`"
                                label="Cantidad"
                                type="number"
                                step="0.01"
                                placeholder="1"
                                required
                            />
                            <BaseFormInput
                                :name="`items[${index}].unit`"
                                label="Unidad"
                                placeholder="Pieza"
                                required
                            />
                            <BaseFormInput
                                :name="`items[${index}].productCode`"
                                label="Clave Prod/Serv"
                                placeholder="01010101"
                                required
                            />
                            <BaseFormInput
                                :name="`items[${index}].description`"
                                label="Descripción"
                                placeholder="Descripción del producto o servicio"
                                class="md:col-span-2 lg:col-span-3"
                                required
                            />
                            <BaseFormInput
                                :name="`items[${index}].unitPrice`"
                                label="Precio Unitario"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                required
                            />
                            <BaseFormInput
                                :name="`items[${index}].discount`"
                                label="Descuento"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                            />
                            <div class="flex items-end">
                                <div class="form-control w-full">
                                    <label class="label">
                                        <span class="label-text">Total</span>
                                    </label>
                                    <div class="input input-bordered flex items-center bg-base-200">
                                        <span class="font-semibold">
                                            {{ formatCurrency(calculateItemTotal(field.value)) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Summary -->
            <div v-if="fields.length > 0" class="card bg-primary text-primary-content mt-4">
                <div class="card-body p-4">
                    <div class="flex items-center justify-between">
                        <span class="font-semibold">Total de la Factura:</span>
                        <span class="text-2xl font-bold">{{ formatCurrency(totalAmount) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
