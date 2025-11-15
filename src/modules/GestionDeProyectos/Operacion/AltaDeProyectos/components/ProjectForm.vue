<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import useProjectStore from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/store/projectStore'
import { projectSchema } from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/validations/projectValidation'
import { useProjectActions } from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/composables/useProjectActions'
import { showNotification } from '@/utils/toastNotifications'

const projectStore = useProjectStore()
const { createProject, generateFolio, saveToLocalStorage } = useProjectActions()

const isLoading = ref(false)

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
            creationDate: new Date()
        }
        
        // Save to localStorage
        saveToLocalStorage(projectWithFolio as any)
        
        showNotification('Proyecto agregado correctamente', 'success')
        
        // Reset form
        resetForm()
        projectStore.resetForm()
    } catch (error: any) {
        showNotification(error.message || 'Error al guardar el proyecto', 'error')
    } finally {
        isLoading.value = false
    }
})

onMounted(() => {
    projectStore.loadFromSOW()
})
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
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
                </div>

                <div class="divider"></div>

                <!-- Area and Category -->
                <h3 class="text-lg font-semibold">Clasificación</h3>
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

                <!-- Additional Admins -->
                <div class="space-y-3">
                    <label class="label">
                        <span class="label-text font-semibold">Administrador Adicional</span>
                    </label>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div v-for="admin in projectStore.users.admins" :key="admin.id">
                            <BaseFormCheckbox
                                :name="`admin-${admin.id}`"
                                :label="admin.name"
                                :checked="projectStore.selectedProject.additionalAdmins.includes(admin.id)"
                                @update:checked="() => projectStore.toggleAdmin(admin.id)"
                            />
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Implementation Mode -->
                <div class="space-y-4">
                    <div class="form-control">
                        <label class="label cursor-pointer justify-start gap-4">
                            <input 
                                type="checkbox" 
                                class="toggle toggle-primary"
                                :checked="values.isSubproject"
                                @change="(e) => projectStore.updateField('isSubproject', (e.target as HTMLInputElement).checked)"
                            />
                            <span class="label-text font-semibold">SubProyecto</span>
                        </label>
                    </div>

                    <div v-if="values.isSubproject" class="ml-6">
                        <BaseFormSelect
                            name="parentProject"
                            label="Proyecto Padre"
                            :options="parentProjectOptions"
                            placeholder="Selecciona proyecto padre"
                        />
                    </div>
                </div>

                <!-- Weekend Options -->
                <div class="flex gap-6">
                    <div class="form-control">
                        <label class="label cursor-pointer justify-start gap-4">
                            <input 
                                type="checkbox" 
                                class="toggle toggle-primary"
                                :checked="values.includeSaturday"
                                @change="(e) => projectStore.updateField('includeSaturday', (e.target as HTMLInputElement).checked)"
                            />
                            <span class="label-text">Incluir Sábados</span>
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
                            <span class="label-text">Incluir Domingos</span>
                        </label>
                    </div>
                </div>

                <!-- Project Type -->
                <div class="space-y-3">
                    <label class="label">
                        <span class="label-text font-semibold">Tipo de Proyecto</span>
                    </label>
                    <div class="flex gap-6">
                        <div class="form-control">
                            <label class="label cursor-pointer justify-start gap-4">
                                <input 
                                    type="checkbox" 
                                    class="toggle toggle-primary"
                                    :checked="values.projectType === 'expense'"
                                    @change="(e) => projectStore.updateField('projectType', (e.target as HTMLInputElement).checked ? 'expense' : '')"
                                />
                                <span class="label-text">Gasto</span>
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
                                <span class="label-text">Inversión</span>
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
