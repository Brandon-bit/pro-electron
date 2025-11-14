<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import ProjectSelector from '@/modules/GestionDeProyectos/EDTDelProyecto/components/ProjectSelector.vue'
import EmptyState from '@/modules/GestionDeProyectos/EDTDelProyecto/components/EmptyState.vue'
import EDTTree from '@/modules/GestionDeProyectos/EDTDelProyecto/components/EDTTree.vue'
import useEDTStore from '@/modules/GestionDeProyectos/EDTDelProyecto/store/edtStore'
import { useEDTActions } from '@/modules/GestionDeProyectos/EDTDelProyecto/composables/useEDTActions'
import { showNotification } from '@/utils/toastNotifications'

const edtStore = useEDTStore()
const { generateGantt } = useEDTActions()

const handleGenerateGantt = () => {
    const result = generateGantt()
    if (result.success) {
        showNotification(result.message, 'success')
    } else {
        showNotification(result.message, 'error')
    }
}

onMounted(() => {
    edtStore.loadFromLocalStorage()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between flex-wrap gap-4">
            <BaseTitle 
                title="EDT - Estructura de Desglose del Trabajo" 
                subtitle="Construye la estructura jerárquica del proyecto y genera el Diagrama de Gantt"
            />
            
            <BaseButton 
                v-if="edtStore.edtRoot"
                text="Generar Gantt"
                @click="handleGenerateGantt"
                icon="calendar_month"
                class="btn-accent btn-lg"
            />
        </div>

        <!-- Selector de proyecto -->
        <ProjectSelector />

        <!-- Árbol EDT o estado vacío -->
        <EmptyState v-if="!edtStore.edtRoot" />
        <EDTTree v-else />
    </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
