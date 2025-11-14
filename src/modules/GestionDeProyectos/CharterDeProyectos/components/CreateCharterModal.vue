<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useCharterStore from '@/modules/GestionDeProyectos/CharterDeProyectos/store/charterStore'
import type { NewCharterType } from '@/modules/GestionDeProyectos/CharterDeProyectos/types/charterTypes'

const modalStore = useModalStore()
const charterStore = useCharterStore()

const MODAL_ID = 'create-charter-modal'

const formData = ref<NewCharterType>({
    projectName: '',
    description: '',
    justification: '',
    objectives: '',
    scope: '',
    exclusions: '',
    milestones: '',
    budget: '',
    risks: '',
    stakeholders: '',
    projectManager: '',
    sponsor: '',
    status: 'Borrador',
    version: '1.0'
})

const isSubmitting = ref(false)

watch(() => charterStore.isCreateModalOpen, (isOpen) => {
    if (isOpen) {
        modalStore.open(MODAL_ID, {
            title: 'Nuevo Charter de Proyecto'
        })
    } else {
        modalStore.close(MODAL_ID)
    }
})

const handleSubmit = () => {
    isSubmitting.value = true
    
    charterStore.addCharter(formData.value)
    
    // Reset form
    formData.value = {
        projectName: '',
        description: '',
        justification: '',
        objectives: '',
        scope: '',
        exclusions: '',
        milestones: '',
        budget: '',
        risks: '',
        stakeholders: '',
        projectManager: '',
        sponsor: '',
        status: 'Borrador',
        version: '1.0'
    }
    
    isSubmitting.value = false
    charterStore.closeCreateModal()
}

const handleClose = () => {
    charterStore.closeCreateModal()
}
</script>

<template>
    <BaseModal
        :modal-id="MODAL_ID"
        :on-submit="handleSubmit"
        :on-close="handleClose"
        :is-submitting="isSubmitting"
        submit-text="Guardar Borrador"
    >
        <template #modalBody>
            <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                <!-- Nombre y Versión -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Nombre del Proyecto *</span>
                        </label>
                        <input
                            v-model="formData.projectName"
                            type="text"
                            class="input input-bordered"
                            placeholder="Nombre descriptivo del proyecto"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Versión</span>
                        </label>
                        <input
                            v-model="formData.version"
                            type="text"
                            class="input input-bordered"
                            placeholder="1.0"
                        />
                    </div>
                </div>

                <!-- Descripción -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Descripción del Proyecto *</span>
                    </label>
                    <textarea
                        v-model="formData.description"
                        class="textarea textarea-bordered"
                        placeholder="Descripción general del proyecto y su propósito..."
                        rows="3"
                    ></textarea>
                </div>

                <!-- Justificación -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Justificación del Negocio *</span>
                    </label>
                    <textarea
                        v-model="formData.justification"
                        class="textarea textarea-bordered"
                        placeholder="¿Por qué se debe realizar este proyecto? ¿Qué problema resuelve?"
                        rows="3"
                    ></textarea>
                </div>

                <!-- Objetivos -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Objetivos Medibles y Criterios de Éxito *</span>
                    </label>
                    <textarea
                        v-model="formData.objectives"
                        class="textarea textarea-bordered"
                        placeholder="Liste objetivos SMART (Específicos, Medibles, Alcanzables, Relevantes, Temporales)"
                        rows="4"
                    ></textarea>
                </div>

                <!-- Alcance y Exclusiones -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Alcance (Inclusiones) *</span>
                        </label>
                        <textarea
                            v-model="formData.scope"
                            class="textarea textarea-bordered"
                            placeholder="¿Qué incluye el proyecto?"
                            rows="3"
                        ></textarea>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Exclusiones</span>
                        </label>
                        <textarea
                            v-model="formData.exclusions"
                            class="textarea textarea-bordered"
                            placeholder="¿Qué NO incluye el proyecto?"
                            rows="3"
                        ></textarea>
                    </div>
                </div>

                <!-- Hitos -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Hitos Principales *</span>
                    </label>
                    <textarea
                        v-model="formData.milestones"
                        class="textarea textarea-bordered"
                        placeholder="Liste los hitos clave con fechas estimadas"
                        rows="3"
                    ></textarea>
                </div>

                <!-- Presupuesto -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Presupuesto Resumido *</span>
                    </label>
                    <input
                        v-model="formData.budget"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej: $100,000 - $150,000"
                    />
                </div>

                <!-- Riesgos -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Riesgos de Alto Nivel</span>
                    </label>
                    <textarea
                        v-model="formData.risks"
                        class="textarea textarea-bordered"
                        placeholder="Identifique los principales riesgos conocidos"
                        rows="3"
                    ></textarea>
                </div>

                <!-- Stakeholders -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Stakeholders Clave *</span>
                    </label>
                    <textarea
                        v-model="formData.stakeholders"
                        class="textarea textarea-bordered"
                        placeholder="Liste los stakeholders principales y sus roles"
                        rows="3"
                    ></textarea>
                </div>

                <!-- PM y Sponsor -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Project Manager Asignado *</span>
                        </label>
                        <input
                            v-model="formData.projectManager"
                            type="text"
                            class="input input-bordered"
                            placeholder="Nombre del PM"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Sponsor del Proyecto *</span>
                        </label>
                        <input
                            v-model="formData.sponsor"
                            type="text"
                            class="input input-bordered"
                            placeholder="Nombre del sponsor"
                        />
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
