<script setup lang="ts">
import { Eye, Edit2, FileDown, MoreVertical, Trash2 } from 'lucide-vue-next'
import type {
    ProcessType,
    CVProcessType
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'

const props = defineProps<{
    processes: (ProcessType | CVProcessType)[]
    showViewAll: boolean
}>()

const emit = defineEmits<{
    viewAll: []
    adminDiagrams: [process: ProcessType | CVProcessType]
    rename: [process: ProcessType | CVProcessType]
    delete: [process: ProcessType | CVProcessType]
    viewDetails: [process: CVProcessType]
    editCVProcess: [process: CVProcessType]
}>()

const getProcessDisplayName = (process: ProcessType | CVProcessType): string => {
    const prefix = process.asis ? 'Asis_' : 'ToBe_'
    return `${prefix}${process.nombre}`
}

const isCVProcess = (process: ProcessType | CVProcessType): process is CVProcessType => {
    return 'dniCV' in process
}

// Función para cerrar dropdown después de click en una opción
const closeDropdown = (event: Event) => {
    const link = event.currentTarget as HTMLElement
    // Buscar el <ul> padre que tiene el tabindex
    const dropdownContent = link.closest('.dropdown-content') as HTMLElement
    if (dropdownContent) {
        dropdownContent.blur() // Quitar focus del dropdown para cerrarlo
    }
}
</script>

<template>
    <div class="space-y-4">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Procesos activos</h3>
            <button
                v-if="showViewAll"
                type="button"
                class="btn btn-sm btn-success gap-2"
                @click="emit('viewAll')"
            >
                <Eye :size="16" />
                Ver todo
            </button>
        </div>

        <!-- Lista de Procesos -->
        <div v-if="processes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
                v-for="process in processes"
                :key="process.id"
                class="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow"
            >
                <div class="card-body p-4">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-accent">
                            account_tree
                        </span>

                        <div class="flex-1 min-w-0">
                            <button
                                type="button"
                                class="text-left w-full hover:text-primary transition-colors"
                                @click="emit('adminDiagrams', process)"
                            >
                                <p class="font-semibold truncate text-sm" :title="getProcessDisplayName(process)">
                                    {{ getProcessDisplayName(process) }}
                                </p>
                            </button>
                            <div class="flex gap-1 mt-1">
                                <span :class="[
                                    'badge badge-xs',
                                    process.asis ? 'badge-warning' : 'badge-info'
                                ]">
                                    {{ process.asis ? 'AS-IS' : 'TO-BE' }}
                                </span>
                                <span v-if="isCVProcess(process)" class="badge badge-xs badge-primary">
                                    CV
                                </span>
                            </div>
                        </div>

                        <!-- Dropdown de acciones -->
                        <div class="dropdown dropdown-end">
                            <button
                                tabindex="0"
                                class="btn btn-ghost btn-sm btn-circle"
                                type="button"
                            >
                                <MoreVertical :size="16" />
                            </button>
                            <ul
                                tabindex="0"
                                class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-64 border border-base-300"
                            >
                                <li>
                                    <a @click="(e) => { emit('adminDiagrams', process); closeDropdown(e); }">
                                        <Edit2 :size="16" />
                                        Administrar Diagramas
                                    </a>
                                </li>
                                <li>
                                    <a :href="`/diagrama/exportar/${process.id}`" target="_blank">
                                        <FileDown :size="16" />
                                        Exportar documento (Word)
                                    </a>
                                </li>
                                <li>
                                    <a :href="`/diagrama/ExportarHojasBPMN/${process.id}`" target="_blank">
                                        <FileDown :size="16" />
                                        Exportar documento (PDF)
                                    </a>
                                </li>

                                <!-- Opciones específicas para procesos CV -->
                                <template v-if="isCVProcess(process)">
                                    <div class="divider my-1"></div>
                                    <li>
                                        <a @click="(e) => { emit('viewDetails', process); closeDropdown(e); }">
                                            <Eye :size="16" />
                                            Detalle
                                        </a>
                                    </li>
                                    <li>
                                        <a @click="(e) => { emit('editCVProcess', process); closeDropdown(e); }">
                                            <Edit2 :size="16" />
                                            Editar
                                        </a>
                                    </li>
                                </template>

                                <div class="divider my-1"></div>
                                <li>
                                    <a @click="(e) => { emit('rename', process); closeDropdown(e); }">
                                        <Edit2 :size="16" />
                                        Renombrar
                                    </a>
                                </li>
                                <!-- <li>
                                    <a @click="emit('delete', process)" class="text-error">
                                        <Trash2 :size="16" />
                                        Eliminar
                                    </a>
                                </li> -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sin procesos -->
        <div v-else class="alert">
            <span class="material-symbols-outlined">info</span>
            <span>No hay procesos disponibles. Selecciona un espacio para crear procesos.</span>
        </div>
    </div>
</template>
