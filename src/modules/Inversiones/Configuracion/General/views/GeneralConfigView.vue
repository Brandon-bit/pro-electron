<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import AddValueModal from '../components/AddValueModal.vue'
import AddImpuestoModal from '../components/AddImpuestoModal.vue'
import AddLiquidacionModal from '../components/AddLiquidacionModal.vue'
import { useGeneralConfig } from '../composables/useGeneralConfig'

const {
    plazos,
    diasCalculoInteres,
    rendimientos,
    tasasInteresMoratorio,
    impuestosPorAño,
    tiposLiquidacion,
    loading,
    fetchData,
    addPlazo,
    updatePlazo,
    deletePlazo,
    addDiaCalculoInteres,
    updateDiaCalculoInteres,
    deleteDiaCalculoInteres,
    addRendimiento,
    updateRendimiento,
    deleteRendimiento,
    addTasaInteresMoratorio,
    updateTasaInteresMoratorio,
    deleteTasaInteresMoratorio,
    addImpuestoPorAño,
    updateImpuestoPorAño,
    deleteImpuestoPorAño,
    addTipoLiquidacion,
    toggleTipoLiquidacion
} = useGeneralConfig()

const addValueModalRef = ref<InstanceType<typeof AddValueModal> | null>(null)
const addImpuestoModalRef = ref<InstanceType<typeof AddImpuestoModal> | null>(null)
const addLiquidacionModalRef = ref<InstanceType<typeof AddLiquidacionModal> | null>(null)
const currentSection = ref<string>('')

onMounted(() => {
    fetchData()
})

// Abrir modales
const openAddPlazoModal = () => {
    currentSection.value = 'plazos'
    addValueModalRef.value?.openModal('Agregar Plazo', 'Plazos en meses:')
}

const openAddDiaModal = () => {
    currentSection.value = 'dias'
    addValueModalRef.value?.openModal('Agregar Días', 'Días:')
}

const openAddRendimientoModal = () => {
    currentSection.value = 'rendimientos'
    addValueModalRef.value?.openModal('Agregar Rendimiento', 'Interés:')
}

const openAddTasaModal = () => {
    currentSection.value = 'tasas'
    addValueModalRef.value?.openModal('Agregar Tasa', 'Interés:')
}

const openAddImpuestoModal = () => {
    addImpuestoModalRef.value?.openModal()
}

const openAddLiquidacionModal = () => {
    addLiquidacionModalRef.value?.openModal()
}

// Manejar confirmaciones
const handleAddValue = (value: number) => {
    switch (currentSection.value) {
        case 'plazos':
            addPlazo(value)
            break
        case 'dias':
            addDiaCalculoInteres(value)
            break
        case 'rendimientos':
            addRendimiento(value)
            break
        case 'tasas':
            addTasaInteresMoratorio(value)
            break
    }
}

const handleAddImpuesto = (data: { impuesto: number, año: number }) => {
    addImpuestoPorAño(data.impuesto, data.año)
}

const handleAddLiquidacion = (nombre: string) => {
    addTipoLiquidacion(nombre)
}

// Habilitar edición
const enableEdit = (item: any) => {
    item.isEditing = true
}

// Guardar edición
const saveEdit = (id: string | number, section: string) => {
    const item = getItemById(id, section)
    if (!item) return

    switch (section) {
        case 'plazos':
            updatePlazo(id, item.plazosEnMeses)
            break
        case 'dias':
            updateDiaCalculoInteres(id, item.dias)
            break
        case 'rendimientos':
            updateRendimiento(id, item.interes)
            break
        case 'tasas':
            updateTasaInteresMoratorio(id, item.interes)
            break
        case 'impuestos':
            updateImpuestoPorAño(id, item.impuesto, item.año)
            break
    }
}

// Eliminar
const handleDelete = (id: string | number, section: string) => {
    if (!confirm('¿Está seguro de eliminar este elemento?')) return

    switch (section) {
        case 'plazos':
            deletePlazo(id)
            break
        case 'dias':
            deleteDiaCalculoInteres(id)
            break
        case 'rendimientos':
            deleteRendimiento(id)
            break
        case 'tasas':
            deleteTasaInteresMoratorio(id)
            break
        case 'impuestos':
            deleteImpuestoPorAño(id)
            break
    }
}

// Helper para obtener item por ID
const getItemById = (id: string | number, section: string) => {
    switch (section) {
        case 'plazos':
            return plazos.value.find(p => p.id === id)
        case 'dias':
            return diasCalculoInteres.value.find(d => d.id === id)
        case 'rendimientos':
            return rendimientos.value.find(r => r.id === id)
        case 'tasas':
            return tasasInteresMoratorio.value.find(t => t.id === id)
        case 'impuestos':
            return impuestosPorAño.value.find(i => i.id === id)
        default:
            return null
    }
}
</script>

<template>
    <div>
        <BaseTitle 
            title="Configuración General" 
            subtitle="Gestión de parámetros generales del sistema"
        />
        
        <div class="container mx-auto p-6">
            <!-- Grid de 2 columnas -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Plazos -->
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold">Plazos</h3>
                            <button class="btn btn-primary btn-sm" @click="openAddPlazoModal">
                                <span class="material-symbols-outlined text-sm">add</span>
                                Agregar
                            </button>
                        </div>

                        <table class="table table-sm w-full">
                            <thead class="bg-neutral text-neutral-content">
                                <tr>
                                    <th>Plazos en meses</th>
                                    <th class="text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="plazo in plazos" :key="plazo.id">
                                    <td>
                                        <input
                                            v-model.number="plazo.plazosEnMeses"
                                            type="number"
                                            class="input input-bordered input-sm w-full"
                                            :readonly="!plazo.isEditing"
                                            :class="{ 'input-ghost': !plazo.isEditing }"
                                        />
                                    </td>
                                    <td class="text-right">
                                        <div class="flex gap-1 justify-end">
                                            <button
                                                v-if="!plazo.isEditing"
                                                class="btn btn-primary btn-xs"
                                                @click="enableEdit(plazo)"
                                            >
                                                <span class="material-symbols-outlined text-xs">edit</span>
                                            </button>
                                            <button
                                                v-else
                                                class="btn btn-success btn-xs"
                                                @click="saveEdit(plazo.id, 'plazos')"
                                            >
                                                <span class="material-symbols-outlined text-xs">check</span>
                                            </button>
                                            <button
                                                class="btn btn-error btn-xs"
                                                @click="handleDelete(plazo.id, 'plazos')"
                                            >
                                                <span class="material-symbols-outlined text-xs">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Días para cálculo de interés diario -->
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold">Días para cálculo de interés diario</h3>
                            <button class="btn btn-primary btn-sm" @click="openAddDiaModal">
                                <span class="material-symbols-outlined text-sm">add</span>
                                Agregar
                            </button>
                        </div>

                        <table class="table table-sm w-full">
                            <thead class="bg-neutral text-neutral-content">
                                <tr>
                                    <th>Días</th>
                                    <th class="text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="dia in diasCalculoInteres" :key="dia.id">
                                    <td>
                                        <input
                                            v-model.number="dia.dias"
                                            type="number"
                                            class="input input-bordered input-sm w-full"
                                            :readonly="!dia.isEditing"
                                            :class="{ 'input-ghost': !dia.isEditing }"
                                        />
                                    </td>
                                    <td class="text-right">
                                        <div class="flex gap-1 justify-end">
                                            <button
                                                v-if="!dia.isEditing"
                                                class="btn btn-primary btn-xs"
                                                @click="enableEdit(dia)"
                                            >
                                                <span class="material-symbols-outlined text-xs">edit</span>
                                            </button>
                                            <button
                                                v-else
                                                class="btn btn-success btn-xs"
                                                @click="saveEdit(dia.id, 'dias')"
                                            >
                                                <span class="material-symbols-outlined text-xs">check</span>
                                            </button>
                                            <button
                                                class="btn btn-error btn-xs"
                                                @click="handleDelete(dia.id, 'dias')"
                                            >
                                                <span class="material-symbols-outlined text-xs">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Rendimientos -->
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold">Rendimientos</h3>
                            <button class="btn btn-primary btn-sm" @click="openAddRendimientoModal">
                                <span class="material-symbols-outlined text-sm">add</span>
                                Agregar
                            </button>
                        </div>

                        <table class="table table-sm w-full">
                            <thead class="bg-neutral text-neutral-content">
                                <tr>
                                    <th>Interés</th>
                                    <th class="text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="rendimiento in rendimientos" :key="rendimiento.id">
                                    <td>
                                        <input
                                            v-model.number="rendimiento.interes"
                                            type="number"
                                            class="input input-bordered input-sm w-full"
                                            :readonly="!rendimiento.isEditing"
                                            :class="{ 'input-ghost': !rendimiento.isEditing }"
                                            step="0.01"
                                        />
                                    </td>
                                    <td class="text-right">
                                        <div class="flex gap-1 justify-end">
                                            <button
                                                v-if="!rendimiento.isEditing"
                                                class="btn btn-primary btn-xs"
                                                @click="enableEdit(rendimiento)"
                                            >
                                                <span class="material-symbols-outlined text-xs">edit</span>
                                            </button>
                                            <button
                                                v-else
                                                class="btn btn-success btn-xs"
                                                @click="saveEdit(rendimiento.id, 'rendimientos')"
                                            >
                                                <span class="material-symbols-outlined text-xs">check</span>
                                            </button>
                                            <button
                                                class="btn btn-error btn-xs"
                                                @click="handleDelete(rendimiento.id, 'rendimientos')"
                                            >
                                                <span class="material-symbols-outlined text-xs">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Tasas Interés Moratorio -->
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold">Tasas Interés Moratorio</h3>
                            <button class="btn btn-primary btn-sm" @click="openAddTasaModal">
                                <span class="material-symbols-outlined text-sm">add</span>
                                Agregar
                            </button>
                        </div>

                        <table class="table table-sm w-full">
                            <thead class="bg-neutral text-neutral-content">
                                <tr>
                                    <th>Interés</th>
                                    <th class="text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tasa in tasasInteresMoratorio" :key="tasa.id">
                                    <td>
                                        <input
                                            v-model.number="tasa.interes"
                                            type="number"
                                            class="input input-bordered input-sm w-full"
                                            :readonly="!tasa.isEditing"
                                            :class="{ 'input-ghost': !tasa.isEditing }"
                                            step="0.01"
                                        />
                                    </td>
                                    <td class="text-right">
                                        <div class="flex gap-1 justify-end">
                                            <button
                                                v-if="!tasa.isEditing"
                                                class="btn btn-primary btn-xs"
                                                @click="enableEdit(tasa)"
                                            >
                                                <span class="material-symbols-outlined text-xs">edit</span>
                                            </button>
                                            <button
                                                v-else
                                                class="btn btn-success btn-xs"
                                                @click="saveEdit(tasa.id, 'tasas')"
                                            >
                                                <span class="material-symbols-outlined text-xs">check</span>
                                            </button>
                                            <button
                                                class="btn btn-error btn-xs"
                                                @click="handleDelete(tasa.id, 'tasas')"
                                            >
                                                <span class="material-symbols-outlined text-xs">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Impuestos por Año -->
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold">Impuestos por Año</h3>
                            <button class="btn btn-primary btn-sm" @click="openAddImpuestoModal">
                                <span class="material-symbols-outlined text-sm">add</span>
                                Agregar
                            </button>
                        </div>

                        <table class="table table-sm w-full">
                            <thead class="bg-neutral text-neutral-content">
                                <tr>
                                    <th>Impuesto</th>
                                    <th>Año</th>
                                    <th class="text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="impuesto in impuestosPorAño" :key="impuesto.id">
                                    <td>
                                        <input
                                            v-model.number="impuesto.impuesto"
                                            type="number"
                                            class="input input-bordered input-sm w-full"
                                            :readonly="!impuesto.isEditing"
                                            :class="{ 'input-ghost': !impuesto.isEditing }"
                                            step="0.01"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            v-model.number="impuesto.año"
                                            type="number"
                                            class="input input-bordered input-sm w-full"
                                            :readonly="!impuesto.isEditing"
                                            :class="{ 'input-ghost': !impuesto.isEditing }"
                                        />
                                    </td>
                                    <td class="text-right">
                                        <div class="flex gap-1 justify-end">
                                            <button
                                                v-if="!impuesto.isEditing"
                                                class="btn btn-primary btn-xs"
                                                @click="enableEdit(impuesto)"
                                            >
                                                <span class="material-symbols-outlined text-xs">edit</span>
                                            </button>
                                            <button
                                                v-else
                                                class="btn btn-success btn-xs"
                                                @click="saveEdit(impuesto.id, 'impuestos')"
                                            >
                                                <span class="material-symbols-outlined text-xs">check</span>
                                            </button>
                                            <button
                                                class="btn btn-error btn-xs"
                                                @click="handleDelete(impuesto.id, 'impuestos')"
                                            >
                                                <span class="material-symbols-outlined text-xs">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Tipos de liquidación -->
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold">Tipos de liquidación</h3>
                            <button class="btn btn-primary btn-sm" @click="openAddLiquidacionModal">
                                <span class="material-symbols-outlined text-sm">add</span>
                                Agregar
                            </button>
                        </div>

                        <div class="space-y-2">
                            <div 
                                v-for="tipo in tiposLiquidacion" 
                                :key="tipo.id"
                                class="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
                            >
                                <input
                                    type="checkbox"
                                    :checked="tipo.activo"
                                    @change="toggleTipoLiquidacion(tipo.id)"
                                    class="checkbox checkbox-success"
                                />
                                <span class="flex-1">{{ tipo.nombre }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modales -->
        <AddValueModal
            ref="addValueModalRef"
            @confirm="handleAddValue"
        />

        <AddImpuestoModal
            ref="addImpuestoModalRef"
            @confirm="handleAddImpuesto"
        />

        <AddLiquidacionModal
            ref="addLiquidacionModalRef"
            @confirm="handleAddLiquidacion"
        />
    </div>
</template>
