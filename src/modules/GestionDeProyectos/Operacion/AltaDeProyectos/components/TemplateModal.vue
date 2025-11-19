<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { showNotification } from '@/utils/toastNotifications'
import useProjectStore from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/store/projectStore'
import { useProjectActions } from '@/modules/GestionDeProyectos/Operacion/AltaDeProyectos/composables/useProjectActions'

const emit = defineEmits<{
    apply: [template: { dni: number | string; label: string }]
}>()

const router = useRouter()
const modalStore = useModalStore()
const projectStore = useProjectStore()
const { loadTemplates } = useProjectActions()

const selectedTemplateId = ref<string | number>('')
const isSubmitting = ref(false)

// Cargar plantillas cuando se abre el modal
watch(() => modalStore.modals[projectStore.templateModalId]?.status, async (isOpen) => {
    if (isOpen) {
        selectedTemplateId.value = ''
        if (projectStore.templates.length === 0) {
            await loadTemplates()
        }
    }
})

const onSubmit = async () => {
    if (!selectedTemplateId.value) {
        showNotification('Selecciona una plantilla', 'warning')
        return
    }
    
    const template = projectStore.templates.find(t => t.dni === selectedTemplateId.value)
    if (template) {
        isSubmitting.value = true
        try {
            emit('apply', template)
            selectedTemplateId.value = ''
            modalStore.close(projectStore.templateModalId)
        } finally {
            isSubmitting.value = false
        }
    }
}

const handleManageTemplates = () => {
    // Cerrar el modal actual
    modalStore.close(projectStore.templateModalId)
    
    // Navegar al módulo de administración de plantillas
    router.push({ name: 'PlantillasConfiguration' })
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="projectStore.templateModalId"
        :isSubmitting="isSubmitting"
    >
        <template #modalBody>
            <!-- Botón Administrar Plantillas -->
            <div class="flex justify-center mb-6">
                <button 
                    type="button"
                    class="btn btn-primary btn-sm gap-2"
                    @click="handleManageTemplates"
                >
                    Administrar plantillas
                    <span class="material-symbols-outlined text-base">arrow_forward</span>
                </button>
            </div>
            
            <!-- Loading State -->
            <div v-if="projectStore.isLoadingTemplates" class="flex justify-center items-center py-12">
                <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
            
            <!-- Empty State -->
            <div v-else-if="projectStore.templates.length === 0" class="text-center py-12">
                <span class="material-symbols-outlined text-6xl opacity-30">description</span>
                <p class="mt-4 text-lg font-semibold">No hay plantillas disponibles</p>
                <p class="text-sm opacity-70 mt-2">Crea plantillas desde el módulo de administración</p>
            </div>
            
            <!-- Templates List -->
            <div v-else class="space-y-3 max-h-[50vh] overflow-y-auto px-2">
                <label 
                    v-for="template in projectStore.templates" 
                    :key="template.dni"
                    :class="[
                        'flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all',
                        selectedTemplateId === template.dni 
                            ? 'border-primary bg-primary/5' 
                            : 'border-base-300 hover:border-base-400 hover:bg-base-200/50'
                    ]"
                >
                    <input 
                        type="radio" 
                        name="template" 
                        :value="template.dni"
                        v-model="selectedTemplateId"
                        class="radio radio-primary radio-sm"
                    />
                    <span :class="[
                        'flex-1 font-medium',
                        selectedTemplateId === template.dni ? 'text-primary' : 'text-base-content'
                    ]">
                        {{ template.label }}
                    </span>
                    <!-- Badge opcional para plantillas incompletas -->
                    <span 
                        v-if="false" 
                        class="badge badge-warning badge-sm"
                    >
                        Plantilla incompleta
                    </span>
                </label>
            </div>
        </template>
    </BaseModal>
</template>
