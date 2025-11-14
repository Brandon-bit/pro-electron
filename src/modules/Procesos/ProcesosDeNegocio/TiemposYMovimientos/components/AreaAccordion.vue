<script setup lang="ts">
import { ref } from 'vue'
import { useTiemposActions } from '../composables/useTiemposActions'
import PuestoCard from './PuestoCard.vue'
import AgregarActividadModal from './AgregarActividadModal.vue'
import EditarHorasModal from './EditarHorasModal.vue'
import type { ITiempoMovimiento } from '../types/tiempos.types'

const props = defineProps<{
    tm: ITiempoMovimiento
    puestosConKPIs: any[]
    isFirst: boolean
}>()

const { eliminarAreaDeProceso } = useTiemposActions()

// Modales
const modalActividad = ref({ show: false, dniP: 0 })
const modalHoras = ref({ show: false, dniP: 0, horaInicio: '', horaFin: '' })

const handleEliminarArea = async () => {
    if (confirm(`¿Eliminar área "${props.tm.nombre}" y todos sus puestos?`)) {
        await eliminarAreaDeProceso(props.tm.dni)
    }
}

const handleAgregarActividad = (dniP: number) => {
    modalActividad.value = { show: true, dniP }
}

const handleEditarHoras = (puesto: any) => {
    modalHoras.value = {
        show: true,
        dniP: puesto.dni,
        horaInicio: puesto.horaInicio || '08:00',
        horaFin: puesto.horaFin || '16:00'
    }
}

const puestosDeArea = (tmDni: number) => {
    return props.puestosConKPIs.filter(p => {
        const tm = props.tm
        return tm.Puestos.some(tp => tp.dni === p.dni)
    })
}
</script>

<template>
    <div class="collapse collapse-arrow bg-base-200 mb-4">
        <input type="checkbox" :checked="isFirst" />
        <div class="collapse-title flex justify-between items-center pr-12">
            <h2 class="text-xl font-bold flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">folder_open</span>
                {{ tm.nombre }}
            </h2>
            <button 
                class="btn btn-sm btn-error"
                @click.stop="handleEliminarArea"
                title="Eliminar área"
            >
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
        <div class="collapse-content">
            <div class="mt-4">
                <!-- Lista de puestos -->
                <div v-for="puesto in puestosDeArea(tm.dni)" :key="puesto.dni">
                    <PuestoCard 
                        :dni-t-m="tm.dni"
                        :puesto="puesto"
                        @editar-horas="handleEditarHoras(puesto)"
                        @agregar-actividad="handleAgregarActividad(puesto.dni)"
                    />
                </div>

                <!-- Mensaje si no hay puestos -->
                <div v-if="tm.Puestos.length === 0" class="alert alert-warning">
                    <span class="material-symbols-outlined">info</span>
                    <span>No hay puestos en esta área. Agrega uno para comenzar.</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Modales -->
    <AgregarActividadModal 
        :show="modalActividad.show"
        :dni-t-m="tm.dni"
        :dni-p="modalActividad.dniP"
        @close="modalActividad.show = false"
        @saved="modalActividad.show = false"
    />

    <EditarHorasModal 
        :show="modalHoras.show"
        :dni-t-m="tm.dni"
        :dni-p="modalHoras.dniP"
        :hora-inicio="modalHoras.horaInicio"
        :hora-fin="modalHoras.horaFin"
        @close="modalHoras.show = false"
        @saved="modalHoras.show = false"
    />
</template>
