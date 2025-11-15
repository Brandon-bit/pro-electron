<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { PrioritizedProjectType } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/types/prioritizationTypes'
import { usePrioritizationActions } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/composables/usePrioritizationActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    project: PrioritizedProjectType | null
}>()

const router = useRouter()
const { generateEDT } = usePrioritizationActions()

const handleGenerateEDT = () => {
    if (!props.project) {
        showNotification('No hay proyectos priorizados para generar EDT', 'error')
        return
    }
    
    generateEDT(props.project)
    showNotification(`EDT generada para: ${props.project.name}`, 'success')
    router.push('/gestion-de-proyectos/edt-del-proyecto')
}
</script>

<template>
    <div 
        v-if="project"
        class="mt-6 flex items-center justify-between p-4 rounded-lg bg-accent/10 border-2 border-accent/30"
    >
        <div>
            <p class="text-sm font-medium opacity-70">Proyecto de Mayor Prioridad</p>
            <p class="text-lg font-bold text-accent">{{ project.name }}</p>
        </div>
        <button 
            class="btn btn-accent"
            @click="handleGenerateEDT"
        >
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
            Generar EDT del Proyecto
        </button>
    </div>
</template>
