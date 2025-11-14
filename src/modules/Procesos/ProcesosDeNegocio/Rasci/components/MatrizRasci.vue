<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRasciStore } from '../store/rasciStore'
import { useRasciUtils } from '../composables/useRasciUtils'
import EditRasciModal from './EditRasciModal.vue'

const rasciStore = useRasciStore()
const { getColorAccountable, getColorTotal, formatearValorRasci } = useRasciUtils()

// Estado del modal
const modalState = ref({
    show: false,
    actividadTitulo: '',
    rolTitulo: '',
    valorActual: '',
    dniActividad: 0,
    dniRol: 0
})

// Actividades con accountables calculados
const actividades = computed(() => rasciStore.actividadesConAccountables)

// Totales RASCI
const totales = computed(() => rasciStore.totalesRasci)

// Abrir modal para editar
const abrirModalEdicion = (
    actividadTitulo: string,
    rolTitulo: string,
    valorActual: string,
    dniActividad: number,
    dniRol: number
) => {
    modalState.value = {
        show: true,
        actividadTitulo,
        rolTitulo,
        valorActual,
        dniActividad,
        dniRol
    }
}

// Cerrar modal
const cerrarModal = () => {
    modalState.value.show = false
}

// Obtener rol por dni
const getRolTitulo = (dniRol: number): string => {
    const rol = rasciStore.matriz.Roles.find(r => r.dni === dniRol)
    return rol ? rol.titulo : ''
}

// Obtener badge class por letra
const getBadgeClass = (letra: string): string => {
    const badgeMap: Record<string, string> = {
        'R': 'badge-primary',
        'A': 'badge-secondary',
        'S': 'badge-accent',
        'C': 'badge-info',
        'I': 'badge-neutral'
    }
    return badgeMap[letra] || 'badge-ghost'
}
</script>

<template>
    <div class="matriz-container">
        <div class="overflow-x-auto shadow-lg rounded-lg">
            <table class="table table-zebra w-full">
                <!-- Header Principal -->
                <thead>
                    <tr class="bg-primary text-primary-content">
                        <th class="text-center"></th>
                        <th 
                            :colspan="rasciStore.matriz.Roles.length" 
                            class="text-center text-lg font-bold"
                        >
                            Puestos / Roles
                        </th>
                        <th class="text-center"></th>
                    </tr>
                </thead>

                <!-- Header Secundario -->
                <thead>
                    <tr class="bg-base-300">
                        <th class="text-center font-bold">Actividad</th>
                        <th 
                            v-for="rol in rasciStore.matriz.Roles" 
                            :key="rol.dni"
                            class="text-center font-bold min-w-[120px]"
                        >
                            {{ rol.titulo }}
                        </th>
                        <th class="text-center font-bold">No. Accountable</th>
                    </tr>
                </thead>

                <!-- Body: Actividades -->
                <tbody>
                    <tr 
                        v-for="actividad in actividades" 
                        :key="actividad.dni"
                        class="hover"
                    >
                        <!-- Título de Actividad -->
                        <td class="font-semibold">
                            {{ actividad.titulo }}
                        </td>

                        <!-- Valores RASCI por Rol -->
                        <td 
                            v-for="valor in actividad.Valores" 
                            :key="`${actividad.dni}-${valor.rol}`"
                            class="text-center"
                        >
                            <div class="flex justify-center items-center gap-2">
                                <!-- Badges de valores -->
                                <div class="flex gap-1 flex-wrap justify-center">
                                    <span 
                                        v-for="(letra, idx) in formatearValorRasci(valor.valor)" 
                                        :key="idx"
                                        class="badge badge-sm font-bold"
                                        :class="getBadgeClass(letra)"
                                    >
                                        {{ letra }}
                                    </span>
                                    <span 
                                        v-if="formatearValorRasci(valor.valor).length === 0"
                                        class="text-base-content/30"
                                    >
                                        -
                                    </span>
                                </div>

                                <!-- Botón Editar -->
                                <button 
                                    class="btn btn-xs btn-info btn-circle"
                                    @click="abrirModalEdicion(
                                        actividad.titulo,
                                        getRolTitulo(valor.rol),
                                        valor.valor,
                                        actividad.dni,
                                        valor.rol
                                    )"
                                    title="Editar valor RASCI"
                                >
                                    <span class="material-symbols-outlined text-xs">edit</span>
                                </button>
                            </div>
                        </td>

                        <!-- Número de Accountables -->
                        <td 
                            class="text-center font-bold"
                            :class="getColorAccountable(actividad.acc || 0).bg"
                        >
                            <span 
                                class="badge badge-lg text-white font-bold"
                                :class="getColorAccountable(actividad.acc || 0).badge"
                            >
                                {{ actividad.acc || 0 }}
                            </span>
                        </td>
                    </tr>
                </tbody>

                <!-- Footer: Totales -->
                <tbody class="border-t-4 border-base-300">
                    <tr 
                        v-for="(total, index) in totales" 
                        :key="total.name"
                        :class="{ 'font-bold bg-base-200': index === totales.length - 1 }"
                    >
                        <!-- Nombre del Total -->
                        <th class="text-right">{{ total.name }}</th>

                        <!-- Valores por Rol -->
                        <td 
                            v-for="(val, idx) in total.val" 
                            :key="idx"
                            class="text-center font-semibold"
                            :class="index < totales.length - 1 ? getColorTotal(val).bg : ''"
                        >
                            <span 
                                v-if="index < totales.length - 1"
                                class="text-white font-bold text-base"
                            >
                                {{ val }}
                            </span>
                            <span v-else class="font-bold text-lg">
                                {{ val }}
                            </span>
                        </td>

                        <!-- Columna vacía para alinear -->
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal de Edición -->
        <EditRasciModal 
            :show="modalState.show"
            :actividad-titulo="modalState.actividadTitulo"
            :rol-titulo="modalState.rolTitulo"
            :valor-actual="modalState.valorActual"
            :dni-actividad="modalState.dniActividad"
            :dni-rol="modalState.dniRol"
            @close="cerrarModal"
            @saved="cerrarModal"
        />
    </div>
</template>

<style scoped>
.matriz-container {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive: Scroll horizontal en pantallas pequeñas */
@media (max-width: 768px) {
    .overflow-x-auto {
        max-width: 100vw;
    }
}

/* Estilos para impresión */
@media print {
    .btn {
        display: none;
    }
    
    .matriz-container {
        page-break-inside: avoid;
    }
}
</style>
