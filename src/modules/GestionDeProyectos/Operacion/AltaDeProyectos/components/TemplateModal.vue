<script setup lang="ts">
import { ref } from 'vue'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    show: boolean
}>()

const emit = defineEmits<{
    close: []
    apply: [template: any]
}>()

const templates = ref([
    {
        id: '1',
        name: 'Proyecto de Desarrollo de Software',
        description: 'Plantilla para proyectos de desarrollo',
        data: {
            classification: 'Estratégico',
            area: '1',
            includeSaturday: false,
            includeSunday: false
        }
    },
    {
        id: '2',
        name: 'Proyecto de Marketing Digital',
        description: 'Plantilla para campañas de marketing',
        data: {
            classification: 'Operacional',
            area: '2',
            includeSaturday: true,
            includeSunday: false
        }
    },
    {
        id: '3',
        name: 'Proyecto de Capacitación',
        description: 'Plantilla para proyectos de RRHH',
        data: {
            classification: 'Táctico',
            area: '3',
            includeSaturday: false,
            includeSunday: false
        }
    }
])

const selectedTemplate = ref<string>('')

const handleApply = () => {
    if (!selectedTemplate.value) {
        showNotification('Selecciona una plantilla', 'warning')
        return
    }
    
    const template = templates.value.find(t => t.id === selectedTemplate.value)
    if (template) {
        emit('apply', template.data)
        showNotification('Plantilla aplicada correctamente', 'success')
        emit('close')
    }
}

const handleClose = () => {
    selectedTemplate.value = ''
    emit('close')
}
</script>

<template>
    <dialog :class="['modal', { 'modal-open': props.show }]">
        <div class="modal-box max-w-2xl">
            <h3 class="font-bold text-lg mb-4">Utilizar Plantilla</h3>
            
            <div class="space-y-4">
                <p class="text-sm opacity-70">
                    Selecciona una plantilla para pre-cargar datos del proyecto
                </p>
                
                <div class="space-y-3">
                    <div 
                        v-for="template in templates" 
                        :key="template.id"
                        class="form-control"
                    >
                        <label class="label cursor-pointer justify-start gap-4 p-4 border rounded-lg hover:bg-base-200 transition-colors">
                            <input 
                                type="radio" 
                                name="template" 
                                class="radio radio-primary"
                                :value="template.id"
                                v-model="selectedTemplate"
                            />
                            <div class="flex-1">
                                <span class="label-text font-semibold block">{{ template.name }}</span>
                                <span class="label-text-alt opacity-70">{{ template.description }}</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="modal-action">
                <button class="btn btn-ghost" @click="handleClose">
                    Cancelar
                </button>
                <button class="btn btn-primary" @click="handleApply">
                    <span class="material-symbols-outlined text-sm">check</span>
                    Aplicar Plantilla
                </button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop" @click="handleClose">
            <button>close</button>
        </form>
    </dialog>
</template>
