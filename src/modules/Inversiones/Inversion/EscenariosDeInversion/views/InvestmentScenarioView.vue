<script setup lang="ts">
import { watch, onMounted, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { useInvestmentCalculator } from '../composables/useInvestmentCalculator'

const { scenario, result, calculate, reset } = useInvestmentCalculator()

// Computed para plazo en días
const plazoDiasCalculado = computed(() => scenario.value.plazoMeses * 30)

// Opciones de plazo en meses
const plazoOptions = [
    { value: 6, label: '6 meses' },
    { value: 12, label: '12 meses' },
    { value: 18, label: '18 meses' },
    { value: 24, label: '24 meses' },
    { value: 30, label: '30 meses' },
    { value: 36, label: '36 meses' },
    { value: 42, label: '42 meses' },
    { value: 48, label: '48 meses' }
]

// Opciones de modalidad
const modalidadOptions = [
    { value: 'mensual', label: 'Pago mensual' },
    { value: 'bimestral', label: 'Pago bimestral' },
    { value: 'trimestral', label: 'Pago trimestral' },
    { value: 'cuatrimestral', label: 'Pago cuatrimestral' },
    { value: 'semestral', label: 'Pago semestral' },
    { value: 'vencimiento', label: 'Vencimiento' },
    { value: 'reinversion', label: 'Reinversión' }
]

// Información de la empresa (mock data)
const companyInfo = {
    nombre: 'PHIVC',
    direccion: 'Av. P.º de la Reforma 342, Juárez, Cuauhtémoc, 06600',
    ciudad: 'Ciudad de México, CDMX',
    rfc: 'rfc'
}

// Actualizar días cuando cambian los meses
watch(() => scenario.value.plazoMeses, () => {
    scenario.value.plazoDias = scenario.value.plazoMeses * 30
})

// Inicializar plazo en días al montar
onMounted(() => {
    scenario.value.plazoDias = scenario.value.plazoMeses * 30
})

// Manejar cálculo
const handleCalculate = () => {
    calculate()
}

// Descargar cálculo (placeholder)
const handleDownload = () => {
    console.log('Descargar cálculo:', result.value)
    // Aquí se implementaría la descarga en PDF o Excel
}

// Formatear moneda
const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
</script>

<template>
    <div>
        <BaseTitle 
            title="Escenario de inversión" 
            subtitle="Calculadora de inversiones"
        />
        
        <div class="container mx-auto p-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Formulario de cálculo -->
                <div class="lg:col-span-1">
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body space-y-4">
                            <!-- Nombre -->
                            <BaseFormInput
                                v-model="scenario.nombre"
                                name="nombre"
                                label="Nombre:"
                                placeholder="Ingrese el nombre"
                            />

                            <!-- Monto -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-semibold">Monto:</span>
                                </label>
                                <input
                                    v-model.number="scenario.monto"
                                    type="number"
                                    class="input input-bordered w-full"
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <!-- Tasa de interés -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-semibold">Tasa de interés:</span>
                                </label>
                                <input
                                    v-model.number="scenario.tasaInteres"
                                    type="number"
                                    class="input input-bordered w-full"
                                    placeholder="0"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                />
                            </div>

                            <!-- Plazo Meses -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-semibold">Plazo Meses:</span>
                                </label>
                                <select 
                                    v-model.number="scenario.plazoMeses"
                                    class="select select-bordered w-full"
                                >
                                    <option 
                                        v-for="option in plazoOptions" 
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>

                            <!-- Plazo Días (readonly) -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-semibold">Plazo Días:</span>
                                </label>
                                <input
                                    type="number"
                                    class="input input-bordered w-full"
                                    :value="plazoDiasCalculado"
                                    readonly
                                />
                            </div>

                            <!-- Modalidad -->
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-semibold">Modalidad:</span>
                                </label>
                                <select 
                                    v-model="scenario.modalidad"
                                    class="select select-bordered w-full"
                                >
                                    <option 
                                        v-for="option in modalidadOptions" 
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>

                            <!-- Botón Calcular -->
                            <button 
                                class="btn btn-success w-full"
                                @click="handleCalculate"
                            >
                                Calcular
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Resultados -->
                <div class="lg:col-span-2">
                    <div v-if="result" class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <!-- Información de la empresa -->
                            <div class="text-right mb-4">
                                <p class="font-bold text-lg">{{ companyInfo.nombre }}</p>
                                <p class="text-sm">{{ companyInfo.direccion }}</p>
                                <p class="text-sm">{{ companyInfo.ciudad }}</p>
                                <p class="text-sm">RFC: {{ companyInfo.rfc }}</p>
                            </div>

                            <!-- Tabla de resultados -->
                            <div class="overflow-x-auto">
                                <table class="table table-zebra w-full">
                                    <thead class="bg-neutral text-neutral-content">
                                        <tr>
                                            <th>Mes</th>
                                            <th>Días</th>
                                            <th>Interés</th>
                                            <th>Rendimiento Final</th>
                                            <th>Mes de pago</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr 
                                            v-for="calc in result.calculations" 
                                            :key="calc.mes"
                                        >
                                            <td>{{ calc.mes }}</td>
                                            <td>{{ calc.dias }}</td>
                                            <td>{{ formatCurrency(calc.interes) }}</td>
                                            <td>{{ formatCurrency(calc.rendimientoFinal) }}</td>
                                            <td class="text-center">
                                                <span 
                                                    v-if="calc.mesDePago"
                                                    class="material-symbols-outlined text-success"
                                                >
                                                    check_circle
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot class="bg-neutral text-neutral-content font-bold">
                                        <tr>
                                            <td></td>
                                            <td>{{ result.totalDias }}</td>
                                            <td>{{ formatCurrency(result.totalInteres) }}</td>
                                            <td>{{ formatCurrency(result.totalRendimiento) }}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <!-- Botón Descargar -->
                            <div class="flex justify-center mt-4">
                                <button 
                                    class="btn btn-success w-full max-w-md"
                                    @click="handleDownload"
                                >
                                    <span class="material-symbols-outlined">download</span>
                                    Descargar cálculo
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Mensaje cuando no hay resultados -->
                    <div v-else class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <div class="text-center py-12 text-base-content/50">
                                <span class="material-symbols-outlined text-6xl mb-4">calculate</span>
                                <p class="text-lg">Complete el formulario y presione "Calcular" para ver los resultados</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
