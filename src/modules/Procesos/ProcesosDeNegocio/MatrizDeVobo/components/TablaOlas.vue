<script setup lang="ts">
import { useVoBoStore } from '../store/voboStore'
import { useVoBoUtils } from '../composables/useVoBoUtils'

const voboStore = useVoBoStore()
const { getColorClass, formatFecha } = useVoBoUtils()
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table table-zebra table-sm">
            <!-- Header -->
            <thead>
                <tr class="bg-neutral text-neutral-content">
                    <th colspan="10" class="text-center text-lg">VoBos de Olas</th>
                </tr>
                <tr class="bg-base-200">
                    <th>Id</th>
                    <th>Estatus</th>
                    <th>Proceso</th>
                    <th>Ola</th>
                    <th>Tipo</th>
                    <th>Solicitante</th>
                    <th>Responsable</th>
                    <th>Fecha de Envío</th>
                    <th>Fecha de Respuesta</th>
                    <th>Comentarios</th>
                </tr>
            </thead>

            <!-- Body -->
            <tbody>
                <tr v-if="voboStore.vobosOlas.length === 0">
                    <td colspan="10" class="text-center text-base-content/50 py-8">
                        <span class="material-symbols-outlined text-4xl">inbox</span>
                        <p class="mt-2">No hay VoBos de olas para mostrar</p>
                        <p class="text-sm">Selecciona un proceso en los filtros</p>
                    </td>
                </tr>

                <tr v-for="vobo in voboStore.vobosOlas" :key="vobo.dni">
                    <td>{{ vobo.Ola.dni }}</td>
                    <td>
                        <div 
                            :class="getColorClass(vobo.dniEstatus, 'alert', 'text-center py-2 rounded')"
                        >
                            {{ vobo.estatus }}
                        </div>
                    </td>
                    <td>{{ vobo.Proceso.nombre }}</td>
                    <td>
                        <span class="badge badge-primary">
                            {{ vobo.Ola.ola_numero }}
                        </span>
                    </td>
                    <td>{{ vobo.Ola.tipoImplementacion }}</td>
                    <td>{{ vobo.solicitante }}</td>
                    <td>{{ vobo.autoriza }}</td>
                    <td>{{ formatFecha(vobo.strFechaEnvio) }}</td>
                    <td>{{ formatFecha(vobo.strFechaRespuesta) }}</td>
                    <td>
                        <textarea 
                            :value="vobo.comentarios" 
                            class="textarea textarea-bordered w-full"
                            rows="2"
                            disabled
                        ></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
