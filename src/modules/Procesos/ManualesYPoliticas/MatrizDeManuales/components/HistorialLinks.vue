<script setup lang="ts">
import type { IHistorialVersion, IHistorialAuditoria } from '../types/manuales.types'

const props = defineProps<{
    tipo: 'versiones' | 'auditorias'
    historial: IHistorialVersion[] | IHistorialAuditoria[]
    dniProceso?: number
}>()

const getVersionesAnteriores = () => {
    if (props.tipo === 'versiones') {
        return (props.historial as IHistorialVersion[]).filter(h => !h.final)
    }
    return []
}

const getVersionActual = () => {
    if (props.tipo === 'versiones') {
        return (props.historial as IHistorialVersion[]).find(h => h.final)
    }
    return null
}

const getLinkVersion = (version: IHistorialVersion) => {
    return `/proceso/diagrama/${version.idProceso}?diag=${version.dni}`
}

const getLinkAuditoria = (auditoria: IHistorialAuditoria, index: number) => {
    return `/manualespoliticas/auditoria?idProc=${auditoria.dniProc}&idForm=${auditoria.dniForm}&idAu=${auditoria.dni}`
}
</script>

<template>
    <div class="historial-links">
        <!-- Historial de Versiones -->
        <div v-if="tipo === 'versiones'" class="flex flex-wrap gap-1">
            <!-- Versiones anteriores -->
            <template v-for="(v, idx) in getVersionesAnteriores()" :key="v.dni">
                <a 
                    :href="getLinkVersion(v)" 
                    target="_blank"
                    class="badge badge-ghost badge-sm hover:badge-primary"
                    :title="`Versión ${v.version} - ${v.fecha}`"
                >
                    v{{ v.version }}
                </a>
                <span v-if="idx < getVersionesAnteriores().length - 1" class="opacity-30">,</span>
            </template>
            
            <!-- Mensaje si no hay versiones anteriores -->
            <span v-if="getVersionesAnteriores().length === 0" class="text-xs opacity-50">
                Sin historial
            </span>
        </div>

        <!-- Versión Actual -->
        <div v-if="tipo === 'versiones' && getVersionActual()" class="flex items-center gap-2">
            <a 
                :href="getLinkVersion(getVersionActual()!)" 
                target="_blank"
                class="badge badge-primary badge-sm hover:badge-primary-focus"
                :title="`Versión ${getVersionActual()!.version} (Actual) - ${getVersionActual()!.fecha}`"
            >
                <span class="material-symbols-outlined text-xs mr-1">verified</span>
                v{{ getVersionActual()!.version }}
            </a>
        </div>

        <!-- Historial de Auditorías -->
        <div v-if="tipo === 'auditorias'" class="flex flex-wrap gap-1">
            <template v-for="(au, idx) in (historial as IHistorialAuditoria[])" :key="au.dni">
                <a 
                    :href="getLinkAuditoria(au, idx)" 
                    target="_blank"
                    class="badge badge-info badge-sm hover:badge-info-focus"
                    :title="`Auditoría ${idx + 1} - ${au.fecha} ${au.calificacion ? '(' + au.calificacion + '%)' : ''}`"
                >
                    a{{ idx + 1 }}
                </a>
                <span v-if="idx < (historial as IHistorialAuditoria[]).length - 1" class="opacity-30">,</span>
            </template>
            
            <!-- Mensaje si no hay auditorías -->
            <span v-if="(historial as IHistorialAuditoria[]).length === 0" class="text-xs opacity-50">
                Sin auditorías
            </span>
        </div>
    </div>
</template>

<style scoped>
.historial-links {
    min-height: 1.5rem;
}
</style>
