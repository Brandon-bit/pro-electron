<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useContracts } from '../composables/useContracts'
import type { ContractDetail } from '../types/contractTypes'

const modalStore = useModalStore()
const modalId = 'contract-detail-modal'
const { fetchContractDetail } = useContracts()

const contractDetail = ref<ContractDetail | null>(null)
const loading = ref(false)
const calcularInteresMoratorio = ref(true)
const currentContractId = ref<string | number | null>(null)

const loadContractDetail = async () => {
    if (!currentContractId.value) return
    
    loading.value = true
    try {
        contractDetail.value = await fetchContractDetail(currentContractId.value)
        calcularInteresMoratorio.value = contractDetail.value.calcularInteresMoratorio
    } catch (error) {
        console.error('Error loading contract detail:', error)
    } finally {
        loading.value = false
    }
}

const onSubmit = () => {
    // Aquí iría la lógica para modificar el contrato
    console.log('Modificar contrato:', contractDetail.value)
    modalStore.close(modalId)
}

const onClose = () => {
    contractDetail.value = null
    currentContractId.value = null
}

const openModal = async (contractId: string | number) => {
    currentContractId.value = contractId
    modalStore.open(modalId, 'Detalle de contrato')
    await loadContractDetail()
}

const addNewPayment = (type: 'capital' | 'plan' | 'interes' | 'moratorio') => {
    console.log('Agregar nuevo pago:', type)
    // Aquí se agregaría la lógica para agregar pagos
}

const restructurePlan = () => {
    console.log('Reestructurar plan de pagos')
    // Aquí se agregaría la lógica para reestructurar
}

defineExpose({
    openModal
})
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="modalId"
        :isSubmitting="loading"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <div v-if="loading" class="flex justify-center py-8">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <div v-else-if="contractDetail" class="space-y-6">
                <!-- Nombre del cliente -->
                <div class="text-center">
                    <h3 class="text-xl font-semibold text-base-content/80">
                        {{ contractDetail.cliente }}
                    </h3>
                </div>

                <!-- Tipo de contrato y forma de liquidación -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="label">
                            <span class="label-text font-semibold">Tipo de contrato</span>
                        </label>
                        <p class="text-lg">{{ contractDetail.tipoContrato }}</p>
                    </div>
                    <div>
                        <label class="label">
                            <span class="label-text font-semibold">Forma de liquidación</span>
                        </label>
                        <p class="text-lg">{{ contractDetail.formaLiquidacion }}</p>
                    </div>
                </div>

                <!-- Botón plantilla y toggle -->
                <div class="flex justify-between items-center">
                    <button class="btn btn-sm btn-outline">
                        <span class="material-symbols-outlined text-sm">description</span>
                        Plantilla
                    </button>
                    <div class="form-control">
                        <label class="label cursor-pointer gap-2">
                            <span class="label-text">Calcular interés moratorio</span>
                            <input 
                                v-model="calcularInteresMoratorio"
                                type="checkbox" 
                                class="toggle toggle-primary" 
                            />
                        </label>
                    </div>
                </div>

                <!-- Botón Modificar -->
                <div class="flex justify-center">
                    <button class="btn btn-primary btn-sm">
                        <span class="material-symbols-outlined text-sm">edit</span>
                        Modificar
                    </button>
                </div>

                <!-- Fechas -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="label">
                            <span class="label-text font-semibold">Fecha inicio:</span>
                        </label>
                        <p>{{ contractDetail.fechaInicio }}</p>
                    </div>
                    <div>
                        <label class="label">
                            <span class="label-text font-semibold">Fecha fin:</span>
                        </label>
                        <p>{{ contractDetail.fechaFin }}</p>
                    </div>
                </div>

                <!-- Tabla de datos principales -->
                <div class="overflow-x-auto">
                    <table class="table table-sm bg-base-300">
                        <thead class="bg-neutral text-neutral-content">
                            <tr>
                                <th>Plazo en meses</th>
                                <th>Plazo en días</th>
                                <th>Tasa de interés</th>
                                <th>Impuesto</th>
                                <th>Interés moratorio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ contractDetail.plazoMeses }}</td>
                                <td>{{ contractDetail.plazoDias }}</td>
                                <td>{{ contractDetail.tasaInteres }}%</td>
                                <td>{{ contractDetail.impuesto }}%</td>
                                <td>{{ contractDetail.interesMoratorio }}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Montos -->
                <div class="overflow-x-auto">
                    <table class="table table-sm bg-base-300">
                        <thead class="bg-neutral text-neutral-content">
                            <tr>
                                <th>Pesos</th>
                                <th>Tipo de cambio</th>
                                <th>Dólares</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${{ contractDetail.montoPesos.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}</td>
                                <td>{{ contractDetail.tipoCambio || '-' }}</td>
                                <td>{{ contractDetail.montoDolares || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Botón Nueva parcialidad -->
                <div class="flex justify-center">
                    <button 
                        class="btn btn-primary btn-sm"
                        @click="addNewPayment('plan')"
                    >
                        <span class="material-symbols-outlined text-sm">add</span>
                        Nueva parcialidad
                    </button>
                </div>

                <!-- Pagos a capital -->
                <div class="bg-base-200 rounded-lg p-4">
                    <h4 class="font-bold text-center mb-3">Pagos a capital</h4>
                    <div class="overflow-x-auto">
                        <table class="table table-sm table-zebra">
                            <thead class="bg-neutral text-neutral-content">
                                <tr>
                                    <th>Monto</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="contractDetail.pagosCapital.length === 0">
                                    <td colspan="2" class="text-center text-base-content/50">
                                        No hay pagos registrados
                                    </td>
                                </tr>
                                <tr v-for="pago in contractDetail.pagosCapital" :key="pago.id">
                                    <td>${{ pago.monto.toLocaleString('es-MX') }}</td>
                                    <td>{{ pago.fecha }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Plan de pagos -->
                <div class="bg-base-200 rounded-lg p-4">
                    <h4 class="font-bold text-center mb-3">Plan de pagos</h4>
                    <div class="flex justify-center mb-3">
                        <button 
                            class="btn btn-warning btn-sm"
                            @click="restructurePlan"
                        >
                            <span class="material-symbols-outlined text-sm">refresh</span>
                            Reestructurar
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="table table-sm table-zebra">
                            <thead class="bg-neutral text-neutral-content">
                                <tr>
                                    <th>Parcialidad #</th>
                                    <th>Fecha inicio</th>
                                    <th>Fecha liquidación</th>
                                    <th>Días</th>
                                    <th>Fecha de pago</th>
                                    <th>Interés</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="plan in contractDetail.planPagos" :key="plan.id">
                                    <td>{{ plan.parcialidad }}</td>
                                    <td>{{ plan.fechaInicio }}</td>
                                    <td>{{ plan.fechaLiquidacion }}</td>
                                    <td>{{ plan.dias }}</td>
                                    <td>{{ plan.fechaPago }}</td>
                                    <td>${{ plan.interes }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-center mt-3">
                        <button 
                            class="btn btn-primary btn-sm"
                            @click="addNewPayment('plan')"
                        >
                            <span class="material-symbols-outlined text-sm">add</span>
                            Nueva parcialidad
                        </button>
                    </div>
                </div>

                <!-- Pagos a interés -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-base-200 rounded-lg p-4">
                        <h4 class="font-bold text-center mb-3">Pagos a interés</h4>
                        <div class="overflow-x-auto">
                            <table class="table table-sm table-zebra">
                                <thead class="bg-neutral text-neutral-content">
                                    <tr>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="contractDetail.pagosInteres.length === 0">
                                        <td colspan="2" class="text-center text-base-content/50">
                                            No hay pagos registrados
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="bg-base-200 rounded-lg p-4">
                        <h4 class="font-bold text-center mb-3">Pagos intereses moratorios</h4>
                        <div class="overflow-x-auto">
                            <table class="table table-sm table-zebra">
                                <thead class="bg-neutral text-neutral-content">
                                    <tr>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="contractDetail.pagosInteresesMoratorios.length === 0">
                                        <td colspan="2" class="text-center text-base-content/50">
                                            No hay pagos registrados
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
