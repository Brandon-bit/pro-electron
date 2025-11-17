<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import EmptyState from '@/modules/GestionDeProyectos/Operacion/Priorizacion/components/EmptyState.vue'
import PrioritizationTable from '@/modules/GestionDeProyectos/Operacion/Priorizacion/components/PrioritizationTable.vue'
import TopPriorityCard from '@/modules/GestionDeProyectos/Operacion/Priorizacion/components/TopPriorityCard.vue'
import usePrioritizationStore from '@/modules/GestionDeProyectos/Operacion/Priorizacion/store/prioritizationStore'
import { usePrioritizationActions } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/composables/usePrioritizationActions'
import type { PrioritizedProjectType } from '@/modules/GestionDeProyectos/Operacion/Priorizacion/types/prioritizationTypes'
import { showNotification } from '@/utils/toastNotifications'

const prioritizationStore = usePrioritizationStore()
const { getPrioritizedProjects, updatePrioritizedProject } = usePrioritizationActions()

const projects = computed(() => prioritizationStore.projects)
const topProject = computed(() => prioritizationStore.topPriorityProject)
const loading = ref(false)

// Timers para debounce de inputs
const updateTimers = ref<Map<number, ReturnType<typeof setTimeout>>>(new Map())

const loadProjects = async () => {
    loading.value = true
    try {
        const data = await getPrioritizedProjects()
        prioritizationStore.setProjects(data)
    } catch (error) {
        console.error('Error al cargar proyectos:', error)
        showNotification('Error al cargar proyectos priorizados', 'error')
    } finally {
        loading.value = false
    }
}

// Actualizar campo con debounce (espera 800ms después del último cambio)
const handleUpdateField = (dni: number, field: keyof PrioritizedProjectType, value: any) => {
    // Actualizar en el store inmediatamente para UI responsiva
    prioritizationStore.updateProject(dni, field, value)
    
    // Cancelar timer anterior si existe
    const existingTimer = updateTimers.value.get(dni)
    if (existingTimer) {
        clearTimeout(existingTimer)
    }
    
    // Crear nuevo timer
    const timer = setTimeout(async () => {
        const project = projects.value.find(p => p.dni === dni)
        if (project) {
            const response = await updatePrioritizedProject(project)
            if (response.status === 'success') {
                showNotification('Proyecto actualizado exitosamente', 'success')
            } else {
                showNotification(response.message, 'error')
            }
        }
        updateTimers.value.delete(dni)
    }, 800)
    
    updateTimers.value.set(dni, timer)
}

// Manejar reordenamiento con drag & drop
const handleReorder = async () => {
    try {
        loading.value = true
        const projectsToUpdate: PrioritizedProjectType[] = []
        
        // Identificar proyectos que necesitan actualización
        projects.value.forEach((project, index) => {
            const newPriority = index + 1
            if (project.priority !== newPriority) {
                projectsToUpdate.push({
                    ...project,
                    priority: newPriority
                })
            }
        })
        
        // Actualizar todos los proyectos en paralelo
        if (projectsToUpdate.length > 0) {
            const updatePromises = projectsToUpdate.map(project => 
                updatePrioritizedProject(project)
            )
            
            await Promise.all(updatePromises)
            
            // Recargar proyectos para reflejar cambios
            await loadProjects()
            
            showNotification('Orden de proyectos actualizado correctamente', 'success')
        }
    } catch (error) {
        console.error('Error al reordenar proyectos:', error)
        showNotification('Error al actualizar el orden de los proyectos', 'error')
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadProjects()
})
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Priorización de Proyectos" 
            subtitle="Organiza y prioriza proyectos seleccionados. Arrastra para reordenar."
        />

        <!-- Estado vacío -->
        <EmptyState v-if="projects.length === 0" />

        <!-- Tabla de priorización -->
        <div v-else>
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Matriz de Priorización</h2>
                    
                    <PrioritizationTable 
                        :projects="projects"
                        :onUpdateField="handleUpdateField"
                        :onReorder="handleReorder"
                    />

                    <TopPriorityCard :project="topProject" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
