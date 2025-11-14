<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useAuditoriasStore } from '../store/auditoriasStore'
import { useAuditoriasActions } from '../composables/useAuditoriasActions'
import { useAuditoriasUtils } from '../composables/useAuditoriasUtils'
import { useAuditoriasCalc } from '../composables/useAuditoriasCalc'
import { OPCIONES_EVALUACION } from '../types/auditorias.types'
import type { IAuditoria, IDominio, ISubdominio } from '../types/auditorias.types'

const route = useRoute()
const router = useRouter()
const store = useAuditoriasStore()
const { loadFormularios, loadAuditorias, nuevaAuditoria, terminarAuditoria, modificarEvaluacion, modificarSubdominio } = useAuditoriasActions()
const { getColorCalificacion, formatearCalificacion, puedeEditarAuditoria } = useAuditoriasUtils()
const { calcularTodasLasAuditorias } = useAuditoriasCalc()

// Refs
const showModalNueva = ref(false)
const descripcionNueva = ref('')

// Obtener parámetros de URL
// Si no hay idProc, usar 1001 por defecto (para testing)
const dniProc = Number(route.query.idProc) || 1001
const dniForm = Number(route.query.idForm) || null
const dniAu = Number(route.query.idAu) || null

onMounted(async () => {
    store.setDniProc(dniProc)
    store.setDniAu(dniAu)

    // Cargar formularios
    await loadFormularios(dniProc)

    // Si hay formulario seleccionado, cargar auditorías
    if (dniForm) {
        store.setDniForm(dniForm)
        await loadAuditorias(dniProc, dniForm)
    }
})

// Watch cambio de formulario
watch(() => store.dniForm, async (newForm, oldForm) => {
    if (newForm && newForm !== oldForm && store.dniProc) {
        // Actualizar URL
        router.push({ 
            query: { 
                idProc: store.dniProc, 
                idForm: newForm 
            } 
        })
        
        // Cargar auditorías
        await loadAuditorias(store.dniProc, newForm)
    }
})

// Handlers
const handleRegresar = () => {
    router.push('/procesos/manuales-y-politicas/matriz-de-manuales')
}

const handleNuevaAuditoria = () => {
    showModalNueva.value = true
    descripcionNueva.value = ''
}

const handleGuardarNueva = async () => {
    if (!descripcionNueva.value.trim()) {
        alert('Ingresa una descripción')
        return
    }

    const success = await nuevaAuditoria(descripcionNueva.value)
    if (success) {
        showModalNueva.value = false
    }
}

const handleTerminar = async (auditoria: IAuditoria) => {
    if (confirm(`¿Finalizar auditoría "${auditoria.descripcion}"?\n\nSe marcará con fecha actual.`)) {
        await terminarAuditoria(auditoria)
    }
}

const handleCambioEvaluacion = async (
    auditoria: IAuditoria,
    dominio: IDominio,
    subdominio: ISubdominio
) => {
    // Recalcular y guardar
    calcularTodasLasAuditorias(store.auditorias, store.mejoropcion)
    await modificarEvaluacion(auditoria, dominio, subdominio)
}

const handleCambioSubdominio = async (
    auditoria: IAuditoria,
    dominio: IDominio,
    subdominio: ISubdominio,
    event: Event
) => {
    const checked = (event.target as HTMLInputElement).checked
    await modificarSubdominio(auditoria, dominio, subdominio, checked)
}

const toggleAuditoria = (auditoria: IAuditoria) => {
    store.toggleAccordion(auditoria.dni)
}
</script>

<template>
    <div class="container mx-auto">
        <!-- Header -->
        <div class="mb-6">
            <BaseTitle 
                title="Auditorías de Manuales y Políticas" 
                subtitle="Evaluación y seguimiento de cumplimiento" 
            />
        </div>

        <div class="divider"></div>

        <!-- Selector de formulario -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="form-control">
                <label class="label">
                    <span class="label-text font-semibold flex items-center gap-2">
                        <span class="material-symbols-outlined">assignment</span>
                        Formulario de Auditoría
                    </span>
                </label>
                <select 
                    class="select select-bordered"
                    v-model="store.dniForm"
                    :disabled="store.isLoading"
                >
                    <option :value="null" disabled>Seleccionar formulario...</option>
                    <option 
                        v-for="form in store.formularios" 
                        :key="form.dni" 
                        :value="form.dni"
                    >
                        {{ form.titulo }}
                    </option>
                </select>
            </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex gap-2 mb-6">
            <button class="btn btn-sm btn-ghost" @click="handleRegresar">
                <span class="material-symbols-outlined">arrow_back</span>
                Regresar
            </button>
            <button 
                v-if="store.dniForm" 
                class="btn btn-sm btn-primary" 
                @click="handleNuevaAuditoria"
            >
                <span class="material-symbols-outlined">add</span>
                Nueva Auditoría
            </button>
        </div>

        <!-- Stats -->
        <div v-if="store.hayDatos && store.auditorias.length > 0" class="stats stats-vertical md:stats-horizontal shadow w-full mb-6">
            <div class="stat">
                <div class="stat-figure text-primary">
                    <span class="material-symbols-outlined text-3xl">fact_check</span>
                </div>
                <div class="stat-title">Total Auditorías</div>
                <div class="stat-value text-primary">{{ store.auditorias.length }}</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-success">
                    <span class="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <div class="stat-title">Finalizadas</div>
                <div class="stat-value text-success">{{ store.auditoriasFinalizadas.length }}</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-warning">
                    <span class="material-symbols-outlined text-3xl">schedule</span>
                </div>
                <div class="stat-title">Activas</div>
                <div class="stat-value text-warning">{{ store.auditoriasActivas.length }}</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-accent">
                    <span class="material-symbols-outlined text-3xl">grade</span>
                </div>
                <div class="stat-title">Promedio General</div>
                <div class="stat-value text-accent">{{ formatearCalificacion(store.promedioGeneral) }}</div>
            </div>
        </div>

        <!-- Lista de Auditorías -->
        <div v-if="store.hayDatos">
            <div v-if="store.auditorias.length === 0" class="text-center py-20">
                <span class="material-symbols-outlined text-6xl text-base-content/30">assignment_turned_in</span>
                <p class="mt-4 text-xl text-base-content/70">
                    No hay auditorías. Crea una nueva para comenzar.
                </p>
            </div>

            <!-- Accordion de Auditorías -->
            <div v-for="auditoria in store.auditoriasOrdenadas" :key="auditoria.dni" class="mb-4">
                <div 
                    class="card border-2 transition-all"
                    :class="[
                        auditoria.mejor ? 'border-accent shadow-lg' : 'border-base-300',
                        !puedeEditarAuditoria(auditoria.fechaFin) ? 'opacity-70' : ''
                    ]"
                >
                    <!-- Header -->
                    <div 
                        class="card-header bg-base-200 p-4 cursor-pointer flex justify-between items-center"
                        @click="toggleAuditoria(auditoria)"
                    >
                        <div class="flex-1">
                            <div class="flex items-center gap-3">
                                <div class="flex-1">
                                    <p class="font-bold text-lg">{{ auditoria.descripcion }}</p>
                                    <div class="flex items-center gap-2 mt-1">
                                        <button 
                                            v-if="puedeEditarAuditoria(auditoria.fechaFin)"
                                            class="btn btn-xs btn-success"
                                            @click.stop="handleTerminar(auditoria)"
                                        >
                                            Terminar Auditoría
                                        </button>
                                        <span v-else class="badge badge-neutral">
                                            Finalizada: {{ auditoria.strFechaFin }}
                                        </span>
                                    </div>
                                </div>
                                
                                <!-- Calificación -->
                                <div class="flex flex-col items-center">
                                    <div 
                                        class="text-4xl font-bold"
                                        :class="getColorCalificacion(auditoria.calificacion).text"
                                    >
                                        {{ formatearCalificacion(auditoria.calificacion) }}
                                    </div>
                                    <div class="badge badge-sm mt-1" :class="getColorCalificacion(auditoria.calificacion).badge">
                                        {{ auditoria.mejor ? 'MEJOR' : 'Calificación' }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Icono collapse -->
                        <span class="material-symbols-outlined text-2xl ml-4">
                            {{ auditoria.show ? 'expand_less' : 'expand_more' }}
                        </span>
                    </div>

                    <!-- Body (Tabla de Evaluación) -->
                    <div v-show="auditoria.show" class="card-body p-4">
                        <div class="overflow-x-auto">
                            <table class="table table-sm">
                                <thead class="bg-base-300">
                                    <tr class="text-center">
                                        <th class="text-left">Dominio / Subdominio</th>
                                        <th class="w-20">Peso</th>
                                        <th class="w-40">Evaluación</th>
                                        <th>Observaciones</th>
                                        <th class="w-24">Calificación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(dominio, dIdx) in auditoria.Dominios" :key="dominio.dni">
                                        <!-- Fila de Dominio -->
                                        <tr class="bg-info/20 font-bold">
                                            <td class="border-l-4 border-info">
                                                Dominio {{ dIdx + 1 }}: {{ dominio.titulo }}
                                            </td>
                                            <td class="text-center">{{ dominio.peso }}</td>
                                            <td colspan="2"></td>
                                            <td class="text-center">
                                                <span class="badge badge-info">
                                                    {{ formatearCalificacion(dominio.calificacion) }}
                                                </span>
                                            </td>
                                        </tr>

                                        <!-- Filas de Subdominios -->
                                        <tr 
                                            v-for="(subdominio, sIdx) in dominio.Subdominios" 
                                            :key="subdominio.dni"
                                        >
                                            <td class="pl-8">
                                                Subdominio {{ sIdx + 1 }}: {{ subdominio.titulo }}
                                            </td>
                                            <td class="text-center">
                                                <span v-if="store.mejoropcion">{{ subdominio.peso || 0 }}</span>
                                            </td>
                                            <td class="text-center">
                                                <!-- Modo Normal: Select -->
                                                <select 
                                                    v-if="!store.mejoropcion"
                                                    class="select select-sm select-bordered w-full"
                                                    v-model.number="subdominio.evaluacion"
                                                    @change="handleCambioEvaluacion(auditoria, dominio, subdominio)"
                                                    :disabled="!puedeEditarAuditoria(auditoria.fechaFin)"
                                                >
                                                    <option :value="0">-- Seleccionar --</option>
                                                    <option 
                                                        v-for="val in OPCIONES_EVALUACION" 
                                                        :key="val" 
                                                        :value="val"
                                                    >
                                                        {{ val }}
                                                    </option>
                                                </select>

                                                <!-- Modo Mejor Opción: Switch -->
                                                <input 
                                                    v-else
                                                    type="checkbox" 
                                                    class="toggle toggle-primary"
                                                    :checked="subdominio.seleccionado"
                                                    @change="handleCambioSubdominio(auditoria, dominio, subdominio, $event)"
                                                    :disabled="!puedeEditarAuditoria(auditoria.fechaFin)"
                                                />
                                            </td>
                                            <td>
                                                <textarea 
                                                    class="textarea textarea-sm textarea-bordered w-full"
                                                    rows="2"
                                                    v-model="subdominio.observaciones"
                                                    @blur="handleCambioEvaluacion(auditoria, dominio, subdominio)"
                                                    :disabled="!puedeEditarAuditoria(auditoria.fechaFin)"
                                                    placeholder="Observaciones..."
                                                ></textarea>
                                            </td>
                                            <td class="text-center">
                                                <span v-if="!store.mejoropcion">
                                                    {{ subdominio.evaluacion }}
                                                </span>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Estado vacío -->
        <div v-else class="text-center py-20">
            <span class="material-symbols-outlined text-6xl text-base-content/30">assignment</span>
            <p class="mt-4 text-xl text-base-content/70">
                Selecciona un formulario para ver las auditorías
            </p>
        </div>

        <!-- Modal Nueva Auditoría -->
        <div v-if="showModalNueva" class="modal modal-open">
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined">add_circle</span>
                    Nueva Auditoría
                </h3>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Descripción *</span>
                    </label>
                    <input 
                        type="text" 
                        class="input input-bordered"
                        v-model="descripcionNueva"
                        placeholder="Ej: Auditoría Trimestre 1 - 2025"
                        autocomplete="off"
                    />
                </div>

                <div class="modal-action">
                    <button class="btn btn-ghost" @click="showModalNueva = false">
                        <span class="material-symbols-outlined">close</span>
                        Cancelar
                    </button>
                    <button class="btn btn-success" @click="handleGuardarNueva">
                        <span class="material-symbols-outlined">check</span>
                        Crear Auditoría
                    </button>
                </div>
            </div>
            <div class="modal-backdrop" @click="showModalNueva = false"></div>
        </div>
    </div>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
}
</style>
