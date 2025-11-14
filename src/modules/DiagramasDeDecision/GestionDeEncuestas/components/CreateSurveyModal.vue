<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useSurveyStore from '@/modules/DiagramasDeDecision/GestionDeEncuestas/store/surveyStore'
import { useSurveyActions } from '@/modules/DiagramasDeDecision/GestionDeEncuestas/composables/useSurveyActions'

const modalStore = useModalStore()
const surveyStore = useSurveyStore()
const { handleCreateSurvey } = useSurveyActions()

const activeTab = ref<'templates' | 'builder'>('templates')
const surveyName = ref('')
const surveyType = ref('')

const onSubmit = () => {
    if (activeTab.value === 'builder') {
        const success = handleCreateSurvey(surveyName.value, surveyType.value)
        if (success) {
            surveyName.value = ''
            surveyType.value = ''
            modalStore.close(surveyStore.createModalId)
        }
    }
}

const onClose = () => {
    surveyName.value = ''
    surveyType.value = ''
    activeTab.value = 'templates'
}

const useTemplate = (templateId: string) => {
    const template = surveyStore.templates.find(t => t.id === templateId)
    if (template) {
        const success = handleCreateSurvey(template.name, templateId)
        if (success) {
            modalStore.close(surveyStore.createModalId)
        }
    }
}
</script>

<template>
    <BaseModal
        :modal-id="surveyStore.createModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
        size="large"
    >
        <template #modalBody>
            <div class="space-y-4">
                <!-- Tabs -->
                <div role="tablist" class="tabs tabs-boxed">
                    <a 
                        role="tab" 
                        :class="['tab', activeTab === 'templates' && 'tab-active']"
                        @click="activeTab = 'templates'"
                    >
                        Plantillas
                    </a>
                    <a 
                        role="tab" 
                        :class="['tab', activeTab === 'builder' && 'tab-active']"
                        @click="activeTab = 'builder'"
                    >
                        Constructor
                    </a>
                </div>

                <!-- Templates Tab -->
                <div v-if="activeTab === 'templates'" class="space-y-4">
                    <div
                        v-for="template in surveyStore.templates"
                        :key="template.id"
                        class="card bg-base-100 border-2 border-base-300 hover:border-primary cursor-pointer transition-colors"
                        @click="useTemplate(template.id)"
                    >
                        <div class="card-body">
                            <h3 class="font-semibold">{{ template.name }}</h3>
                            <p class="text-sm opacity-70">{{ template.description }}</p>
                            <button type="button" class="btn btn-outline btn-sm mt-2 gap-2">
                                <span class="material-symbols-outlined text-sm">content_copy</span>
                                Usar Plantilla
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Builder Tab -->
                <div v-if="activeTab === 'builder'" class="space-y-4">
                    <!-- Survey Name -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Nombre de la Encuesta</span>
                        </label>
                        <input
                            v-model="surveyName"
                            type="text"
                            class="input input-bordered"
                            placeholder="Ej. Readiness - Proyecto X"
                        />
                    </div>

                    <!-- Survey Type -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Tipo de Encuesta</span>
                        </label>
                        <select v-model="surveyType" class="select select-bordered">
                            <option value="">Seleccionar tipo</option>
                            <option value="readiness">Readiness Assessment</option>
                            <option value="satisfaction">Satisfacción</option>
                            <option value="adoption">Adopción</option>
                        </select>
                    </div>

                    <!-- Question Types -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Tipos de Preguntas Disponibles</span>
                        </label>
                        <div class="grid grid-cols-2 gap-3">
                            <div
                                v-for="qt in surveyStore.questionTypes"
                                :key="qt.id"
                                class="card bg-base-100 border-2 border-base-300 hover:border-primary cursor-move transition-colors p-3"
                            >
                                <div class="flex items-center gap-2">
                                    <span class="text-2xl">{{ qt.icon }}</span>
                                    <span class="text-sm font-medium">{{ qt.label }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
