<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import type { PartnerDocuments, DocumentSection } from '../types/partnerTypes'

interface Props {
    partnerName: string
}

const props = defineProps<Props>()

const modalStore = useModalStore()
const modalId = 'documents-modal'

// Secciones de documentos (mock data)
const documentSections = ref<DocumentSection[]>([
    {
        id: 1,
        nombre: 'ZX',
        archivos: [
            {
                id: 1,
                nombre: 'Dzx_Comisiones.pdf',
                url: '#',
                fechaCarga: '2024-01-15'
            }
        ]
    },
    {
        id: 2,
        nombre: 'Identificación Oficial',
        archivos: []
    },
    {
        id: 3,
        nombre: 'Comprobante de Domicilio',
        archivos: []
    },
    {
        id: 4,
        nombre: 'Constancia de Situación Fiscal',
        archivos: []
    }
])

// Calcular progreso
const totalSections = computed(() => documentSections.value.length)
const completedSections = computed(() => 
    documentSections.value.filter(section => section.archivos.length > 0).length
)
const progressPercentage = computed(() => 
    totalSections.value > 0 ? Math.round((completedSections.value / totalSections.value) * 100) : 0
)

// Manejar carga de archivo
const handleFileUpload = (sectionId: string | number, event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    
    if (file) {
        const section = documentSections.value.find(s => s.id === sectionId)
        if (section) {
            section.archivos.push({
                id: Date.now(),
                nombre: file.name,
                fechaCarga: new Date().toISOString().split('T')[0]
            })
        }
    }
}

// Eliminar archivo
const removeFile = (sectionId: string | number, fileId: string | number) => {
    const section = documentSections.value.find(s => s.id === sectionId)
    if (section) {
        section.archivos = section.archivos.filter(f => f.id !== fileId)
    }
}

const onSubmit = () => {
    // Aquí iría la lógica para guardar los documentos
    console.log('Documentos guardados:', documentSections.value)
    modalStore.close(modalId)
}

const onClose = () => {
    // Reset si es necesario
}

const openModal = () => {
    modalStore.open(modalId, 'Documentos del Socio')
}

defineExpose({
    openModal
})
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="modalId"
        :isSubmitting="false"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <div class="space-y-6">
                <!-- Nombre del socio -->
                <div class="text-center">
                    <h3 class="text-xl font-semibold text-base-content/80">
                        Documentos de {{ partnerName }}
                    </h3>
                </div>

                <!-- Progreso general -->
                <div class="bg-base-200 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-semibold">Progreso general de documentación</span>
                        <span class="text-primary font-bold">{{ completedSections }} de {{ totalSections }}</span>
                    </div>
                    <div class="w-full bg-base-300 rounded-full h-3">
                        <div 
                            class="bg-primary h-3 rounded-full transition-all duration-300"
                            :style="{ width: `${progressPercentage}%` }"
                        ></div>
                    </div>
                </div>

                <!-- Secciones de documentos -->
                <div class="space-y-4 max-h-[400px] overflow-y-auto">
                    <div 
                        v-for="section in documentSections" 
                        :key="section.id"
                        class="border border-base-300 rounded-lg p-4"
                    >
                        <!-- Header de sección -->
                        <div class="bg-base-300 -mx-4 -mt-4 px-4 py-3 rounded-t-lg mb-4">
                            <h4 class="font-bold text-center">{{ section.nombre }}</h4>
                        </div>

                        <!-- Archivos cargados -->
                        <div v-if="section.archivos.length > 0" class="mb-3 space-y-2">
                            <div 
                                v-for="file in section.archivos" 
                                :key="file.id"
                                class="flex items-center justify-between bg-base-200 p-2 rounded"
                            >
                                <div class="flex items-center gap-2">
                                    <span class="material-icons text-primary">description</span>
                                    <span class="text-sm">{{ file.nombre }}</span>
                                </div>
                                <button
                                    type="button"
                                    class="btn btn-ghost btn-xs text-error"
                                    @click="removeFile(section.id, file.id)"
                                >
                                    <span class="material-icons text-sm">delete</span>
                                </button>
                            </div>
                        </div>

                        <!-- Input file -->
                        <div class="form-control">
                            <label class="btn btn-sm btn-outline btn-primary w-full">
                                <span class="material-icons text-sm mr-2">upload_file</span>
                                Seleccionar archivo
                                <input
                                    type="file"
                                    class="hidden"
                                    @change="handleFileUpload(section.id, $event)"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
