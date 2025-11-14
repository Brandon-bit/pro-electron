<script setup lang="ts">
import { ref } from 'vue'
import { useVoBoStore } from '../store/voboStore'
import { useVoBoUtils } from '../composables/useVoBoUtils'
import { useVoBoActions } from '../composables/useVoBoActions'
import type { IVoBoManual } from '../types/vobo.types'

interface Emits {
    (e: 'openCreateModal'): void
    (e: 'openDeleteModal', vobo: IVoBoManual): void
    (e: 'openSendModal', vobo: IVoBoManual): void
}

const emit = defineEmits<Emits>()

const voboStore = useVoBoStore()
const { getColorClass, formatFecha, canSendVoBo, canDeleteVoBo, getFileIcon } = useVoBoUtils()
const { updateVoBoManual } = useVoBoActions()

const isUpdating = ref<number | null>(null)

const handleResponsableChange = async (vobo: IVoBoManual) => {
    if (!vobo.dniAutoriza) return
    
    isUpdating.value = vobo.dni
    await updateVoBoManual({
        dni: vobo.dni,
        dniAutoriza: vobo.dniAutoriza
    })
    isUpdating.value = null
}

const handleSend = (vobo: IVoBoManual) => {
    emit('openSendModal', vobo)
}

const handleDelete = (vobo: IVoBoManual) => {
    emit('openDeleteModal', vobo)
}

const handleCreate = () => {
    emit('openCreateModal')
}
</script>

<template>
    <div>
        <!-- Botón Agregar -->
        <div class="mb-4">
            <button 
                @click="handleCreate"
                class="btn btn-neutral btn-sm"
                :disabled="!voboStore.hasFiltroProc"
            >
                <span class="material-symbols-outlined">add</span>
                Solicitar VoBo
            </button>
        </div>

        <!-- Tabla -->
        <div class="overflow-x-auto">
            <table class="table table-zebra table-sm">
                <!-- Header -->
                <thead>
                    <tr class="bg-neutral text-neutral-content">
                        <th colspan="11" class="text-center text-lg">VoBos de Manuales</th>
                    </tr>
                    <tr class="bg-base-200">
                        <th>Id</th>
                        <th>Estatus</th>
                        <th>Versión</th>
                        <th>Proceso</th>
                        <th>Solicitante</th>
                        <th>Responsable</th>
                        <th>Fecha de Envío</th>
                        <th>Fecha de Respuesta</th>
                        <th>Comentarios</th>
                        <th>Manual de procesos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <!-- Body -->
                <tbody>
                    <tr v-if="voboStore.vobosManuales.length === 0">
                        <td colspan="11" class="text-center text-base-content/50 py-8">
                            <span class="material-symbols-outlined text-4xl">inbox</span>
                            <p class="mt-2">No hay VoBos de manuales para mostrar</p>
                            <p class="text-sm">Selecciona un proceso y solicita un VoBo</p>
                        </td>
                    </tr>

                    <tr v-for="vobo in voboStore.vobosManuales" :key="vobo.dni">
                        <!-- Id -->
                        <td>{{ vobo.dni }}</td>

                        <!-- Estatus -->
                        <td>
                            <div 
                                :class="getColorClass(vobo.dniEstatus, 'alert', 'text-center py-2 rounded text-xs')"
                            >
                                {{ vobo.estatus }}
                            </div>
                        </td>

                        <!-- Versión -->
                        <td>{{ vobo.Diagrama.version }}</td>

                        <!-- Proceso -->
                        <td>{{ vobo.Proceso.nombre }}</td>

                        <!-- Solicitante -->
                        <td>{{ vobo.solicitante }}</td>

                        <!-- Responsable (editable) -->
                        <td>
                            <select 
                                v-model="vobo.dniAutoriza"
                                @change="handleResponsableChange(vobo)"
                                class="select select-bordered select-sm w-full max-w-xs"
                                :disabled="isUpdating === vobo.dni"
                            >
                                <option :value="null">Seleccionar...</option>
                                <option 
                                    v-for="usuario in voboStore.usuarios" 
                                    :key="usuario.dni" 
                                    :value="usuario.dni"
                                >
                                    {{ usuario.nombre }} {{ usuario.apellidos }}
                                </option>
                            </select>
                            <span v-if="isUpdating === vobo.dni" class="loading loading-spinner loading-xs ml-2"></span>
                        </td>

                        <!-- Fecha de Envío -->
                        <td>{{ formatFecha(vobo.strFechaEnvio) }}</td>

                        <!-- Fecha de Respuesta -->
                        <td>{{ formatFecha(vobo.strFechaRespuesta) }}</td>

                        <!-- Comentarios -->
                        <td>
                            <textarea 
                                v-if="formatFecha(vobo.strFechaRespuesta) !== '-'"
                                :value="vobo.comentarios" 
                                class="textarea textarea-bordered w-full"
                                rows="2"
                                disabled
                                :title="vobo.comentarios"
                            ></textarea>
                            <span v-else class="text-base-content/50">-</span>
                        </td>

                        <!-- Archivos -->
                        <td>
                            <div v-if="vobo.Archivos.length > 0" class="space-y-1">
                                <a 
                                    v-for="(archivo, idx) in vobo.Archivos" 
                                    :key="idx"
                                    :href="archivo.url"
                                    target="_blank"
                                    class="flex items-center gap-2 text-primary hover:underline text-sm"
                                >
                                    <span class="material-symbols-outlined text-base">
                                        {{ getFileIcon(archivo.ext) }}
                                    </span>
                                    <span class="font-semibold">{{ archivo.nombre }}{{ archivo.ext }}</span>
                                </a>
                            </div>
                            <span v-else class="text-base-content/50 text-sm">Sin archivos</span>
                        </td>

                        <!-- Acciones -->
                        <td>
                            <div class="flex flex-col gap-2">
                                <button 
                                    @click="handleSend(vobo)"
                                    class="btn btn-primary btn-sm"
                                    :disabled="!canSendVoBo(vobo)"
                                >
                                    <span class="material-symbols-outlined text-base">send</span>
                                    Enviar
                                </button>
                                <button 
                                    @click="handleDelete(vobo)"
                                    class="btn btn-error btn-sm"
                                    :disabled="!canDeleteVoBo(vobo)"
                                >
                                    <span class="material-symbols-outlined text-base">delete</span>
                                    Eliminar
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
