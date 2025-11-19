<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormMultiSelect from '@/shared/components/BaseFormMultiSelect.vue'
import useProjectStore from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/store/projectStore'
import { projectSchema } from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/validations/projectValidation'
import { useProjectActions } from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/composables/useProjectActions'
import { showNotification } from '@/utils/toastNotifications'

const route = useRoute()
const projectStore = useProjectStore()
const { loadFormData, loadCategoriesByArea, loadParentProjects, createProject, saveToLocalStorage } = useProjectActions()

const isLoading = ref(false)
const isFromInitiative = ref(false)
const initiativeId = ref<number | null>(null)

// Computed options for selects
const classificationOptions = computed(() => 
    projectStore.classifications.map(c => ({ id: c.dni, label: c.label }))
)

const areaOptions = computed(() => 
    projectStore.areas.map(a => ({ id: a.dni, label: a.label }))
)

const categoryOptions = computed(() => 
    projectStore.categories.map(c => ({ id: c.dni, label: c.label }))
)

const leaderOptions = computed(() => 
    projectStore.leaders.map(u => ({ id: u.dni, label: u.label }))
)

const sponsorOptions = computed(() => 
    projectStore.sponsors.map(u => ({ id: u.dni, label: u.label }))
)

const pmOptions = computed(() => 
    projectStore.projectManagers.map(u => ({ id: u.dni, label: u.label }))
)

const processOptions = computed(() => 
    projectStore.processManagers.map(u => ({ id: u.dni, label: u.label }))
)

const adminOptions = computed(() => 
    projectStore.admins.map(u => ({ id: u.dni, label: u.label }))
)

const parentProjectOptions = computed(() => 
    projectStore.parentProjects.map(p => ({ id: p.dni, label: p.label }))
)

const { handleSubmit, resetForm, values, setFieldValue } = useForm({
    validationSchema: toTypedSchema(projectSchema),
    initialValues: projectStore.selectedProject
})

// Watch area changes to load categories
watch(() => values.areaId, async (newAreaId) => {
    const areaIdNum = typeof newAreaId === 'string' ? parseInt(newAreaId) : newAreaId
    if (areaIdNum && areaIdNum > 0) {
        await loadCategoriesByArea(areaIdNum)
    } else {
        projectStore.clearCategories()
    }
})

// Watch isSubproject changes to load parent projects
watch(() => values.isSubproject, async (isSubproject) => {
    console.log('isSubproject changed:', isSubproject)
    if (isSubproject) {
        console.log('Loading parent projects...')
        await loadParentProjects()
        console.log('Parent projects loaded:', projectStore.parentProjects.length)
    } else {
        projectStore.clearParentProjects()
    }
})

const onSubmit = handleSubmit(async (formValues) => {
    isLoading.value = true
    try {
        // Create project via API
        const result = await createProject(formValues as any)
        
        if (result.status === 'success' && result.data) {
            // Optionally save to localStorage for backup
            saveToLocalStorage(result.data)
            
            // Reset form and state
            resetForm()
            projectStore.resetForm()
            
            // Reset initiative flags if applicable
            if (isFromInitiative.value) {
                isFromInitiative.value = false
                initiativeId.value = null
            }
        }
    } catch (error: any) {
        console.error('Error creating project:', error)
        showNotification(error.message || 'Error al guardar el proyecto', 'error')
    } finally {
        isLoading.value = false
    }
})

// Watch para detectar cuando se selecciona una plantilla
watch(() => projectStore.selectedTemplate, (template) => {
    if (template) {
        // Pre-llenar el nombre del proyecto con el nombre de la plantilla
        setFieldValue('name', template.label)
        
        // Marcar que usa plantilla
        setFieldValue('useTemplate', true)
        setFieldValue('templateId', Number(template.dni))
    }
})

// Función para remover la plantilla seleccionada
const handleRemoveTemplate = () => {
    // Limpiar la plantilla del store
    projectStore.clearSelectedTemplate()
    
    // Resetear los campos del formulario relacionados con plantillas
    setFieldValue('useTemplate', false)
    setFieldValue('templateId', null)
    
    // Limpiar el nombre si aún tiene el nombre de la plantilla
    // (opcional, el usuario puede querer mantener el nombre)
}

onMounted(async () => {
    // Load form data (classifications, areas, leaders, etc.)
    await loadFormData()
    
    // Detectar si viene desde una iniciativa (EDT)
    const fromInitiativeParam = route.query.fromInitiative
    const initiativeNameParam = route.query.initiativeName
    
    if (fromInitiativeParam) {
        isFromInitiative.value = true
        initiativeId.value = Number(fromInitiativeParam)
        
        // Pre-llenar el nombre del proyecto con el nombre de la iniciativa
        if (initiativeNameParam) {
            setFieldValue('name', initiativeNameParam as string)
        }
        
        // Marcar que usa iniciativa
        setFieldValue('useInitiative', true)
        setFieldValue('initiativeId', Number(fromInitiativeParam))
        
        // Mostrar notificación informativa
        showNotification(
            `Creando proyecto desde iniciativa: ${initiativeNameParam}`,
            'info',
            5000
        )
    } else {
        // Si NO viene de iniciativa, cargar datos desde SOW si están disponibles
        projectStore.loadFromSOW()
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

            <!-- Banner informativo si se está usando una plantilla -->
            <div v-if="projectStore.selectedTemplate" class="alert alert-success mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="flex-1">
                    <h3 class="font-bold">Usando Plantilla: {{ projectStore.selectedTemplate.label }}</h3>
                    <div class="text-xs">
                        El proyecto se creará con la estructura y configuración de esta plantilla.
                    </div>
                </div>
                <button 
                    type="button"
                    class="btn btn-sm btn-ghost"
                    @click="handleRemoveTemplate"
                    title="Dejar de usar plantilla"
                >
                    <span class="material-symbols-outlined text-sm">close</span>
                </button>
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
                        name="customId"
                        label="ID Personalizado"
                        placeholder="Ingresa un ID personalizado (opcional)"
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
                        name="estimatedBudget"
                        label="Presupuesto Estimado"
                        type="number"
                        placeholder="0.00"
                        required
                    />
                    
                    <BaseFormSelect
                        name="classificationId"
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
                        name="leaderId"
                        label="Líder"
                        :options="leaderOptions"
                        placeholder="Selecciona líder"
                        required
                    />
                    
                    <BaseFormSelect
                        name="sponsorId"
                        label="Sponsor"
                        :options="sponsorOptions"
                        placeholder="Selecciona sponsor"
                        required
                    />
                    
                    <BaseFormSelect
                        name="projectManagerId"
                        label="Project Manager"
                        :options="pmOptions"
                        placeholder="Selecciona PM"
                        required
                    />
                    
                    <BaseFormSelect
                        name="processManagerId"
                        label="Gestor de Procesos"
                        :options="processOptions"
                        placeholder="Selecciona gestor"
                        required
                    />
                    
                    <!-- Additional Admins -->
                    <BaseFormMultiSelect
                        name="adminIds"
                        label="Administradores Adicionales"
                        :options="adminOptions"
                        placeholder="Selecciona administradores"
                    />
                </div>

                <div class="divider"></div>

                <!-- Area and Category -->
                <h3 class="text-lg font-semibold">Área y Categoría</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BaseFormSelect
                        name="areaId"
                        label="Área del Proyecto"
                        :options="areaOptions"
                        placeholder="Selecciona área"
                        required
                    />
                    
                    <BaseFormSelect
                        name="categoryId"
                        label="Categorías"
                        :options="categoryOptions"
                        :placeholder="values.areaId ? 'Selecciona categoría' : 'Primero selecciona un área'"
                        :disabled="!values.areaId || projectStore.isLoadingCategories"
                        required
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
                                @change="(e) => setFieldValue('isSubproject', (e.target as HTMLInputElement).checked)"
                            />
                            <div class="flex flex-col">
                                <span class="label-text font-semibold">SubProyecto</span>
                                <span class="text-xs text-base-content/60">(Se habilita un Selector para poder elegir a que proyecto desea adjuntarlo)</span>
                            </div>
                        </label>
                    </div>

                    <div v-if="values.isSubproject" class="ml-12 mt-3">
                        <BaseFormSelect
                            name="parentProjectId"
                            label="Proyecto Padre"
                            :options="parentProjectOptions"
                            :placeholder="projectStore.isLoadingParentProjects ? 'Cargando proyectos...' : 'Selecciona proyecto padre'"
                            :disabled="projectStore.isLoadingParentProjects"
                            required
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
                                    @change="(e) => setFieldValue('includeSaturday', (e.target as HTMLInputElement).checked)"
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
                                    @change="(e) => setFieldValue('includeSunday', (e.target as HTMLInputElement).checked)"
                                />
                                <span class="label-text font-semibold">Domingos</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Tipo de Proyecto -->
                <div class="border border-base-300 rounded-lg p-4 space-y-3">
                    <h3 class="text-base font-semibold text-base-content/70">Tipo de Proyecto</h3>
                    <div class="form-control">
                        <label class="label cursor-pointer justify-start gap-4">
                            <input 
                                type="checkbox" 
                                class="toggle toggle-primary"
                                :checked="values.isInvestmentType"
                                @change="(e) => setFieldValue('isInvestmentType', (e.target as HTMLInputElement).checked)"
                            />
                            <div class="flex flex-col">
                                <span class="label-text font-semibold">Tipo Inversión</span>
                                <span class="text-xs text-base-content/60">Marcar si el proyecto es de tipo inversión</span>
                            </div>
                        </label>
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
