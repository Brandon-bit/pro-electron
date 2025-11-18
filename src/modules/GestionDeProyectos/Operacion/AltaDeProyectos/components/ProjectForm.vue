<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseFormMultiSelect from '@/shared/components/BaseFormMultiSelect.vue'
import useProjectStore from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/store/projectStore'
import { projectSchema } from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/validations/projectValidation'
import { useProjectActions } from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/composables/useProjectActions'
import { showNotification } from '@/utils/toastNotifications'

const route = useRoute()
const projectStore = useProjectStore()
const { createProject, generateFolio, saveToLocalStorage } = useProjectActions()

const isLoading = ref(false)
const isFromInitiative = ref(false)
const initiativeId = ref<number | null>(null)

const classificationOptions = computed(() => 
    projectStore.classifications.map(c => ({ id: c, label: c }))
)

const areaOptions = computed(() => 
    projectStore.areas.map(a => ({ id: a.id, label: a.name }))
)

const categoryOptions = computed(() => 
    projectStore.selectedCategories.map(c => ({ id: c, label: c }))
)

const leaderOptions = computed(() => 
    projectStore.users.leaders.map(u => ({ id: u.id, label: u.name }))
)

const sponsorOptions = computed(() => 
    projectStore.users.sponsors.map(u => ({ id: u.id, label: u.name }))
)

const pmOptions = computed(() => 
    projectStore.users.projectManagers.map(u => ({ id: u.id, label: u.name }))
)

const processOptions = computed(() => 
    projectStore.users.processManagers.map(u => ({ id: u.id, label: u.name }))
)

const parentProjectOptions = computed(() => 
    projectStore.parentProjects.map(p => ({ id: p.id, label: p.name }))
)

const adminOptions = computed(() => 
    projectStore.users.admins.map(u => ({ id: u.id, label: u.name }))
)

const { handleSubmit, resetForm, values } = useForm({
    validationSchema: toTypedSchema(projectSchema),
    initialValues: projectStore.selectedProject
})

// Watch area changes to update categories
watch(() => values.area, (newArea) => {
    if (newArea) {
        projectStore.updateCategoriesByArea(newArea)
    }
})

const onSubmit = handleSubmit(async (formValues) => {
    isLoading.value = true
    try {
        // Generate folio
        const projects = JSON.parse(localStorage.getItem('projects') || '[]')
        const folio = String(projects.length + 1).padStart(8, '0')
        
        const projectWithFolio = {
            ...formValues,
            folio,
            creationDate: new Date(),
            // Si viene de una iniciativa, agregar los campos adicionales
            ...(isFromInitiative.value && {
                fromInitiative: true,
                initiativeId: initiativeId.value
            })
        }
        
        // Save to localStorage
        saveToLocalStorage(projectWithFolio as any)
        
        showNotification('Proyecto agregado correctamente', 'success')
        
        // Reset form
        resetForm()
        projectStore.resetForm()
        isFromInitiative.value = false
        initiativeId.value = null
    } catch (error: any) {
        showNotification(error.message || 'Error al guardar el proyecto', 'error')
    } finally {
        isLoading.value = false
    }
})

onMounted(() => {
    projectStore.loadFromSOW()
    
    // Detectar si viene desde una iniciativa
    const fromInitiativeParam = route.query.fromInitiative
    const initiativeNameParam = route.query.initiativeName
    
    if (fromInitiativeParam) {
        isFromInitiative.value = true
        initiativeId.value = Number(fromInitiativeParam)
        
        // Pre-llenar el nombre del proyecto con el nombre de la iniciativa
        if (initiativeNameParam) {
            projectStore.updateField('name', initiativeNameParam as string)
        }
        
        // Mostrar notificación informativa
        showNotification(
            `Creando proyecto desde iniciativa: ${initiativeNameParam}`,
            'info',
            5000
        )
    }
})
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <!-- Banner informativo si viene de iniciativa -->
            <div v-if="isFromInitiative" class="alert alert-info mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                    <h3 class="font-bold">Proyecto desde Iniciativa</h3>
                    <div class="text-xs">
                        Este proyecto se está creando desde una iniciativa con estructura EDT definida. 
                        Al guardar, se creará automáticamente toda la estructura de etapas, actividades y sub-actividades.
                    </div>
                </div>
            </div>
            
            <h2 class="card-title">Información del Proyecto</h2>
            
            <form @submit="onSubmit" class="space-y-6">
                <!-- Basic Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BaseFormInput
                        name="name"
                        label="Nombre del proyecto"
                        placeholder="Ingresa el nombre del proyecto"
                        required
                    />
                    
                    <BaseFormInput
                        name="projectId"
                        label="ID del Proyecto"
                        placeholder="Generado automáticamente"
                        disabled
                    />
                    
                    <BaseFormInput
                        name="startDate"
                        label="Fecha de Inicio"
                        type="date"
                        required
                    />
                    
                    <BaseFormInput
                        name="endDate"
                        label="Fecha Fin"
                        type="date"
                        required
                    />
                    
                    <BaseFormInput
                        name="budget"
                        label="Presupuesto Estimado"
                        type="number"
                        placeholder="0.00"
                    />
                    
                    <BaseFormSelect
                        name="classification"
                        label="Clasificación de Proyecto"
                        :options="classificationOptions"
                        placeholder="Selecciona clasificación"
                    />
                </div>

                <!-- Objective and Scope -->
                <div class="space-y-4">
                    <BaseTextArea
                        name="objective"
                        label="Objetivo"
                        placeholder="Describe el objetivo del proyecto"
                        rows="4"
                    />
                    
                    <BaseTextArea
                        name="scope"
                        label="Alcance"
                        placeholder="Define el alcance del proyecto"
                        rows="4"
                    />
                </div>

                <div class="divider"></div>

                <!-- Team Members -->
                <h3 class="text-lg font-semibold">Equipo del Proyecto</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BaseFormSelect
                        name="leader"
                        label="Líder"
                        :options="leaderOptions"
                        placeholder="Selecciona líder"
                    />
                    
                    <BaseFormSelect
                        name="sponsor"
                        label="Sponsor"
                        :options="sponsorOptions"
                        placeholder="Selecciona sponsor"
                    />
                    
                    <BaseFormSelect
                        name="projectManager"
                        label="Project Manager"
                        :options="pmOptions"
                        placeholder="Selecciona PM"
                    />
                    
                    <BaseFormSelect
                        name="processManager"
                        label="Gestor de Procesos"
                        :options="processOptions"
                        placeholder="Selecciona gestor"
                    />
                    
                    <!-- Additional Admins -->
                    <BaseFormMultiSelect
                        name="additionalAdmins"
                        label="Administradores Adicionales"
                        :options="adminOptions"
                        placeholder="No hay administradores disponibles"
                    />
                </div>

                <div class="divider"></div>

                <!-- Area and Category -->
                <h3 class="text-lg font-semibold">Área y Categoría</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BaseFormSelect
                        name="area"
                        label="Área del Proyecto"
                        :options="areaOptions"
                        placeholder="Selecciona área"
                    />
                    
                    <BaseFormSelect
                        name="category"
                        label="Categorías"
                        :options="categoryOptions"
                        :placeholder="values.area ? 'Selecciona categoría' : 'Primero selecciona un área'"
                        :disabled="!values.area"
                    />
                </div>

                <div class="divider"></div>

                <!-- Modo de Implementación -->
                <div class="border border-base-300 rounded-lg p-4 space-y-3">
                    <h3 class="text-base font-semibold text-base-content/70">Modo de implementación</h3>
                    <div class="form-control">
                        <label class="label cursor-pointer justify-start gap-4">
                            <input 
                                type="checkbox" 
                                class="toggle toggle-primary"
                                :checked="values.isSubproject"
                                @change="(e) => projectStore.updateField('isSubproject', (e.target as HTMLInputElement).checked)"
                            />
                            <div class="flex flex-col">
                                <span class="label-text font-semibold">SubProyecto</span>
                                <span class="text-xs text-base-content/60">(Se habilita un Selector para poder elegir a que proyecto desea adjuntarlo)</span>
                            </div>
                        </label>
                    </div>

                    <div v-if="values.isSubproject" class="ml-12 mt-3">
                        <BaseFormSelect
                            name="parentProject"
                            label="Proyecto Padre"
                            :options="parentProjectOptions"
                            placeholder="Selecciona proyecto padre"
                        />
                    </div>
                </div>

                <!-- Incluir Sábados y/o Domingos -->
                <div class="border border-base-300 rounded-lg p-4 space-y-3">
                    <h3 class="text-base font-semibold text-base-content/70">Incluir Sábados y/o Domingos</h3>
                    <div class="alert alert-info py-2 px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="text-xs">Los días seleccionados se tomarán en cuenta para la duración de las actividades</span>
                    </div>
                    <div class="flex gap-8">
                        <div class="form-control">
                            <label class="label cursor-pointer justify-start gap-4">
                                <input 
                                    type="checkbox" 
                                    class="toggle toggle-primary"
                                    :checked="values.includeSaturday"
                                    @change="(e) => projectStore.updateField('includeSaturday', (e.target as HTMLInputElement).checked)"
                                />
                                <span class="label-text font-semibold">Sábados</span>
                            </label>
                        </div>

                        <div class="form-control">
                            <label class="label cursor-pointer justify-start gap-4">
                                <input 
                                    type="checkbox" 
                                    class="toggle toggle-primary"
                                    :checked="values.includeSunday"
                                    @change="(e) => projectStore.updateField('includeSunday', (e.target as HTMLInputElement).checked)"
                                />
                                <span class="label-text font-semibold">Domingos</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Tipo de Proyecto -->
                <div class="border border-base-300 rounded-lg p-4 space-y-3">
                    <h3 class="text-base font-semibold text-base-content/70">Tipo de Proyecto</h3>
                    <div class="flex gap-8">
                        <div class="form-control">
                            <label class="label cursor-pointer justify-start gap-4">
                                <input 
                                    type="checkbox" 
                                    class="toggle toggle-primary"
                                    :checked="values.projectType === 'expense'"
                                    @change="(e) => projectStore.updateField('projectType', (e.target as HTMLInputElement).checked ? 'expense' : '')"
                                />
                                <span class="label-text font-semibold">Gasto</span>
                            </label>
                        </div>

                        <div class="form-control">
                            <label class="label cursor-pointer justify-start gap-4">
                                <input 
                                    type="checkbox" 
                                    class="toggle toggle-primary"
                                    :checked="values.projectType === 'investment'"
                                    @change="(e) => projectStore.updateField('projectType', (e.target as HTMLInputElement).checked ? 'investment' : '')"
                                />
                                <span class="label-text font-semibold">Inversión</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end pt-4">
                    <button
                        type="submit"
                        class="btn btn-primary btn-lg"
                        :disabled="isLoading"
                    >
                        <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
                        <span v-else class="material-symbols-outlined text-sm">add</span>
                        Agregar Proyecto
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
