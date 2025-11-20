<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import MinuteAccordion from '@/modules/GestionDeProyectos/Operacion/Minutas/components/MinuteAccordion.vue'
import ActionsTable from '@/modules/GestionDeProyectos/Operacion/Minutas/components/ActionsTable.vue'
import MinuteModal from '@/modules/GestionDeProyectos/Operacion/Minutas/components/MinuteModal.vue'
import AttendeeModal from '@/modules/GestionDeProyectos/Operacion/Minutas/components/AttendeeModal.vue'
import AgreedActionModal from '@/modules/GestionDeProyectos/Operacion/Minutas/components/AgreedActionModal.vue'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import { useMinuteActions } from '@/modules/GestionDeProyectos/Operacion/Minutas/composables/useMinuteActions'
import { useModalStore } from '@/shared/stores/modal.store'

const minuteStore = useMinuteStore()
const modalStore = useModalStore()
const { loadProjects, loadMinutes, loadParticipants } = useMinuteActions()

const activeTab = ref<'minutes' | 'actions'>('minutes')

// Computed for project select options
const projectsOptions = computed(() => 
    minuteStore.projectsOptions.map(p => ({
        value: p.dni,
        label: p.label
    }))
)

// Selected project with getter/setter
const selectedProjectDni = computed({
    get: () => minuteStore.selectedProject?.dni || null,
    set: async (value: string | null) => {
        if (value) {
            const project = minuteStore.projectsOptions.find(p => p.dni === value)
            minuteStore.setSelectedProject(project || null)
            
            // Load minutes for selected project
            if (project) {
                await loadMinutes(project.dni)
            }
        } else {
            minuteStore.setSelectedProject(null)
        }
    }
})

const handleTabChange = (tab: 'minutes' | 'actions') => {
    activeTab.value = tab
}

const handleCreateMinute = () => {
    minuteStore.clearSelectedMinute()
    modalStore.open(minuteStore.minuteModalId, {
        title: 'Nueva Minuta',
        type: 'CREATE',
        submitText: 'Crear'
    })
}

onMounted(async () => {
    // Load initial data
    await loadProjects()
    await loadParticipants()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Minutas" 
            subtitle="Registro de reuniones, decisiones y acciones del proyecto"
        />

        <!-- Project Selector -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title text-lg mb-4">Seleccionar Proyecto</h3>
                <div class="form-control w-full max-w-md">
                    <label class="label">
                        <span class="label-text">Proyecto</span>
                    </label>
                    <select 
                        v-model="selectedProjectDni" 
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

        <!-- Empty state: no project selected -->
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

        <!-- Main view with selected project -->
        <template v-else>
            <!-- Action buttons -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">folder_open</span>
                    <span class="font-semibold">{{ minuteStore.selectedProject.label }}</span>
                </div>
                <div class="flex gap-2">
                    <BaseButton
                        text="Nueva Minuta"
                        icon="add"
                        variant="primary"
                        @click="handleCreateMinute"
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

            <!-- Tab: Minutes -->
            <section v-if="activeTab === 'minutes'" class="space-y-4">
                <!-- List of minutes in accordions -->
                <div v-if="minuteStore.minutes.length > 0" class="space-y-3">
                    <MinuteAccordion
                        v-for="minute in minuteStore.minutes"
                        :key="minute.dni"
                        :minute="minute"
                    />
                </div>

                <!-- Empty state: no minutes -->
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
                                @click="handleCreateMinute"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Tab: Pending Actions -->
            <section v-else class="space-y-4">
                <ActionsTable />
            </section>
        </template>

        <!-- Modals -->
        <MinuteModal />
        <AttendeeModal />
        <AgreedActionModal />
    </div>
</template>

<style scoped>
.tab {
    display: flex;
    align-items: center;
}
</style>
