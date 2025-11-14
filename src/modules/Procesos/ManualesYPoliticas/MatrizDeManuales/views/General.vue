<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import SelectorCadenaValor from '../components/SelectorCadenaValor.vue'
import GestorArchivos from '../components/GestorArchivos.vue'
import HistorialLinks from '../components/HistorialLinks.vue'
import AgregarManualModal from '../components/AgregarManualModal.vue'
import { useManualesStore } from '../store/manualesStore'
import { useManualesActions } from '../composables/useManualesActions'
import { useManualesUtils } from '../composables/useManualesUtils'
import type { IManual } from '../types/manuales.types'

const router = useRouter()
const manualesStore = useManualesStore()
const { loadCadenasValor, loadNiveles1, loadEspacios, eliminarManual, toggleHabilitar } = useManualesActions()
const { getBadgePromedioAuditoria, exportarCSV } = useManualesUtils()

// Tab activo
const tabActivo = ref<'cv' | 'manual'>('cv')

// Modales
const showModalAgregar = ref(false)

// Simular rol de usuario
const simularOwner = ref(false)

onMounted(async () => {
    await loadCadenasValor()
    await loadNiveles1()
    
    // Simular que tenemos Owner si toggle activo
    manualesStore.setUserRole(simularOwner.value, true)
    
    // Si hay CV, cargar espacios de la primera
    if (manualesStore.cadenasValor.length > 0) {
        await loadEspacios(manualesStore.cadenasValor[0].dni)
    }
})

const handleAgregarManual = () => {
    showModalAgregar.value = true
}

const handleEliminarManual = async (manual: IManual) => {
    if (confirm(`¿Eliminar manual "${manual.lvl2}"?\n\nEsta acción no se puede deshacer.`)) {
        await eliminarManual(manual.dni)
    }
}

const handleToggleHabilitar = async (manual: IManual) => {
    const nuevoEstado = !manual.habilitado
    await toggleHabilitar(manual.dni, nuevoEstado)
}

const handleAuditar = (manual: IManual) => {
    // Redirigir a vista de Auditorías
    router.push({
        path: '/procesos/manuales-y-politicas/auditorias',
        query: {
            idProc: manual.dni,
            idForm: 0
        }
    })
}

const handleExportarCSV = () => {
    if (tabActivo.value === 'cv') {
        exportarCSV(manualesStore.manualesCV, 'cv')
    } else {
        exportarCSV(manualesStore.manuales, 'manual')
    }
}

const toggleOwner = () => {
    simularOwner.value = !simularOwner.value
    manualesStore.setUserRole(simularOwner.value, true)
}
</script>

<template>
    <div class="container mx-auto">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <BaseTitle 
                title="Manuales y Políticas" 
                subtitle="Gestión de documentación de procesos" 
            />
            
            <!-- Toggle Owner (solo para demo) -->
            <div class="form-control">
                <label class="label cursor-pointer gap-2">
                    <span class="label-text">Simular Owner</span>
                    <input 
                        type="checkbox" 
                        class="toggle toggle-primary"
                        v-model="simularOwner"
                        @change="toggleOwner"
                    />
                </label>
            </div>
        </div>

        <div class="divider"></div>

        <!-- Selector de Cadena de Valor -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <SelectorCadenaValor />
        </div>

        <!-- Contenido cuando hay CV seleccionada -->
        <div v-if="manualesStore.hayDatos">
            <!-- Info CV -->
            <div class="alert mb-6">
                <span class="material-symbols-outlined">account_tree</span>
                <div>
                    <p class="font-semibold">Cadena de valor:</p>
                    <p class="text-lg">{{ manualesStore.cvSeleccionada?.name }}</p>
                </div>
            </div>

            <!-- Stats -->
            <div class="stats stats-vertical md:stats-horizontal shadow w-full mb-6">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <span class="material-symbols-outlined text-3xl">folder</span>
                    </div>
                    <div class="stat-title">Manuales CV</div>
                    <div class="stat-value text-primary">{{ manualesStore.totalManualesCV }}</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <span class="material-symbols-outlined text-3xl">description</span>
                    </div>
                    <div class="stat-title">Manuales Propios</div>
                    <div class="stat-value text-secondary">{{ manualesStore.totalManuales }}</div>
                    <div class="stat-desc">
                        {{ manualesStore.manualesHabilitados }} habilitados
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-accent">
                        <span class="material-symbols-outlined text-3xl">quiz</span>
                    </div>
                    <div class="stat-title">Auditorías</div>
                    <div class="stat-value text-accent">{{ manualesStore.totalAuditorias }}</div>
                    <div class="stat-desc">
                        Promedio: {{ manualesStore.promedioGlobalAuditorias }}%
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-info">
                        <span class="material-symbols-outlined text-3xl">attach_file</span>
                    </div>
                    <div class="stat-title">Archivos</div>
                    <div class="stat-value text-info">{{ manualesStore.totalArchivos }}</div>
                </div>
            </div>

            <!-- Tabs -->
            <div role="tablist" class="tabs tabs-lifted tabs-lg">
                <input 
                    type="radio" 
                    name="main_tabs" 
                    role="tab" 
                    class="tab" 
                    aria-label="Cadena de valor"
                    :checked="tabActivo === 'cv'"
                    @change="tabActivo = 'cv'"
                />
                <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <!-- Tabla Manuales CV -->
                    <div class="flex justify-end mb-4">
                        <button class="btn btn-sm btn-outline btn-success" @click="handleExportarCSV">
                            <span class="material-symbols-outlined">download</span>
                            Exportar CSV
                        </button>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="table table-sm table-zebra">
                            <thead class="bg-base-300">
                                <tr class="text-center">
                                    <th class="w-12">#</th>
                                    <th>Macroprocesos<br/>(Nivel 1)</th>
                                    <th>Grupo de Procesos<br/>(Nivel 2)</th>
                                    <th>Procesos<br/>(Nivel 3)</th>
                                    <th>Diagrama de Flujo<br/>(Nivel 4)</th>
                                    <th class="w-48">Manual de procesos<br/>(Nivel 5)</th>
                                    <th>Historial de Versiones</th>
                                    <th>Versión Actual</th>
                                    <th class="w-48">Documentos de Soporte</th>
                                    <th>Historial de Auditorías</th>
                                    <th>Promedio</th>
                                    <th class="w-24"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(manual, idx) in manualesStore.manualesCV" :key="manual.dni">
                                    <td class="text-center">{{ idx + 1 }}</td>
                                    <td>{{ manual.lvl1 }}</td>
                                    <td>{{ manual.lvl2 }}</td>
                                    <td class="text-left">
                                        <ul v-if="manual.isAuto" class="list-disc list-inside">
                                            <li v-for="p in manual.Lvls3" :key="p.lvl3">{{ p.lvl3 }}</li>
                                        </ul>
                                        <div v-else>{{ manual.lvls3 }}</div>
                                    </td>
                                    <td class="text-center">{{ manual.diagrama }}</td>
                                    <td>
                                        <GestorArchivos 
                                            :dni-manual="manual.dni"
                                            :archivos="manual.Manuales"
                                            tipo="version"
                                            tipos-permitidos=".docx"
                                            :can-delete="manualesStore.currentUser.isOwner || manualesStore.currentUser.canEdit"
                                        />
                                    </td>
                                    <td class="text-center">
                                        <HistorialLinks 
                                            tipo="versiones"
                                            :historial="manual.Historial"
                                            :dni-proceso="manual.dni"
                                        />
                                    </td>
                                    <td class="text-center">
                                        <HistorialLinks 
                                            tipo="versiones"
                                            :historial="manual.Historial.filter(h => h.final)"
                                            :dni-proceso="manual.dni"
                                        />
                                    </td>
                                    <td>
                                        <GestorArchivos 
                                            :dni-manual="manual.dni"
                                            :archivos="manual.Soporte"
                                            tipo="soporte"
                                            tipos-permitidos=".png,.jpg,.jpeg,.pdf,.docx,.xlsx,.pptx"
                                            :can-delete="manualesStore.currentUser.isOwner || manualesStore.currentUser.canEdit"
                                        />
                                    </td>
                                    <td class="text-center">
                                        <HistorialLinks 
                                            tipo="auditorias"
                                            :historial="manual.HistorialAu"
                                            :dni-proceso="manual.dni"
                                        />
                                    </td>
                                    <td class="text-center">
                                        <span 
                                            v-if="manual.promedioAuditorias > 0"
                                            class="badge badge-sm"
                                            :class="getBadgePromedioAuditoria(manual.promedioAuditorias)"
                                        >
                                            {{ manual.promedioAuditorias }}%
                                        </span>
                                        <span v-else class="text-xs opacity-50">-</span>
                                    </td>
                                    <td class="text-center">
                                        <button 
                                            class="btn btn-xs btn-primary"
                                            @click="handleAuditar(manual)"
                                        >
                                            Auditar
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="manualesStore.manualesCV.length === 0">
                                    <td colspan="12" class="text-center py-8 opacity-50">
                                        No hay manuales de cadena de valor
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <input 
                    type="radio" 
                    name="main_tabs" 
                    role="tab" 
                    class="tab" 
                    aria-label="Manual"
                    :checked="tabActivo === 'manual'"
                    @change="tabActivo = 'manual'"
                />
                <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <!-- Tabla Manuales Manuales -->
                    <div class="flex justify-between mb-4">
                        <button class="btn btn-sm btn-primary" @click="handleAgregarManual">
                            <span class="material-symbols-outlined">add</span>
                            Agregar Manual
                        </button>
                        <button class="btn btn-sm btn-outline btn-success" @click="handleExportarCSV">
                            <span class="material-symbols-outlined">download</span>
                            Exportar CSV
                        </button>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="table table-sm table-zebra">
                            <thead class="bg-base-300">
                                <tr class="text-center">
                                    <th class="w-12">#</th>
                                    <th>Macroprocesos<br/>(Nivel 1)</th>
                                    <th>Grupo de Procesos<br/>(Nivel 2)</th>
                                    <th>Procesos<br/>(Nivel 3)</th>
                                    <th>Diagrama de Flujo<br/>(Nivel 4)</th>
                                    <th class="w-48">Manual de procesos<br/>(Nivel 5)</th>
                                    <th>Historial de Versiones</th>
                                    <th>Versión Actual</th>
                                    <th class="w-48">Documentos de Soporte</th>
                                    <th>Historial de Auditorías</th>
                                    <th>Promedio</th>
                                    <th class="w-32"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr 
                                    v-for="(manual, idx) in manualesStore.manuales" 
                                    :key="manual.dni"
                                    :class="{ 'opacity-50': manual.habilitado === false }"
                                >
                                    <td class="text-center">{{ idx + 1 }}</td>
                                    <td>{{ manual.lvl1 }}</td>
                                    <td>{{ manual.lvl2 }}</td>
                                    <td class="text-left whitespace-pre-line">{{ manual.lvls3 }}</td>
                                    <td class="text-center">{{ manual.diagrama }}</td>
                                    <td :class="{ 'pointer-events-none': manual.habilitado === false }">
                                        <GestorArchivos 
                                            :dni-manual="manual.dni"
                                            :archivos="manual.Manuales"
                                            tipo="version"
                                            tipos-permitidos=".docx"
                                            :can-delete="manualesStore.currentUser.isOwner || manualesStore.currentUser.canEdit"
                                        />
                                    </td>
                                    <td class="text-center">
                                        <HistorialLinks 
                                            tipo="versiones"
                                            :historial="manual.Historial"
                                            :dni-proceso="manual.dni"
                                        />
                                    </td>
                                    <td class="text-center">
                                        <HistorialLinks 
                                            tipo="versiones"
                                            :historial="manual.Historial.filter(h => h.final)"
                                            :dni-proceso="manual.dni"
                                        />
                                    </td>
                                    <td :class="{ 'pointer-events-none': manual.habilitado === false }">
                                        <GestorArchivos 
                                            :dni-manual="manual.dni"
                                            :archivos="manual.Soporte"
                                            tipo="soporte"
                                            tipos-permitidos=".png,.jpg,.jpeg,.pdf,.docx,.xlsx,.pptx"
                                            :can-delete="manualesStore.currentUser.isOwner || manualesStore.currentUser.canEdit"
                                        />
                                    </td>
                                    <td class="text-center">
                                        <HistorialLinks 
                                            tipo="auditorias"
                                            :historial="manual.HistorialAu"
                                            :dni-proceso="manual.dni"
                                        />
                                    </td>
                                    <td class="text-center">
                                        <span 
                                            v-if="manual.promedioAuditorias > 0"
                                            class="badge badge-sm"
                                            :class="getBadgePromedioAuditoria(manual.promedioAuditorias)"
                                        >
                                            {{ manual.promedioAuditorias }}%
                                        </span>
                                        <span v-else class="text-xs opacity-50">-</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="flex flex-wrap gap-1 justify-center">
                                            <button 
                                                v-if="manual.habilitado"
                                                class="btn btn-xs btn-primary"
                                                @click="handleAuditar(manual)"
                                            >
                                                Auditar
                                            </button>
                                            <button 
                                                class="btn btn-xs btn-secondary"
                                                @click="handleToggleHabilitar(manual)"
                                            >
                                                {{ manual.habilitado ? 'Deshabilitar' : 'Habilitar' }}
                                            </button>
                                            <button 
                                                v-if="manualesStore.currentUser.isOwner"
                                                class="btn btn-xs btn-error"
                                                @click="handleEliminarManual(manual)"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="manualesStore.manuales.length === 0">
                                    <td colspan="12" class="text-center py-8 opacity-50">
                                        No hay manuales agregados manualmente
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Estado vacío -->
        <div v-else class="text-center py-20">
            <span class="material-symbols-outlined text-6xl text-base-content/30">folder_open</span>
            <p class="mt-4 text-xl text-base-content/70">
                Selecciona una cadena de valor para comenzar
            </p>
        </div>

        <!-- Modal Agregar Manual -->
        <AgregarManualModal 
            :show="showModalAgregar"
            @close="showModalAgregar = false"
            @saved="showModalAgregar = false"
        />
    </div>
</template>

<style scoped>
@media print {
    .btn, .toggle, .divider {
        display: none;
    }
}
</style>
