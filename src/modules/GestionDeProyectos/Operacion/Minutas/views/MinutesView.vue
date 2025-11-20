<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import CreateMinuteModal from '@/modules/GestionDeProyectos/Operacion/Minutas/components/CreateMinuteModal.vue'
import ActionsTable from '@/modules/GestionDeProyectos/Operacion/Minutas/components/ActionsTable.vue'
import MinuteAccordion from '@/modules/GestionDeProyectos/Operacion/Minutas/components/MinuteAccordion.vue'
import AddActionModal from '@/modules/GestionDeProyectos/Operacion/Minutas/components/AddActionModal.vue'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import { useMinuteActions } from '@/modules/GestionDeProyectos/Operacion/Minutas/composables/useMinuteActions'
import { showNotification } from '@/utils/toastNotifications'

const minuteStore = useMinuteStore()
const { loadMinutes, loadProjects, saveMinutes, handleDistribute } = useMinuteActions()

const activeTab = ref<'minutes' | 'actions'>('minutes')

// Opciones para el selector de proyectos
const projectsOptions = computed(() => 
    minuteStore.projectsOptions.map(p => ({
        value: p.dni,
        label: p.label
    }))
)

const selectedProjectId = computed({
    get: () => minuteStore.selectedProject?.dni || null,
    set: (value: number | null) => {
        if (value) {
            const project = minuteStore.projectsOptions.find(p => p.dni === value)
            minuteStore.setSelectedProject(project || null)
        } else {
            minuteStore.setSelectedProject(null)
        }
    }
})

// Handlers para las acciones de las minutas
const handleEditMinute = (id: string) => {
    // TODO: Implementar edición de minuta
    showNotification('Funcionalidad de edición en desarrollo', 'info')
}

const handleDeleteMinute = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta minuta?')) {
        minuteStore.deleteMinute(id)
        showNotification('Minuta eliminada exitosamente', 'success')
    }
}

const handleDistributeMinute = (id: string) => {
    handleDistribute(id)
}

const handleAddAction = (minuteId: string) => {
    minuteStore.openActionModal(minuteId)
}

const handleEditAction = (minuteId: string, action: any) => {
    minuteStore.openActionModal(minuteId, action)
}

const handleTabChange = (tab: 'minutes' | 'actions') => {
    activeTab.value = tab
}

onMounted(async () => {
    loadMinutes()
    await loadProjects()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Minutas" 
            subtitle="Registro de reuniones, decisiones y acciones del proyecto"
        />

        <!-- Selector de Proyecto -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title text-lg mb-4">Seleccionar Proyecto</h3>
                <div class="form-control w-full max-w-md">
                    <label class="label">
                        <span class="label-text">Proyecto</span>
                    </label>
                    <select 
                        v-model="selectedProjectId" 
                        class="select select-bordered w-full"
                        :disabled="minuteStore.isLoading"
                    >
                        <option :value="null">Selecciona un proyecto...</option>
                        <option 
                            v-for="option in projectsOptions" 
                            :key="option.value" 
                            :value="option.value"
                        >
                            {{ option.label }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Loading state -->
        <div v-if="minuteStore.isLoading" class="flex items-center justify-center py-12">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <!-- Estado vacío: sin proyecto seleccionado -->
        <div v-else-if="!minuteStore.selectedProject" class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <span class="material-symbols-outlined text-6xl opacity-30 mb-4">description</span>
                    <h3 class="text-xl font-semibold mb-2">No hay proyecto seleccionado</h3>
                    <p class="text-sm opacity-70">
                        Selecciona un proyecto para visualizar y gestionar sus minutas
                    </p>
                </div>
            </div>
        </div>

        <!-- Vista principal con proyecto seleccionado -->
        <template v-else>
            <!-- Botones de acción -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">folder_open</span>
                    <span class="font-semibold">{{ minuteStore.selectedProject.label }}</span>
                </div>
                <div class="flex gap-2">
                    <BaseButton
                        text="Guardar"
                        icon="save"
                        variant="outline"
                        @click="saveMinutes"
                    />
                    <BaseButton
                        text="Nueva Minuta"
                        icon="add"
                        variant="primary"
                        @click="minuteStore.openModal()"
                    />
                </div>
            </div>

            <!-- Tabs -->
            <div class="tabs tabs-boxed bg-base-200 w-fit">
                <button
                    :class="['tab', { 'tab-active': activeTab === 'minutes' }]"
                    @click="handleTabChange('minutes')"
                >
                    <span class="material-symbols-outlined text-sm mr-2">description</span>
                    Minutas
                </button>

                <button
                    :class="['tab', { 'tab-active': activeTab === 'actions' }]"
                    @click="handleTabChange('actions')"
                >
                    <span class="material-symbols-outlined text-sm mr-2">check_box</span>
                    Acciones Pendientes
                </button>
            </div>

            <!-- Tab: Minutas -->
            <section v-if="activeTab === 'minutes'" class="space-y-4">
                <!-- Lista de minutas en accordions -->
                <div v-if="minuteStore.filteredMinutes.length > 0" class="space-y-3">
                    <MinuteAccordion
                        v-for="minute in minuteStore.filteredMinutes"
                        :key="minute.id"
                        :minute="minute"
                        @edit="handleEditMinute"
                        @add-action="handleAddAction"
                        @edit-action="handleEditAction"
                        @delete="handleDeleteMinute"
                        @distribute="handleDistributeMinute"
                    />
                </div>

                <!-- Estado vacío: sin minutas -->
                <div v-else class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex flex-col items-center justify-center py-12 text-center">
                            <span class="material-symbols-outlined text-6xl opacity-30 mb-4">description</span>
                            <h3 class="text-xl font-semibold mb-2">No hay minutas registradas</h3>
                            <p class="text-sm opacity-70 mb-4">
                                Comienza creando la primera minuta para este proyecto
                            </p>
                            <BaseButton
                                text="Crear Primera Minuta"
                                icon="add"
                                variant="primary"
                                @click="minuteStore.openModal()"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Tab: Acciones Pendientes -->
            <section v-else class="space-y-4">
                <ActionsTable />
            </section>
        </template>

        <!-- Modals -->
        <CreateMinuteModal />
        <AddActionModal />
    </div>
</template>

<style scoped>
.tab {
    display: flex;
    align-items: center;
}
</style>
