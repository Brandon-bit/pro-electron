<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import useSOWStore from '@/modules/GestionDeProyectos/Operacion/SOWDelProyecto/store/sowStore'
import { sowSchema } from '@/modules/GestionDeProyectos/Operacion/SOWDelProyecto/validations/sowValidation'
import { useSOWActions } from '@/modules/GestionDeProyectos/Operacion/SOWDelProyecto/composables/useSOWActions'
import { showNotification } from '@/utils/toastNotifications'

const sowStore = useSOWStore()
const { createSOW, editSOW } = useSOWActions()

const isLoading = ref(false)
const isEditMode = computed(() => !!sowStore.selectedSOW.id)

const statusOptions = [
    { id: 'draft', label: 'Borrador' },
    { id: 'review', label: 'En Revisión' },
    { id: 'approved', label: 'Aprobado' },
    { id: 'rejected', label: 'Rechazado' }
]

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(sowSchema),
    initialValues: sowStore.selectedSOW
})

const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true
    try {
        const result = isEditMode.value 
            ? await editSOW(values as any)
            : await createSOW(values as any)
        
        showNotification(result.message, result.status as 'success' | 'error')
        
        if (result.status === 'success') {
            resetForm()
            sowStore.resetForm()
        }
    } catch (error: any) {
        showNotification(error.message || 'Error al guardar el SOW', 'error')
    } finally {
        isLoading.value = false
    }
})

const handleReset = () => {
    resetForm()
    sowStore.resetForm()
    showNotification('Formulario reiniciado', 'info')
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title flex items-center gap-2">
                <span class="material-symbols-outlined">edit_document</span>
                {{ isEditMode ? 'Editar SOW' : 'Crear Nuevo SOW' }}
            </h2>
            
            <form @submit="onSubmit" class="space-y-6">
                <!-- Información del Proyecto -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">folder</span>
                        Información del Proyecto
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BaseFormInput
                            name="projectName"
                            label="Nombre del Proyecto"
                            placeholder="Ej: Sistema CRM"
                            required
                        />
                        
                        <BaseFormInput
                            name="projectCode"
                            label="Código del Proyecto"
                            placeholder="Ej: PRJ-2024-001"
                            required
                        />
                        
                        <BaseFormInput
                            name="client"
                            label="Cliente"
                            placeholder="Ej: Empresa XYZ"
                            required
                        />
                        
                        <BaseFormInput
                            name="version"
                            label="Versión"
                            placeholder="Ej: 1.0"
                            required
                        />
                        
                        <BaseFormInput
                            name="startDate"
                            label="Fecha de Inicio"
                            type="date"
                            required
                        />
                        
                        <BaseFormInput
                            name="endDate"
                            label="Fecha de Fin"
                            type="date"
                            required
                        />
                        
                        <BaseFormInput
                            name="createdBy"
                            label="Creado Por"
                            placeholder="Ej: Juan Pérez"
                            required
                        />
                        
                        <BaseFormSelect
                            name="status"
                            label="Estado"
                            :options="statusOptions"
                            required
                        />
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Contenido del SOW -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">description</span>
                        Contenido del SOW
                    </h3>
                    
                    <BaseTextArea
                        name="executiveSummary"
                        label="Resumen Ejecutivo"
                        placeholder="Descripción general del proyecto..."
                        rows="4"
                        required
                    />
                    
                    <BaseTextArea
                        name="objectives"
                        label="Objetivos"
                        placeholder="Objetivos principales del proyecto..."
                        rows="4"
                        required
                    />
                    
                    <BaseTextArea
                        name="scope"
                        label="Alcance"
                        placeholder="Definición del alcance del proyecto..."
                        rows="4"
                        required
                    />
                    
                    <BaseTextArea
                        name="deliverables"
                        label="Entregables"
                        placeholder="Lista de entregables del proyecto..."
                        rows="4"
                        required
                    />
                    
                    <BaseTextArea
                        name="timeline"
                        label="Cronograma"
                        placeholder="Cronograma del proyecto..."
                        rows="3"
                        required
                    />
                    
                    <BaseTextArea
                        name="resources"
                        label="Recursos"
                        placeholder="Recursos necesarios..."
                        rows="3"
                        required
                    />
                    
                    <BaseTextArea
                        name="assumptions"
                        label="Supuestos"
                        placeholder="Supuestos del proyecto..."
                        rows="3"
                    />
                    
                    <BaseTextArea
                        name="constraints"
                        label="Restricciones"
                        placeholder="Restricciones del proyecto..."
                        rows="3"
                    />
                    
                    <BaseTextArea
                        name="acceptanceCriteria"
                        label="Criterios de Aceptación"
                        placeholder="Criterios para aceptar el proyecto..."
                        rows="4"
                        required
                    />
                    
                    <BaseTextArea
                        name="paymentTerms"
                        label="Términos de Pago"
                        placeholder="Condiciones de pago..."
                        rows="3"
                        required
                    />
                </div>

                <!-- Botones de Acción -->
                <div class="flex gap-4 justify-end">
                    <button
                        type="button"
                        class="btn btn-ghost"
                        @click="handleReset"
                        :disabled="isLoading"
                    >
                        <span class="material-symbols-outlined text-sm">refresh</span>
                        Limpiar
                    </button>
                    
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="isLoading"
                    >
                        <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
                        <span v-else class="material-symbols-outlined text-sm">save</span>
                        {{ isEditMode ? 'Actualizar SOW' : 'Guardar SOW' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
